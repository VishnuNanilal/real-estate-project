import { React, useState, useEffect } from 'react'
import { getAllPropertiesAPI, toApproveAPI } from '../api/property.api'

function PropertyByStatus({status}) {
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
        console.log(property_id)
        const response = await toApproveAPI(property_id)
        console.log(response.message);
    }

    return (
        <div style={{ height: "5rem", backgroundColor: "red" }}>
            {
                property.map(property => <div style={{ border: "1px solid lightgreen" }} onClick={() => handleClick(property._id)}>{property.name}</div>)
            }
        </div>
    )
}

export default PropertyByStatus;