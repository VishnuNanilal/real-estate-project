import { createSlice } from "@reduxjs/toolkit";

const propertiesSlice = createSlice({
    name: 'properties',
    initialState: [],
    reducers: {
        setProperties: (state, action)=>{
            return [...action.payload]
        },
        removeProperties: (state)=>{
            return []
        }
    }
})

export const {setProperties, removeProperties} = propertiesSlice.actions
export default propertiesSlice.reducer