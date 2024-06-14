import { React, useState } from 'react'
import { registerUserAPI } from '../api/user.api';
import { useNavigate } from 'react-router-dom';

function Register() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone_num: "",
        password: ""
    });

    function handleNavigate() {
        navigate('/sign-in')
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    async function handleSubmit(e) {
        e.preventDefault();
        let response = await registerUserAPI(formData);
        if (response.success) {
            navigate('/sign-in')
        }
        console.log(response.message)
    }

    return (
        <div class='modal'>
            <form class="modal-form" onSubmit={handleSubmit}>
                <label for="name">Name:
                    <input id="name" type='text' name='name' placeholder='Name' value={formData.name} onChange={handleChange} required={true} />
                </label>
                <label for="email">Email:
                    <input id="email" type='text' name='email' placeholder='Email' value={formData.email} onChange={handleChange} required={true} />
                </label>
                <label for="phone_num">Phone No:
                    <input id="phone_num" type='Number' name='phone_num' placeholder='Phone No.' value={formData.phone_num} onChange={handleChange} required={true} />
                </label>
                <label for="password">Password:
                    <input id="password" type='password' name='password' placeholder='Password' value={formData.password} onChange={handleChange} required={true} />
                </label>
                <button>Register</button>
                <div>Already have an account? <span onClick={handleNavigate} style={{ color: "blue" }}>Sign in</span></div>
            </form>
        </div>
    )
}

export default Register