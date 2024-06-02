import { React, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

function RecentProperties() {
    let properties = useSelector(state=>state.properties)
    const naviagate = useNavigate()
    const [sortedProperties, setSortedProperties] = useState([]);

    useEffect(() => {
        let sortedProps = [...properties].sort((x, y) => {
            return new Date(y.createdAt) - new Date(x.createdAt)
        });

        sortedProps = sortedProps.slice(0, 10)
        
        setSortedProperties(sortedProps);
    }, []);

    function handleClick(property_id){
        naviagate(`/bidder/${property_id}`)  
    }

    return (
        <div className='recent-feed'>
            <h2>Recent feed component</h2>
            {
                sortedProperties.map(property =><div style={{height: "5rem", border: "1px solid green"}} onClick={()=>handleClick(property._id)}>{property.name}</div>)
            }
        </div>
    )
}

export default RecentProperties