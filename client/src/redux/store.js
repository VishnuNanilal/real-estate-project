import {configureStore} from '@reduxjs/toolkit'
import userSlice from './user.slice'
import propertiesSlice from './properties.slice';
import mapLocationSlice from './mapLocation.slice';

const store = configureStore({
    reducer: {    
        user: userSlice,
        properties: propertiesSlice,
        mapLocation: mapLocationSlice
    }
})

export default store;