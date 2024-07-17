/**
 * Represents a bottle object in the game.
 * @extends DrawableObject
 */
class Bottles extends DrawableObject {
   /**
    * The height of the bottle.
    * @type {number}
    * @default 100
    */
   height = 100;

   /**
    * The width of the bottle.
    * @type {number}
    * @default 100
    */
   width = 100;

   /**
    * The y-coordinate of the bottle.
    * @type {number}
    * @default 340
    */
   y = 340;

   /**
    * An array of image paths representing the bottle on the ground.
    * @type {string[]}
    */
   BOTTLE_ON_GROUND = ['./img/6_salsa_bottle/1_salsa_bottle_on_ground.png', './img/6_salsa_bottle/2_salsa_bottle_on_ground.png'];

   /**
    * The offset values for the bottle.
    * @type {Object}
    * @property {number} top - The top offset.
    * @property {number} left - The left offset.
    * @property {number} right - The right offset.
    * @property {number} bottom - The bottom offset.
    */
   offset = {
      top: 80,
      left: 40,
      right: 20,
      bottom: 80,
   };

   /**
    * Creates an instance of Bottles.
    */
   constructor() {
      super();
      this.loadRandomImage(this.BOTTLE_ON_GROUND);

      /**
       * The x-coordinate of the bottle, randomly set within a specific range.
       * @type {number}
       */
      this.x = 300 + Math.random() * 1800;
   }
}
