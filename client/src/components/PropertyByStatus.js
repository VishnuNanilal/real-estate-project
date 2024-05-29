import { React, useEffect } from 'react'
import { changeStatusAPI } from '../api/property.api'

function PropertyByStatus({data, status, nextStatus, fetchData}) {

    useEffect(()=>{
        console.log(`Properties of status ${status}: `, data); 
    }, [status, data])

    async function handleClick(property_id) {
        if(!nextStatus) return;
        
        console.log(property_id)
        const response = await changeStatusAPI(property_id, nextStatus)
        fetchData()
        console.log(response.message);
    }

    return (
        <div style={{border: "1px solid black", backgroundColor: "red" }}>
            <h4>{status}</h4>
            {
                data.map(data => <div style={{ border: "1px solid lightgreen", cursor: "pointer", margin: "1rem" }} onClick={() => handleClick(data._id)}>{data.name}</div>)
            }
        </div>
    )
}

export default PropertyByStatus;