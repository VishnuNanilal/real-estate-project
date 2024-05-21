import { React, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getPropertyAPI } from '../api/property.api'

function Bidder() {
    const { property_id } = useParams()
    const [property, setProperty] = useState(null)

    useEffect(() => {
        async function getPropertyAPIAux() {
            try {
                let propertyResponse = await getPropertyAPI(property_id)
                if (propertyResponse.success) {
                    setProperty(propertyResponse.data);
                }
                console.log(propertyResponse.message)
            }
            catch (err) {
                console.log("Error: ", err)
            }
        }
        getPropertyAPIAux()
    })

    return (
        <div>
            <div>property.id</div>
            <div>property.name</div>
            <div>property.description</div>
            <div>property.price</div>
            <div>property.location</div>
        </div>
    )
}

export default Bidder