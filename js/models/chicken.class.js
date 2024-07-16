/**
 * Represents a chicken enemy in the game.
 * @extends moveableObject
 */
class Chicken extends moveableObject {
   /**
    * The height of the chicken.
    * @type {number}
    * @default 90
    */
   height = 90;

   /**
    * The width of the chicken.
    * @type {number}
    * @default 90
    */
   width = 90;

   /**
    * The y-coordinate of the chicken.
    * @type {number}
    * @default 360
    */
   y = 360;

   /**
    * The energy level of the chicken.
    * @type {number}
    * @default 5
    */
   energy = 5;

   /**
    * The offset values for the chicken.
    * @type {Object}
    * @property {number} top - The top offset.
    * @property {number} left - The left offset.
    * @property {number} right - The right offset.
    * @property {number} bottom - The bottom offset.
    */
   offset = {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
   };

   /**
    * An array of image paths for the walking animation.
    * @type {string[]}
    */
   IMAGES_WALKING = [
      './img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
      './img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
      './img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
   ];

   /**
    * The image path for the dead chicken.
    * @type {string}
    */
   IMAGE_DEAD = './img/3_enemies_chicken/chicken_normal/2_dead/dead.png';

   /**
    * Creates an instance of Chicken.
    */
   constructor() {
      super().loadImage(this.IMAGES_WALKING[0]);
      this.loadImages(this.IMAGES_WALKING);
      this.x = 500 + Math.random() * 2000;
      this.speed = 0.15 + Math.random() * 0.5;
      this.animate();
   }

   /**
    * Animates the chicken's movement and walking animation.
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
    * Reduces the chicken's energy when hit by a bottle and checks if the chicken is dead.
    */
   getsHitByBottle() {
      this.energy -= 5;
      if (this.energy <= 0) {
         this.chickenIsDead();
      }
   }

   /**
    * Reduces the chicken's energy when hit by the character and checks if the chicken is dead.
    */
   getsHitByCharacter() {
      this.energy -= 10;
      if (this.energy <= 0) {
         this.chickenIsDead();
      }
   }

   /**
    * Handles the chicken's death by stopping animations and loading the dead image.
    */
   chickenIsDead() {
      clearInterval(this.walkingInterval);
      clearInterval(this.animationInterval);
      this.loadImage(this.IMAGE_DEAD);
      chickenDeadSound.play();
      this.dead = true;
   }
}
