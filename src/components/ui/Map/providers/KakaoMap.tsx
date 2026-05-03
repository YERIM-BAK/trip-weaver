"use client";

import { useEffect, useRef, useState } from "react";
import { MapProps } from "../Map.types";

declare global {
  interface Window {
    kakao: any;
  }
}

function KakaoMap({
  center,
  markers = [],
  polyline = [],
  onMarkerClick,
  zoom = 13,
  className,
}: MapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const polylineRef = useRef<any>(null);
  const centerRef = useRef(center);
  const [mapReady, setMapReady] = useState(false);

  // center 최신값 유지
  useEffect(() => {
    centerRef.current = center;
  }, [center]);

  // 지도 초기화
  useEffect(() => {
    const initMap = () => {
      if (!containerRef.current) return;

      window.kakao.maps.load(() => {
        if (!containerRef.current) return;

        const options = {
          center: new window.kakao.maps.LatLng(
            centerRef.current.lat,
            centerRef.current.lng,
          ),
          level: zoom,
        };

        mapRef.current = new window.kakao.maps.Map(
          containerRef.current,
          options,
        );

        setMapReady(true); // ✅ 초기화 완료 신호
      });
    };

    if (window.kakao) {
      initMap();
    } else {
      const script = document.querySelector(
        'script[src*="dapi.kakao.com"]',
      ) as HTMLScriptElement;

      if (script) {
        script.addEventListener("load", initMap);
        return () => script.removeEventListener("load", initMap);
      }
    }
  }, []);

  // 중심 좌표 변경
  useEffect(() => {
    if (!mapRef.current) return;
    const latlng = new window.kakao.maps.LatLng(center.lat, center.lng);
    mapRef.current.setCenter(latlng);
  }, [center.lat, center.lng, mapReady]); // ✅

  // 마커 업데이트
  useEffect(() => {
    if (!mapRef.current) return;

    markersRef.current.forEach((m) => m.setMap(null));
    markersRef.current = [];

    markers.forEach((marker) => {
      const position = new window.kakao.maps.LatLng(
        marker.position.lat,
        marker.position.lng,
      );

      const kakaoMarker = new window.kakao.maps.Marker({ position });
      kakaoMarker.setMap(mapRef.current);

      if (marker.label) {
        const infowindow = new window.kakao.maps.InfoWindow({
          content: `<div style="padding:4px 8px;font-size:12px;white-space:nowrap;">${marker.label}</div>`,
        });
        if (marker.active) infowindow.open(mapRef.current, kakaoMarker);
      }

      if (onMarkerClick) {
        window.kakao.maps.event.addListener(kakaoMarker, "click", () => {
          onMarkerClick(marker.id);
        });
      }

      markersRef.current.push(kakaoMarker);
    });

    if (markers.length > 1) {
      const bounds = new window.kakao.maps.LatLngBounds();
      markers.forEach((m) =>
        bounds.extend(
          new window.kakao.maps.LatLng(m.position.lat, m.position.lng),
        ),
      );
      mapRef.current.setBounds(bounds);
    }
  }, [markers, onMarkerClick, mapReady]); // ✅

  // 폴리라인 업데이트
  useEffect(() => {
    if (!mapRef.current) return;

    if (polylineRef.current) {
      polylineRef.current.setMap(null);
      polylineRef.current = null;
    }

    if (polyline.length < 2) return;

    const path = polyline.map(
      (p) => new window.kakao.maps.LatLng(p.lat, p.lng),
    );

    polylineRef.current = new window.kakao.maps.Polyline({
      path,
      strokeWeight: 4,
      strokeColor: "#5f5fff",
      strokeOpacity: 0.8,
      strokeStyle: "solid",
    });

    polylineRef.current.setMap(mapRef.current);
  }, [polyline, mapReady]);
  return (
    <div
      ref={containerRef}
      className={className}
      style={{ width: "100%", height: "100%" }}
      role="application"
      aria-label="여행 코스 지도"
    />
  );
}

export default KakaoMap;
