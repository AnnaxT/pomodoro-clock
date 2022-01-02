
// convert seconds to minutes

export const mmss = (value) => {

let minutes = Math.floor(value / 60);
minutes = minutes < 10 ? '0' + minutes : minutes;

let seconds = Math.floor(value % 60);
seconds = seconds < 10 ? '0' + seconds : seconds;

return `${minutes}:${seconds}`;
}