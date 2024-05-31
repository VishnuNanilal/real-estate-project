import React, { useEffect, useRef, useState } from 'react';
import L, { marker } from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { updateSellerAddPropertyAPI, updateSellerRemovePropertyAPI } from '../api/seller.api'
import { createProperty } from '../api/property.api';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import markerImg from '../assets/marker.png'

const Map = () => {
  const properties = useSelector(state => state.properties)

  const mapRef = useRef(null);
  const [points, setPoints] = useState([]);
  const [polygon, setPolygon] = useState(null);
  const [polyline, setPolyline] = useState(null);
  const [markers, setMarkers] = useState([]);

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
    updatedAt: "",
    minimum_increment: 1000,
    closing_time: 0,
    closing_date: Date.now()
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
    const map = L.map('map').setView([8.5241, 76.9366], 13);
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

  //fetch all properties
  useEffect(() => {
    getAllPropertiesAPIAux();
  }, [properties])

  async function getAllPropertiesAPIAux() {
    
    //remove currently present layers.
    mapRef.current.eachLayer((layer) => {
      if (layer instanceof L.TileLayer) 
        return; 
      mapRef.current.removeLayer(layer);
    });

    for (let property of properties) {
      let status = property.status 
      let color = ""
      if (status === 'pending') {
        //either admin or the owners of pending property can see them on map.
        if (displayable(property)) {
          color = "yellow"
        }
        else {
          continue; //we don't render current pending property if it doens't belong to user
        }
      }
      else if (status === 'accepted')
        color = 'green'
      else if(status==='bidPending'){
        if (displayable(property)) {
          color = "orange"
        }
        else {
          continue; //we don't render current pending property if it doens't belong to user
        }
      }
      else if (status === 'sold')
        color = 'grey'
      else //exhaust
        color = 'black'

      const polygon = L.polygon(property.boundary_points, { color, weight: 7, opacity: 0.5, lineCap: 'square' }).addTo(mapRef.current);
      let popupTimeout;
      polygon.on('mouseover', function (e) {
        popupTimeout = setTimeout(() => {
          this.bindPopup(`<div>
                              <h4>${property.name}</h4>
                              <p>Area: ${property.area}</p>
                              <p>Price: ${property.price}</p>
                              <p>Location: ${property.location}</p>
                            </div>`).openPopup();
        }, 300);
      })
        .on('mouseout', function () {
          clearTimeout(popupTimeout)
          this.closePopup();
        })
        .on('click', function () {
          navigate(`/bidder/${property._id}`);
        });
    }
  }

  //util
  function displayable(property){
    return user.role === 'admin' || (user.seller_id && user.seller_id.properties.includes(property._id))
  }

  //to draw markers
  useEffect(() => {
    //remove all set markers if markers list is empty.
    if (points.length > 0) {
      const newMarker = L.marker([points[points.length - 1][0], points[points.length - 1][1]],
        { icon: customIcon })
        .addTo(mapRef.current);

      setMarkers(prev => [...prev, newMarker])
    }
  }, [points]);

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
    if (markers) {
      markers.forEach(marker => {
        mapRef.current.removeLayer(marker);
      })
    }
    if (polygon)
      mapRef.current.removeLayer(polygon);
    setPoints([]);
    setMarkers([])
    setPolygon(null)
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

    //restructure data to be send to BE.
    let newFormData = { ...formData }
    newFormData.closing_time = formData.closing_time + " " + formData.closing_date;
    // console.log(newFormData.closing_time)
    delete newFormData.closing_date;

    if (polygon) {
      const polygonPoints = polygon.getLatLngs()[0].map(latlng => [latlng.lat, latlng.lng]);

      //add extra data to the formData before sending
      newFormData.boundary_points = polygonPoints;
      newFormData.seller_id = user.seller_id
      newFormData.createdAt = Date.now()

      console.log("Map data before sending: ", newFormData)
      try {
        const propertyResponse = await createProperty(newFormData);
        if (!propertyResponse.success) {
          console.log(propertyResponse.message)
          return;
        }
        console.log("New property response: ", propertyResponse.data);

        const response = await updateSellerAddPropertyAPI(user.seller_id, propertyResponse._id);
        if (response.success) {
          alert('Property saved successfully!');
          getAllPropertiesAPIAux()
          handlePolyReset()
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
            <input type='number' name='minimum_increment' placeholder='Minimum Increment' value={formData.minimum_increment} onChange={handleChange} />
            <input type='time' name='closing_time' placeholder='Closing time' value={formData.closing_time} onChange={handleChange} />
            <input type='date' name='closing_date' placeholder='Closing date' value={formData.closing_date} onChange={handleChange} />
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