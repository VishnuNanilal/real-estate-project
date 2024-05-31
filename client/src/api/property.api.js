import axiosInstance from ".";

export const createProperty = async (payload)=>{
    try{
        const response = await axiosInstance.post('/property/', payload)
        return response.data
    }
    catch(err){
        return err.response.data;
    }
}

export const getAllPropertiesAPI = async ()=>{
    try{
        const response = await axiosInstance.get('/property/get-all')
        return response.data
    }
    catch(err){
        return err.response.data;
    }
}

export const getPropertyAPI = async (property_id)=>{
    try{
        const response = await axiosInstance.get(`/property/${property_id}`)
        return response.data
    }
    catch(err){
        return err.response.data;
    }
}

export const updatePropertyAPI = async (property_id, payload)=>{
    try{
        const response = await axiosInstance.patch(`/property/${property_id}`, payload)
        return response.data
    }
    catch(err){
        return err.response.data;
    }
}

export const deletePropertyAPI = async (property_id)=>{
    try{
        const response = await axiosInstance.delete(`/property/${property_id}`)
        return response.data
    }
    catch(err){
        return err.response.data;
    }
}

export const updatePropertySetBuyerAPI = async (property_id, payload)=>{
    try{
        const response = await axiosInstance.patch(`/property/set-buyer/${property_id}`, payload)
        return response.data
    }
    catch(err){
        return err.response.data;
    }
}

export const changeStatusAPI = async (property_id, status)=>{
    try{
        const response = await axiosInstance.patch(`/property/change-status/${property_id}`, {status})
        return response.data
    }
    catch(err){
        return err.response.data;
    }
}

