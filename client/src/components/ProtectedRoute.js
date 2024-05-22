import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { SetUser, RemoveUser } from '../redux/user.slice'
import { getUserAPI } from '../api/user.api'
import { useNavigate } from 'react-router-dom'

function ProtectedRoute({ children }) {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        async function fetchUser() {
            if(!localStorage.getItem('jwt')){
                ResetUser()
            }

            let userResponse = await getUserAPI()
            if (userResponse.success) {
                dispatch(SetUser(userResponse.data))
            }
            else {
                ResetUser()
            }
            console.log(userResponse.message)
        }
        fetchUser()
    }, [])

    function ResetUser(){
        dispatch(RemoveUser())
        localStorage.removeItem('jwt')
        navigate('/sign-in')
    }

    return (
        <div className='protected-route'>
            {
                children
            }
        </div>
    )
}

export default ProtectedRoute