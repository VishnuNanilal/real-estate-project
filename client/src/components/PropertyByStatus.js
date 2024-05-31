import { React, useEffect } from 'react'
import { changeStatusAPI, deletePropertyAPI } from '../api/property.api'
import dayjs from 'dayjs'

function PropertyByStatus({ property, status, nextStatus, fetchData }) {
    console.log("Properties: ", property)
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
                        fetchData() //to refetch after status change
                    });
                }, 10000); // Convert seconds to milliseconds
            }
        }

        fetchData()
        console.log(response.message);
    }

    async function removeProperty(property) {
        const response = await deletePropertyAPI(property._id)
        fetchData()
        console.log(response.message)
    }

    const divStyle = { border: "1px solid lightgreen", cursor: "pointer", margin: "1rem" }
    return (
        <div style={{ border: "1px solid black", backgroundColor: "red" }}>
            <h4>{status}</h4>
            {
                property.map(property => {
                    return (
                        <div style={divStyle}>
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