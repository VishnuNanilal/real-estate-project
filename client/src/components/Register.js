import {React, useState} from 'react'
import { registerUser } from '../api/user.api';

function Register() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone_num: "",
        password: ""
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
        let response = await registerUser(formData);
        console.log(response)
    }

    return (
        <div class='register-modal'>
            <form onSubmit={handleSubmit}>
                <input type='text' name='name' placeholder='Name' value={formData.name} onChange={handleChange}/>
                <input type='text' name='email' placeholder='Email' value={formData.email} onChange={handleChange}/>
                <input type='Number' name='phone_num' placeholder='Phone No.' value={formData.phone_num} onChange={handleChange}/>
                <input type='password' name='password' placeholder='Password' value={formData.password} onChange={handleChange}/>
                <button>Submit</button>
            </form>
            <div>Already have an account? <span onClick={handleNavigate}>Sign in</span></div>
        </div>
    )
}

export default Register