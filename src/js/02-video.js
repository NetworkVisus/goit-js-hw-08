import Vimeo from '@vimeo/player';
import _ from 'lodash';

const LS_VIDEOTIME_KEY = 'videoplayer-current-time';
const iframe = document.querySelector('iframe');
const player = new Vimeo(iframe);
window.addEventListener('load', restoreVideoPlaytime);

player.on('timeupdate', _.throttle(handleCurrentTime, 1000));

function handleCurrentTime(time) {
  const currentTime = time.seconds;
  localStorage.setItem(LS_VIDEOTIME_KEY, JSON.stringify(currentTime));
}

function restoreVideoPlaytime() {
  const storedTime = localStorage.getItem(LS_VIDEOTIME_KEY);
  if (storedTime !== null) {
    player.setCurrentTime(JSON.parse(storedTime));
  } else {
    return;
  }
}
