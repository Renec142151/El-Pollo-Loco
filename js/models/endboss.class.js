class Endboss extends moveableObject {
   height = 400;
   width = 400;
   y = 90;
   energy = 15;
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
      './img/4_enemie_boss_chicken/3_attack/G20.png'

   ]

   constructor() {
      super().loadImage(this.IMAGES_WALKING[0]);
      this.loadImages(this.IMAGES_WALKING);
      this.loadImages(this.IMAGES_ATTACK);
      this.x = 2300;
      this.animate();
   }

   animate() {
      setInterval(() => {
         this.playAnimation(this.IMAGES_WALKING);
      }, 200);
   }

   
}
