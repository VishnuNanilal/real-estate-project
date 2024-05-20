import React from 'react'
import Map from './Map'
import Register from './Register';
import SignIn from './SignIn';
import SellerRegister from './SellerRegister';

function Home() {
    return (
        <div className="App">
            <Register />
            <SignIn />
            <SellerRegister />
            <Map />
        </div>
    )
}

export default Home