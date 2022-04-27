
function changeTimeFromSecondToString (seconds) {
    seconds = Math.floor(seconds)
    const hour = Math.floor(seconds/3600)
    const minute = Math.floor((seconds - hour * 3600)/60)
    const second = seconds - hour*3600 - minute*60
    const changeHour = hour === 0 ? '' : hour < 10 ? `0${hour}:` : `${hour}:`
    const changeMinute = minute < 10 ? `0${minute}` : minute
    const changeSecond = second < 10 ? `0${second}` : second
    return `${changeHour}${changeMinute}:${changeSecond}`
}

function changeScoreToRating (score) {
    score = parseFloat(score)
    if (score < 1) {
        return 0
    } else if (score >=1 && score < 2) {
        return 0.5
    } else if (score >=2 && score < 4) {
        return 1
    } else if (score >=4 && score < 5) {
        return 1.5
    } else if (score >=5 && score < 6) {
        return 2
    } else if (score >=6 && score < 7) {
        return 2.5
    } else if (score >=7 && score < 7.5) {
        return 3
    } else if (score >= 7.5 && score < 8) {
        return 3.5
    } else if (score >=8 && score < 8.5) {
        return 4
    } else if (score >= 8.5 && score < 9.5) {
        return 4.5
    } else {
        return 5
    }

}


export {changeTimeFromSecondToString,changeScoreToRating}