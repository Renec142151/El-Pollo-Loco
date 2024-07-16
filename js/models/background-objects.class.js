/**
 * Represents a background object in the game.
 * @extends moveableObject
 */
class BackgroundObject extends moveableObject {
   /**
    * The height of the background object.
    * @type {number}
    * @default 480
    */
   height = 480;

   /**
    * The width of the background object.
    * @type {number}
    * @default 720
    */
   width = 720;

   /**
    * Creates an instance of BackgroundObject.
    * @param {string} imagePath - The path to the image of the background object.
    * @param {number} x - The x-coordinate of the background object.
    * @param {number} y - The y-coordinate of the background object.
    */
   constructor(imagePath, x, y) {
      super().loadImage(imagePath);
      this.x = x;
      this.y = y;
   }
}
