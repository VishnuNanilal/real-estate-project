import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import {updateSellerAddPropertyAPI, updateSellerRemovePropertyAPI} from '../api/seller.api'
import { getAllPropertiesAPI } from '../api/property.api';
import { useSelector } from 'react-redux';

const Map = () => {
  const mapRef = useRef(null);
  const [points, setPoints] = useState([]);
  const [polygon, setPolygon] = useState(null);
  const [polyline, setPolyline] = useState(null);
  const user = useSelector(state=>state.user)

  useEffect(()=>{
    async function getAllPropertiesAPIAux(){
      const response = await getAllPropertiesAPI()
      console.log("get all props resp: ", response)
    }
    getAllPropertiesAPIAux();
  }, [])
  
  useEffect(() => {
    // Initialize the map
    const map = L.map('map').setView([51.505, -0.09], 13);
    mapRef.current = map;

    // Add OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(mapRef.current);

    map.on('click', handleMapClick)

    function handleMapClick(e) {
      const { lat, lng } = e.latlng;
      const newPoint = [lat, lng];
      // Update points state
      setPoints((prevPoints) => [...prevPoints, newPoint]);
    }

    // Cleanup function to remove the map on component unmount
    return () => {
      mapRef.current.remove();
    };
  }, []);

  useEffect(() => {
    if (points.length > 1) {
      const polyline = L.polyline(points, { color: 'blue' }).addTo(mapRef.current);

      // Cleanup function to remove the polyline on component unmount
      return () => {
        mapRef.current.removeLayer(polyline);
      };
    }
  }, [points]);

  function handlePolyReset() {
    setPoints([]);
  }

  const handleMarkProperty = () => {
    if (points.length < 2) {
      alert("Mark atleast 3 points.")
    }
    else {
      // Close the polygon by connecting the last point to the first
      const polygonPoints = [...points, points[0]];
      // Remove previous polygon if it exists
      if (polygon) {
        mapRef.current.removeLayer(polygon);
      }
      // Draw new polygon
      const newPolygon = L.polygon(polygonPoints, { color: 'blue' }).addTo(mapRef.current);
      setPolygon(newPolygon);
      // Clear the polyline
      if (polyline) {
        mapRef.current.removeLayer(polyline);
        setPolyline(null);
      }
    }
  };

  const handleSaveProperty = async () => {
    if (polygon) {
      const polygonPoints = polygon.getLatLngs()[0].map(latlng => [latlng.lat, latlng.lng]);
      try {
        const response = await updateSellerAddPropertyAPI({ points: polygonPoints });
        if (response.data.success) {
          alert('Property saved successfully!');
        } else {
          alert('Failed to save property.');
        }
      } catch (error) {
        console.error('Error saving property:', error);
        alert('Error saving property.');
      }
    }
  };

  return (
    <>
      <div id="map" style={{ width: '100%', height: '400px' }}>
      </div>
      <button onClick={handlePolyReset}>RESET</button>
      <button onClick={handleMarkProperty}>MARK PROPERTY</button>
      {
        user.seller_id &&
        <button onClick={handleSaveProperty}>SAVE PROPERTY</button>
      }
    </>
  )
};

export default Map;
