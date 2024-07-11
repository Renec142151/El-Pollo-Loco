class CoinsStatusBar extends DrawableObject {
   IMAGES_COINS = [
      './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
      './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
      './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
      './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
      './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
      './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png',
   ];

   collectedCoins = 0;

   constructor() {
      // super(), um die Methoden des übergeordneten Objekts zu intitialisieren
      super();
      this.loadImage('./img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png');
      this.loadImages(this.IMAGES_COINS);
      this.x = 20;
      this.y = 85;
      this.width = 200;
      this.height = 60;
      //   this.setPercentage(100);
   }

   collectCoin() {
      this.collectedCoins += 1;
      this.setPercentage(this.collectedCoins * 10);
   }

   setPercentage(percentage) {
      let path = this.IMAGES_COINS[Math.floor(percentage / 20)];
      this.loadImage(path);
   }
}
