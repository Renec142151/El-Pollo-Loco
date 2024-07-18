/**
 * Represents the main character in the game.
 * @extends moveableObject
 */
class Character extends moveableObject {
   /**
    * The height of the character.
    * @type {number}
    * @default 300
    */
   height = 300;

   /**
    * The width of the character.
    * @type {number}
    * @default 150
    */
   width = 150;

   /**
    * The y-coordinate of the character.
    * @type {number}
    * @default 155
    */
   y = 155;

   /**
    * The x-coordinate of the character.
    * @type {number}
    * @default 0
    */
   x = 0;

   /**
    * The speed of the character.
    * @type {number}
    * @default 6
    */
   speed = 6;

   /**
    * The energy of the character.
    * @type {number}
    * @default 100
    */
   energy = 100;

   /**
    * The timestamp of the last movement of the character.
    * @type {number}
    * @default Date.now()
    */
   lastMovementTime = Date.now();

   /**
    * Flag to check if the death animation has been played.
    * @type {boolean}
    * @default false
    */
   deathAnimationPlayed = false;

   /**
    * The offset values for the character.
    * @type {Object}
    * @property {number} top - The top offset.
    * @property {number} left - The left offset.
    * @property {number} right - The right offset.
    * @property {number} bottom - The bottom offset.
    */
   offset = {
      top: 120,
      left: 30,
      right: 40,
      bottom: 10,
   };

   /**
    * An array of image paths for the walking animation.
    * @type {string[]}
    */
   IMAGES_WALKING = [
      './img/2_character_pepe/2_walk/W-21.png',
      './img/2_character_pepe/2_walk/W-22.png',
      './img/2_character_pepe/2_walk/W-23.png',
      './img/2_character_pepe/2_walk/W-24.png',
      './img/2_character_pepe/2_walk/W-25.png',
      './img/2_character_pepe/2_walk/W-26.png',
   ];

   /**
    * An array of image paths for the jumping animation.
    * @type {string[]}
    */
   IMAGES_JUMPING = [
      './img/2_character_pepe/3_jump/J-31.png',
      './img/2_character_pepe/3_jump/J-32.png',
      './img/2_character_pepe/3_jump/J-33.png',
      './img/2_character_pepe/3_jump/J-34.png',
      './img/2_character_pepe/3_jump/J-35.png',
      './img/2_character_pepe/3_jump/J-36.png',
      './img/2_character_pepe/3_jump/J-37.png',
      './img/2_character_pepe/3_jump/J-38.png',
      './img/2_character_pepe/3_jump/J-39.png',
   ];

   /**
    * An array of image paths for the dead animation.
    * @type {string[]}
    */
   IMAGES_DEAD = [
      './img/2_character_pepe/5_dead/D-51.png',
      './img/2_character_pepe/5_dead/D-52.png',
      './img/2_character_pepe/5_dead/D-53.png',
      './img/2_character_pepe/5_dead/D-54.png',
      './img/2_character_pepe/5_dead/D-55.png',
      './img/2_character_pepe/5_dead/D-56.png',
      './img/2_character_pepe/5_dead/D-57.png',
   ];

   /**
    * An array of image paths for the hurt animation.
    * @type {string[]}
    */
   IMAGES_HURT = [
      './img/2_character_pepe/4_hurt/H-41.png',
      './img/2_character_pepe/4_hurt/H-42.png',
      './img/2_character_pepe/4_hurt/H-43.png',
   ];

   /**
    * An array of image paths for the idle animation.
    * @type {string[]}
    */
   IMAGES_IDLE = [
      './img/2_character_pepe/1_idle/idle/I-1.png',
      './img/2_character_pepe/1_idle/idle/I-2.png',
      './img/2_character_pepe/1_idle/idle/I-3.png',
      './img/2_character_pepe/1_idle/idle/I-4.png',
      './img/2_character_pepe/1_idle/idle/I-5.png',
      './img/2_character_pepe/1_idle/idle/I-6.png',
      './img/2_character_pepe/1_idle/idle/I-7.png',
      './img/2_character_pepe/1_idle/idle/I-8.png',
      './img/2_character_pepe/1_idle/idle/I-9.png',
      './img/2_character_pepe/1_idle/idle/I-10.png',
   ];

