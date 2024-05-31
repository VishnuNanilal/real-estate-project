import {configureStore} from '@reduxjs/toolkit'
import userSlice from './user.slice'
import propertiesSlice from './properties.slice';

const store = configureStore({
    reducer: {    
        user: userSlice,
        properties: propertiesSlice
    }
})

export default store;