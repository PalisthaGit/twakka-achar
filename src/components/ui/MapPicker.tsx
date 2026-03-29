"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Red pin icon using SVG DivIcon
const redPinIcon = new L.DivIcon({
  className: "",
  html: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="40" viewBox="0 0 28 40">
    <path d="M14 0C6.268 0 0 6.268 0 14c0 9.333 14 26 14 26S28 23.333 28 14C28 6.268 21.732 0 14 0z" fill="#c0392b"/>
    <circle cx="14" cy="14" r="6" fill="white"/>
  </svg>`,
  iconSize: [28, 40],
  iconAnchor: [14, 40],
  popupAnchor: [0, -40],
});

function DragMarker({
  position,
  onMove,
}: {
  position: [number, number];
  onMove: (lat: number, lng: number) => void;
}) {
  useMapEvents({
    click(e) {
      onMove(e.latlng.lat, e.latlng.lng);
    },
  });
  return (
    <Marker
      position={position}
      icon={redPinIcon}
      draggable
      eventHandlers={{
        dragend(e) {
          const latlng = (e.target as L.Marker).getLatLng();
          onMove(latlng.lat, latlng.lng);
        },
      }}
    />
  );
}

function RecenterMap({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 15, { animate: true });
  }, [center, map]);
  return null;
}

interface MapPickerProps {
  center: [number, number];
  position: [number, number];
  onPositionChange: (lat: number, lng: number) => void;
}

export default function MapPicker({ center, position, onPositionChange }: MapPickerProps) {
  return (
    <MapContainer
      center={center}
      zoom={15}
      style={{ height: "300px", width: "100%", borderRadius: "12px" }}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <RecenterMap center={center} />
      <DragMarker position={position} onMove={onPositionChange} />
    </MapContainer>
  );
}
