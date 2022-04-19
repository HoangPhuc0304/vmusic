import { createSlice } from "@reduxjs/toolkit"
import vpopList from "../../fakeAPI/api/vpop"
import { v4 as uuid } from 'uuid'

const uniqueID = uuid
const initialState = {
    songBroadcast: [
        ...vpopList
    ].map((item) => (
        {
            ...item,
            id: uniqueID(),
        }
    )),
    songCurrent: 0,
    memorySaveBroadcast: [],
    songPlaylist: [],
    songCurrentPlaylist: -1,
    memorySavePlaylist: [],
    hideAllSetting: false,
    headerVirtual: false,
    isReturnTopSong: false, 
    favoriteSong: [],
    navActive: 1,
    search: '',
}

const songSlice = createSlice({
    name: 'song',
    initialState,
    reducers: {
        requestHideSetting: (state,action) => {
            state.hideAllSetting = action.payload
        },
        activeHeaderVirtual: (state,action) => {
            state.headerVirtual = action.payload
        },
        searchSong: (state,action) => {
            state.search = action.payload
        },
        changeNavActive: (state,action) => {
            state.navActive = action.payload
        },
        changeCurrentSong: (state,action) => {
            if (state.songCurrentPlaylist == -1) {
                let indexSong = state.songCurrent + action.payload
                if (indexSong < 0 || indexSong >= state.songBroadcast.length) {
                    indexSong < 0 ? indexSong = state.songBroadcast.length - 1 : indexSong = 0
                }
                state.songCurrent = indexSong
            } else {
                let indexSongPlaylist = state.songCurrentPlaylist + action.payload
                if (indexSongPlaylist < 0 || indexSongPlaylist >= state.songPlaylist.length) {
                    indexSongPlaylist < 0 ? indexSongPlaylist = state.songPlaylist.length - 1 : indexSongPlaylist = 0
                }
                state.songCurrentPlaylist = indexSongPlaylist
            }
        },
        randomSong: (state,action) => {
            if (action.payload) {
                if (state.songCurrentPlaylist == -1) {
                    let songArray = [...state.songBroadcast]
                    let newSongArray = [state.songBroadcast[state.songCurrent]]
                    songArray = songArray.filter((item) => (
                        JSON.stringify(item) !== JSON.stringify(state.songBroadcast[state.songCurrent])
                    ))
                    while (songArray.length > 0) {
                        const randomIndex = Math.floor(Math.random()*songArray.length)
                        newSongArray.push(songArray[randomIndex])
                        songArray.splice(randomIndex,1)
                    }
                    state.memorySaveBroadcast = [...state.songBroadcast]
                    state.songBroadcast = [...newSongArray]
                    state.songCurrent = 0
                } else {
                    let songArrayPlaylist = [...state.songPlaylist]
                    let newSongArrayPlaylist = [state.songPlaylist[state.songCurrentPlaylist]]
                    songArrayPlaylist = songArrayPlaylist.filter((item) => (
                        JSON.stringify(item) !== JSON.stringify(state.songPlaylist[state.songCurrentPlaylist])
                    ))
                    while (songArrayPlaylist.length > 0) {
                        const randomIndex = Math.floor(Math.random()*songArrayPlaylist.length)
                        newSongArrayPlaylist.push(songArrayPlaylist[randomIndex])
                        songArrayPlaylist.splice(randomIndex,1)
                    }
                    state.memorySavePlaylist = [...state.songPlaylist]
                    state.songPlaylist = [...newSongArrayPlaylist]
                    state.songCurrentPlaylist = 0
                }
            } else {
                if (state.songCurrentPlaylist == -1) {
                    if (state.memorySaveBroadcast) {
                        state.memorySaveBroadcast.forEach((item,index) => {
                            if (JSON.stringify(item) === JSON.stringify(state.songBroadcast[state.songCurrent])) {
                                state.songCurrent = index
                            }
                        })
                        state.songBroadcast = [...state.memorySaveBroadcast]
                        state.memorySaveBroadcast = []
                    } 
                } else {
                    if (state.memorySavePlaylist) {
                        state.memorySavePlaylist.forEach((item,index) => {
                            if (JSON.stringify(item) === JSON.stringify(state.songPlaylist[state.songCurrentPlaylist])) {
                                state.songCurrentPlaylist = index
                            }
                        })
                        state.songPlaylist = [...state.memorySavePlaylist]
                        state.memorySavePlaylist = []
                    } 
                }
                
            }
        },
        finishSong: (state,action) => {
            if (state.songCurrentPlaylist == -1) {
                if (action.payload && state.songCurrent === state.songBroadcast.length - 1 ) {
                    state.isReturnTopSong = true
                } else {
                    if (state.isReturnTopSong) {
                        state.isReturnTopSong = false
                    }
                }
            } else {
                if (action.payload && state.songCurrentPlaylist === state.songPlaylist.length - 1 ) {
                    state.isReturnTopSong = true
                } else {
                    if (state.isReturnTopSong) {
                        state.isReturnTopSong = false
                    }
                }
            }
            
        },
        requestSongBroadcast: (state,action) => {
            state.songBroadcast.forEach((item,index) => {
                if (JSON.stringify(item) === JSON.stringify(action.payload)) {
                    state.songCurrent = index
                } 
            })
        },
        clickHeartIcon: (state,action) => {
            const indexSong = state.favoriteSong.findIndex((item) => (
                JSON.stringify({...item,id: ''}) === JSON.stringify({...action.payload,id: ''})
            ))
            if (indexSong === -1) {
                state.favoriteSong.push(action.payload)
            } else {
                state.favoriteSong.splice(indexSong,1)
            }
        },
        addNextBroadcast: (state,action) => {
            if (state.songCurrentPlaylist == -1) {
                state.songBroadcast.splice(state.songCurrent+1,0,{...action.payload, id: uniqueID()})
            } else {
                // const indexSong = state.songPlaylist.findIndex((item) => (
                //     JSON.stringify(item) === JSON.stringify(action.payload)
                // ))
                // state.songPlaylist.splice(indexSong,1)
                // indexSong < state.songCurrentPlaylist && state.songCurrentPlaylist--
                state.songPlaylist.splice(state.songCurrentPlaylist+1,0,{...action.payload})
            }
        },
        removeSongAtBroadcast: (state,action) => {
            const indexSong = state.songBroadcast.findIndex((item) => (
                JSON.stringify(item) === JSON.stringify(action.payload)
            ))
            state.songBroadcast.splice(indexSong,1)
            indexSong < state.songCurrent && state.songCurrent--
        },
        getSongListFromPlaylist: (state,action) => {
            state.songPlaylist = action.payload
        },
        requestSongPlaylist: (state,action) => {
            state.songPlaylist.forEach((item,index) => {
                if (JSON.stringify(item) === JSON.stringify(action.payload)) {
                    state.songCurrentPlaylist = index
                } 
            })
            // state.songCurrent = -1
        },
        preventSongPlaylist: (state,action) => {
            state.songCurrentPlaylist = action.payload
        },
        addSongAtBroadcast: (state,action) => {
            state.songBroadcast.push(action.payload)
        },
        playSongFromSearch: (state,action) => {
            const indexSong = state.songBroadcast.findIndex((item) => (
                JSON.stringify({...item,id: ''}) === JSON.stringify({...action.payload,id: ''})
            ))
            
            if (indexSong==-1) {
                state.songBroadcast.splice(0,0,{...action.payload,id: uniqueID()})
                state.songCurrent = 0;
            } else {
                state.songCurrent = indexSong
            }
        }
    }
})

const getCurrentSong = (state) => state.song.songBroadcast[state.song.songCurrent]
const getRequestHideSetting = (state) => state.song.hideAllSetting
const getRequestHeaderVirtual = (state) => state.song.headerVirtual
const getNavActive = (state) => state.song.navActive
const getSongListBroadcast = (state) => state.song.songBroadcast
const getInformationStopBroadcast = (state) => state.song.isReturnTopSong
const getListFavoriteSong = (state) => state.song.favoriteSong
const getCurrentSongPlayList = (state) => state.song.songPlaylist[state.song.songCurrentPlaylist]
const getAllSong = (state) => {
    if(state.song.songCurrentPlaylist===-1) {
        return state.song.songBroadcast[state.song.songCurrent]
    } else {
        return state.song.songPlaylist[state.song.songCurrentPlaylist]
    }
}
export default songSlice
export {
    getCurrentSong,
    getRequestHideSetting,
    getRequestHeaderVirtual,
    getNavActive,
    getSongListBroadcast,
    getInformationStopBroadcast,
    getListFavoriteSong,
    getCurrentSongPlayList,
    getAllSong,
}