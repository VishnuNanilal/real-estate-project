import React, { useState, useEffect, useRef } from 'react'
import Map from './Map'
import {updateSellerAddPropertyAPI } from '../api/seller.api';
import { createProperty, getAllPropertiesAPI } from '../api/property.api';
import { setProperties } from '../redux/properties.slice';
import { useDispatch, useSelector } from 'react-redux';
import RecentProperties from './RecentProperties';
import Tabs from './Tabs';
import Tab from './Tab';
import Bidder from './Bidder';
import UserProperties from './UserProperties';
import PropertyByStatusContainer from './PropertyByStatusContainer';
import PropertyAddComponent from './PropertyAddComponent';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {setUser} from '../redux/user.slice'
import { getUserAPI } from '../api/user.api';

function Home() {
    const mapRef = useRef(null);
    const user = useSelector(state => state.user)
    const [polygon, setPolygon] = useState(null);
    const [polyline, setPolyline] = useState(null);
    const [markers, setMarkers] = useState([]);
    const [points, setPoints] = useState([]);
    const dispatch = useDispatch()

    useEffect(() => {
        getAllPropertiesAPI().then((response) => {
            if (response.success) {
                dispatch(setProperties(response.data))
            }
            console.log(response.message)
        })
    }, [dispatch])

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
    }

    const handleSaveProperty = async (e) => {
        e.preventDefault()
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

                const response = await updateSellerAddPropertyAPI(user.seller_id._id, propertyResponse.data._id);
                if (response.success) {
                    alert('Property saved successfully to seller!');
                    fetchDataAndStore()
                    handlePolyReset()
                }
                console.log(response.message)

            } catch (error) {
                console.error('Error saving property:', error);
                alert('Error saving property.');
            }
        }
    }

    const handlePolyReset = () => {
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

    function fetchDataAndStore() {
        getAllPropertiesAPI().then((response) => {
            if (response.success) {
                dispatch(setProperties(response.data))
            }
            console.log(response.message)
        }).catch(console.log("Properties data fetch failed"))

        getUserAPI().then(response => {
            if (response.success) {
                dispatch(setUser(response.data))
            }
            console.log(response.message)
        }).catch(console.log("User data fetch failed"))
    }

    return (
        <div className="home">
            <Tabs>
                <Tab label="Own properties"><UserProperties /></Tab>
                <Tab label="Recent Properties"><RecentProperties /></Tab>
                <Tab label="Bidder"><Bidder /></Tab>
                <Tab label="All properties"><PropertyByStatusContainer /></Tab>
                <Tab label="New property"><PropertyAddComponent formData={formData} setFormData={setFormData} handleMarkProperty={handleMarkProperty} handleSaveProperty={handleSaveProperty}/></Tab>
            </Tabs>
            <Map L={L} formData={formData} 
                        setFormData={setFormData} 
                        mapRef={mapRef} 
                        points={points} 
                        setPoints={setPoints} 
                        markers={markers}
                        setMarkers={setMarkers}
                        handleMarkProperty={handleMarkProperty}
                        handleSaveProperty={handleSaveProperty}
                        handlePolyReset={handlePolyReset}
                        />
        </div>
    )
}

export default Home