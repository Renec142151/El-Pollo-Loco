/**
 * Background music for the game.
 * @type {HTMLAudioElement}
 */
const backgroundMusic = new Audio('./audio/music.mp3');
backgroundMusic.loop = true;
backgroundMusic.volume = 0.1;
backgroundMusic.currentTime = 4;

/**
 * Sound effect for jumping.
 * @type {HTMLAudioElement}
 */
const jumpSound = new Audio('./audio/jump.mp3');
jumpSound.loop = false;

/**
 * Sound effect for throwing.
 * @type {HTMLAudioElement}
 */
const throwSound = new Audio('./audio/throw.mp3');

/**
 * Sound effect for walking.
 * @type {HTMLAudioElement}
 */
const walkingSound = new Audio('./audio/walking.mp3');

/**
 * Sound effect for glass breaking.
 * @type {HTMLAudioElement}
 */
const splashGlassSound = new Audio('./audio/glass.mp3');
splashGlassSound.loop = false;

/**
 * Sound effect for chicken dying.
 * @type {HTMLAudioElement}
 */
const chickenDeadSound = new Audio('./audio/chicken.mp3');

/**
 * Sound effect for small chicken dying.
 * @type {HTMLAudioElement}
 */
const smallChickenDeadSound = new Audio('./audio/small-chicken.mp3');

/**
 * Sound effect for collecting a bottle.
 * @type {HTMLAudioElement}
 */
const bottleCollect = new Audio('./audio/bottle.mp3');

/**
 * Sound effect for collecting coins.
 * @type {HTMLAudioElement}
 */
const coinsCollect = new Audio('./audio/coins.mp3');

/**
 * Sound effect for winning.
 * @type {HTMLAudioElement}
 */
const winning = new Audio('./audio/win.mp3');

/**
 * Sound effect for getting hurt.
 * @type {HTMLAudioElement}
 */
const hurt = new Audio('./audio/hurt.mp3');

/**
 * Sound effect for game over.
 * @type {HTMLAudioElement}
 */
const dead = new Audio('./audio/game over.mp3');
dead.loop = false;
dead.volume = 0.3;

/**
 * Sound effect for sleeping.
 * @type {HTMLAudioElement}
 */
const sleep = new Audio('./audio/sleeping.mp3');

/**
 * Array of all game sounds.
 * @type {HTMLAudioElement[]}
 */
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
