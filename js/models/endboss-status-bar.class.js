/**
 * Represents the status bar for the endboss in the game.
 * This class manages the visual representation of the endboss's health status.
 * @extends DrawableObject
 */
class EndbossStatusBar extends DrawableObject {
   /**
    * Array of image paths representing different stages of the endboss's health status.
    * The images show the status bar at 0%, 20%, 40%, 60%, 80%, and 100% health.
    * @type {string[]}
    */
   IMAGES_ENDBOSS_STATUS = [
      './img/7_statusbars/2_statusbar_endboss/blue/blue0.png',
      './img/7_statusbars/2_statusbar_endboss/blue/blue20.png',
      './img/7_statusbars/2_statusbar_endboss/blue/blue40.png',
      './img/7_statusbars/2_statusbar_endboss/blue/blue60.png',
      './img/7_statusbars/2_statusbar_endboss/blue/blue80.png',
      './img/7_statusbars/2_statusbar_endboss/blue/blue100.png',
   ];

   /**
    * The current percentage of the endboss's health.
    * @type {number}
    * @default 100
    */
   percentage = 100;

   /**
    * Creates an instance of EndbossStatusBar.
    * Initializes the status bar with images and sets the initial position and size.
    */
   constructor() {
      super();
      this.loadImages(this.IMAGES_ENDBOSS_STATUS);
      this.x = 600;
      this.y = 0;
      this.width = 200;
      this.height = 60;
      this.setPercentage(this.percentage);
   }

   /**
    * Reduces the endboss's health by 20% and updates the status bar.
    * This method is called when the endboss is hit.
    */
   getsHit() {
      this.percentage -= 20;
      if (this.percentage < 0) {
         this.percentage = 0;
      }
      this.setPercentage(this.percentage);
   }

   /**
    * Updates the status bar image based on the current percentage of health.
    * Changes the image to reflect the health status.
    * @param {number} percentage - The new percentage of health (0 to 100).
    */
   setPercentage(percentage) {
      if (percentage < 0) percentage = 0;
      let path = this.IMAGES_ENDBOSS_STATUS[Math.floor(percentage / 20)];
      if (path) {
         this.loadImage(path);
      }
   }
}
