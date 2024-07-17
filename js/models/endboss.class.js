/**
 * Represents the endboss character in the game.
 * Manages the endboss's movement, attacks, animations, and interactions with the player.
 * @extends moveableObject
 */
class Endboss extends moveableObject {
   /**
    * The height of the endboss.
    * @type {number}
    * @default 400
    */
   height = 400;

   /**
    * The width of the endboss.
    * @type {number}
    * @default 400
    */
   width = 400;

   /**
    * The y-coordinate of the endboss.
    * @type {number}
    * @default 90
    */
   y = 90;

   /**
    * The current energy level of the endboss.
    * @type {number}
    * @default 100
    */
   energy = 100;

   /**
    * Offset values for the endboss.
    * @type {Object}
    * @property {number} top - The top offset.
    * @property {number} left - The left offset.
    * @property {number} right - The right offset.
    * @property {number} bottom - The bottom offset.
    */
   offset = {
      top: 100,
      left: 30,
      right: 40,
      bottom: 30,
   };

   /**
    * Array of image paths for the endboss's walking animation.
    * @type {string[]}
    */
   IMAGES_WALKING = [
      './img/4_enemie_boss_chicken/2_alert/G5.png',
      './img/4_enemie_boss_chicken/2_alert/G6.png',
      './img/4_enemie_boss_chicken/2_alert/G7.png',
      './img/4_enemie_boss_chicken/2_alert/G8.png',
      './img/4_enemie_boss_chicken/2_alert/G9.png',
      './img/4_enemie_boss_chicken/2_alert/G10.png',
      './img/4_enemie_boss_chicken/2_alert/G11.png',
      './img/4_enemie_boss_chicken/2_alert/G12.png',
   ];

   /**
    * Array of image paths for the endboss's attack animation.
    * @type {string[]}
    */
   IMAGES_ATTACK = [
      './img/4_enemie_boss_chicken/3_attack/G13.png',
      './img/4_enemie_boss_chicken/3_attack/G14.png',
      './img/4_enemie_boss_chicken/3_attack/G15.png',
      './img/4_enemie_boss_chicken/3_attack/G16.png',
      './img/4_enemie_boss_chicken/3_attack/G17.png',
      './img/4_enemie_boss_chicken/3_attack/G18.png',
      './img/4_enemie_boss_chicken/3_attack/G19.png',
      './img/4_enemie_boss_chicken/3_attack/G20.png',
   ];

   /**
    * Array of image paths for the endboss's death animation.
    * @type {string[]}
    */
   IMAGES_DEAD = [
      './img/4_enemie_boss_chicken/5_dead/G24.png',
      './img/4_enemie_boss_chicken/5_dead/G25.png',
      './img/4_enemie_boss_chicken/5_dead/G26.png',
   ];

   /**
    * Array of image paths for the endboss's hurt animation.
    * @type {string[]}
    */
   IMAGES_HURT = [
      './img/4_enemie_boss_chicken/4_hurt/G21.png',
      './img/4_enemie_boss_chicken/4_hurt/G22.png',
      './img/4_enemie_boss_chicken/4_hurt/G23.png',
   ];

   /**
    * The world object containing game state information.
    * @type {Object}
    */
   world;

   /**
    * Flag indicating if the endboss is currently moving because of an attack.
    * @type {boolean}
    * @default false
    */
   isMovingBecauseOfAttack = false;

   /**
    * Interval ID for the walking animation.
    * @type {number}
    */
   animationInterval;

   /**
    * Interval ID for the endboss's movement during an attack.
    * @type {number}
    */
   moveLeftInterval;

   /**
    * Flag indicating if the endboss has been hit.
    * @type {boolean}
    * @default false
    */
   hasHit = false;

   /**
    * Creates an instance of Endboss.
    * Initializes the images for different animations and starts the walking animation.
    */
   constructor() {
      super().loadImage(this.IMAGES_WALKING[0]);
      this.loadImages(this.IMAGES_WALKING);
      this.loadImages(this.IMAGES_ATTACK);
      this.loadImages(this.IMAGES_DEAD);
      this.loadImages(this.IMAGES_HURT);
      this.speed = 2;
      this.x = 2300;
      this.animate();
   }

   /**
    * Starts the walking animation and sets up intervals for animations.
    * The endboss will move left and play the walking animation.
    */
   animate() {
      this.animationInterval = setInterval(() => {
         this.playAnimation(this.IMAGES_WALKING);
      }, 200);
   }

   /**
    * Handles the event when the endboss gets hit by a bottle.
    * Reduces the endboss's energy, plays the attack animation, or starts the death animation if energy is depleted.
    */
   getsHitByBottle() {
      clearInterval(this.animationInterval);
      // this.playHurtAnimation();
      this.energy -= 20;
      if (this.energy <= 0) {
         this.energy = 0;
         this.playDeadAnimation();
         setTimeout(() => {
            this.world.freezeGame = true;
            document.getElementById('winScreen').style.display = 'flex';
            document.getElementById('restartButton').style.display = 'flex';
         }, 600);
      } else {
         this.playAttackAnimation();
      }
   }

   /**
    * Starts the attack animation and movement for the endboss.
    * Moves the endboss left and plays the attack animation.
    */
   playAttackAnimation() {
      if (!this.isMovingBecauseOfAttack) {
         this.moveLeftInterval = setInterval(() => {
            this.moveLeft();
         }, 1000 / 60);
         setInterval(() => {
            this.playAnimation(this.IMAGES_ATTACK);
         }, 200);
         this.isMovingBecauseOfAttack = true;
      }
   }

   /**
    * Plays the endboss's death animation and handles game state changes.
    * Pauses the background music and plays the winning sound.
    */
   playDeadAnimation() {
      let deadIndex = 0;
      const deadInterval = setInterval(() => {
         if (deadIndex < this.IMAGES_DEAD.length) {
            this.loadImage(this.IMAGES_DEAD[deadIndex]);
            deadIndex++;
         } else {
            clearInterval(deadInterval);
         }
      }, 200);
      backgroundMusic.pause();
      winning.play();
   }
}

//   playHurtAnimation() {
//    const intervalId = setInterval(() => {
//       this.playAnimation(this.IMAGES_HURT);
//   }, 100);

//   setTimeout(() => {
//       clearInterval(intervalId);
//   }, 1000);
// }
