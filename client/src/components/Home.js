import React, { useEffect } from 'react'
import Map from './Map'
import SellerRegister from './SellerRegister';
import PropertyByStatusContainer from './PropertyByStatusContainer';
import { getAllPropertiesAPI } from '../api/property.api';
import { setProperties } from '../redux/properties.slice';
import { useDispatch } from 'react-redux';
import RecentProperties from './RecentProperties';
import Tabs from './Tabs';
import Tab from './Tab';
import Bidder from './Bidder';

function Home() {
    const dispatch = useDispatch()
    useEffect(() => {
        getAllPropertiesAPI().then((response) => {
            if (response.success) {
                dispatch(setProperties(response.data))
            }
            console.log(response.message)
        })
    }, [])

    return (
        <div className="home">
            <Tabs>
                <Tab label="Recent Properties"><RecentProperties /></Tab>
                <Tab label="Map"><Map /></Tab>
                <Tab label="Bidder"><Bidder /></Tab>
            </Tabs>
            {/* <SellerRegister /> */}
            <Map />
        </div>
    )
}

export default Home