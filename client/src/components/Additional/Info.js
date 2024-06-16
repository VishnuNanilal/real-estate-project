import React from 'react'
import { Route, Routes } from 'react-router-dom'

function Info() {
    return (
        <div className='main-center'>
            <Routes>
                <Route path='/about-us' element={<AboutUs />} />
                <Route path='/support' element={<Support />} />
                <Route path='/tos' element={<TOS />} />
                <Route path='/privacy-policy' element={<PrivacyPolicy />} />
            </Routes>
        </div>
    )
}

function AboutUs() {
    return (
        <h2 className='section-title'>
            About Us
        </h2>
    )
}

function Support() {
    return (
        <h2 className='section-title'>
            Support
        </h2>
    )
}

function TOS() {
    return (
        <h2 className='section-title'>
            Terms of Service
        </h2>
    )
}

function PrivacyPolicy() {
    return (
        <h2 className='section-title'>
            Privacy Policy
        </h2>
    )
}
export default Info