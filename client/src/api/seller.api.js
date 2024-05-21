import axiosInstance from ".";

export const registerSellerAPI = async (payload)=>{
    try{
        const response = await axiosInstance.post('/seller/register', payload)
        return response.data
    }
    catch(err){
        return err.response.data;
    }
}

export const getSellerAPI = async (seller_id)=>{
    try{
        const response = await axiosInstance.get(`/seller/${seller_id}`)
        return response.data
    }
    catch(err){
        return err.response.data;
    }
}

export const updateSellerAPI = async (seller_id, payload)=>{
    try{
        const response = await axiosInstance.patch(`seller/${seller_id}`, payload)
        return response.data
    }
    catch(err){
        return err.response.data;
    }
}

export const updateSellerAddPropertyAPI = async (seller_id, payload)=>{
    try{
        const response = await axiosInstance.patch(`/seller/${seller_id}/add-property`, payload)
        return response.data
    }
    catch(err){
        return err.response.data;
    }
}

export const updateSellerRemovePropertyAPI = async ()=>{
    try{
        const response = await axiosInstance.patch('/seller/:seller_id/remove-property/:property_id')
        return response.data
    }
    catch(err){
        return err.response.data;
    }
}