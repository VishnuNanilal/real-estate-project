import React, { useEffect, useState } from 'react'
import PropertyByStatus from './PropertyByStatus'
import { getAllPropertiesAPI, updatePropertyAPI } from '../api/property.api'
import dayjs from 'dayjs'
import { useDispatch, useSelector } from 'react-redux'
import { setProperties } from '../redux/properties.slice'

function PropertyByStatusContainer() {
    const properties = useSelector(state => state.properties)
    const dispatch = useDispatch()
    const [pendingProperties, setPendingProperties] = useState([])
    const [bidPendingProperties, setBidPendingProperties] = useState([])
    const [soldProperties, setSoldProperties] = useState([])
    useEffect(() => {
        setPendingProperties(properties.filter(property => property.status === 'pending'))
        setBidPendingProperties(properties.filter(property => property.status === 'bidPending'))
        setSoldProperties(properties.filter(property => property.status === 'sold'))
    }, [properties])

    function fetchDataAndStore(){
        getAllPropertiesAPI().then((response)=>{
            if(response.success){
                dispatch(setProperties(response.data))
            }
            console.log(response.message)
        })
    }

    //DEV MODE
    async function resetStatus() {
        const propertyResponse = await getAllPropertiesAPI()
        console.log(propertyResponse.data)
        const curr_time = dayjs().add(1, "minute")
        const new_closing_time = curr_time.format("HH:mm YYYY-MM-DD")
        for (let property of propertyResponse.data) {
            let propertyResponse = await updatePropertyAPI(property._id, {
                ...property,
                status: "pending",
                closing_time: new_closing_time,
                updatedAt: dayjs().format("HH:mm YYYY-MM-DD")
            })
            alert(propertyResponse.message)
        }
        fetchDataAndStore()
    }

    return (
        <div>
            <PropertyByStatus property={pendingProperties} status="pending" nextStatus="accepted" fetchDataAndStore={fetchDataAndStore} />
            <PropertyByStatus property={bidPendingProperties} status="bidPending" nextStatus="sold" fetchDataAndStore={fetchDataAndStore} />
            <PropertyByStatus property={soldProperties} status="sold" fetchDataAndStore={fetchDataAndStore} />
            <button onClick={resetStatus}>(DEV) Reset All property to pending</button>
        </div>
    )
}

export default PropertyByStatusContainer