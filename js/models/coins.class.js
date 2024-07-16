/**
 * Represents a coin object in the game.
 * The coin can be collected by the character.
 * @extends moveableObject
 */
class Coins extends moveableObject {
   /**
    * The width of the coin.
    * @type {number}
    * @default 100
    */
   width = 100;

   /**
    * The height of the coin.
    * @type {number}
    * @default 100
    */
   height = 100;

   /**
    * Array of image paths for the coin animation.
    * @type {string[]}
    */
   IMAGES_COINS = ['./img/8_coin/coin_1.png', './img/8_coin/coin_2.png'];

   /**
    * Offset values for the coin.
    * @type {Object}
    * @property {number} top - The top offset.
    * @property {number} left - The left offset.
    * @property {number} right - The right offset.
    * @property {number} bottom - The bottom offset.
    */
   offset = {
      top: 70,
      left: 30,
      right: 30,
      bottom: 70,
   };

   /**
    * Creates an instance of Coins.
    * Loads the coin images and initializes the position of the coin.
    */
   constructor() {
      super().loadImage('./img/8_coin/coin_1.png');
      this.loadImages(this.IMAGES_COINS);
      this.x = 300 + Math.random() * 2000;
      this.y = 100 + Math.random() * 240;
      this.animate();
   }

   /**
    * Animates the coin by playing through the coin images in a loop.
    * The coin image will change every 600 milliseconds.
    */
   animate() {
      setInterval(() => {
         this.playAnimation(this.IMAGES_COINS);
      }, 600);
   }
}
