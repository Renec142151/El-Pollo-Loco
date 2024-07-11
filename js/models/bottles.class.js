class Bottles extends DrawableObject {
   height = 100;
   width = 100;
   y = 340;

   BOTTLE_ON_GROUND = ['./img/6_salsa_bottle/1_salsa_bottle_on_ground.png', './img/6_salsa_bottle/2_salsa_bottle_on_ground.png'];

   offset = {
      top: 80,
      left: 40,
      right: 20,
      bottom: 80,
   };

   constructor() {
      super();
      this.loadRandomImage(this.BOTTLE_ON_GROUND);

      this.x = 300 + Math.random() * 2000;
   }
}
