import React, { useEffect, useState } from "react";
import styled from "styled-components";

declare global {
  interface Window {
    kakao: any;
  }
}

const Map: React.FC = () => {
  const [rowLevel, setRowLevel] = useState<number>(13);
  const [level, setLevel] = useState(13);
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number }>({
    lat: 36.03257609653945,
    lng: 127.95172999438276,
  });

  useEffect(() => {
    const script = document.createElement("script");
    script.id = "kakao-map-script";
    // script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey= 자신의 API 키`;
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

      if (container) {
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
            ? "../../public/TL_SCCO_CTPRVN.json"
            : "../../public/TL_SCCO_SIG.json"
        );

        jsonData.features.forEach((feature: any) => {
          const geometry = feature.geometry;
          const properties = feature.properties;

          const polygons = geometry.coordinates.map((coords: any) => {
            return coords.map(
              (coord: any) => new window.kakao.maps.LatLng(coord[1], coord[0])
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
      } else {
        console.error("Map container not found");
      }
    } else {
      console.error("Kakao Maps not available");
    }
  };

  return (
    <Container>
      <div id="map" className="map"></div>
    </Container>
  );
};

export default Map;

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 1000px;
  background-color: #444444bf;
  overflow: hidden;
  .map {
    width: 100%;
    height: 100%;
  }
`;
