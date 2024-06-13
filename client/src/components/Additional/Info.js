import React from 'react'
import { Route, Routes} from 'react-router-dom'

function Info() {
    return (
        <div>
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
        <div>
            About Us
        </div>
    )
}

function Support() {
    return (
        <div>
            Support
        </div>
    )
}

function TOS() {
    return (
        <div>
            Terms of Service
        </div>
    )
}

function PrivacyPolicy() {
    return (
        <div>
            Privacy Policy
        </div>
    )
}
export default Info