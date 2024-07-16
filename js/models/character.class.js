class Character extends moveableObject {
   height = 300;
   width = 150;
   y = 155;
   x = 0;
   speed = 6;
   energy = 100;
   lastMovementTime = Date.now();
   deathAnimationPlayed = false;

   offset = {
      top: 120,
      left: 30,
      right: 40,
      bottom: 10,
   };

   IMAGES_WALKING = [
      './img/2_character_pepe/2_walk/W-21.png',
      './img/2_character_pepe/2_walk/W-22.png',
      './img/2_character_pepe/2_walk/W-23.png',
      './img/2_character_pepe/2_walk/W-24.png',
      './img/2_character_pepe/2_walk/W-25.png',
      './img/2_character_pepe/2_walk/W-26.png',
   ];

   IMAGES_JUMPING = [
      './img/2_character_pepe/3_jump/J-31.png',
      './img/2_character_pepe/3_jump/J-32.png',
      './img/2_character_pepe/3_jump/J-33.png',
      './img/2_character_pepe/3_jump/J-34.png',
      './img/2_character_pepe/3_jump/J-35.png',
      './img/2_character_pepe/3_jump/J-36.png',
      './img/2_character_pepe/3_jump/J-37.png',
      './img/2_character_pepe/3_jump/J-38.png',
      './img/2_character_pepe/3_jump/J-39.png',
   ];
   IMAGES_DEAD = [
      './img/2_character_pepe/5_dead/D-51.png',
      './img/2_character_pepe/5_dead/D-52.png',
      './img/2_character_pepe/5_dead/D-53.png',
      './img/2_character_pepe/5_dead/D-54.png',
      './img/2_character_pepe/5_dead/D-55.png',
      './img/2_character_pepe/5_dead/D-56.png',
      './img/2_character_pepe/5_dead/D-57.png',
   ];

   IMAGES_HURT = [
      './img/2_character_pepe/4_hurt/H-41.png',
      './img/2_character_pepe/4_hurt/H-42.png',
      './img/2_character_pepe/4_hurt/H-43.png',
   ];

   IMAGES_IDLE = [
      './img/2_character_pepe/1_idle/idle/I-1.png',
      './img/2_character_pepe/1_idle/idle/I-2.png',
      './img/2_character_pepe/1_idle/idle/I-3.png',
      './img/2_character_pepe/1_idle/idle/I-4.png',
      './img/2_character_pepe/1_idle/idle/I-5.png',
      './img/2_character_pepe/1_idle/idle/I-6.png',
      './img/2_character_pepe/1_idle/idle/I-7.png',
      './img/2_character_pepe/1_idle/idle/I-8.png',
      './img/2_character_pepe/1_idle/idle/I-9.png',
      './img/2_character_pepe/1_idle/idle/I-10.png',
   ];

   IMAGES_SLEEP = [
      './img/2_character_pepe/1_idle/long_idle/I-11.png',
      './img/2_character_pepe/1_idle/long_idle/I-12.png',
      './img/2_character_pepe/1_idle/long_idle/I-13.png',
      './img/2_character_pepe/1_idle/long_idle/I-14.png',
      './img/2_character_pepe/1_idle/long_idle/I-15.png',
      './img/2_character_pepe/1_idle/long_idle/I-16.png',
      './img/2_character_pepe/1_idle/long_idle/I-17.png',
      './img/2_character_pepe/1_idle/long_idle/I-18.png',
      './img/2_character_pepe/1_idle/long_idle/I-19.png',
      './img/2_character_pepe/1_idle/long_idle/I-20.png',
   ];

   constructor() {
      super().loadImage('./img/2_character_pepe/2_walk/W-21.png');
      this.loadImages(this.IMAGES_WALKING);
      this.loadImages(this.IMAGES_JUMPING);
      this.loadImages(this.IMAGES_DEAD);
      this.loadImages(this.IMAGES_HURT);
      this.loadImages(this.IMAGES_IDLE);
      this.loadImages(this.IMAGES_SLEEP);
      this.applyGravity();
      this.animate();
   }

   animate() {
      setInterval(() => {
         walkingSound.pause();
         if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.otherDirection = false;
            this.moveRight();
            walkingSound.play();
            this.lastMovementTime = Date.now();
         }
         if (this.world.keyboard.LEFT && this.x > 0) {
            this.moveLeft();
            this.otherDirection = true;
            walkingSound.play();
            this.lastMovementTime = Date.now();
         }

         if (this.world.keyboard.SPACE && !this.isAboveGround()) {
            this.jump();
            jumpSound.play();
            this.lastMovementTime = Date.now();
         }

         this.world.camera_x = -this.x + 200;
      }, 1000 / 60);

      setInterval(() => {
         sleep.pause();
         if (this.isDead()) {
            if (!this.deathAnimationPlayed) {
               backgroundMusic.pause();
               dead.play();
               this.deathAnimationPlayed = true;
            }
            this.playAnimation(this.IMAGES_DEAD);
            setTimeout(() => {
               this.world.freezeGame = true;
               document.getElementById('gameOver').style.display = 'flex';
               document.getElementById('restartButton').style.display = 'flex';
            }, 600);
         } else if (this.isHurt()) {
            hurt.play();
            this.playAnimation(this.IMAGES_HURT);
         } else if (this.isAboveGround()) {
            this.playAnimation(this.IMAGES_JUMPING);
         } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.playAnimation(this.IMAGES_WALKING);
         } else if (Date.now() - this.lastMovementTime > 5000) {
            sleep.play();
            this.playAnimation(this.IMAGES_SLEEP);
         } else {
            this.playAnimation(this.IMAGES_IDLE);
         }
      }, 200);
   }
}
