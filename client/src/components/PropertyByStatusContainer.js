import React, { useEffect, useState } from 'react'
import PropertyByStatus from './PropertyByStatus'
import { changeStatusAPI, getAllPropertiesAPI, updatePropertyAPI } from '../api/property.api'
import dayjs from 'dayjs'

function PropertyByStatusContainer() {
    const [pendingProperties, setPendingProperties] = useState([])
    const [bidPendingProperties, setBidPendingProperties] = useState([])
    const [soldProperties, setSoldProperties] = useState([])

    useEffect(() => {
        fetchData()
    }, [])

    async function fetchData() {
        const propertyResponse = await getAllPropertiesAPI()
        if (propertyResponse.success) {
            setPendingProperties(propertyResponse.data.filter(property => property.status === 'pending'))
            setBidPendingProperties(propertyResponse.data.filter(property => property.status === 'bidPending'))
            setSoldProperties(propertyResponse.data.filter(property => property.status === 'sold'))
        }
        console.log(propertyResponse.message)
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
            console.log(propertyResponse.data)
        }
        fetchData()
    }

    return (
        <div>
            <PropertyByStatus property={pendingProperties} nextStatus="accepted" fetchData={fetchData} />
            <PropertyByStatus property={bidPendingProperties} nextStatus="sold" fetchData={fetchData} />
            <PropertyByStatus property={soldProperties} fetchData={fetchData} />
            <button onClick={resetStatus}>(DEV) Reset All property to pending</button>
        </div>
    )
}

export default PropertyByStatusContainer