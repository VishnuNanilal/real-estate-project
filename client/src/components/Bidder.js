import { React, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { getPropertyAPI, updatePropertyAPI, updatePropertySetBuyerAPI } from '../api/property.api'
import dayjs from 'dayjs'
import './style/Bidder.css'

function Bidder() {
    const user = useSelector(state => state.user)
    const { property_id } = useParams()
    const [property, setProperty] = useState({
        id: "",
        name: "",
        price: 0,
        description: "",
        location: 0,
        boundary_points: [],
        area: 0,
        seller_id: "",
        createdAt: Date.now(),
        updatedAt: "",
        minimum_increment: "",
        buyer_id: "",
        closing_time: 0,
    })
    let minimum_bid = !property.price ? 0 : property.price + property.minimum_increment;
    const [buyPrice, setBuyPrice] = useState(minimum_bid)
    const [timeRemaining, setTimeRemaining] = useState(0);
    const [expired, setExpired] = useState(false)
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

    useEffect(() => {
        let intervalId;
        const calculateRemainingTime = () => {
            
            if (!property || timeRemaining === 'Expired') {
                clearInterval(intervalId);
                return;
            }

            const closing_time = dayjs(property.closing_time, 'HH:mm YYYY-MM-DD');
            const now = dayjs();
            const diff = closing_time.diff(now);
            console.log("diff: ", diff)

            if (diff <= 0) {
                handleExpired();
                return;
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

            setTimeRemaining(`${days}d ${hours}h ${minutes}m`);
        };

        calculateRemainingTime(); // Initial calculation
        intervalId = setInterval(calculateRemainingTime, 60000); // Update every minute

        return () => clearInterval(intervalId);
    }, [property]);

    async function handleExpired() {

        setTimeRemaining('Expired');
        //set current buyer as seller for the property.
        let newPropertyData = {
            ...property,
            seller_id: property.buyer_id
        }

        let response = await updatePropertyAPI(property_id, newPropertyData)
        console.log(response.message)
    }

    async function handleBuy(e) {
        e.preventDefault();
        if (expired)
            alert("The bid time has expired.")

        if (buyPrice < minimum_bid)
            alert(`Price should be higher than ${minimum_bid}`)

        // console.log(typeof property_id, typeof user.id)
        let response = await updatePropertySetBuyerAPI(property_id, { buyer_id: user.id, buyPrice })
        if (response) {
            console.log(response.message)
        }
    }

    return (
        <div className="property-container">
            <div>Current bid amount: <strong>property.name</strong></div>
            <div>Time Remaining: {timeRemaining}</div>
            <div className="property-card">
                <h2>{property.name}</h2>
                <p><strong>Description:</strong> {property.description}</p>
                <p><strong>Location:</strong> {property.location}</p>
                <p><strong>Price:</strong> ${property.price}</p>
                <p><strong>Area:</strong> {property.area} sq ft</p>
            </div>
            <form onSubmit={handleBuy}>
                <input type="number" min={minimum_bid} onChange={(e) => setBuyPrice(e.target.value)} value={buyPrice} />
                <button className={timeRemaining === 'Expired' ? 'disabled' : ''}>Buy property</button>
            </form>
            <div style={{ height: "2px", background: "lightgrey", width: "100vw" }}></div>
        </div>
    )
}

export default Bidder