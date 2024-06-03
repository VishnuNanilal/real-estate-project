import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getPropertyAPI } from '../api/property.api'

function UserProperties() {
    const userProperties = useSelector(state=>state.user).seller_id.properties
    // const  userProperties = useSelector(state=>state.properties)
    const [userPropertiesData, setUserPropertiesData] = useState([])
    console.log(userProperties)
    useEffect(()=>{
        async function fetchData(){
            if(!userProperties) return
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

    console.log(userPropertiesData)

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