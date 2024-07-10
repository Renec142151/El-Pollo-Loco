class moveableObject extends DrawableObject {
   speed = 0.15;
   otherDirection = false;
   speedY = 0;
   acceleration = 2.5;
   // energy = 100;
   lastHit = 0;

   applyGravity() {
      setInterval(() => {
         if (this.isAboveGround() || this.speedY > 0) {
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
         }
      }, 1000 / 25);
   }

   isAboveGround() {
      if (this instanceof ThrowableObject) {
         // Throwable Object should always fall
         return true;
      } else {
         return this.y < 155;
      }
   }

   draw(ctx) {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
   }

   drawFrame(ctx) {
      if (this instanceof Character || this instanceof Chicken) {
         ctx.beginPath();
         ctx.lineWidth = '1';
         ctx.strokeStyle = 'blue';
         ctx.rect(this.x, this.y, this.width, this.height);
         ctx.stroke();
      }
   }

   isColliding(moveableObject) {
      return (
         this.x + this.width > moveableObject.x &&
         this.y + this.height > moveableObject.y &&
         this.x < moveableObject.x &&
         this.y < moveableObject.y + moveableObject.height
      );
   }

   hit() {
      this.energy -= 5;
      if (this.energy < 0) {
         this.energy = 0;
      } else {
         this.lastHit = new Date().getTime();
      }
   }

   isDead() {
      return this.energy == 0;
   }

   isHurt() {
      let timepassed = new Date().getTime() - this.lastHit;
      timepassed = timepassed / 1000; // Difference in s
      return timepassed < 0.3;
   }

   playAnimation(images) {
      let i = this.currentImage % images.length;
      let path = images[i];
      this.img = this.imageCache[path];
      this.currentImage++;
   }

   moveRight() {
      this.x += this.speed;
      this.walking_sound.play();
   }

   moveLeft() {
      this.x -= this.speed;
   }

   jump() {
      this.speedY = 30;
   }
}
