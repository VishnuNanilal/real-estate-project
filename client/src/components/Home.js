import React, { useEffect } from 'react';
import { getAllPropertiesAPI } from '../api/property.api';
import { setProperties } from '../redux/properties.slice';
import { useDispatch } from 'react-redux';
import RecentProperties from './RecentProperties';
import Tabs from './Tabs';
import Tab from './Tab';
import Bidding from './Bidding';
import UserProperties from './UserProperties';
import 'leaflet/dist/leaflet.css';
import MapReadOnly from './MapReadOnly';

function Home() {
    const dispatch = useDispatch()

    useEffect(() => {
        getAllPropertiesAPI().then((response) => {
            if (response.success) {
                dispatch(setProperties(response.data))
            }
            console.log(response.message)
        })
    }, [dispatch])

    return (
        <div className='main-center'>
            <div className="home">
                <div style={{width: "50%"}}>
                    <Tabs>
                        <Tab label="Own properties"><UserProperties /></Tab>
                        <Tab label="Recent Properties"><RecentProperties /></Tab>
                    </Tabs>
                </div>
                <MapReadOnly />
                {/* <Map L={L} formData={formData} 
                        setFormData={setFormData} 
                        mapRef={mapRef} 
                        points={points} 
                        setPoints={setPoints} 
                        markers={markers}
                        setMarkers={setMarkers}
                        handleMarkProperty={handleMarkProperty}
                        handleSaveProperty={handleSaveProperty}
                        handlePolyReset={handlePolyReset}
                        /> */}
            </div>
        </div>
    )
}

export default Home