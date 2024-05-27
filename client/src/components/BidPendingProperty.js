import {React, useState, useEffect} from 'react'
import { getAllPropertiesAPI } from '../api/property.api'

function BidPendingProperty() {
    const [property, setProperty] = useState([])
    useEffect(()=>{
        async function fetchData(){
            const properties = await getAllPropertiesAPI()
            console.log(">>>", properties.data)
            // return
            if(properties.success){
                setProperty(properties.data.filter(property=>property.status==="bidPending"))
                // setProperty(properties.data)
            }
            console.log(properties.message)
        }

        fetchData()
    }, [])
  return (
    <div style={{height:"5rem", backgroundColor: "red"}}>
        {
            property.map(property=><div>{property.name}</div>)
        }
    </div>
  )
}

export default BidPendingProperty;