/**
 * Represents a small chicken enemy in the game.
 * Extends the moveableObject class to include movement and collision functionality.
 */
class SmallChicken extends moveableObject {
   /**
    * The height of the small chicken.
    * @type {number}
    * @default 45
    */
   height = 45;

   /**
    * The width of the small chicken.
    * @type {number}
    * @default 45
    */
   width = 45;

   /**
    * The vertical position of the small chicken.
    * @type {number}
    * @default 400
    */
   y = 400;

   /**
    * The energy level of the small chicken.
    * Determines how many hits it can take before dying.
    * @type {number}
    * @default 5
    */
   energy = 5;

   /**
    * The offset values used for collision detection and rendering of the small chicken.
    * @type {Object}
    * @property {number} top - The top offset.
    * @property {number} left - The left offset.
    * @property {number} right - The right offset.
    * @property {number} bottom - The bottom offset.
    */
   offset = {
      top: -15,
      left: -15,
      right: -15,
      bottom: -15,
   };

   /**
    * Array of image paths for the walking animation of the small chicken.
    * @type {string[]}
    */
   IMAGES_WALKING = [
      './img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
      './img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
      './img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
   ];

   /**
    * Image path for the dead state of the small chicken.
    * @type {string}
    */
   IMAGE_DEAD = './img/3_enemies_chicken/chicken_small/2_dead/dead.png';

   /**
    * Initializes a new instance of the SmallChicken class.
    * Loads images, sets the initial position, and starts the animation.
    */
   constructor() {
      super().loadImage(this.IMAGES_WALKING[0]);
      this.loadImages(this.IMAGES_WALKING);
      this.x = 500 + Math.random() * 2500;
      this.speed = 0.3 + Math.random() * 0.5;
      this.animate();
   }

   /**
    * Starts the walking animation and movement for the small chicken.
    * Moves the chicken to the left and plays the walking animation.
    */
   animate() {
      this.walkingInterval = setInterval(() => {
         this.moveLeft();
      }, 1000 / 60);

      this.animationInterval = setInterval(() => {
         this.playAnimation(this.IMAGES_WALKING);
      }, 100);
   }

   /**
    * Reduces the energy of the small chicken when hit by a bottle.
    * If the energy falls to 0 or below, the small chicken dies.
    */
   getsHitByBottle() {
      this.energy -= 5;
      if (this.energy <= 0) {
         this.chickenIsDead();
      }
   }

   /**
    * Reduces the energy of the small chicken when hit by the character.
    * If the energy falls to 0 or below, the small chicken dies.
    */
   getsHitByCharacter() {
      this.energy -= 10;
      if (this.energy <= 0) {
         this.chickenIsDead();
      }
   }

   /**
    * Handles the death of the small chicken.
    * Stops the walking and animation intervals, updates the image to the dead state,
    * plays the death sound, and marks the chicken as dead.
    */
   chickenIsDead() {
      clearInterval(this.walkingInterval);
      clearInterval(this.animationInterval);
      this.loadImage(this.IMAGE_DEAD);
      smallChickenDeadSound.play();
      this.dead = true;
   }
}
