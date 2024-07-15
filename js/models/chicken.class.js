class Chicken extends moveableObject {
   height = 90;
   width = 90;
   y = 360;
   energy = 5;

   offset = {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
   };
   IMAGES_WALKING = [
      './img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
      './img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
      './img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
   ];
   IMAGE_DEAD = './img/3_enemies_chicken/chicken_normal/2_dead/dead.png';

   constructor() {
      super().loadImage(this.IMAGES_WALKING[0]);
      this.loadImages(this.IMAGES_WALKING);
      this.x = 500 + Math.random() * 500;
      this.speed = 0.15 + Math.random() * 0.5;
      this.animate();
   }

   animate() {
      this.walkingInterval = setInterval(() => {
         this.moveLeft();
      }, 1000 / 60);
      this.animationInterval = setInterval(() => {
         this.playAnimation(this.IMAGES_WALKING);
      }, 100);
   }

   getsHitByBottle() {
      this.energy -= 5;
      console.log(this.energy);
      if (this.energy <= 0) {
         this.chickenIsDead();
      }
   }

   getsHitByCharacter() {
      this.energy -= 10;
      if (this.energy <= 0) {
         this.chickenIsDead();
      }
   }

   chickenIsDead() {
      clearInterval(this.walkingInterval);
      clearInterval(this.animationInterval);
      this.loadImage(this.IMAGE_DEAD);
      this.dead = true;
   }
}
