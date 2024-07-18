/**
 * Represents a moveable object in the game.
 * Extends the DrawableObject class to include movement and physics properties.
 */
class moveableObject extends DrawableObject {
   /**
    * The speed at which the object moves horizontally.
    * @type {number}
    * @default 0.15
    */
   speed = 0.15;

   /**
    * Determines if the object is moving in the opposite direction.
    * @type {boolean}
    * @default false
    */
   otherDirection = false;

   /**
    * The vertical speed of the object.
    * Affects how quickly the object moves up or down.
    * @type {number}
    * @default 0
    */
   speedY = 0;

   /**
    * The acceleration applied to the object's vertical speed.
    * Used to simulate gravity.
    * @type {number}
    * @default 2.5
    */
   acceleration = 2.5;

   /**
    * The timestamp of the last time the object was hit.
    * Used to determine if the object is currently hurt.
    * @type {number}
    * @default 0
    */
   lastHit = 0;

   /**
    * The offset values used for collision detection and rendering.
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
    * Applies gravity to the object by modifying the vertical speed and position.
    * Gravity affects the object if it is above ground or falling.
    * This method runs periodically at a fixed interval.
    */
   applyGravity() {
      setInterval(() => {
         if (this.isAboveGround() || this.speedY > 0) {
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
         }
      }, 1000 / 25);
   }

   /**
    * Checks if the object is above the ground.
    * @returns {boolean} `true` if the object is above ground, `false` otherwise.
    */
   isAboveGround() {
      if (this instanceof ThrowableObject) {
         return true;
      } else {
         return this.y < 155;
      }
   }

   /**
    * Checks if this object is colliding with another moveable object.
    * @param {moveableObject} mo - The other moveable object to check collision with.
    * @returns {boolean} `true` if there is a collision, `false` otherwise.
    */
   isColliding(mo) {
      return (
         this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
         this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
         this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
         this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
      );
   }

   /**
    * Reduces the object's energy and updates the last hit timestamp.
    * If the energy drops below 0, it is set to 0.
    */
   hit() {
      this.energy -= 5;
      if (this.energy < 0) {
         this.energy = 0;
      } else {
         this.lastHit = new Date().getTime();
      }
   }

   /**
    * Checks if the object is dead (i.e., has no energy left).
    * @returns {boolean} `true` if the object's energy is 0, `false` otherwise.
    */
   isDead() {
      return this.energy == 0;
   }

   /**
    * Checks if the object is currently hurt based on the time since it was last hit.
    * @returns {boolean} `true` if the object is still hurt, `false` otherwise.
    */
   isHurt() {
      let timepassed = new Date().getTime() - this.lastHit;
      timepassed = timepassed / 1000;
      return timepassed < 0.3;
   }

   /**
    * Plays the animation for the object using the provided array of image paths.
    * Updates the current image based on the animation sequence.
    * @param {string[]} images - An array of image paths for the animation.
    */
   playAnimation(images) {
      let i = this.currentImage % images.length;
      let path = images[i];
      this.img = this.imageCache[path];
      this.currentImage++;
   }

   /**
    * Moves the object to the right by its speed value.
    */
   moveRight() {
      this.x += this.speed;
   }

   /**
    * Moves the object to the left by its speed value.
    */
   moveLeft() {
      this.x -= this.speed;
   }

   /**
    * Causes the object to jump by setting the vertical speed to a positive value.
    */
   jump() {
      this.speedY = 30;
   }
}
