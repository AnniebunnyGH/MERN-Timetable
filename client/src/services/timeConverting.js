function timeStrToNumb(timeString) {
  return timeString.split(":");
}

export function calcMinutes(timeStr) {
  // '10:30'
  const t = timeStrToNumb(timeStr);
  return +t[0] * 60 + +t[1];
}

export function timeNumbToStr(minutes) {
  const h = Math.floor(minutes / 60);
  const m = minutes - h * 60;
  const strH = `${h}`.length === 1 ? `0${h}` : `${h}`;
  const strM = `${m}`.length === 1 ? `0${m}` : `${m}`;
  return strH + ":" + strM;
}
