import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getPropertyAPI } from '../api/property.api'
import PropertyComp from './PropertyComp'

function UserProperties() {
    const user = useSelector(state=>state.user)
    const [userProperties, setUserProperties] = useState([])
    const [userPropertiesData, setUserPropertiesData] = useState([])
    useEffect(()=>{
        setUserProperties(user.seller_id ? user.seller_id.properties: []) 
    }, [user])

    useEffect(()=>{
        async function fetchData(){
            let daraArr = []
            for(let prop of userProperties){
                // console.log("...", prop)
                daraArr.push(getPropertyAPI(prop).then(res=>res.data))
            }
            daraArr = await Promise.all(daraArr)
            setUserPropertiesData(daraArr)
        }

        fetchData()
    }, [userProperties])

    console.log(">>>>>",userPropertiesData)
    return (
        <div className='property-container'>
            <h2>Your properties</h2>
            {
                userPropertiesData.map(property =><PropertyComp property={property}/>)
            }
        </div>
    )
}

export default UserProperties