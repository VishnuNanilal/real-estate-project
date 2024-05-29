import { React, useState, useEffect } from 'react'
import { getAllPropertiesAPI, changeStatusAPI } from '../api/property.api'

function PropertyByStatus({status, nextStatus}) {
    const [property, setProperty] = useState([])
    useEffect(() => {
        async function fetchData() {
            const properties = await getAllPropertiesAPI()
            // return
            if (properties.success) {
                setProperty(properties.data.filter(property => property.status === status))
                // setProperty(properties.data)
            }
            console.log(properties.message)
        }

        fetchData()
    }, [])

    useEffect(()=>{
        console.log(`Properties of status ${status}: `, property); 
    }, [property, status])

    async function handleClick(property_id) {
        if(!nextStatus) return;
        
        console.log(property_id)
        const response = await changeStatusAPI(property_id, nextStatus)
        console.log(response.message);
    }

    return (
        <div style={{border: "1px solid black", backgroundColor: "red" }}>
            <h4>{status}</h4>
            {
                property.map(property => <div style={{ border: "1px solid lightgreen", cursor: "pointer", margin: "1rem" }} onClick={() => handleClick(property._id)}>{property.name}</div>)
            }
        </div>
    )
}

export default PropertyByStatus;