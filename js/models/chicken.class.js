// class Chicken extends moveableObject {
//   height = 90;
//   width = 90;
//   y = 360;
//   energy = 10;
//   IMAGES_WALKING = [
//     "./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
//     "./img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
//     "./img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
//   ];

//   constructor() {
//     super().loadImage("./img/3_enemies_chicken/chicken_normal/2_dead/dead.png");
//     this.loadImages(this.IMAGES_WALKING);

//     this.x = 300 + Math.random() * 500;
//     this.speed = 0.15 + Math.random() * 0.5;
//     this.animate();
//   }

//   animate() {
//     setInterval(() => {
//       this.moveLeft();
//     }, 1000 / 60);
//     setInterval(() => {
//       this.playAnimation(this.IMAGES_WALKING);
//     }, 100);
//   }

//   getsHitByBottle() {
//     this.energy -= 5;
//     console.log(this.energy);
//     if (this.energy <= 0) {
//       this.chickenIsDead();
//     }
//   }

//   chickenIsDead() {
//     this.loadImages(["./img/3_enemies_chicken/chicken_normal/2_dead/dead.png"]);
//     this.playAnimation([
//       "./img/3_enemies_chicken/chicken_normal/2_dead/dead.png",
//     ]);
//   }
// }

class Chicken extends moveableObject {
  height = 90;
  width = 90;
  y = 360;
  energy = 10;
  IMAGES_WALKING = [
    "./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "./img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "./img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];
  IMAGE_DEAD = "./img/3_enemies_chicken/chicken_normal/2_dead/dead.png";

  constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.x = 300 + Math.random() * 500;
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
    this.dead = true; // Flag to mark the chicken as dead
  }
}
