
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

export {changeTimeFromSecondToString}