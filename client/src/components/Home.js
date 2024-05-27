import React from 'react'
import Map from './Map'
import SellerRegister from './SellerRegister';
import PendingProperty from './PendingProperty';
import BidPendingProperty from './BidPendingProperty';

function Home() {
    return (
        <div className="App">
            <Map />
            <SellerRegister />
            <PendingProperty />
            <BidPendingProperty/>
        </div>
    )
}

export default Home