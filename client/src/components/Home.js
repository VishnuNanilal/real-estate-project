import React, { useEffect } from 'react'
import Map from './Map'
import SellerRegister from './SellerRegister';
import PropertyByStatusContainer from './PropertyByStatusContainer';
import { getAllPropertiesAPI } from '../api/property.api';
import { setProperties } from '../redux/properties.slice';
import { useDispatch } from 'react-redux';
import RecentProperties from './RecentProperties';

function Home() {
    const dispatch = useDispatch()
    useEffect(() => {
        getAllPropertiesAPI().then((response)=>{
            if (response.success) {
                dispatch(setProperties(response.data))
            }
            console.log(response.message)
        })
    }, [])

return (
    <div className="home">
        <Map />
        <SellerRegister />
        <PropertyByStatusContainer />
        <RecentProperties/>
    </div>
)
}

export default Home