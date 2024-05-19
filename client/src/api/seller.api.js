import axiosInstance from ".";

export const registerSeller = async (payload)=>{
    try{
        const response = await axiosInstance.post('/seller/register', payload)
        return response.data
    }
    catch(err){
        return err.response.data;
    }
}

export const getSeller = async (seller_id)=>{
    try{
        const response = await axiosInstance.get(`/seller/${seller_id}`)
        return response.data
    }
    catch(err){
        return err.response.data;
    }
}

export const updateSeller = async (seller_id, payload)=>{
    try{
        const response = await axiosInstance.patch(`seller/${seller_id}`, payload)
        return response.data
    }
    catch(err){
        return err.response.data;
    }
}

export const updateSellerAddProperty = async (payload)=>{
    try{
        const response = await axiosInstance.patch('/seller/:seller_id/add-property', payload)
        return response.data
    }
    catch(err){
        return err.response.data;
    }
}

export const updateSellerRemoveProperty = async ()=>{
    try{
        const response = await axiosInstance.patch('/seller/:seller_id/remove-property/:property_id')
        return response.data
    }
    catch(err){
        return err.response.data;
    }
}
