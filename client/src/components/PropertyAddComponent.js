import { React, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Map from './Map'
import { createProperty, getAllPropertiesAPI } from '../api/property.api';
import { updateSellerAddPropertyAPI } from '../api/seller.api';
import { setProperties } from '../redux/properties.slice';
import { getUserAPI } from '../api/user.api';
import { setUser } from '../redux/user.slice';
import L from 'leaflet'

function PropertyAddComponent() {
    const mapRef = useRef(null);
    const user = useSelector(state => state.user)
    const [points, setPoints] = useState([]);
    const [markers, setMarkers] = useState([]);
    const [polygon, setPolygon] = useState(null);
    const [polyline, setPolyline] = useState(null);

    const dispatch = useDispatch()

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

    function handleChange(e) {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }
    return (
        <div style={{display: "flex", width: "100vw"}}>
            {
                <form onSubmit={(e) => e.preventDefault()}>
                    <label for='name'>Name:
                        <input id="name" type='text' name='name' placeholder='Name' value={formData.name} onChange={handleChange} required="true" />
                    </label>
                    <label for='price'>Price:
                        <input id="price" type='number' name='price' placeholder='Price' value={formData.price} onChange={handleChange} required="true" />
                    </label>
                    <label for='description'>Description:
                        <input id="description" type='text' name='description' placeholder='Description' value={formData.description} onChange={handleChange} />
                    </label>
                    <label for='location'>Location:
                        <input id="location" type='text' name='location' placeholder='Location' value={formData.location} onChange={handleChange} required="true" />
                    </label>
                    <label for='area'>Area:
                        <input id="area" type='number' name='area' placeholder='Area' value={formData.area} onChange={handleChange} required="true" />
                    </label>
                    <label for='minimum_increment'>Minimum Increment:
                        <input id="minimum_increment" type='number' name='minimum_increment' placeholder='Minimum Increment' value={formData.minimum_increment} onChange={handleChange} required="true" />
                    </label>
                    <label for='closing_time'>Closing Time:
                        <input id="closing_time" type='time' name='closing_time' placeholder='Closing time' value={formData.closing_time} onChange={handleChange} required="true" />
                    </label>
                    <label for='closing_date'>Closing Date
                        <input id="closing_date" type='date' name='closing_date' placeholder='Closing date' value={formData.closing_date} onChange={handleChange} required="true" />
                    </label>
                    <button onClick={handleMarkProperty}>MARK PROPERTY</button>
                    <button type='submit' onClick={handleSaveProperty}>SAVE PROPERTY</button>
                </form>
            }
            <Map L={L} 
                mapRef={mapRef} 
                points={points} 
                setPoints={setPoints} 
                markers={setMarkers}
                setMarkers={setMarkers} 
                handlePolyReset={handlePolyReset} />
        </div>
    )
}

export default PropertyAddComponent