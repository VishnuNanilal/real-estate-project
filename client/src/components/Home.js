import React from 'react'
import Map from './Map'
import SellerRegister from './SellerRegister';
import PropertyByStatus from './PropertyByStatus';

function Home() {
    return (
        <div className="home">
            <Map />
            <SellerRegister />
            <PropertyByStatus status="pending" nextStatus="approve"/>
            <PropertyByStatus status="bidPending" nextStatus="sold"/>
            <PropertyByStatus status="sold"/>
        </div>
    )
}

export default Home