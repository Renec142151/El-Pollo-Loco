/**
 * Represents a level in the game. Manages all game elements such as enemies, clouds, background objects, bottles, and coins.
 */
class Level {
   /**
    * Array of enemy objects present in the level.
    * @type {Array<Chicken | Endboss>}
    */
   enemies;

   /**
    * Array of cloud objects present in the level.
    * @type {Array<Clouds>}
    */
   clouds;

   /**
    * Array of background objects for the level.
    * @type {Array<BackgroundObject>}
    */
   backgroundObjects;

   /**
    * Array of bottle objects that can be collected in the level.
    * @type {Array<Bottles>}
    */
   bottles;

   /**
    * Array of coin objects that can be collected in the level.
    * @type {Array<Coins>}
    */
   coins;

   /**
    * The x-coordinate value where the level ends.
    * This determines the right boundary of the playable area.
    * @type {number}
    * @default 2200
    */
   level_end_x = 2200;

   /**
    * Creates a new instance of the Level class.
    * @param {Array<Chicken | Endboss>} enemies - The enemies in the level.
    * @param {Array<Clouds>} clouds - The clouds in the level.
    * @param {Array<BackgroundObject>} backgroundObjects - The background objects for the level.
    * @param {Array<Bottles>} bottles - The bottles that can be collected in the level.
    * @param {Array<Coins>} coins - The coins that can be collected in the level.
    */
   constructor(enemies, clouds, backgroundObjects, bottles, coins) {
      this.enemies = enemies;
      this.clouds = clouds;
      this.backgroundObjects = backgroundObjects;
      this.bottles = bottles;
      this.coins = coins;
   }
}
