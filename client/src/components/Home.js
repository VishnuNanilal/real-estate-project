import React from 'react'
import Map from './Map'
import SellerRegister from './SellerRegister';
import PropertyByStatusContainer from './PropertyByStatusContainer';

function Home() {
     
    return (
        <div className="home">
            <Map />
            <SellerRegister />
            <PropertyByStatusContainer/>
        </div>
    )
}

export default Home