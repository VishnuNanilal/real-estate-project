import { React, useEffect } from 'react'
import { changeStatusAPI, deletePropertyAPI } from '../api/property.api'

function PropertyByStatus({ property, status, nextStatus, fetchData }) {

    useEffect(() => {
        console.log(`Properties of status ${status}: `, property);
    }, [status, property])

    async function handleClick(property_id) {
        if (!nextStatus) return;

        console.log(property_id)
        const response = await changeStatusAPI(property_id, nextStatus)
        fetchData()
        console.log(response.message);
    }

    async function removeProperty(property_id) {
        const response = await deletePropertyAPI(property_id)
        fetchData()
        console.log(response.message)
    }

    const divStyle = { border: "1px solid lightgreen", cursor: "pointer", margin: "1rem" }
    return (
        <div style={{ border: "1px solid black", backgroundColor: "red" }}>
            <h4>{status}</h4>
            {
                property.map(property => {
                    return (
                        <div style={divStyle}>
                            <div onClick={() => handleClick(property._id)}>{property.name}</div>
                            <button style={{cursor: "pointer"}} onClick={()=>removeProperty(property._id)}>Reject</button>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default PropertyByStatus;