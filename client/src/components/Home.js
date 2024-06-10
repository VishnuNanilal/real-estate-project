import React, { useEffect } from 'react';
import {getAllPropertiesAPI } from '../api/property.api';
import { setProperties } from '../redux/properties.slice';
import { useDispatch } from 'react-redux';
import RecentProperties from './RecentProperties';
import Tabs from './Tabs';
import Tab from './Tab';
import Bidder from './Bidder';
import UserProperties from './UserProperties';
import PropertyByStatusContainer from './PropertyByStatusContainer';
import 'leaflet/dist/leaflet.css';
import DashBoard from './DashBoard';
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
        <div className="home">
            <Tabs>
                <Tab label="Own properties"><UserProperties /></Tab>
                <Tab label="Recent Properties"><RecentProperties /></Tab>
                <Tab label="Bidder"><Bidder /></Tab>
                <Tab label="All properties"><PropertyByStatusContainer /></Tab>
                <Tab label="menu-item Dashboard"><DashBoard /></Tab>
            </Tabs>
            <MapReadOnly/>
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
    )
}

export default Home