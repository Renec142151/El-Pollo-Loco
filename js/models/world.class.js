class World {
   level = level1;
   character = new Character();
   canvas;
   ctx;
   keyboard;
   camera_x = 0;
   bottlesStatusBar = new BottlesStatusBar();
   statusBar = new StatusBar();
   coinsStatusBar = new CoinsStatusBar();
   bottles = new Bottles();
   endbossStatusBar = new EndbossStatusBar();
   throwableObject = new ThrowableObject();
   throwableObjects = [];

   // constructor: eine Funktion, die immer ausgeführt wird, wenn eine neue Instanz der Klasse erstellt wird
   constructor(canvas) {
      this.ctx = canvas.getContext('2d');
      this.canvas = canvas;
      this.keyboard = keyboard;
      this.draw();
      this.setWorld();
      this.checkCollisions();
      this.run();
   }

   setWorld() {
      this.character.world = this;
   }

   run() {
      setInterval(() => {
         this.checkCollisions();
         this.checkThrowObjects();
         this.hitEnemyWithBottle();
         this.collectBottles();
         this.collectCoins(); // Neue Methode aufrufen
      }, 100);
   }

   collectBottles() {
      this.level.bottles.forEach((bottle, index) => {
         if (this.character.isColliding(bottle)) {
            this.level.bottles.splice(index, 1); // Entfernt die Bottle aus dem Array
            this.bottlesStatusBar.collectBottle();
         }
      });
   }

   collectCoins() {
      this.level.coins.forEach((coin, index) => {
         if (this.character.isColliding(coin)) {
            this.level.coins.splice(index, 1);
            this.coinsStatusBar.collectCoin();
         }
      });
   }

   checkThrowObjects() {
      if (this.keyboard.D && !this.bottlesStatusBar.collectedBottles <= 0) {
         let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
         this.throwableObjects.push(bottle);
         this.bottlesStatusBar.collectedBottles--;
         this.bottlesStatusBar.setPercentage(this.bottlesStatusBar.collectedBottles * 10); // Passt den Wert der Bottle StatusBar an
      }
   }

   checkCollisions() {
      this.level.enemies.forEach((enemy) => {
         if (this.character.isColliding(enemy) && !enemy.dead) {
            if (this.character.isAboveGround() && this.character.speedY < 0) {
               enemy.getsHitByCharacter();
               this.character.jump();
            } else {
               this.character.hit();
               this.statusBar.setPercentage(this.character.energy);
            }
         }
      });
   }

   hitEnemyWithBottle() {
      this.throwableObjects.forEach((bottle) => {
         this.level.enemies.forEach((enemy) => {
            if (!bottle.hasHit && bottle.isColliding(enemy) && !enemy.dead) {
               enemy.getsHitByBottle();
               bottle.bottleSplashAnimation();
               bottle.hasHit = true;
               if (enemy instanceof Endboss) {
                  this.endbossStatusBar.getsHit();
               }
            }
         });
      });
   }

   draw() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      this.ctx.translate(this.camera_x, 0);
      this.addObjectsToMap(this.level.backgroundObjects);

      this.ctx.translate(-this.camera_x, 0); // BACK
      this.addToMap(this.bottlesStatusBar);
      this.addToMap(this.statusBar);
      this.addToMap(this.coinsStatusBar);
      this.addToMap(this.endbossStatusBar);
      this.ctx.translate(this.camera_x, 0); // Forwards

      this.addToMap(this.character);

      this.addObjectsToMap(this.level.bottles);
      this.addObjectsToMap(this.level.clouds);
      this.addObjectsToMap(this.level.enemies);
      this.addObjectsToMap(this.throwableObjects);
      this.addObjectsToMap(this.level.coins);

      this.ctx.translate(-this.camera_x, 0);

      //   The requestAnimationFrame() method tells the browser that you wish to perform an animation and requests that the browser call a specified function to update an animation before the next repaint.
      let self = this;
      requestAnimationFrame(function () {
         self.draw();
      });
   }

   addObjectsToMap(objects) {
      objects.forEach((object) => {
         this.addToMap(object);
      });
   }

   addToMap(moveableObject) {
      if (moveableObject.otherDirection) {
         this.flipImage(moveableObject);
      }
      moveableObject.draw(this.ctx);

      moveableObject.drawFrame(this.ctx);

      if (moveableObject.otherDirection) {
         this.flipImageBack(moveableObject);
      }
   }

   flipImage(moveableObject) {
      this.ctx.save();
      this.ctx.translate(moveableObject.width, 0);
      this.ctx.scale(-1, 1);
      moveableObject.x = moveableObject.x * -1;
   }

   flipImageBack(moveableObject) {
      moveableObject.x = moveableObject.x * -1;
      this.ctx.restore();
   }
}
