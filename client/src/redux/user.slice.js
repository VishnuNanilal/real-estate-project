import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        name: "",
        email: "",
        phone_num: 0
    },
    reducers: {
        SetUser: (state, action) => {
            return action.payload
        },
        RemoveUser: (state) => {
            return null;
        }
    }
})

export const {SetUser, RemoveUser} = userSlice.actions
export default userSlice.reducer;