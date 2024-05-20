import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { updateSellerAddPropertyAPI, updateSellerRemovePropertyAPI } from '../api/seller.api'
import { getAllPropertiesAPI } from '../api/property.api';
import { useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom';

import markerImg from '../assets/marker.png'

const Map = () => {
  const mapRef = useRef(null);
  const [points, setPoints] = useState([]);
  const [polygon, setPolygon] = useState(null);
  const [polyline, setPolyline] = useState(null);
  const user = useSelector(state => state.user)
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    description: "",
    location: "",
    boundary_points: [],
    area: "",
    seller_id: "",
    createdAt: "",
    updatedAt: ""
  })

  const customIcon = L.icon({
    iconUrl: markerImg,
    iconSize: [32, 32], // Size of the icon
    iconAnchor: [16, 32], // Anchor point of the icon
    popupAnchor: [0, -32] // Popup anchor point
  });

  //Initialize map
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
      const marker = L.marker(newPoint).addTo(mapRef.current);
      // Update points state
      setPoints((prevPoints) => [...prevPoints, newPoint]);
    }

    // Cleanup function to remove the map on component unmount
    return () => {
      mapRef.current.remove();
    };
  }, []);

  //fetch all properties
  useEffect(() => {
    async function getAllPropertiesAPIAux() {
      const response = await getAllPropertiesAPI()
      if(response.success){
        for(let property of response.data){
          console.log(property.boundary_points)
          const polygon = L.polygon(property.boundary_points, { color: 'green', weight: 7, opacity: 0.5, lineCap: 'square' }).addTo(mapRef.current);
          polygon.on('mouseover', function (e) {
            this.bindPopup(`<div>
                              <h4>${property.name}</h4>
                              <p>Area: ${property.area}</p>
                              <p>Price: ${property.price}</p>
                              <p>Location: ${property.location}</p>
                            </div>`).openPopup();
          })
          .on('mouseout', function () {
            this.closePopup();
          })
          .on('click', function () {
            navigate(`/bidder/${property._id}`);
          });
        }
      }
    }
    getAllPropertiesAPIAux();
  }, [])

  //to draw poly line
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
      
      //add extra data to the formData before sending
      formData.boundary_points=polygonPoints;
      formData.seller_id=user.seller_id
      formData.createdAt=Date.now()

      console.log("Map data before sending: ", formData)
      try {
        const response = await updateSellerAddPropertyAPI(user.seller_id, formData);
        if (response.success) {
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

  function handleChange(e) {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  async function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <>
      <div id="map" style={{ width: '100%', height: '400px' }} />
        {
          user.seller_id &&
          <div>
            <form onSubmit={handleSubmit}>
              <input type='text' name='name' placeholder='Name' value={formData.name} onChange={handleChange} />
              <input type='number' name='price' placeholder='Price' value={formData.price} onChange={handleChange} />
              <input type='text' name='description' placeholder='Description' value={formData.description} onChange={handleChange} />
              <input type='text' name='location' placeholder='Location' value={formData.location} onChange={handleChange} />
              <input type='number' name='area' placeholder='Area' value={formData.area} onChange={handleChange} />
              <button onClick={handleSaveProperty}>SAVE PROPERTY</button>
            </form>
            <button onClick={handleMarkProperty}>MARK PROPERTY</button>
          </div>
        }
        <button onClick={handlePolyReset}>RESET</button>
    </>
  )
};

export default Map;