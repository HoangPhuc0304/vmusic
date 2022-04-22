import {configureStore} from '@reduxjs/toolkit'
import songSlice from './slices/songSlice'
import userSlice from './slices/userSlice'
import videoSlice from './slices/videoSlice'

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        song: songSlice.reducer,
        video: videoSlice.reducer,
    }
})

export default store