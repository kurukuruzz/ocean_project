import React, { useEffect, useState } from "react";
import './Map.css';
const { kakao } = window;

const Map = ({
    setAddress,
}) => {
    const [rowLevel, setRowLevel] = useState(13);
    const [level, setLevel] = useState(13);
    const [mapCenter, setMapCenter] = useState({
        lat: 36.03257609653945,
        lng: 127.95172999438276,
    });
    const [mapInstance, setMapInstance] = useState(null);

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

    useEffect(() => {
        if (mapInstance) {
            window.kakao.maps.event.addListener(mapInstance, 'click', async (e) => {
                const { latLng } = e;
                // console.log(latLng)

                // if (!blurred) {
                handleAreaClick(latLng);
                // }
                const result = await fetch(`https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${latLng.La}&y=${latLng.Ma}`, {
                    method: 'get',
                    headers: {
                        'Authorization': `KakaoAK b7cf9eae2097956579182491f68a9d5e`,
                        'KA': 'sdk/1.0.0 os/javascript lang/en-KR origin/http://localhost:3000'
                    },
                });

                const data = await result.json();
                const addressInfo = data.documents[0].address.address_name.split(' ');
                setAddress(`${addressInfo[0]} ${addressInfo[1]}`)
            });
        }
    }, [mapInstance]);

    const initMap = () => {
        if (window.kakao && window.kakao.maps) {
            const container = document.getElementById("map");

            window.kakao?.maps.load(() => {
                const options = {
                    center: new window.kakao.maps.LatLng(mapCenter.lat, mapCenter.lng),
                    level: level,
                };
                const map = new window.kakao.maps.Map(container, options);
                setMapInstance(map);

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

    const handleAreaClick = (latLng) => {
        // const { La: latitude, Ma: longitude } = latLng;
        const latitude = latLng.getLat();
        const longitude = latLng.getLng();

        if (mapInstance) {
            // 위도와 경도를 확인하여 유효한지 체크
            if (!isNaN(latitude) && !isNaN(longitude)) {
                const targetCoords = new window.kakao.maps.LatLng(latitude, longitude);

                // panTo 메서드 호출 전 확인 메시지
                console.log('Moving map to:', targetCoords);
                console.log(mapInstance.panTo);

                // 지도 이동 및 줌 레벨 설정
                mapInstance.setCenter(targetCoords);
                mapInstance.setLevel(11); // 줌 레벨 설정
            } else {
                console.error('유효하지 않은 좌표입니다:', latitude, longitude);
            }
        } else {
            console.error('mapInstance가 유효하지 않습니다.');
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