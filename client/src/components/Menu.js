import React from 'react'
import Admin from './Admin'
import { useSelector } from 'react-redux'

function Menu({setMenuVisible}) {
  const user = useSelector(state=>state.user)
  return (
    <div className='menu-cont' onClick={()=>setMenuVisible(false)}>
        {
            user.role ==='admin'
            &&
            <Admin />
        }
    </div>
  )
}

export default Menu