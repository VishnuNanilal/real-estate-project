import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getPropertyAPI } from '../api/property.api'

function UserProperties() {
    const user = useSelector(state=>state.user)
    const [userProperties, setUserProperties] = useState([])
    const [userPropertiesData, setUserPropertiesData] = useState([])

    useEffect(()=>{
        setUserProperties(user.seller_id ? user.seller_id.properties: []) 
    }, [user])

    useEffect(()=>{
        async function fetchData(){
            // let arr = userProperties.map(prop_id=>getPropertyAPI(prop_id))
            // arr = await Promise.all(arr)
            // // arr = arr.map(obj=>obj.data)
            // console.log(arr)
            let arr = []
            for(let prop of userProperties){
                console.log("...", prop)
                arr.push(await getPropertyAPI(prop))
            }

            console.log(arr)
        }

        fetchData()
    }, [userProperties])

    return (
        <div className='recent-feed'>
            <h2>Your properties</h2>
            {
                // userPropertiesData.map(property =><div style={{height: "5rem", border: "1px solid green"}}>{property}</div>)
            }
        </div>
    )
}

export default UserProperties