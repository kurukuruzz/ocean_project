import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Papa from "papaparse";

const Map = () => {
  const [rowLevel, setRowLevel] = useState(13);
  const [level, setLevel] = useState(13);
  let [mapCenter, setMapCenter] = useState({
    lat: 36.03257609653945,
    lng: 127.95172999438276,
  });
  const [mapInstance, setMapInstance] = useState(null);
  const [hotTopics, setHotTopics] = useState([]);

  useEffect(() => {
    const script = document.createElement("script");
    script.id = "kakao-map-script";
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=b7cf9eae2097956579182491f68a9d5e&autoload=false`;
    script.async = true;

    document.head.appendChild(script);

    script.onload = () => {
      console.log("Kakao Map script loaded");
      if (hotTopics.length > 0) {
        window.kakao.maps.load(initMap);
      }
    };
    script.onerror = () => {
      console.error("Failed to load the Kakao Map script");
    };

    return () => {
      document.head.removeChild(script);
    };
  }, [hotTopics]);

  useEffect(() => {
    fetchCSVData();
  }, []);


  useEffect(() => {
    setRowLevel(level);
    console.log(level);
    if ((level <= 10 && rowLevel >= 11) || (level >= 11 && rowLevel <= 10)) {
      window.kakao.maps.load(initMap);
    }
    
  }, [level]);

  const handleMapClick = (e) => {
    const clickedLat = e.latLng.getLat();
    const clickedLng = e.latLng.getLng();
    updateMapCenter(clickedLat, clickedLng);
    console.log(11111111)
  };
  const updateMapCenter = (lat, lng) => {
    setMapCenter({ lat, lng });
  };

  useEffect(() => {
  if (mapInstance) {
    const clickListener = window.kakao.maps.event.addListener(mapInstance, "click", async (e) => {
      const { latLng } = e;
      // handleAreaClick(latLng);
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
      console.log(data);
    });

    const dblClickListener = window.kakao.maps.event.addListener(mapInstance, "dblclick", (e) => {
      handleMapClick(e);
      const { latLng } = e;
      if (mapInstance.getLevel() === 10) {
        mapInstance.setLevel(13);
      } else {
        mapInstance.setLevel(10);
        mapInstance.setCenter(new window.kakao.maps.LatLng(latLng.getLat(), latLng.getLng()));
      }
    });

    // Cleanup event listeners on component unmount
    return () => {
      window.kakao.maps.event.removeListener(mapInstance, "click", clickListener);
      window.kakao.maps.event.removeListener(mapInstance, "dblclick", dblClickListener);
    };
  }
}, [mapInstance]);

  

  const fetchCSVData = async () => {
    try {
      const response = await fetch('city_keyword.csv'); // CSV 파일 경로
      const csvData = await response.text();
      const parsedData = Papa.parse(csvData, { header: true }).data;

      const cityMap = {};
      parsedData.forEach(row => {
        const { id, keyword, city } = row;
        if (!cityMap[city]) {
          cityMap[city] = [];
        }
        cityMap[city].push({ id, keyword });
      });

      const hotTopicsList = Object.keys(cityMap).map(city => ({
        city,
        hotTopics: cityMap[city].slice(0, 3)
      }));

      setHotTopics(hotTopicsList);
      if (hotTopicsList.length > 0) {
        window.kakao.maps.load(initMap);
      }
    } catch (error) {
      console.error("Failed to fetch CSV data", error);
    }
  };

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
        // 맵의 확대/축소 이벤트 막기
        map.setZoomable(false);
        
        // 맵의 드래그 이동 막기
        // map.setDraggable(false);

        window.kakao.maps.event.addListener(map, "zoom_changed", function () {
          const currentLevel = map.getLevel();
          setLevel(Number(currentLevel));
        });

        window.kakao.maps.event.addListener(map, "dragend", function () {
          const latlng = map.getCenter();
          setMapCenter({ lat: latlng.getLat(), lng: latlng.getLng() });
        });
        { !!hotTopics && loadGeoJson(map, level); }

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

          let regionName = properties.CTP_KOR_NM || properties.SIG_KOR_NM;

          // hotTopics 리스트에서 city에 해당하는 regionName과 매칭되는 항목 찾기
          const hotTopicItem = hotTopics.find(item => item.city === regionName);
          if (hotTopicItem) {
            const hotTopicsCount = hotTopicItem.hotTopics.length;
            regionName = `${regionName}: ${hotTopicsCount}개의 키워드`;
          }

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
            content: `<div style="padding:5px;background:white;border:1px solid black;font-size:10px;">${regionName}</div>`,
          });

          customOverlay.setMap(map);
        });
      })
      .catch((error) =>
        console.error("Failed to load the geojson file", error)
      );
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
