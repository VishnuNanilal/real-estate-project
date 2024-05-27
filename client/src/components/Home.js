import React from 'react'
import Map from './Map'
import SellerRegister from './SellerRegister';
import PropertyByStatus from './PropertyByStatus';

function Home() {
    return (
        <div className="App">
            <Map />
            <SellerRegister />
            <PropertyByStatus status="pending"/>
            <PropertyByStatus status="bidPending"/>
            <PropertyByStatus status="sold"/>
        </div>
    )
}

export default Home