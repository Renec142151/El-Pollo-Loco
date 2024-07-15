class ThrowableObject extends moveableObject {
   BOTTLE_ROTATION = [
      './img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
      './img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
      './img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
      './img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
   ];

   BOTTLE_SPLASH = [
      './img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
      './img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
      './img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
      './img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
      './img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
      './img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
   ];

   throwAnimationInterval;
   splashAnimationInterval;
   hasHit = false;
   isCharacterOtherDirection = false;

   constructor(x, y, isCharacterOtherDirection) {
      super().loadImage('./img/7_statusbars/3_icons/icon_salsa_bottle.png');
      this.isCharacterOtherDirection = isCharacterOtherDirection;
      this.loadImages(this.BOTTLE_ROTATION);
      this.loadImages(this.BOTTLE_SPLASH);
      this.x = x;
      this.y = y;
      this.width = 100;
      this.height = 100;
      this.throw();
   }
   throw() {
      this.speedY = 30;
      this.applyGravity();
      this.throwAnimation();
      setInterval(() => {
         if (this.isCharacterOtherDirection) {
            this.x -= 10;
         } else {
            this.x += 10;
         }
      }, 25);
   }

   throwAnimation() {
      this.throwAnimationInterval = setInterval(() => {
         this.playAnimation(this.BOTTLE_ROTATION);
      }, 80);
   }

   bottleSplashAnimation() {
      clearInterval(this.throwAnimationInterval);
      let splashFrameIndex = 0;
      this.splashAnimationInterval = setInterval(() => {
         if (splashFrameIndex < this.BOTTLE_SPLASH.length) {
            this.playAnimation(this.BOTTLE_SPLASH);
            splashFrameIndex++;
         } else {
            clearInterval(this.splashAnimationInterval);
         }
      }, 300);
   }
}
