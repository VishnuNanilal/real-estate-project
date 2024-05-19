import axiosInstance from ".";

export const registerUser = async (payload)=>{
    try{
        const response = await axiosInstance.post('/user/register', payload)
        return response.data
    }
    catch(err){
        return err.response.data;
    }
}

export const signInUser = async (payload)=>{
    try{
        const response = await axiosInstance.post('/user/sign-in', payload)
        return response.data
    }
    catch(err){
        return err.response.data;
    }
}

export const getUser = async (user_id)=>{
    try{
        const response = await axiosInstance.get(`/user/${user_id}`)
        return response.data
    }
    catch(err){
        return err.response.data;
    }
}

export const updateUser = async (seller_id, payload)=>{
    try{
        const response = await axiosInstance.patch(`seller/${seller_id}`, payload)
        return response.data
    }
    catch(err){
        return err.response.data;
    }
}
