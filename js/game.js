let canvas;
let world;
let keyboard = new Keyboard();

function init(params) {
   document.getElementById('startScreen').style.display = `none`;
   document.getElementById('startButton').style.display = `none`;
   initLevel(params);
   canvas = document.getElementById('canvas');
   world = new World(canvas, keyboard);
   addTouchEventListeners();
   // backgroundMusic.play();
}

function addTouchEventListeners() {
   document.getElementById('touch-move-left').addEventListener('touchstart', (event) => {
      event.preventDefault();
      keyboard.LEFT = true;
   });

   document.getElementById('touch-move-left').addEventListener('touchend', (event) => {
      event.preventDefault();
      keyboard.LEFT = false;
   });

   document.getElementById('touch-move-right').addEventListener('touchstart', (event) => {
      event.preventDefault();
      keyboard.RIGHT = true;
   });

   document.getElementById('touch-move-right').addEventListener('touchend', (event) => {
      event.preventDefault();
      keyboard.RIGHT = false;
   });

   document.getElementById('touch-jump').addEventListener('touchstart', (event) => {
      event.preventDefault();
      keyboard.SPACE = true;
   });

   document.getElementById('touch-jump').addEventListener('touchend', (event) => {
      event.preventDefault();
      keyboard.SPACE = false;
   });

   document.getElementById('touch-attack').addEventListener('touchstart', (event) => {
      event.preventDefault();
      keyboard.D = true;
   });

   document.getElementById('touch-attack').addEventListener('touchend', (event) => {
      event.preventDefault();
      keyboard.D = false;
   });
}

document.addEventListener('keydown', (event) => {
   if (event.keyCode == 39) {
      keyboard.RIGHT = true;
   }
   if (event.keyCode == 37) {
      keyboard.LEFT = true;
   }

   if (event.keyCode == 38) {
      keyboard.UP = true;
   }
   if (event.keyCode == 40) {
      keyboard.DOWN = true;
   }
   if (event.keyCode == 32) {
      keyboard.SPACE = true;
   }
   if (event.keyCode == 68) {
      keyboard.D = true;
   }
});

document.addEventListener('keyup', (event) => {
   if (event.keyCode == 39) {
      keyboard.RIGHT = false;
   }
   if (event.keyCode == 37) {
      keyboard.LEFT = false;
   }
   if (event.keyCode == 38) {
      keyboard.UP = false;
   }
   if (event.keyCode == 40) {
      keyboard.DOWN = false;
   }
   if (event.keyCode == 32) {
      keyboard.SPACE = false;
   }
   if (event.keyCode == 68) {
      keyboard.D = false;
   }
});

function toggleFullscreen() {
   const fullscreenElement = document.getElementById('fullscreen');
   if (!document.fullscreenElement) {
      if (fullscreenElement.requestFullscreen) {
         fullscreenElement.requestFullscreen();
      } else if (fullscreenElement.mozRequestFullScreen) {
         // Firefox
         fullscreenElement.mozRequestFullScreen();
      } else if (fullscreenElement.webkitRequestFullscreen) {
         // Chrome, Safari and Opera
         fullscreenElement.webkitRequestFullscreen();
      } else if (fullscreenElement.msRequestFullscreen) {
         // IE/Edge
         fullscreenElement.msRequestFullscreen();
      }
   } else {
      if (document.exitFullscreen) {
         document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
         // Firefox
         document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
         // Chrome, Safari and Opera
         document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
         // IE/Edge
         document.msExitFullscreen();
      }
   }
}

function checkOrientation() {
   const rotateMessage = document.getElementById('rotateMessage');
   const canvas = document.getElementById('fullscreen');
   const startScreen = document.getElementById('startScreen');

   if (window.innerWidth <= 900 && window.innerHeight > window.innerWidth) {
      rotateMessage.style.display = 'flex';
      canvas.style.display = 'none';
      startScreen.style.display = 'none';
   } else {
      rotateMessage.style.display = 'none';
      canvas.style.display = 'block';
      startScreen.style.display = 'flex';
   }
}

window.addEventListener('resize', checkOrientation);
window.addEventListener('orientationchange', checkOrientation);

document.addEventListener('DOMContentLoaded', () => {
   checkOrientation();
   document.addEventListener('fullscreenchange', () => {
      const canvas = document.getElementById('canvas');
      const startImage = document.getElementById('startImage');
      if (document.fullscreenElement) {
         canvas.style.width = '100vw';
         canvas.style.height = '100vh';
         startImage.style.width = '100vw';
         startImage.style.height = '100vh';
      } else {
         canvas.style.width = '900px';
         canvas.style.height = '480px';
      }
   });
});

function toggleMute() {
   const soundControl = document.getElementById('soundControl');
   const mutedImage = './img/startscreen/mute.svg';
   const unmutedImage = './img/startscreen/volume_up.svg';

   allSounds.forEach((sound) => {
      sound.muted = !sound.muted;
   });

   if (!allSounds[0].muted) {
      soundControl.src = mutedImage;
   } else {
      soundControl.src = unmutedImage;
   }
}

function toggleMuteTouch() {
   const soundControlTouch = document.getElementById('soundControlTouch');
   const mutedImage = './img/startscreen/mute.svg';
   const unmutedImage = './img/startscreen/volume_up.svg';

   allSounds.forEach((sound) => {
      sound.muted = !sound.muted;
   });

   if (!allSounds[0].muted) {
      soundControlTouch.src = mutedImage;
   } else {
      soundControlTouch.src = unmutedImage;
   }
}
