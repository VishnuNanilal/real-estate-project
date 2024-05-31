import {React, useState} from 'react'
import { registerSellerAPI } from '../api/seller.api';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserAPI } from '../api/user.api';
import { SetUser } from '../redux/user.slice';

function SellerRegister() {
    const dispatch = useDispatch()
    const user = useSelector(state=>state.user)
    const [formData, setFormData] = useState({
        user_id: user.id,
        name: "",
    });

    function handleNavigate(){
        alert("Navigated to Sign in.")
    }

    function handleChange(e){
        const {name, value} = e.target;
        setFormData(prev=>({
            ...prev,
            [name]:value
        }))
    }

    async function handleSubmit(e){
        e.preventDefault();
        let response = await registerSellerAPI(formData)
        if(response.success){
            const updatedUser = {...user, seller_id: response.data._id}
            let userResponse = await updateUserAPI(updatedUser);
            if(userResponse.success){
                dispatch(SetUser(userResponse.data))
            }
            console.log(userResponse.message)
        }
        console.log(response.message);
    }

    return (
        <div className='register-modal'>
            <h2>Register as Seller.</h2>
            <form onSubmit={handleSubmit}>
                <input type='text' name='name' placeholder='Name' value={formData.name} onChange={handleChange}/>
                <button>Submit</button>
            </form>
        </div>
    )
}

export default SellerRegister