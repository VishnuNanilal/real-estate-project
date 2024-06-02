import { React, useState } from 'react'
import { getUserAPI, signInUserAPI } from '../api/user.api';
import { SetUser, RemoveUser } from '../redux/user.slice';
import { useSelector, UseDispatch, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';

function SignIn() {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        data: "",
        password: ""
    });

    function handleNavigate() {
        navigate('/register')
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
        let response = await signInUserAPI(formData);
        if (response.success) {
            localStorage.setItem('jwt', response.data)
            const userResponse = await getUserAPI()

            if (userResponse.success) {
                console.log("user fetched: ", userResponse.data)
                dispatch(SetUser(userResponse.data))
                navigate('/')
            }
            console.log(userResponse.message);
        }
        console.log(response.message)
    }

    return (
        <div className='modal'>
            {
                `user name: ${user.name}`
            }
            <form className='modal-form' onSubmit={handleSubmit}>
                <label for="data">User name or Email: 
                    <input id="data" type='text' name='data' placeholder='Email or Phone No.' value={formData.data} onChange={handleChange} />
                </label>
                <label for='password'>Password: 
                    <input id="password" type='password' name='password' placeholder='Password' value={formData.password} onChange={handleChange} />
                </label>
                <button>Submit</button>
                <div>Create New Account <span onClick={handleNavigate} style={{color: "blue"}}>Register</span></div>
            </form>
        </div>
    )
}

export default SignIn