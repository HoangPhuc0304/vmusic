import { createSlice } from "@reduxjs/toolkit"
import vPopList from "../../fakeAPI/api/vpop"
import { randomTrending, randomRating } from "../../others/randomChart"
import { v4 as uuid} from 'uuid'

const uniqueID = uuid
const initialState = {
    mv: [
        ...vPopList,
    ].map((item,index) => (
        {
            ...item,
            id: uniqueID(),
            status: randomTrending(index),
            rating: randomRating(8,10),
        }
    )),
    like: [

    ],
    dislike: [

    ]
}
const videoSlice = createSlice({
    name: 'video',
    initialState,
    reducers: {
        clickLike: (state,action) => {
            const indexVideo = state.like.findIndex((item) => (
                JSON.stringify(item) === JSON.stringify(action.payload)
            ))
            if (indexVideo === -1) {
                state.like.push(action.payload)
                const indexItem = state.dislike.findIndex((item) => (
                    JSON.stringify(item) === JSON.stringify(action.payload)
                ))
                if (indexItem !== -1) {
                    state.dislike.splice(indexItem,1)
                }
            } else {
                state.like.splice(indexVideo,1)
            }
        },
        clickDislike: (state,action) => {
            const indexVideo = state.dislike.findIndex((item) => (
                JSON.stringify(item) === JSON.stringify(action.payload)
            ))
            if (indexVideo === -1) {
                state.dislike.push(action.payload)
                const indexItem = state.like.findIndex((item) => (
                    JSON.stringify(item) === JSON.stringify(action.payload)
                ))
                if (indexItem !== -1) {
                    state.like.splice(indexItem,1)
                }
            } else {
                state.dislike.splice(indexVideo,1)
            }
        },
        requestVideoDisplay: (state,action) => {
            const indexVideo = state.mv.findIndex((item) => (
                item.id === action.payload
            ))
            if (indexVideo !== -1) {
                const selectVideo = state.mv[indexVideo]
                state.mv.splice(indexVideo,1)
                state.mv.splice(0,0,selectVideo)
            }
        }
    },
})
const getMusicVideoList = (state) => state.video.mv
const getListVideoLike = (state) => state.video.like
const getListVideoDislike = (state) => state.video.dislike
export {getMusicVideoList,getListVideoLike,getListVideoDislike}
export default videoSlice