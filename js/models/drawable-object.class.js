/**
 * Represents a drawable object in the game.
 * Provides methods for loading images, drawing the object on the canvas, and managing image caching.
 */
class DrawableObject {
   /**
    * The current image of the drawable object.
    * @type {HTMLImageElement}
    */
   img;

   /**
    * A cache for storing loaded images.
    * @type {Object<string, HTMLImageElement>}
    */
   imageCache = [];

   /**
    * The index of the current image in the image cache.
    * @type {number}
    * @default 0
    */
   currentImage = 0;

   /**
    * Loads an image from the given path.
    * @param {string} path - The path to the image file.
    */
   loadImage(path) {
      this.img = new Image();
      this.img.src = path;
   }

   /**
    * Loads a random image from the given array of image paths.
    * @param {string[]} imagesArray - An array of image file paths.
    */
   loadRandomImage(imagesArray) {
      const randomIndex = Math.floor(Math.random() * imagesArray.length);
      const chosenImage = imagesArray[randomIndex];
      this.loadImage(chosenImage);
   }

   /**
    * Draws the object on the canvas.
    * @param {CanvasRenderingContext2D} ctx - The 2D drawing context of the canvas.
    */
   draw(ctx) {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
   }

   // /**
   //  * Draws a frame around the object if it's an instance of specific classes.
   //  * For debugging purposes, a blue rectangle is drawn around the object.
   //  * @param {CanvasRenderingContext2D} ctx - The 2D drawing context of the canvas.
   //  */
   // drawFrame(ctx) {
   //    if (
   //       this instanceof Character ||
   //       this instanceof Chicken ||
   //       this instanceof Endboss ||
   //       this instanceof Bottles ||
   //       this instanceof Coins ||
   //       this instanceof SmallChicken
   //    ) {
   //       ctx.beginPath();
   //       ctx.lineWidth = '1';
   //       ctx.strokeStyle = 'blue';
   //       ctx.rect(
   //          this.x + this.offset.left,
   //          this.y + this.offset.top,
   //          this.width - this.offset.right - this.offset.left,
   //          this.height - this.offset.bottom - this.offset.top
   //       );
   //       ctx.stroke();
   //    }
   // }

   /**
    * Loads multiple images and stores them in the image cache.
    * @param {string[]} array - An array of image file paths.
    */
   loadImages(array) {
      array.forEach((path) => {
         let img = new Image();
         img.src = path;
         this.imageCache[path] = img;
      });
   }
}
