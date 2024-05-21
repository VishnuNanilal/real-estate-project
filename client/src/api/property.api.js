import axiosInstance from ".";

// getPropertyAPI(){

// }

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