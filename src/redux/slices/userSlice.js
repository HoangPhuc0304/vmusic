import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    signIn: [

    ],
    signUp: [

    ],
    sendMessage: [

    ],
    acceptAccess: false,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        handleSignIn: (state,action) => {
            state.signIn.push(action.payload)
            state.acceptAccess = true;
        },
        handleSignUp: (state,action) => {
            state.signUp.push(action.payload)
        },
        handleAccess: (state,action) => {
            state.acceptAccess = action.payload;
        },
        handleSendMessage: (state,action) => {
            state.sendMessage.push(action.payload)
        },
    }
})
const getRequestAccess = (state) => state.user.acceptAccess
export default userSlice
export {getRequestAccess}