/**
 * The canvas element for the game display.
 * @type {HTMLCanvasElement}
 */
let canvas;

/**
 * The instance of the World class representing the game world.
 * @type {World}
 */
let world;

/**
 * The Keyboard object to monitor user inputs.
 * @type {Keyboard}
 */
let keyboard = new Keyboard();

let bottleThrown = false;

/**
 * Initializes the game and hides the start screen.
 * Creates a new instance of the World class and adds touch event listeners.
 * @param {Object} params - Parameters for the level.
 */
function init() {
   initLevel();
   canvas = document.getElementById('canvas');
   world = new World(canvas, keyboard);
   addTouchEventListeners();
   backgroundMusic.play();
   resetOverlayElements();
}

/**
 * Adds touch event listeners for game controls.
 */
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
      bottleThrown = true;
   });
}

/**
 * Handles keyboard inputs for the game.
 */
document.addEventListener('keydown', (event) => {
   switch (event.keyCode) {
      case 39:
         keyboard.RIGHT = true;
         break;
      case 37:
         keyboard.LEFT = true;
         break;
      case 38:
         keyboard.UP = true;
         break;
      case 40:
         keyboard.DOWN = true;
         break;
      case 32:
         keyboard.SPACE = true;
         break;
      case 68:
         keyboard.D = true;
         bottleThrown = true;
         break;
   }
});

document.addEventListener('keyup', (event) => {
   switch (event.keyCode) {
      case 39:
         keyboard.RIGHT = false;
         break;
      case 37:
         keyboard.LEFT = false;
         break;
      case 38:
         keyboard.UP = false;
         break;
      case 40:
         keyboard.DOWN = false;
         break;
      case 32:
         keyboard.SPACE = false;
         break;
      case 68:
         keyboard.D = false;
         bottleThrown = true;
         break;
   }
});

/**
 * Requests the browser to enter fullscreen mode for the given element.
 * Handles different browser implementations.
 * @param {Element} element - The DOM element to be displayed in fullscreen mode.
 */
function requestFullscreen(element) {
   if (element.requestFullscreen) {
      element.requestFullscreen();
   } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
   } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
   } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
   }
}

/**
 * Requests the browser to exit fullscreen mode.
 * Handles different browser implementations.
 */
function exitFullscreen() {
   if (document.exitFullscreen) {
      document.exitFullscreen();
   } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
   } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
   } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
   }
}

/**
 * Toggles fullscreen mode for the element with the ID 'fullscreen'.
 * If the browser is not in fullscreen mode, it requests fullscreen for the element.
 * If the browser is in fullscreen mode, it requests to exit fullscreen.
 */
function toggleFullscreen() {
   const fullscreenElement = document.getElementById('fullscreen');
   if (!document.fullscreenElement) {
      requestFullscreen(fullscreenElement);
   } else {
      exitFullscreen();
   }
}

/**
 * Checks the screen orientation and displays a corresponding message if the device is in portrait mode.
 */
function checkOrientation() {
   const rotateMessage = document.getElementById('rotateMessage');
   const canvas = document.getElementById('fullscreen');

   if (window.innerWidth <= 930 && window.innerHeight > window.innerWidth) {
      rotateMessage.style.display = 'flex';
      canvas.style.display = 'none';
   } else {
      rotateMessage.style.display = 'none';
      canvas.style.display = 'block';
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
         startImage.style.width = '900px';
         startImage.style.height = '480px';
      }
   });
});

/**
 * Toggles the mute function for the sound and changes the icon accordingly.
 */
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

/**
 * Toggles the mute function for the sound in touch controls and changes the icon accordingly.
 */
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

/**
 * Displays the controls dialog.
 */
function showControls() {
   const controlsDialog = document.getElementById('controlsDialog');
   controlsDialog.showModal();
}

/**
 * Closes the controls dialog.
 */
function closeControls() {
   const controlsDialog = document.getElementById('controlsDialog');
   controlsDialog.close();
}

/**
 * Toggles the visibility of the legal notice.
 */
function toggleLegalNotice() {
   let legalNotice = document.getElementById('legalNotice');
   if (legalNotice.style.display === 'none' || legalNotice.style.display === '') {
      legalNotice.style.display = 'block';
   } else {
      legalNotice.style.display = 'none';
   }
}

/**
 * Toggles the visibility of the privacy policy.
 */
function togglePrivacyPolicy() {
   let privacyPolicy = document.getElementById('privacyPolicy');
   if (privacyPolicy.style.display === 'none' || privacyPolicy.style.display === '') {
      privacyPolicy.style.display = 'block';
   } else {
      privacyPolicy.style.display = 'none';
   }
}

/**
 * Restarts the game by resetting the character's energy and re-initializing the game world.
 * @param {Object} params - Additional parameters for the restart function (currently not used).
 */
function restart() {
   if (world) {
      world.pauseGame();
   }
   backgroundMusic.pause();
   backgroundMusic.currentTime = 0;
   backgroundMusic.play();
   init();
}

/**
 * Hides all overlay elements on the game screen.
 *
 * This function sets the display style of various overlay elements
 * to 'none', effectively hiding the start screen, start button,
 * restart button, game over screen, and win screen.
 */
function resetOverlayElements() {
   document.getElementById('startScreen').style.display = 'none';
   document.getElementById('startButton').style.display = 'none';
   document.getElementById('restartButton').style.display = 'none';
   document.getElementById('gameOver').style.display = 'none';
   document.getElementById('winScreen').style.display = 'none';
}
