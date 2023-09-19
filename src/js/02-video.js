import Vimeo from '@vimeo/player';

console.log('24');
const iframe = document.querySelector('iframe');
const player = new Vimeo(iframe);

player.on('play', function () {
  console.log('played the video!');
});

player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});
