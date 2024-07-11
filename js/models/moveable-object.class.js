class moveableObject extends DrawableObject {
   speed = 0.15;
   otherDirection = false;
   speedY = 0;
   acceleration = 2.5;
   // energy = 100;
   lastHit = 0;
   offset = {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
   };

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

   // draw(ctx) {
   //    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
   // }

   // drawFrame(ctx) {
   //    if (this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof Bottles) {
   //       ctx.beginPath();
   //       ctx.lineWidth = '1';
   //       ctx.strokeStyle = 'blue';
   //       ctx.rect(this.x, this.y, this.width, this.height);
   //       ctx.stroke();
   //    }
   // }

   // isColliding(moveableObject) {
   //    return (
   //       this.x + this.width - this.offset.right > moveableObject.x + moveableObject.offset.left &&
   //       this.y + this.height - this.offset.bottom > moveableObject.y + moveableObject.offset.top &&
   //       this.x + this.offset.left < moveableObject.x + moveableObject.width - moveableObject.offset.right &&
   //       this.y + this.offset.top < moveableObject.y + moveableObject.height - moveableObject.offset.bottom
   //    );
   // }

   // isColliding(moveableObject) {
   //    return (
   //       this.x + this.width > moveableObject.x &&
   //       this.y + this.height > moveableObject.y &&
   //       this.x < moveableObject.x + moveableObject.width &&
   //       this.y < moveableObject.y + moveableObject.height
   //    );
   // }

   isColliding(mo) {
      return (
         this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
         this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
         this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
         this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
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
