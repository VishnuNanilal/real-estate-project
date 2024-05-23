import { React, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {useSelector} from 'react-redux';
import { getPropertyAPI, updatePropertyAPI, updatePropertySetBuyerAPI } from '../api/property.api'
import './css/Bidder.css'

function Bidder() {
    const user = useSelector(state=>state.user)
    const { property_id } = useParams()
    const [property, setProperty] = useState({
        id: "",
        name: "",
        description: "",
        location: 0,
        price: 0,
        area: 0,
    })
    let minimum_bid = !property.price ? 0 :property.price+property.minimum_increment;
    const [buyPrice, setBuyPrice] = useState(minimum_bid)

    useEffect(() => {
        async function getPropertyAPIAux() {
            try {
                let propertyResponse = await getPropertyAPI(property_id)
                console.log("response", propertyResponse)
                if (propertyResponse.success) {
                    // console.log(propertyResponse.data)
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

    async function handleSubmitBuyPrice(e){
        e.preventDefault();
        if(buyPrice<minimum_bid)
            alert(`Price should be higher than ${minimum_bid}`)
        
        // console.log(typeof property_id, typeof user.id)
        let response = await updatePropertySetBuyerAPI(property_id, user.id)
        if(response){
            console.log(response.message)
        }
    }
    
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
            <form onSubmit={handleSubmitBuyPrice}>
                <input type="number" min={minimum_bid} onChange={(e)=>setBuyPrice(e.target.value)} value={buyPrice}/>
                <button>Save</button>
            </form>
            <div style={{height: "2px", background: "lightgrey", width: "100vw"}}></div>
        </div>
    )
}

export default Bidder