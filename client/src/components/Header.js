import {React, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RemoveUser } from '../redux/user.slice'
import SellerRegister from './SellerRegister'
export default function Header() {
    const user = useSelector(state=>state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [popUpShown, setPopUpShown] = useState(false)
    function handleSignout(){
        localStorage.removeItem('jwt')
        dispatch(RemoveUser())
        navigate('/sign-in')
    }
    
    console.log("User: ", user)
    return(
        <header>
            <div className="header-l">
                <img className='logo' alt='logo' src='../pubic/logo192.png'></img>
            </div>
            <div className="header-r">
                right
            </div>
            {
                user.id &&
                user.admin &&
                <button onClick={()=>navigate('/admin')}>Admin</button>
            }
            {
                user.id&&
                !user.seller_id
                &&
                <button onClick={()=>setPopUpShown(true)} style={{position: "relative"}} >Regiser as Seller
                    {
                        popUpShown &&
                        <SellerRegister setPopupShown={setPopUpShown}/>
                    }
                </button>
            }
            {
                user.id
                &&
                <button onClick={handleSignout}>Sign out</button>
            }
        </header>
    )
}