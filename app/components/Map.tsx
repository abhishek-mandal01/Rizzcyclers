"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { LatLngBoundsExpression } from "leaflet";

// Define the geographical boundaries for Odisha
const odishaBounds: LatLngBoundsExpression = [
  [17.5, 81.0], // Southwest corner of Odisha's bounding box
  [23.0, 88.0], // Northeast corner of Odisha's bounding box
];

export default function Map({ reports }: { reports: any[] }) {
  return (
    <MapContainer
      center={[20.9517, 85.0985]} // Center of Odisha
      zoom={7} // Zoom in closer to the state
      scrollWheelZoom={true}
      style={{ height: "100%", width: "100%" }}
      maxBounds={odishaBounds} // This restricts panning outside Odisha
      minZoom={7} // Prevents zooming out too far from the state
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        detectRetina={true}
      />
      {reports.map(
        (r) =>
          r.lat &&
          r.lng && (
            <Marker key={r.id} position={[r.lat, r.lng]}>
              <Popup>{r.title || "Waste Report"}</Popup>
            </Marker>
          )
      )}
    </MapContainer>
  );
}