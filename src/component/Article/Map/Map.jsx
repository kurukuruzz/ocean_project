import React, { useEffect, useState } from "react";
import './Map.css';
const { kakao } = window;

const Map = () => {
    const [rowLevel, setRowLevel] = useState(13);
    const [level, setLevel] = useState(13);
    const [mapCenter, setMapCenter] = useState({
        lat: 36.03257609653945,
        lng: 127.95172999438276,
    });

    useEffect(() => {
        const script = document.createElement("script");
        script.id = "kakao-map-script";

        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=b7cf9eae2097956579182491f68a9d5e&autoload=false`;
        script.async = true;

        document.head.appendChild(script);

        script.onload = () => {
            console.log("Kakao Map script loaded");
            window.kakao.maps.load(initMap);
        };
        script.onerror = () => {
            console.error("Failed to load the Kakao Map script");
        };

        return () => {
            document.head.removeChild(script);
        };
    }, []);

    useEffect(() => {
        setRowLevel(level);

        if ((level <= 10 && rowLevel >= 11) || (level >= 11 && rowLevel <= 10)) {
            window.kakao.maps.load(initMap);
        }
    }, [level]);

    const initMap = () => {
        if (window.kakao && window.kakao.maps) {
            const container = document.getElementById("map");

            window.kakao?.maps.load(() => {
                const options = {
                    center: new window.kakao.maps.LatLng(mapCenter.lat, mapCenter.lng),
                    level: level,
                };
                const map = new window.kakao.maps.Map(container, options);

                window.kakao.maps.event.addListener(map, "zoom_changed", function () {
                    const currentLevel = map.getLevel();
                    setLevel(Number(currentLevel));
                });

                window.kakao.maps.event.addListener(map, "dragend", function () {
                    const latlng = map.getCenter();
                    setMapCenter({ lat: latlng.getLat(), lng: latlng.getLng() });
                });

                const jsonData = require(
                    level > 10
                        ? "../../../JSON/TL_SCCO_CTPRVN.json"
                        : "../../../JSON/TL_SCCO_SIG.json"
                );

                jsonData.features?.forEach((feature) => {
                    const geometry = feature.geometry;
                    const properties = feature.properties;

                    const polygons = geometry.coordinates?.map((coords) => {
                        return coords?.map(
                            (coord) => new window.kakao.maps.LatLng(coord[1], coord[0])
                        );
                    });

                    const polygon = new window.kakao.maps.Polygon({
                        map: map,
                        path: polygons,
                        strokeWeight: 2,
                        strokeColor: "#004c80",
                        strokeOpacity: 0.8,
                        fillColor: "#fff",
                        fillOpacity: 0.7,
                    });

                    window.kakao.maps.event.addListener(polygon, "mouseover", () =>
                        polygon.setOptions({ fillColor: "#070774cd" })
                    );
                    window.kakao.maps.event.addListener(polygon, "mouseout", () =>
                        polygon.setOptions({ fillColor: "#fff" })
                    );

                    const regionCode = properties.CTPRVN_CD;
                    const regionName = properties.CTP_KOR_NM;
                });
                console.log("Map initialized");
            })
        } else {
            console.error("Kakao Maps not available");
        }
    };

    return (
        <div className="map">
            {/* 지도 API 들어갈 곳 */}
            <div id="map" className="map"></div>
        </div>
    )
}

export default Map;