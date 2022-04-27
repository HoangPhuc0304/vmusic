import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    signIn: [
        {
            email: 'lephuc0304@gmail.com',
            password: '123456789'
        }
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
            const checkValid = state.signIn.findIndex((item) => (
                JSON.stringify(item) === JSON.stringify(action.payload)
            ))
            if (checkValid !== -1) {
                state.acceptAccess = true
            }            
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