/**
 * Das Canvas-Element für die Spielanzeige.
 * @type {HTMLCanvasElement}
 */
let canvas;

/**
 * Die Instanz der World-Klasse, die die Spielwelt darstellt.
 * @type {World}
 */
let world;

/**
 * Das Keyboard-Objekt zur Überwachung der Benutzereingaben.
 * @type {Keyboard}
 */
let keyboard = new Keyboard();

/**
 * Initialisiert das Spiel und versteckt den Startbildschirm.
 * Erstellt eine neue Instanz der World-Klasse und fügt Touch-Event-Listener hinzu.
 * @param {Object} params - Parameter für das Level.
 */
function init(params) {
   document.getElementById('startScreen').style.display = `none`;
   document.getElementById('startButton').style.display = `none`;
   initLevel(params);
   canvas = document.getElementById('canvas');
   world = new World(canvas, keyboard); // Übergibt das Keyboard-Objekt an die World-Klasse
   addTouchEventListeners();
   backgroundMusic.play(); // Startet die Hintergrundmusik
}

/**
 * Fügt Touch-Event-Listener für die Steuerung des Spiels hinzu.
 */
function addTouchEventListeners() {
   // Fügt Event-Listener für die Steuerung nach links hinzu
   document.getElementById('touch-move-left').addEventListener('touchstart', (event) => {
      event.preventDefault();
      keyboard.LEFT = true;
   });

   document.getElementById('touch-move-left').addEventListener('touchend', (event) => {
      event.preventDefault();
      keyboard.LEFT = false;
   });

   // Fügt Event-Listener für die Steuerung nach rechts hinzu
   document.getElementById('touch-move-right').addEventListener('touchstart', (event) => {
      event.preventDefault();
      keyboard.RIGHT = true;
   });

   document.getElementById('touch-move-right').addEventListener('touchend', (event) => {
      event.preventDefault();
      keyboard.RIGHT = false;
   });

   // Fügt Event-Listener für das Springen hinzu
   document.getElementById('touch-jump').addEventListener('touchstart', (event) => {
      event.preventDefault();
      keyboard.SPACE = true;
   });

   document.getElementById('touch-jump').addEventListener('touchend', (event) => {
      event.preventDefault();
      keyboard.SPACE = false;
   });

   // Fügt Event-Listener für den Angriff hinzu
   document.getElementById('touch-attack').addEventListener('touchstart', (event) => {
      event.preventDefault();
      keyboard.D = true;
   });

   document.getElementById('touch-attack').addEventListener('touchend', (event) => {
      event.preventDefault();
      keyboard.D = false;
   });
}

/**
 * Verarbeitet die Tasteneingaben für das Spiel.
 */
document.addEventListener('keydown', (event) => {
   switch (event.keyCode) {
      case 39: // Pfeiltaste nach rechts
         keyboard.RIGHT = true;
         break;
      case 37: // Pfeiltaste nach links
         keyboard.LEFT = true;
         break;
      case 38: // Pfeiltaste nach oben
         keyboard.UP = true;
         break;
      case 40: // Pfeiltaste nach unten
         keyboard.DOWN = true;
         break;
      case 32: // Leertaste
         keyboard.SPACE = true;
         break;
      case 68: // 'D' für Angriff
         keyboard.D = true;
         break;
   }
});

document.addEventListener('keyup', (event) => {
   switch (event.keyCode) {
      case 39: // Pfeiltaste nach rechts
         keyboard.RIGHT = false;
         break;
      case 37: // Pfeiltaste nach links
         keyboard.LEFT = false;
         break;
      case 38: // Pfeiltaste nach oben
         keyboard.UP = false;
         break;
      case 40: // Pfeiltaste nach unten
         keyboard.DOWN = false;
         break;
      case 32: // Leertaste
         keyboard.SPACE = false;
         break;
      case 68: // 'D' für Angriff
         keyboard.D = false;
         break;
   }
});

/**
 * Schaltet den Vollbildmodus ein oder aus.
 */
function toggleFullscreen() {
   const fullscreenElement = document.getElementById('fullscreen');
   if (!document.fullscreenElement) {
      if (fullscreenElement.requestFullscreen) {
         fullscreenElement.requestFullscreen();
      } else if (fullscreenElement.mozRequestFullScreen) {
         // Firefox
         fullscreenElement.mozRequestFullScreen();
      } else if (fullscreenElement.webkitRequestFullscreen) {
         // Chrome, Safari und Opera
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
         // Chrome, Safari und Opera
         document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
         // IE/Edge
         document.msExitFullscreen();
      }
   }
}

/**
 * Überprüft die Bildschirmorientierung und zeigt eine entsprechende Nachricht an, wenn das Gerät im Hochformat ist.
 */
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

/**
 * Schaltet die Ton-Mute-Funktion um und ändert das Symbol entsprechend.
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
 * Schaltet die Ton-Mute-Funktion für die Touch-Steuerung um und ändert das Symbol entsprechend.
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
 * Zeigt das Steuerungsdialogfeld an.
 */
function showControls() {
   const controlsDialog = document.getElementById('controlsDialog');
   controlsDialog.showModal();
}

/**
 * Schließt das Steuerungsdialogfeld.
 */
function closeControls() {
   const controlsDialog = document.getElementById('controlsDialog');
   controlsDialog.close();
}
