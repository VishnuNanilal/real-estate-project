import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import PropertyComp from './PropertyComp'
import Tabs from './Tabs'
import Tab from './Tab'

function DashBoard() {
    const properties = useSelector(state => state.properties)
    const user = useSelector(state => state.user)

    useEffect(() => {

    }, [properties])

    let activeBidProps = user.seller_id ? properties.filter(property => property.seller_id === user.seller_id._id) : []
    let bidProps = properties.filter(property => property.buyer_id === user.id)
    let boughtProps = properties.filter(property => property.owner_id === user.id);

    console.log()
    return (
        <div className='main-center'>
            <h2 className='section-title'>DashBoard</h2>
            <Tabs>
                <Tab label="Active Bid Properties"><Properties properties={activeBidProps} /></Tab>
                <Tab label="My Bids"><Properties properties={bidProps} /></Tab>
                <Tab label="Bought Properties"><Properties properties={boughtProps} /></Tab>
            </Tabs>
        </div>
    )
}

const Properties = ({ properties }) => {

    return (
        <>
            {console.log("props", properties.length)}
            {
                properties.length > 0 ? properties.map(property => <PropertyComp property={property} />) : <div>No properties to display</div>
            }
        </>
    )
}

export default DashBoard