import { React, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { removeUser } from '../redux/user.slice'
import SellerRegister from './SellerRegister'
import Menu from './Menu'
import './style/header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

export default function Header() {
    const [menuVisible, setMenuVisible] = useState(false)
    const user = useSelector(state => state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [popUpShown, setPopUpShown] = useState(false)
    function handleSignout() {
        localStorage.removeItem('jwt')
        dispatch(removeUser())
        navigate('/sign-in')
    }

    console.log("User: ", user)
    return (
        <header>
            <div className="header-l">
                <img className='logo' alt='logo' src='../pubic/logo192.png'></img>
            </div>
            <div className="header-r">
                {
                    <div className='header-nav'>
                        <button onClick={() => navigate('/info/about-us')}>About Us</button>
                        <button onClick={() => navigate('/info/support')}>Support</button>
                        <button onClick={() => navigate('/info/tos')}>Terms Of Service</button>
                        <button onClick={() => navigate('/info/privacy-policy')}>Privacy Policy</button>
                    </div>
                }
                {/* {
                user.id &&
                user.admin &&
                <button onClick={()=>navigate('/admin')}>Admin</button>
            } */}
                {
                    //register as seller section
                    user.id &&
                    !user.seller_id
                    &&
                    <button onClick={() => setPopUpShown(true)} style={{ position: "relative" }} >Regiser as Seller
                        {
                            popUpShown &&
                            <SellerRegister setPopupShown={setPopUpShown} />
                        }
                    </button>
                }
                {
                    <FontAwesomeIcon className="menu-icon" icon={faBars} onClick={() => setMenuVisible(true)} />
                }
                {
                    menuVisible
                    &&
                    <Menu setMenuVisible={setMenuVisible} handleSignout={handleSignout} />
                }
            </div>
        </header>
    )
}