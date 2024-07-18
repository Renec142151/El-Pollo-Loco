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
   world = new World(canvas, keyboard); // Passes the Keyboard object to the World class
   addTouchEventListeners();
   backgroundMusic.play(); // Starts background music
   document.getElementById('startScreen').style.display = `none`;
   document.getElementById('startButton').style.display = `none`;
   document.getElementById('restartButton').style.display = `none`;
   document.getElementById('gameOver').style.display = `none`;
   document.getElementById('winScreen').style.display = `none`;
}

/**
 * Adds touch event listeners for game controls.
 */
function addTouchEventListeners() {
   // Adds event listeners for moving left
   document.getElementById('touch-move-left').addEventListener('touchstart', (event) => {
      event.preventDefault();
      keyboard.LEFT = true;
   });

   document.getElementById('touch-move-left').addEventListener('touchend', (event) => {
      event.preventDefault();
      keyboard.LEFT = false;
   });

   // Adds event listeners for moving right
   document.getElementById('touch-move-right').addEventListener('touchstart', (event) => {
      event.preventDefault();
      keyboard.RIGHT = true;
   });

   document.getElementById('touch-move-right').addEventListener('touchend', (event) => {
      event.preventDefault();
      keyboard.RIGHT = false;
   });

   // Adds event listeners for jumping
   document.getElementById('touch-jump').addEventListener('touchstart', (event) => {
      event.preventDefault();
      keyboard.SPACE = true;
   });

   document.getElementById('touch-jump').addEventListener('touchend', (event) => {
      event.preventDefault();
      keyboard.SPACE = false;
   });

   // Adds event listeners for attacking
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
      case 39: // Right arrow key
         keyboard.RIGHT = true;
         break;
      case 37: // Left arrow key
         keyboard.LEFT = true;
         break;
      case 38: // Up arrow key
         keyboard.UP = true;
         break;
      case 40: // Down arrow key
         keyboard.DOWN = true;
         break;
      case 32: // Space key
         keyboard.SPACE = true;
         break;
      case 68: // 'D' key for attack
         keyboard.D = true;
         break;
   }
});

document.addEventListener('keyup', (event) => {
   switch (event.keyCode) {
      case 39: // Right arrow key
         keyboard.RIGHT = false;
         break;
      case 37: // Left arrow key
         keyboard.LEFT = false;
         break;
      case 38: // Up arrow key
         keyboard.UP = false;
         break;
      case 40: // Down arrow key
         keyboard.DOWN = false;
         break;
      case 32: // Space key
         keyboard.SPACE = false;
         break;
      case 68: // 'D' key for attack
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
      // Firefox
      element.mozRequestFullScreen();
   } else if (element.webkitRequestFullscreen) {
      // Chrome, Safari, and Opera
      element.webkitRequestFullscreen();
   } else if (element.msRequestFullscreen) {
      // IE/Edge
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
      // Firefox
      document.mozCancelFullScreen();
   } else if (document.webkitExitFullscreen) {
      // Chrome, Safari, and Opera
      document.webkitExitFullscreen();
   } else if (document.msExitFullscreen) {
      // IE/Edge
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

function toggleLegalNotice() {
   let legalNotice = document.getElementById('legalNotice');
   if (legalNotice.style.display === 'none' || legalNotice.style.display === '') {
      legalNotice.style.display = 'block';
   } else {
      legalNotice.style.display = 'none';
   }
}

function togglePrivacyPolicy() {
   let privacyPolice = document.getElementById('privacyPolicy');
   if (privacyPolice.style.display === 'none' || privacyPolice.style.display === '') {
      privacyPolice.style.display = 'block';
   } else {
      privacyPolice.style.display = 'none';
   }
}

function restart(params) {
   world.character.ernergy = 100;
   init();
}
