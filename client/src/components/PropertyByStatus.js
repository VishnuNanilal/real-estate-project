import { React} from 'react'
import { changeStatusAPI, deletePropertyAPI, updatePropertyAPI } from '../api/property.api'
import dayjs from 'dayjs'
import { updateSellerRemovePropertyAPI } from '../api/seller.api'
import { updateUserAddPropertyAPI } from '../api/user.api'
import PropertyComp from './PropertyComp'

function PropertyByStatus({ property, status, nextStatus, fetchDataAndStore }) {
    // useEffect(() => {
    //     console.log(`Properties of status ${status}: `, property);
    // }, [status, property])

    async function handleAccept(property) {
        if (!nextStatus) {
            alert("Property already sold .")
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
            else {
                changeStatusAPI(property._id, 'expired').then((res) => {
                    console.log(res.message)
                    fetchDataAndStore() //to refetch after status change
                });
            }
        }

        //if property is changed from bidPending to sold state.
        if (nextStatus === 'sold') {
            const seller_id_temp = property.seller_id;
            console.log("...", seller_id_temp)
            const response = await updatePropertyAPI(property._id, { seller_id: property.buyer_id, buyer_id: null, owner_id: property.buyer_id })
            console.log(">>>", response)
            if (response.success) {
                const sellerResponse = await updateSellerRemovePropertyAPI(seller_id_temp, property._id)
                console.log(sellerResponse.message);
                const userResponse = await updateUserAddPropertyAPI(property._id)
                console.log(userResponse.message);
            }
            console.log(response.message)
        }

        fetchDataAndStore()
        alert(response.message)
        console.log(response.message);
    }

    async function removeProperty(property) {
        const resp = window.confirm("Delete the current property?")
        if(!resp) return

        //REMOVES FROM PROP DB AS WELL AS SELLER'S PROP LIST FOR CONSISTENCY.
        try {
            let delResponse = await deletePropertyAPI(property._id)
            if (delResponse.success) {
                let response = await updateSellerRemovePropertyAPI(property.seller_id, property._id)
                fetchDataAndStore()
                console.log(response.message)
            }
            console.log(delResponse.message)
        }
        catch (err) {
            console.log("Error: ", err)
        }
    }

    return (
        <div>
            {
                property.length === 0
                    ?
                    <div>No Properties</div>
                    :
                    property.map((property, ind) => {
                        return (
                            <div style={{width: "35rem", 
                                        display: "flex", 
                                        justifyContent:"space-between", 
                                        alignItems: "center"
                                    }}>
                                <PropertyComp property={property} />
                                <div>
                                    <button style={{ cursor: "pointer" }} onClick={() => handleAccept(property)}>Accept</button>
                                    <button style={{ cursor: "pointer" }} onClick={() => removeProperty(property)}>Reject</button>
                                </div>
                            </div>
                        )
                    })
            }
        </div>
    )
}

export default PropertyByStatus;