import {React, useState} from 'react'
import { signInUser } from '../api/user.api';

function SignIn() {
    const [formData, setFormData] = useState({
        data: "",
        password: ""
    });

    function handleNavigate(){
        alert("Navigated to Register.")
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
        let response = await signInUser(formData);
        if(response.success){
            localStorage.setItem('jwt', response.data)
        }
        console.log(response.message)
    }

    return (
        <div class='SignIn-modal'>
            <form onSubmit={handleSubmit}>
                <input type='text' name='data' placeholder='Email or Phone No.' value={formData.name} onChange={handleChange}/>
                <input type='password' name='password' placeholder='Password' value={formData.password} onChange={handleChange}/>
                <button>Submit</button>
            </form>
            <div>Already have an account? <span onClick={handleNavigate}>Sign in</span></div>
        </div>
    )
}

export default SignIn