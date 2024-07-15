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
}

function addTouchEventListeners() {
   document.getElementById('touch-move-left').addEventListener('touchstart', () => (keyboard.LEFT = true));
   document.getElementById('touch-move-left').addEventListener('touchend', () => (keyboard.LEFT = false));

   document.getElementById('touch-move-right').addEventListener('touchstart', () => (keyboard.RIGHT = true));
   document.getElementById('touch-move-right').addEventListener('touchend', () => (keyboard.RIGHT = false));

   document.getElementById('touch-jump').addEventListener('touchstart', () => (keyboard.SPACE = true));
   document.getElementById('touch-jump').addEventListener('touchend', () => (keyboard.SPACE = false));

   document.getElementById('touch-attack').addEventListener('touchstart', () => (keyboard.D = true));
   document.getElementById('touch-attack').addEventListener('touchend', () => (keyboard.D = false));
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
   const canvas = document.getElementById('canvas');
   const touchElements = document.getElementById('touchElements');

   if (window.innerWidth <= 900 && window.innerHeight > window.innerWidth) {
      rotateMessage.style.display = 'flex';
      canvas.style.display = 'none';
      // touchElements.style.display = 'none'; // Versteckt die Touch-Elemente im Hochformat
   } else {
      rotateMessage.style.display = 'none';
      canvas.style.display = 'block';
      // touchElements.style.display = 'flex';
   }
}

window.addEventListener('resize', checkOrientation);
window.addEventListener('orientationchange', checkOrientation);

document.addEventListener('DOMContentLoaded', () => {
   checkOrientation();
   document.addEventListener('fullscreenchange', () => {
      const canvas = document.getElementById('canvas');
      if (document.fullscreenElement) {
         canvas.style.width = '100vw';
         canvas.style.height = '100vh';
      } else {
         canvas.style.width = '900px';
         canvas.style.height = '480px';
      }
   });
});
