import React from 'react'
import { useSelector } from 'react-redux'
import Profile from './Profile/Profile'
import { useNavigate } from 'react-router-dom'

function Menu({ setMenuVisible, handleSignout }) {
  const user = useSelector(state => state.user)
  const navigate = useNavigate()
  return (
    <div className='menu-cont' onClick={() => setMenuVisible(false)}>
      <Profile/>
      {
        user.role === 'admin'
        &&
        <button onClick={()=>navigate('/admin')}>Admin</button>
      }
      <button onClick={()=>navigate('/settings')}>Settings</button>
      <button onClick={()=>navigate('/seller')}>Seller</button>
      {
        //sign out section
        user.id
        &&
        <button className="signout-btn" onClick={handleSignout}>Sign out</button>
      }
    </div>
  )
}

export default Menu

/*
> Buyer Menu Options
Dashboard: Overview of user activities, including active bids and won properties.
My Bids: List of properties the user has placed bids on.

>Status of each bid.
Notifications: Alerts and updates about bid statuses and other activities.
Profile: View and edit personal information.
Settings:Account settings and preferences.
Logout:Sign out of the account.

>Seller Menu Options
Dashboard:Overview of seller activities, including listed properties and ongoing bids.
My Properties:List of properties the seller has listed.Options to edit or remove properties.
Add Property:Form to create and submit a new property listing.
Notifications:Alerts about bids and property approvals.
Profile:View and edit personal information.
Settings:Account settings and preferences.
Logout:Sign out of the account.

>Admin Menu Options
Admin Dashboard:Overview of platform activities, pending approvals, and user statistics.
Approve Properties:List of properties awaiting approval.
Options to approve or reject new property listings.
Approve Bids:List of bid results awaiting approval.Options to approve or reject bid results.
Manage Users:View and manage user accounts.Options to deactivate or delete users.
Reports/Analytics:Access to various reports and analytics about platform usage.
Settings:Admin-specific settings and preferences.
Logout:Sign out of the admin account.

>Additional Menu Options (If Applicable)
Support/Help:FAQs and contact options for customer support.
About Us:Information about the platform and the team.
Terms of Service:Legal information and terms of use.
Privacy Policy:Information about data privacy and user rights.
*/