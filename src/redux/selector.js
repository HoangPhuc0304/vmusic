import { createSelector } from "@reduxjs/toolkit";
import songSearchAll from "../fakeAPI/api/songAPI";

const textSearchSelector = (state) => state.song.search
const searchResultSelector = createSelector(
    textSearchSelector,
    (textSearch) => {
        textSearch = textSearch.toLowerCase()
        if (textSearch) {
            return Object.keys(songSearchAll).map((key) => (
                songSearchAll[key] && songSearchAll[key].filter((item) => (
                    item.song.toLowerCase().includes(textSearch.toLowerCase())
                ))
            ))
        } else {
            return {}
        }
    }
)

export {searchResultSelector} 