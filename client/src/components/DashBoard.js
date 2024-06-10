import React, { useEffect } from 'react'
import { getAllPropertiesAPI } from '../api/property.api'
import { useSelector } from 'react-redux'
import PropertyComp from './PropertyComp'

function DashBoard() {
    const properties = useSelector(state => state.properties)
    const user = useSelector(state=>state.user)
    console.log(properties, user)

    useEffect(() => {

    }, [properties])

    let ownedProps = properties.filter(property=>property.owner_id===user.id);
    let activeBidProps = user.seller_id ? properties.filter(property=>property.seller_id===user.seller_id._id) : []
    let bidProps = properties.filter(property=>property.buyer_id===user.id)
    return (
        <main className='dashboard'>
            <h1>DashBoard</h1>
            <div style={{display: ""}}>
            <h3>My Owned Properties</h3>
            {
                //user owned properties
                ownedProps.length>0 ? ownedProps.map(property=><PropertyComp property={property}/>) : <div>No properties to display</div>
            }
            <hr></hr>
            <h3>My Active Bid Properties </h3>
            {
                //user properties
                activeBidProps.length > 0 ? activeBidProps.map(property=><PropertyComp property={property}/>) : <div>No properties to display</div>
            }
            <hr></hr>
            <h3>My Bids</h3>
            {
                //user called properties on bid
                bidProps.length > 0 ? bidProps.map(property=><PropertyComp property={property}/>) : <div>No properties to display</div> 
            }
            </div>
        </main>
    )
}

export default DashBoard