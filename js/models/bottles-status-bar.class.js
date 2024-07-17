/**
 * Represents the status bar for collected bottles in the game.
 * @extends DrawableObject
 */
class BottlesStatusBar extends DrawableObject {
   /**
    * An array of image paths representing different states of the bottle status bar.
    * @type {string[]}
    */
   IMAGES_BOTTLES = [
      './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
      './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
      './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
      './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
      './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
      './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png',
   ];

   /**
    * The number of collected bottles.
    * @type {number}
    * @default 0
    */
   collectedBottles = 0;

   /**
    * Creates an instance of BottlesStatusBar.
    */
   constructor() {
      super();
      this.loadImage(this.IMAGES_BOTTLES[0]);
      this.loadImages(this.IMAGES_BOTTLES);
      this.x = 20;
      this.y = 0;
      this.width = 200;
      this.height = 60;
   }

   /**
    * Increases the number of collected bottles by one and updates the status bar.
    */
   collectBottle() {
      this.collectedBottles += 1;
      this.setPercentage(this.collectedBottles * 5);
   }

   /**
    * Sets the status bar image based on the percentage of bottles collected.
    * @param {number} percentage - The percentage of bottles collected.
    */
   setPercentage(percentage) {
      let path = this.IMAGES_BOTTLES[Math.floor(percentage / 20)];
      this.loadImage(path);
   }
}
