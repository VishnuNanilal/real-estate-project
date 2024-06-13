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

export const updateUserAddPropertyAPI = async (property_id)=>{
    // console.log("reached api")
    try{
        const response = await axiosInstance.patch(`/user/me/add-property/${property_id}`)
        return response.data
    }
    catch(err){
        return err.response.data;
    }
}

export const getAllUsers = async ()=>{
    console.log("reached api")
    try{
        const response = await axiosInstance.get(`/user/get-all`)
        return response.data
    }
    catch(err){
        return err.response.data;
    }
}

export const pushNotificationAPI = async (notification)=>{
    console.log("Notification data", notification)
    try{
        const response = await axiosInstance.patch(`/user/notification/push`, {notification})
        return response.data
    }
    catch(err){
        return err.response.data;
    }
}

export const popNotificationAPI = async (notification_id)=>{
    try{
        const response = await axiosInstance.patch(`/user/notification/pop`, {notification_id})
        return response.data
    }
    catch(err){
        return err.response.data;
    }
}
