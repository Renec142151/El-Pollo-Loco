class SmallChicken extends moveableObject {
   height = 45;
   width = 45;
   y = 400;
   energy = 5;

   offset = {
      top: -15,
      left: -15,
      right: -15,
      bottom: -15,
   };
   IMAGES_WALKING = [
      './img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
      './img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
      './img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
   ];
   IMAGE_DEAD = './img/3_enemies_chicken/chicken_small/2_dead/dead.png';

   constructor() {
      super().loadImage(this.IMAGES_WALKING[0]);
      this.loadImages(this.IMAGES_WALKING);
      this.x = 500 + Math.random() * 2500;
      this.speed = 0.3 + Math.random() * 0.5;
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
      smallChickenDeadSound.play();
      this.dead = true;
   }
}
