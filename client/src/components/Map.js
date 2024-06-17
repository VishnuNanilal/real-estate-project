import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import markerImg from '../assets/marker.png'

const Map = ({ L, mapRef, setPoints, points, setMarkers, handlePolyReset}) => {
  // console.log(props)
  const properties = useSelector(state => state.properties)
  const [location, setLocation] = useState({ lat: null, long: null })
  const user = useSelector(state => state.user)
  const navigate = useNavigate();

  //fetch geolocation
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          lat: position.coords.latitude,
          long: position.coords.longitude
        })
      }, (error) => console.log("Geolocation error ", error))
    }
  }, [])

  //Initialize map
  useEffect(() => {
    const loc = location.lat ? [location.lat, location.long] : [40.712772, -74.006058]
    const map = L.map('map').setView(loc, 13);
    mapRef.current = map;

    // Add OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(mapRef.current);

    map.on('click', handleMapClick)

    function handleMapClick(e) {
      const { lat, lng } = e.latlng;
      // Update points state
      setPoints((prevPoints) => [...prevPoints, [lat, lng]]);
    }

    // Cleanup function to remove the map on component unmount
    return () => {
      mapRef.current.remove();
    };
  }, [L, location.lat, location.long, setPoints, mapRef]);

  //fetch all properties
  useEffect(() => {
    getAllPropertiesAPIAux();

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
        else if (status === 'bidPending') {
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
    function displayable(property) {
      return user.role === 'admin' || (user.seller_id && user.seller_id.properties.includes(property._id))
    }
  }, [properties, user, L, navigate, mapRef])


  //to draw markers
  useEffect(() => {
    //remove all set markers if markers list is empty.
    if (points.length > 0) {
      const newMarker = L.marker([points[points.length - 1][0], points[points.length - 1][1]],
        { icon: L.icon({
          iconUrl: markerImg,
          iconSize: [32, 32], // Size of the icon
          iconAnchor: [16, 32], // Anchor point of the icon
          popupAnchor: [0, -32] // Popup anchor point
        }) 
      })
        .addTo(mapRef.current);
        
      setMarkers(prev => [...prev, newMarker])
    }
  }, [points, L, setMarkers, mapRef]);

  //to draw poly line
  useEffect(() => {
    if (points.length > 1) {
      const polyline = L.polyline(points, { color: 'blue' }).addTo(mapRef.current);
      // Cleanup function to remove the polyline on component unmount
      return () => {
        mapRef.current.removeLayer(polyline);
      };
    }
  }, [points, L, mapRef]);

  return (
    <div className='map-cont'>
      <div id="map" style={{ width: '100%', height: '400px' }} />
      <button className='bad button-custom' onClick={handlePolyReset}>Reset markers</button>
    </div>
  )
};

export default Map;