/**
 * Represents a health status bar in the game.
 * Extends the DrawableObject class to handle image loading and rendering.
 */
class StatusBar extends DrawableObject {
   /**
    * Array of image paths for the health status bar, representing different health levels.
    * @type {string[]}
    */
   IMAGES = [
      './img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
      './img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
      './img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
      './img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
      './img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
      './img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png',
   ];

   /**
    * The percentage of health represented by the status bar.
    * @type {number}
    * @default 100
    */
   percentage = 100;

   /**
    * Initializes a new instance of the StatusBar class.
    * Loads the images for the health status bar and sets the initial position and dimensions.
    */
   constructor() {
      super();
      this.loadImages(this.IMAGES);
      this.x = 20;
      this.y = 40;
      this.width = 200;
      this.height = 60;
      this.setPercentage(100);
   }

   /**
    * Sets the percentage of health and updates the displayed image.
    * @param {number} percentage - The health percentage to set (0 to 100).
    */
   setPercentage(percentage) {
      this.percentage = percentage;
      let path = this.IMAGES[this.resolveImageIndex()];
      this.img = this.imageCache[path];
   }

   /**
    * Resolves the index of the image to be used based on the current health percentage.
    * @returns {number} The index of the image corresponding to the current health percentage.
    */
   resolveImageIndex() {
      if (this.percentage === 100) {
         return 5;
      } else if (this.percentage > 80) {
         return 4;
      } else if (this.percentage > 60) {
         return 3;
      } else if (this.percentage > 40) {
         return 2;
      } else if (this.percentage > 20) {
         return 1;
      } else {
         return 0;
      }
   }
}
