import { React, useEffect } from 'react'
import { changeStatusAPI, deletePropertyAPI, getAllPropertiesAPI, updatePropertyAPI } from '../api/property.api'
import dayjs from 'dayjs'
import { updateSellerRemovePropertyAPI } from '../api/seller.api'

function PropertyByStatus({ property, status, nextStatus, fetchDataAndStore}) {
    console.log("....",property)
    useEffect(() => {
        console.log(`Properties of status ${status}: `, property);
    }, [status, property])

    async function handleAccept(property) {
        if (!nextStatus) {
            console.log("Property already sold .")
            return;
        }

        console.log(property._id)
        const response = await changeStatusAPI(property._id, nextStatus)

        //if property is changed from pending to accepted status.
        if (nextStatus === 'accepted') {
            const closing_time = dayjs(property.closing_time, 'HH:mm YYYY-MM-DD');
            const now = dayjs();
            const diff = closing_time.diff(now, 'second'); // Get the difference in seconds
            // console.log("time now", now)
            // console.log("time closing", closing_time)
            // console.log(`Property ID: ${property._id}, Time until bidPending: ${diff} seconds`);
            if (diff > 0) {
                //after closing time, property is automatically set as bidPending state.
                setTimeout(() => {
                    changeStatusAPI(property._id, 'bidPending').then((res) => {
                        console.log(res.message)
                        fetchDataAndStore() //to refetch after status change
                    });
                }, 10000); // Convert seconds to milliseconds
            }
            else{
                changeStatusAPI(property._id, 'expired').then((res) => {
                    console.log(res.message)
                    fetchDataAndStore() //to refetch after status change
                });
            }
        }

        //if property is changed from bidPending to sold state.
        if(nextStatus === 'sold'){
            console.log("reached with, ", property)
            const response = updatePropertyAPI(property._id, {seller_id: property.buyer_id, buyer_id: null})
            if(response.success){
                console.log("new updated prop data", response.data);
            }
            console.log(response.message)
        }

        fetchDataAndStore()
        console.log(response.message);
    }

    async function removeProperty(property) {  
        //REMOVES FROM PROP DB AS WELL AS SELLER'S PROP LIST FOR CONSISTENCY.
        try{
            let delResponse = await deletePropertyAPI(property._id)
            if(delResponse.success){
                let response = await updateSellerRemovePropertyAPI(property.seller_id, property._id)
                fetchDataAndStore()
                console.log(response.message)
            }
            console.log(delResponse.message)
        }
        catch(err){
            console.log("Error: ", err)
        }
    }

    const divStyle = { border: "1px solid lightgreen", cursor: "pointer", margin: "1rem" }
    return (
        <div style={{ border: "1px solid black", backgroundColor: "red" }}>
            <h4>{status}</h4>
            {
                property.map((property, ind) => {
                    return (
                        <div style={divStyle} key={ind}>
                            <div>{property.name}</div>
                            <button style={{ cursor: "pointer" }} onClick={() => handleAccept(property)}>Accept</button>
                            <button style={{ cursor: "pointer" }} onClick={() => removeProperty(property)}>Reject</button>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default PropertyByStatus;