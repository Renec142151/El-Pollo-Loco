// class BottlesStatusBar extends DrawableObject {
//    IMAGES_COINS = [
//       ,
//       './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
//       './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
//       './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
//       './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
//       './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png',
//    ];

//    constructor() {
//       // super(), um die Methoden des übergeordneten Objekts zu intitialisieren
//       super();
//       this.loadImage('./img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png');
//       this.loadImages(this.IMAGES_COINS);
//       this.x = 20;
//       this.y = 0;
//       this.width = 200;
//       this.height = 60;
//       //   this.setPercentage(100);
//    }
// }

class BottlesStatusBar extends DrawableObject {
   IMAGES_BOTTLES = [
      './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
      './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
      './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
      './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
      './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
      './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png',
   ];
   collectedBottles = 0;

   constructor() {
      super();
      this.loadImage(this.IMAGES_BOTTLES[0]);
      this.loadImages(this.IMAGES_BOTTLES);
      this.x = 20;
      this.y = 0;
      this.width = 200;
      this.height = 60;
   }

   collectBottle() {
      this.collectedBottles += 1;
      this.setPercentage(this.collectedBottles * 10);
   }

   setPercentage(percentage) {
      let path = this.IMAGES_BOTTLES[Math.floor(percentage / 20)];
      this.loadImage(path);
   }
}
