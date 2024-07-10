class ThrowableObject extends moveableObject {
   constructor(x, y) {
      super().loadImage('./img/7_statusbars/3_icons/icon_salsa_bottle.png');
      this.x = x;
      this.y = y;
      this.width = 100;
      this.height = 100;
      this.throw();
   }
   throw() {
      (this.speedY = 30), this.applyGravity();
      setInterval(() => {
         this.x += 10;
      }, 25);
   }
}
