/**
 * Class representing the status bar for collected coins.
 * @extends DrawableObject
 */
class CoinsStatusBar extends DrawableObject {
   /**
    * Paths to the images representing different coin levels.
    * @type {string[]}
    */
   IMAGES_COINS = [
      './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
      './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
      './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
      './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
      './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
      './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png',
   ];

   /**
    * Number of collected coins.
    * @type {number}
    */
   collectedCoins = 0;

   /**
    * Create a CoinsStatusBar.
    */
   constructor() {
      super();
      this.loadImage('./img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png');
      this.loadImages(this.IMAGES_COINS);
      this.x = 20;
      this.y = 85;
      this.width = 200;
      this.height = 60;
   }

   /**
    * Collect a coin and update the status bar.
    */
   collectCoin() {
      this.collectedCoins += 1;
      this.setPercentage(this.collectedCoins * 10);
   }

   /**
    * Set the percentage of collected coins.
    * @param {number} percentage - The percentage of collected coins.
    */
   setPercentage(percentage) {
      let path = this.IMAGES_COINS[Math.floor(percentage / 20)];
      this.loadImage(path);
   }
}
