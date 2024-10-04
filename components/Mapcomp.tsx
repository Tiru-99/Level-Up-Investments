"use client";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L, { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useState } from 'react';



// Create a custom icon for Leaflet
const customIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41], // Size of the icon
  iconAnchor: [12, 41], // Position of the anchor
  popupAnchor: [1, -34], // Popup anchor
  shadowSize: [41, 41], // Size of the shadow
});

interface Hotspot {
  id: number;
  position: LatLngExpression;
  name: string;
  image: string;
  description: string;
}



// HotspotDetails Component: Displays the image and description of the active hotspot
const HotspotDetails: React.FC<{ activeMarker: Hotspot | null }> = ({ activeMarker }) => {
  if (!activeMarker) {
    return <p className="text-gray-500 italic text-lg ">Please click a hotspot on the map to see the details here.</p>;
  }

  return (

    <div className="bg-white mx-5 pt-0 rounded-lg shadow-lg flex flex-col md:flex-row items-start gap-4 ">
      {/* Image on the left */}
      <img
        src={activeMarker.image}
        alt={activeMarker.name}
        className=" md:w-1/2 w-full md:h-96 h-48 object-cover rounded-lg shadow"
      />
      
      {/* Text (Title & Description) on the right */}
      <div className="flex-1">
        <h2 className="text-2xl font-semibold mb-2 text-gray-800 p-3">{activeMarker.name}</h2>
        <p className="text-gray-600 text-base leading-relaxed p-2">{activeMarker.description}</p>
      </div>
    </div>
    
  );
  
};

const Mapcomp: React.FC = () => {
  const [activeMarker, setActiveMarker] = useState<Hotspot | null>(null);

  // Example locations for hotspots
  const hotspots: Hotspot[] = [
    {
      id: 1,
      position: [25.112222, 55.138946],
      name: 'Palm Jumeirah',
      image: '/images/jumeirah.jpg',
      description:
        'The tree-shaped Palm Jumeirah island is known for glitzy hotels, posh apartment towers, and upmarket global restaurants. Food trucks offering snacks like shawarma dot the Palm Jumeirah Boardwalk, popular for its views of the Dubai coastline and the sail-shaped Burj Al Arab hotel.',
    },
    {
      id: 2,
      position: [25.185321, 55.266144],
      name: 'Business Bay',
      image: '/images/businessbay2.jpg',
      description:
        'Straddling Dubai Creek, Business Bay is a contemporary financial district packed with corporate high-rises, stylish apartment buildings, and swanky hotels. Dubai Water Canal has jogging and cycling tracks plus a colorful mechanical waterfall.',
    },
    {
      id: 3,
      position: [25.077255, 55.137183],
      name: 'Dubai Marina',
      image: '/images/businessbay.jpg',
      description: 'Dubai Marina is a modern area with waterfront dining, shopping, and vibrant nightlife.',
    },
  ];

  const handleMarkerClick = (hotspot: Hotspot) => {
    console.log(`Hotspot clicked: ${hotspot.name}`);
    setActiveMarker(hotspot);
  };

  return (
    <div className="flex flex-col md:flex-row md:ml-64">
      {/* Map Section */}
      <div className="md:w-1/3 w-full rounded-lg shadow-lg overflow-hidden">
        <MapContainer
          center={[25.112222, 55.138946]} // Center of the map
          zoom={12}
          className="h-96 w-full rounded-lg"
        >
          {/* Add tile layer */}
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {/* Map hotspots (markers) */}
          {hotspots.map((hotspot) => (
            <Marker
              key={hotspot.id}
              position={hotspot.position}
              icon={customIcon} // Use the custom icon
              eventHandlers={{
                click: () => {
                  handleMarkerClick(hotspot); // Handle the marker click
                },
              }}
            >
              {/* Popup on click */}
              {activeMarker && activeMarker.id === hotspot.id && (
                <Popup>
                  <div>
                    <h3>{hotspot.name}</h3>
                    <p>Click to view details!</p>
                  </div>
                </Popup>
              )}
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Hotspot details section */}
 
      <div className="md:w-1/2 w-full flex items-center justify-center ">
       
            <HotspotDetails activeMarker={activeMarker} />
        
      </div>
   
    </div>
  );
};

export default Mapcomp;
