class Coins extends moveableObject {
   width = 100;
   height = 100;
   IMAGES_COINS = ['./img/8_coin/coin_1.png', './img/8_coin/coin_2.png'];

   offset = {
      top: 70,
      left: 30,
      right: 30,
      bottom: 70,
   };
   constructor() {
      super().loadImage('./img/8_coin/coin_1.png');
      this.loadImages(this.IMAGES_COINS);
      this.x = 300 + Math.random() * 2000;
      this.y = 100 + Math.random() * 240;
      this.animate();
   }

   animate() {
      setInterval(() => {
         this.playAnimation(this.IMAGES_COINS);
      }, 600);
   }
}
