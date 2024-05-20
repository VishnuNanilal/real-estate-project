import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        user_id: "",
        name: "",
        email: "",
        phone_num: 0,
        seller_id: ""
    },
    reducers: {
        SetUser: (state, action) => {
            console.log("from store: ", action.payload)
            return ({
                id : action.payload._id,
                name : action.payload.name,
                email : action.payload.email,
                phone_num: action.payload.phone_num,
                seller_id: action.payload.seller_id
            })
        },
        RemoveUser: (state) => {
            return null;
        }
    }
})

export const {SetUser, RemoveUser} = userSlice.actions
export default userSlice.reducer;