import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Map = () => {
  const [rowLevel, setRowLevel] = useState(13);
  const [level, setLevel] = useState(13);
  const [mapCenter, setMapCenter] = useState({
    lat: 36.03257609653945,
    lng: 127.95172999438276,
  });
  const [mapInstance, setMapInstance] = useState(null);
  const [address, setAddress] = useState('');

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

    if (mapInstance) {
      if (level >= 13) {
        mapInstance.setDraggable(false);
      } else {
        mapInstance.setDraggable(true);
        mapInstance.setZoomable(true);
      }
    }
  }, [level]);

  useEffect(() => {
    if (mapInstance) {
      window.kakao.maps.event.addListener(mapInstance, "click", async (e) => {
        const { latLng } = e;
        handleAreaClick(latLng);
        const result = await fetch(
          `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${latLng.La}&y=${latLng.Ma}`,
          {
            method: "get",
            headers: {
              Authorization: `KakaoAK b7cf9eae2097956579182491f68a9d5e`,
              KA: "sdk/1.0.0 os/javascript lang/en-KR origin/http://localhost:3000",
            },
          }
        );

        const data = await result.json();
        if (data.documents.length > 0) {
          const addressInfo = data.documents[0].address.address_name.split(" ");
          setAddress(`${addressInfo[0]} ${addressInfo[1]}`);
        } else {
          console.error("주소 정보를 찾을 수 없습니다.");
        }
      });
    }
  }, [mapInstance]);

  const initMap = () => {
    if (window.kakao && window.kakao.maps) {
      const container = document.getElementById("map");

      if (container) {
        const center = new window.kakao.maps.LatLng(
          mapCenter.lat,
          mapCenter.lng
        );
        const options = {
          center: center,
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

        loadGeoJson(map, level);
      } else {
        console.error("Map container not found");
      }
    } else {
      console.error("Kakao Maps not available");
    }
  };

  const loadGeoJson = (map, level) => {
    const geoJsonFile = level > 10 ? "TL_SCCO_CTPRVN.json" : "TL_SCCO_SIG.json";
    import(`../../public/${geoJsonFile}`)
      .then((jsonData) => {
        jsonData.features.forEach((feature) => {
          const geometry = feature.geometry;
          const properties = feature.properties;

          const polygons = geometry.coordinates.map((coords) => {
            return coords.map(
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

          const regionName = properties.CTP_KOR_NM || properties.SIG_KOR_NM;

          // 중앙 좌표 계산 (모든 좌표의 평균)
          let latSum = 0;
          let lngSum = 0;
          let count = 0;
          geometry.coordinates.forEach((coords) => {
            coords.forEach((coord) => {
              latSum += coord[1];
              lngSum += coord[0];
              count++;
            });
          });
          const center = new window.kakao.maps.LatLng(
            latSum / count,
            lngSum / count
          );

          const customOverlay = new window.kakao.maps.CustomOverlay({
            position: center,
            content: `<div style="padding:5px;background:white;border:1px solid black;">${regionName}</div>`,
          });

          customOverlay.setMap(map);
        });
      })
      .catch((error) =>
        console.error("Failed to load the geojson file", error)
      );
  };

  const handleAreaClick = (latLng) => {
    const latitude = latLng.getLat();
    const longitude = latLng.getLng();

    if (mapInstance) {
      if (!isNaN(latitude) && !isNaN(longitude)) {
        const targetCoords = new window.kakao.maps.LatLng(latitude, longitude);
        mapInstance.setCenter(targetCoords);
        mapInstance.setLevel(9); 
      } else {
        console.error("유효하지 않은 좌표입니다:", latitude, longitude);
      }
    } else {
      console.error("mapInstance가 유효하지 않습니다.");
    }
  };

  return (
    <Container>
      <div id="map" className="map"></div>
      <div>{address}</div> {/* 선택된 주소 표시 */}
    </Container>
  );
};

export default Map;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh; // 화면 전체 높이로 설정
  background-color: #444444bf;
  overflow: hidden;
  z-index: 0;
  .map {
    width: 100%;
    height: 100%;
    flex: 1;
  }
`;
