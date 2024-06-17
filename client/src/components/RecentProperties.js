import { React, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import PropertyComp from './PropertyComp';

function RecentProperties() {
    let properties = useSelector(state=>state.properties)
    const naviagate = useNavigate()
    const [recentProperties, setRecentProperties] = useState([]);

    useEffect(() => {
        let sortedProps = [...properties].sort((x, y) => {
            return new Date(y.createdAt) - new Date(x.createdAt)
        });

        sortedProps = sortedProps.slice(0, 10)
        
        setRecentProperties(sortedProps);
    }, [properties]);

    function handleClick(property_id){
        naviagate(`/bidder/${property_id}`)  
    }

    return (
        <div className='property-container'>
            <h2>Recent Properties</h2>
            {
                recentProperties.map(property =><PropertyComp property={property} />)
            }
        </div>
    )
}

export default RecentProperties