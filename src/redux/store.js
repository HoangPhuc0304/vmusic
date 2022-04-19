import {configureStore} from '@reduxjs/toolkit'
import songSlice from './slices/songSlice'
import userSlice from './slices/userSlice'

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        song: songSlice.reducer,
    }
})

export default store