   /**
    * An array of image paths for the sleep animation.
    * @type {string[]}
    */
   IMAGES_SLEEP = [
      './img/2_character_pepe/1_idle/long_idle/I-11.png',
      './img/2_character_pepe/1_idle/long_idle/I-12.png',
      './img/2_character_pepe/1_idle/long_idle/I-13.png',
      './img/2_character_pepe/1_idle/long_idle/I-14.png',
      './img/2_character_pepe/1_idle/long_idle/I-15.png',
      './img/2_character_pepe/1_idle/long_idle/I-16.png',
      './img/2_character_pepe/1_idle/long_idle/I-17.png',
      './img/2_character_pepe/1_idle/long_idle/I-18.png',
      './img/2_character_pepe/1_idle/long_idle/I-19.png',
      './img/2_character_pepe/1_idle/long_idle/I-20.png',
   ];

   /**
    * Creates an instance of Character.
    */
   constructor() {
      super().loadImage('./img/2_character_pepe/2_walk/W-21.png');
      this.loadImages(this.IMAGES_WALKING);
      this.loadImages(this.IMAGES_JUMPING);
      this.loadImages(this.IMAGES_DEAD);
      this.loadImages(this.IMAGES_HURT);
      this.loadImages(this.IMAGES_IDLE);
      this.loadImages(this.IMAGES_SLEEP);
      this.applyGravity();
      this.animate();
   }

   /**
    * Starts the animation loop for the character.
    */
   animate() {
      this.setupMovementInterval();
      this.setupAnimationInterval();
   }

   /**
    * Sets up the movement interval.
    */
   setupMovementInterval() {
      setInterval(() => {
         this.handleMovement();
         this.updateCameraPosition();
      }, 1000 / 60);
   }

   /**
    * Sets up the animation interval.
    */
   setupAnimationInterval() {
      setInterval(() => {
         this.handleAnimation();
      }, 200);
   }

   /**
    * Handles character movement based on keyboard input.
    */
   handleMovement() {
      walkingSound.pause();
      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
         this.moveRight();
         this.otherDirection = false;
         this.playWalkingSound();
      }
      if (this.world.keyboard.LEFT && this.x > 0) {
         this.moveLeft();
         this.otherDirection = true;
         this.playWalkingSound();
      }
      if (this.world.keyboard.SPACE && !this.isAboveGround()) {
         this.jump();
         this.playJumpSound();
      }
      this.lastMovementTime = Date.now();
   }

   /**
    * Plays the walking sound.
    */
   playWalkingSound() {
      walkingSound.play();
   }

   /**
    * Plays the jump sound.
    */
   playJumpSound() {
      jumpSound.play();
   }

   /**
    * Updates the camera position based on the character's position.
    */
   updateCameraPosition() {
      this.world.camera_x = -this.x + 200;
   }

   /**
    * Handles the character's animation based on the current state.
    */
   handleAnimation() {
      sleep.pause();
      if (this.isDead() && !this.deathAnimationPlayed) {
         this.handleDeathAnimation();
      } else if (this.isHurt()) {
         this.handleHurtAnimation();
      } else if (this.isAboveGround()) {
         this.playAnimation(this.IMAGES_JUMPING);
      } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
         this.playAnimation(this.IMAGES_WALKING);
      } else if (Date.now() - this.lastMovementTime > 5000) {
         this.playSleepAnimation();
      } else {
         this.playAnimation(this.IMAGES_IDLE);
      }
   }

   /**
    * Handles the death animation and game over state.
    */
   handleDeathAnimation() {
      if (!this.deathAnimationPlayed) {
         backgroundMusic.pause();
         dead.play();
         this.deathAnimationPlayed = true;
      }
      this.playAnimation(this.IMAGES_DEAD);
      setTimeout(() => {
         this.world.freezeGame = true;
         document.getElementById('gameOver').style.display = 'flex';
         document.getElementById('restartButton').style.display = 'flex';
      }, 600);
   }

   /**
    * Handles the hurt animation.
    */
   handleHurtAnimation() {
      hurt.play();
      this.playAnimation(this.IMAGES_HURT);
   }

   /**
    * Plays the sleep animation and sound.
    */
   playSleepAnimation() {
      sleep.play();
      this.playAnimation(this.IMAGES_SLEEP);
   }
}
