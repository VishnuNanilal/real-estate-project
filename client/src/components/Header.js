import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RemoveUser } from '../redux/user.slice'

export default function Header() {
    const user = useSelector(state=>state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    function handleSignout(){
        localStorage.removeItem('jwt')
        dispatch(RemoveUser)
        navigate('/sign-in')
    }

    return(
        <header>
            <div className="header-l">
                <img className='logo' alt='logo' src='../pubic/logo192.png'></img>
            </div>
            <div className="header-r">
                right
            </div>
            {
                user &&
                user.admin &&
                <button onClick={()=>navigate('/admin')}>Admin</button>
            }
            <button onClick={handleSignout}>Sign out</button>
        </header>
    )
}