import { React, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getPropertyAPI } from '../api/property.api'
import './css/Bidder.css'

function Bidder() {
    const { property_id } = useParams()
    const [property, setProperty] = useState({
        id: "",
        name: "",
        description: "",
        location: 0,
        price: 0,
        area: 0,
    })

    useEffect(() => {
        async function getPropertyAPIAux() {
            try {
                let propertyResponse = await getPropertyAPI(property_id)
                console.log("response", propertyResponse)
                if (propertyResponse.success) {
                    console.log(propertyResponse.data)
                    setProperty(propertyResponse.data);
                }
                console.log(propertyResponse.message)
            }
            catch (err) {
                console.log("Error: ", err)
            }
        }
        getPropertyAPIAux()
    }, [])

    let minimum_bid = property.price+property.minimum_increment;
    return (
        <div className="property-container">
            <div>Current bid amount: <strong>property.name</strong></div>
            <div className="property-card">
                <h2>{property.name}</h2>
                <p><strong>Description:</strong> {property.description}</p>
                <p><strong>Location:</strong> {property.location}</p>
                <p><strong>Price:</strong> ${property.price}</p>
                <p><strong>Area:</strong> {property.area} sq ft</p>
            </div>
            <div>
                <input type="number" default={minimum_bid} min={minimum_bid} />
                <button>Save</button>
            </div>
            <div style={{height: "2px", background: "lightgrey", width: "100vw"}}></div>
        </div>
    )
}

export default Bidder