/**
 * Represents a cloud object in the game background.
 * @extends moveableObject
 */
class Clouds extends moveableObject {
   /**
    * The y-coordinate of the cloud.
    * @type {number}
    * @default 20
    */
   y = 20;

   /**
    * The height of the cloud.
    * @type {number}
    * @default 240
    */
   height = 240;

   /**
    * The width of the cloud.
    * @type {number}
    * @default 360
    */
   width = 360;

   /**
    * Creates an instance of Clouds.
    * Loads the cloud image and initializes the x-coordinate with a random value.
    */
   constructor() {
      super().loadImage('./img/5_background/layers/4_clouds/1.png');
      this.x = Math.random() * 500;
      this.animate();
   }

   /**
    * Animates the cloud by moving it to the left.
    * The cloud will continuously move left to create a scrolling background effect.
    */
   animate() {
      this.moveLeft();
   }
}
