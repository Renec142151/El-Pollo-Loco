/**
 * Represents a throwable object in the game, such as a bottle.
 * Extends the moveableObject class to handle movement and interactions.
 */
class ThrowableObject extends moveableObject {
   /**
    * Array of image paths for the bottle's rotation animation.
    * @type {string[]}
    */
   BOTTLE_ROTATION = [
      './img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
      './img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
      './img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
      './img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
   ];

   /**
    * Array of image paths for the bottle's splash animation.
    * @type {string[]}
    */
   BOTTLE_SPLASH = [
      './img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
      './img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
      './img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
      './img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
      './img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
      './img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
   ];

   /**
    * Interval ID for the bottle's rotation animation.
    * @type {number}
    */
   throwAnimationInterval;

   /**
    * Interval ID for the bottle's splash animation.
    * @type {number}
    */
   splashAnimationInterval;

   /**
    * Flag indicating whether the bottle has hit a target.
    * @type {boolean}
    * @default false
    */
   hasHit = false;

   /**
    * Flag indicating whether the character throwing the bottle is facing the other direction.
    * @type {boolean}
    * @default false
    */
   isCharacterOtherDirection = false;

   /**
    * Creates an instance of ThrowableObject.
    * @param {number} x - The x-coordinate for the bottle's initial position.
    * @param {number} y - The y-coordinate for the bottle's initial position.
    * @param {boolean} isCharacterOtherDirection - Indicates if the character is facing the opposite direction.
    */
   constructor(x, y, isCharacterOtherDirection) {
      super().loadImage('./img/7_statusbars/3_icons/icon_salsa_bottle.png');
      this.isCharacterOtherDirection = isCharacterOtherDirection;
      this.loadImages(this.BOTTLE_ROTATION);
      this.loadImages(this.BOTTLE_SPLASH);
      this.x = x;
      this.y = y;
      this.width = 100;
      this.height = 100;
      this.throw();
   }

   /**
    * Initiates the throw action for the bottle.
    * Sets the vertical speed, applies gravity, and starts the throw animation.
    */
   throw() {
      this.speedY = 30;
      this.applyGravity();
      this.throwAnimation();
      setInterval(() => {
         if (this.isCharacterOtherDirection) {
            this.x -= 10;
         } else {
            this.x += 10;
         }
      }, 25);
   }

   /**
    * Starts the bottle's rotation animation during the throw.
    * Rotates the bottle using the images in BOTTLE_ROTATION.
    */
   throwAnimation() {
      this.throwAnimationInterval = setInterval(() => {
         this.playAnimation(this.BOTTLE_ROTATION);
      }, 80);
   }

   /**
    * Starts the splash animation when the bottle hits a target.
    * Plays the splash sound and shows the splash animation.
    */
   bottleSplashAnimation() {
      splashGlassSound.play();
      clearInterval(this.throwAnimationInterval);
      let splashFrameIndex = 0;
      this.splashAnimationInterval = setInterval(() => {
         if (splashFrameIndex < this.BOTTLE_SPLASH.length) {
            this.playAnimation(this.BOTTLE_SPLASH);
            splashFrameIndex++;
         } else {
            clearInterval(this.splashAnimationInterval);
         }
      }, 80);
   }
}
