import React from 'react'
import './style/propertycomponent.css'
import { useNavigate } from 'react-router-dom'
function PropertyComp({property}) {
    const navigate = useNavigate()
    return (
        <div className='property-component' onClick={()=>navigate(`./bidder/${property._id}`)}>
            <h3 className='name'>{property.name}</h3>
            <div className='description'>{property.description}</div>
            <div className='location'>{property.location}</div>

            <div className='hori'>
                <div className='price'>{"Rs." + property.price + " /cent"}</div>
                <div className='area'>{property.area + " sq.m"}</div>
            </div>
        </div>
    )
}

export default PropertyComp

/*    let property = {
        name: "Name",
        price: 10000,
        description: "This is some property",
        location: "Trivandrum",
        area: 12000,
        seller_id: {
            _id: "665e132a9f8ceff26ece3f18",
            user_id: "665e0f149f8ceff26ece3eff",
            name: "X Coops.",
            properties: [
                "665f40331e310e5ec44f650c",
                "665f40831e310e5ec44f6515",
                "665f41aa1e310e5ec44f6596"
            ]
        },
        minimum_increment: 1000,
        closing_time: "15:07 2024-06-24",
        status: "pending",
    }
*/