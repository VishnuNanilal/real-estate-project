import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Menu({ setMenuVisible, handleSignout }) {
  const user = useSelector(state => state.user)
  const navigate = useNavigate()
  return (
    <div className='menu-cont' onClick={() => setMenuVisible(false)}>
      <button onClick={()=>navigate('/profile')}>Profile</button>
      {
        user.role === 'admin'
        &&
        <button onClick={()=>navigate('/admin')}>Admin</button>
      }
      <button onClick={()=>navigate('/dashboard')}>DashBoard</button>
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
