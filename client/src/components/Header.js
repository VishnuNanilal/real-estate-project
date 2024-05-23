import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RemoveUser } from '../redux/user.slice'

export default function Header() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    function handleSignout(){
        localStorage.removeItem('jwt')
        dispatch(RemoveUser)
        navigate('/sign-in')
    }

    return(
        <div className="header">
        <header className="main-cont">
            <div className="header-l">
                <img className='logo' alt='logo' src='../pubic/logo192.png'></img>
            </div>
            <div className="header-r">
                right
            </div>
            <button onClick={handleSignout}>Sign out</button>
        </header>
    </div>
    )
}