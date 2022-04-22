import vpopList from "../fakeAPI/api/vpop";

const randomChart = (list) => {
    let listChart = []
    let countItem = listChart.length
    while (countItem < 10) {
        let numberRandom = Math.floor(Math.random()*100)
        if (numberRandom <= 15) {
            if (listChart.includes(list[0])===false) {
                listChart.push(list[0])
                countItem++
            }
        } else if (numberRandom>15 && numberRandom<=30) {
            var fourRandom=Math.floor(Math.random() * 4) + 1
            if (listChart.includes(list[fourRandom])===false) {
                listChart.push(list[fourRandom])
                countItem++
            }
        } else if (numberRandom>30 && numberRandom<=50) {
            var tenRandom=Math.floor(Math.random() * 10) + 5
            if (listChart.includes(list[tenRandom])===false) {
                listChart.push(list[tenRandom])
                countItem++
            }
        } else {
            var remainRandom=Math.floor(Math.random() * (list.length - 15)) + 15
            if (listChart.includes(list[remainRandom])===false) {
                listChart.push(list[remainRandom])
                countItem++
            }
        }
    }
    return listChart.map((item,index) => (
        {
            ...item,
            status: randomStatus(index)
        }
    ))
}
const randomStatus = (index) => {
    const statusList = ['ti-arrow-up green','ti-arrow-left','ti-arrow-down red']
    if (index === 0){
        return 'ti-arrow-up green'
    } 
    return statusList[Math.floor(Math.random()*statusList.length)]
}

const randomTrending = (index) => {
    const trendingList = [
    {
        color: 'green',
        kind: "trending"
    },
    {
        color: 'orange',
        kind: "new",
    },
    {
        color: '',
        kind: "",
    },
    ]
    
    if (index === 0){
        return trendingList[0]
    } 
    let random = Math.floor(Math.random()*100)
    if (random <= 5) {
        return trendingList[0] 
    } else if (random >5 && random <=20) {
        return trendingList[1]
    }
    return trendingList[2]
}

export  {randomChart,randomStatus,randomTrending}