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
        setUser: (state, action) => {
            return ({
                id : action.payload._id,
                name : action.payload.name,
                email : action.payload.email,
                phone_num: action.payload.phone_num,
                seller_id: action.payload.seller_id,
                role: action.payload.role
            })
        },
        removeUser: (state) => {
            return ({
                id : "",
                name : "",
                email : "",
                phone_num: "",
                seller_id: ""
            });
        }
    }
})

export const {setUser, removeUser} = userSlice.actions
export default userSlice.reducer;