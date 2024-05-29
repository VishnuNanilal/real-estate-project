import React, { useEffect, useState } from 'react'
import PropertyByStatus from './PropertyByStatus'
import { changeStatusAPI, getAllPropertiesAPI } from '../api/property.api'

function PropertyByStatusContainer() {
    const [pendingProperties, setPendingProperties] = useState([])
    const [bidPendingProperties, setBidPendingProperties] = useState([])
    const [soldProperties, setSoldProperties] = useState([])
    
    useEffect(()=>{
        fetchData()    
    }, [])

    async function fetchData(){
        const propertyResponse = await getAllPropertiesAPI()
        if(propertyResponse.success){
            setPendingProperties(propertyResponse.data.filter(property=>property.status==='pending'))
            setBidPendingProperties(propertyResponse.data.filter(property=>property.status==='bidPending'))
            setSoldProperties(propertyResponse.data.filter(property=>property.status==='sold'))
        }
        console.log(propertyResponse.message)
    }

    //DEV MODE
    async function resetStatus(){
        const propertyResponse = await getAllPropertiesAPI()
        for(let property of propertyResponse.data){
            await changeStatusAPI(property._id, "pending")
        }
    }

    return (
        <div>
            <PropertyByStatus property={pendingProperties} nextStatus="bidPending" fetchData={fetchData}/>
            <PropertyByStatus property={bidPendingProperties} nextStatus="sold" fetchData={fetchData}/>
            <PropertyByStatus property={soldProperties} fetchData={fetchData}/>
            <button onClick={resetStatus}>(DEV) Reset All property to pending</button>
        </div>
    )
}

export default PropertyByStatusContainer