import cPopList from "./cpop"
import lunarNewYear from "./Playlist/lunarNewYear"
import usukList from "./Playlist/usuk"
import vPopList from "./vpop"

const songSearchTop = [
    {   
        id: 1,
        kind: "Pop",
        img: "https://hoangphuc0304.github.io/V-Music/assets/image/kind_sontungmtp_2.png",
        color: '#ba5d07'
    },
    {   
        id: 2,
        kind: "Rap",
        img: "https://hoangphuc0304.github.io/V-Music/assets/image/kind_denvau.jpg",
        color: '#27856a'
    },
]

const songSearchList = [
    {   
        id: 1,
        kind: "Chill",
        img: "https://hoangphuc0304.github.io/V-Music/assets/image/kind_lofi.jpg",
        color: '#e8115b'
    },
    {   
        id: 2,
        kind: "Mood",
        img: "https://hoangphuc0304.github.io/V-Music/assets/image/kind_vu.jpg",
        color: '#148a08'
    },
    {   
        id: 3,
        kind: "Romance",
        img: "https://hoangphuc0304.github.io/V-Music/assets/image/kind_amee.jpg",
        color: '#8c1932'
    },
    {   
        id: 4,
        kind: "R&B",
        img: "https://hoangphuc0304.github.io/V-Music/assets/image/kind_chungta.png",
        color: '#6ad176'
    },
    {   
        id: 5,
        kind: "V-POP",
        img: "https://hoangphuc0304.github.io/V-Music/assets/image/kind_sontungmtp_1.jpg",
        color: '#608108'
    },
    {   
        id: 6,
        kind: "C-POP",
        img: "https://hoangphuc0304.github.io/V-Music/assets/image/kind_cpop.jpg",
        color: '#e61e32'
    },
    {   
        id: 7,
        kind: "US&UK",
        img: "https://hoangphuc0304.github.io/V-Music/assets/image/kind_usuk.jpg",
        color: '#ba5d07'
    },
    {   
        id: 8,
        kind: "K-POP",
        img: "https://hoangphuc0304.github.io/V-Music/assets/image/kind_bts.jpg",
        color: '#e13300'
    },
    {   
        id: 9,
        kind: "Lunar New Year",
        img: "https://hoangphuc0304.github.io/V-Music/assets/image/kind_newyear.jpg",
        color: '#ff6437'
    },
    {   
        id: 10,
        kind: "Summer",
        img: "https://hoangphuc0304.github.io/V-Music/assets/image/kind_summer.jpg",
        color: '#dc148c'
    },
    {   
        id: 11,
        kind: "Autumn",
        img: "https://hoangphuc0304.github.io/V-Music/assets/image/kind_autumn.jpg",
        color: '#777777'
    },
    {   
        id: 12,
        kind: "Christmas",
        img: "https://hoangphuc0304.github.io/V-Music/assets/image/kind_christmas.jpg",
        color: '#3E9E64'
    },
    {   
        id: 13,
        kind: "Sleep",
        img: "https://hoangphuc0304.github.io/V-Music/assets/image/kind_cat.jpg",
        color: '#8d67ab'
    },
    {   
        id: 14,
        kind: "Gaming",
        img: "https://hoangphuc0304.github.io/V-Music/assets/image/kind_game.jpg",
        color: '#477d95'
    },
    {   
        id: 15,
        kind: "Instrumental",
        img: "https://hoangphuc0304.github.io/V-Music/assets/image/kind_instrument.jpg",
        color: '#F66031'
    },
    {   
        id: 16,
        kind: "Dance / Electronic",
        img: "https://hoangphuc0304.github.io/V-Music/assets/image/kind_dance.jpg",
        color: '#509bf5'
    },
]

const iconForWeather = [
    {
        id: 1,
        mainIcon: 'bi bi-sun-fill icon-sun',
        supportIcon: 'bi bi-cloud-fill icon-cloud'
    },
    {
        id: 2,
        mainIcon: 'bi bi-sun-fill icon-sun',
        supportIcon: ''
    },
    {
        id: 3,
        mainIcon: 'bi bi-cloud-drizzle-fill icon-rain',
        supportIcon: ''
    },
    {
        id: 4,
        mainIcon: 'bi bi-moon-stars-fill icon-moon',
        supportIcon: 'bi bi-cloud-fill icon-cloud'
    },
]
const iconWaveGif = "https://hoangphuc0304.github.io/V-Music/assets/image/icon-playing.gif"

const songSearchAll = {
    pop: [],
    rap: [],
    chill: [],
    mood: [],
    romance: [],
    r_and_b: [],
    vPop: [...vPopList],
    cPop: [...cPopList],
    usuk: [...usukList],
    kPop: [],
    lunarNewYear: [...lunarNewYear],
    summer: [],
    autumn: [],
    christmas: [],
    sleep: [],
    gaming: [],
    instrumental: [],
    d_and_e: [],
}

export default songSearchAll
export {songSearchTop,songSearchList,iconForWeather,iconWaveGif}