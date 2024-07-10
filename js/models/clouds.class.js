class Clouds extends moveableObject {
   y = 20;
   height = 240;
   width = 360;

   constructor() {
      super().loadImage('./img/5_background/layers/4_clouds/1.png');
      this.x = Math.random() * 500;
      this.animate();
   }

   animate() {
      this.moveLeft();
   }
}
