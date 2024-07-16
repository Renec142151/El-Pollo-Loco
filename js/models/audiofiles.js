const backgroundMusic = new Audio('./audio/music.mp3');
backgroundMusic.loop = true;
backgroundMusic.volume = 0.2;
backgroundMusic.currentTime = 4;

// Sound-Effekte
const jumpSound = new Audio('./audio/jump.mp3');
jumpSound.loop = false;
const throwSound = new Audio('./audio/throw.mp3');
const walkingSound = new Audio('./audio/walking.mp3');
const splashGlassSound = new Audio('./audio/glass.mp3');
splashGlassSound.loop = false;
const chickenDeadSound = new Audio('./audio/chicken.mp3');
const smallChickenDeadSound = new Audio('./audio/small-chicken.mp3');
const bottleCollect = new Audio('./audio/bottle.mp3');
const coinsCollect = new Audio('./audio/coins.mp3');
const winning = new Audio('./audio/win.mp3');
const hurt = new Audio('./audio/hurt.mp3');
const dead = new Audio('./audio/game over.mp3');
dead.loop = false;
dead.volume = 0.3;
const sleep = new Audio('./audio/sleeping.mp3');

const allSounds = [
   backgroundMusic,
   jumpSound,
   throwSound,
   walkingSound,
   splashGlassSound,
   chickenDeadSound,
   smallChickenDeadSound,
   bottleCollect,
   coinsCollect,
   winning,
   hurt,
   dead,
   sleep,
];
