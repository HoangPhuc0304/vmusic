import { createSlice } from "@reduxjs/toolkit";
import vPopList from "../../fakeAPI/api/vpop";
import { randomTrending } from "../../others/randomChart";
const initialState = {
    mv: [
        ...vPopList,
    ].map((item,index) => (
        {
            ...item,
            status: randomTrending(index)
        }
    ))
}
const videoSlice = createSlice({
    name: 'video',
    initialState,
    reducers: {

    },
})
const getMusicVideoList = (state) => state.video.mv
export {getMusicVideoList}
export default videoSlice