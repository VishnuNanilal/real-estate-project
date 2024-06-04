import axiosInstance from ".";

export const registerUserAPI = async (payload)=>{
    try{
        const response = await axiosInstance.post('/user/register', payload)
        return response.data
    }
    catch(err){
        return err.response.data;
    }
}

export const signInUserAPI = async (payload)=>{
    try{
        const response = await axiosInstance.post('/user/sign-in', payload)
        return response.data
    }
    catch(err){
        return err.response.data;
    }
}

export const getUserAPI = async ()=>{
    try{
        const response = await axiosInstance.get(`/user/me`)
        return response.data
    }
    catch(err){
        return err.response.data;
    }
}

export const updateUserAPI = async (payload)=>{
    try{
        const response = await axiosInstance.patch(`/user/me`, payload)
        return response.data
    }
    catch(err){
        return err.response.data;
    }
}
