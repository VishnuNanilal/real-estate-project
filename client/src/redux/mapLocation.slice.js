import { createSlice } from "@reduxjs/toolkit";

const mapLocationSlice = createSlice({
    name: "mapLocation",
    initialState: {
        lat: "",
        lon: ""
    },
    reducers: {
        setLocation: (state, action)=>{
            // console.log(action.payload)
            return ({
                lat: action.payload.lat,
                lon: action.payload.lon
            })
        },
        removeLocation: (state)=>({lat: "", lon: ""})
    }
})

export const {setLocation, removeLocation} = mapLocationSlice.actions
export default mapLocationSlice.reducer