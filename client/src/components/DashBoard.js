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
    return (
        <main className='dashboard'>
            <h1>DashBoard</h1>
            <div style={{display: ""}}>
            {
                //user properties
                user.seller_id &&
                properties.filter(property=>property.seller_id===user.seller_id._id).map(property=><PropertyComp property={property}/>)
            }
            <hr></hr>
            {
                //user called properties on bid
                properties.filter(property=>property.seller_id===user.seller_id._id).map(property=><PropertyComp property={property}/>)
            }
            </div>
        </main>
    )
}

export default DashBoard