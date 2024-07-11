class Endboss extends moveableObject {
   height = 400;
   width = 400;
   y = 90;
   energy = 100;

   offset = {
      top: 100,
      left: 30,
      right: 40,
      bottom: 30,
   };

   IMAGES_WALKING = [
      './img/4_enemie_boss_chicken/2_alert/G5.png',
      './img/4_enemie_boss_chicken/2_alert/G6.png',
      './img/4_enemie_boss_chicken/2_alert/G7.png',
      './img/4_enemie_boss_chicken/2_alert/G8.png',
      './img/4_enemie_boss_chicken/2_alert/G9.png',
      './img/4_enemie_boss_chicken/2_alert/G10.png',
      './img/4_enemie_boss_chicken/2_alert/G11.png',
      './img/4_enemie_boss_chicken/2_alert/G12.png',
   ];
   IMAGES_ATTACK = [
      './img/4_enemie_boss_chicken/3_attack/G13.png',
      './img/4_enemie_boss_chicken/3_attack/G14.png',
      './img/4_enemie_boss_chicken/3_attack/G15.png',
      './img/4_enemie_boss_chicken/3_attack/G16.png',
      './img/4_enemie_boss_chicken/3_attack/G17.png',
      './img/4_enemie_boss_chicken/3_attack/G18.png',
      './img/4_enemie_boss_chicken/3_attack/G19.png',
      './img/4_enemie_boss_chicken/3_attack/G20.png',
   ];

   IMAGES_DEAD = [
      './img/4_enemie_boss_chicken/5_dead/G24.png',
      './img/4_enemie_boss_chicken/5_dead/G25.png',
      './img/4_enemie_boss_chicken/5_dead/G26.png',
   ];

   IMAGES_HURT = [
      './img/4_enemie_boss_chicken/4_hurt/G21.png',
      './img/4_enemie_boss_chicken/4_hurt/G22.png',
      './img/4_enemie_boss_chicken/4_hurt/G23.png',
   ];

   isMovingBecauseOfAttack = false;
   animationInterval;
   moveLeftInterval;
   hasHit = false;

   constructor() {
      super().loadImage(this.IMAGES_WALKING[0]);
      this.loadImages(this.IMAGES_WALKING);
      this.loadImages(this.IMAGES_ATTACK);
      this.loadImages(this.IMAGES_DEAD);
      this.loadImages(this.IMAGES_HURT);
      this.x = 2300;
      this.animate();
   }

   animate() {
      this.animationInterval = setInterval(() => {
         this.playAnimation(this.IMAGES_WALKING);
      }, 200);
   }

   getsHitByBottle() {
      clearInterval(this.animationInterval);
      this.energy -= 20;
      console.log(this.energy);
      if (this.energy <= 0) {
         this.energy = 0;
         this.playDeadAnimation();
      } else {
         this.playAttackAnimation();
      }
   }

   playAttackAnimation() {
      if (!this.isMovingBecauseOfAttack) {
         this.moveLeftInterval = setInterval(() => {
            this.moveLeft();
         }, 1000 / 60);
         setInterval(() => {
            this.playAnimation(this.IMAGES_ATTACK);
         }, 200);
         this.isMovingBecauseOfAttack = true;
      }
   }

   playDeadAnimation() {
      let deadIndex = 0;
      const deadInterval = setInterval(() => {
         if (deadIndex < this.IMAGES_DEAD.length) {
            this.loadImage(this.IMAGES_DEAD[deadIndex]);
            deadIndex++;
         } else {
            clearInterval(deadInterval); // Stop the dead animation
         }
      }, 200);
   }
}
