/**
 * Represents the game world, including the level, character, status bars, and game logic.
 */
class World {
   /**
    * The current level of the game.
    * @type {Level}
    */
   level = level1;

   /**
    * The main character of the game.
    * @type {Character}
    */
   character = new Character();

   /**
    * The canvas element used for rendering the game.
    * @type {HTMLCanvasElement}
    */
   canvas;

   /**
    * The 2D rendering context for the canvas.
    * @type {CanvasRenderingContext2D}
    */
   ctx;

   /**
    * The keyboard object for tracking user input.
    * @type {Keyboard}
    */
   keyboard;

   /**
    * The x-coordinate of the camera, used for scrolling.
    * @type {number}
    * @default 0
    */
   camera_x = 0;

   /**
    * The status bar for displaying the number of bottles collected.
    * @type {BottlesStatusBar}
    */
   bottlesStatusBar = new BottlesStatusBar();

   /**
    * The status bar for displaying the character's health.
    * @type {StatusBar}
    */
   statusBar = new StatusBar();

   /**
    * The status bar for displaying the number of coins collected.
    * @type {CoinsStatusBar}
    */
   coinsStatusBar = new CoinsStatusBar();

   /**
    * The status bar for displaying the endboss's health.
    * @type {EndbossStatusBar}
    */
   endbossStatusBar = new EndbossStatusBar();

   /**
    * A collection of throwable objects in the game.
    * @type {ThrowableObject[]}
    */
   throwableObjects = [];

   /**
    * A flag indicating whether the game is frozen or not.
    * @type {boolean}
    * @default false
    */
   freezeGame = false;

   /**
    * Array to store all active interval IDs.
    * @type {number[]}
    */
   intervals = [];

   /**
    * Creates an instance of the World class.
    * @param {HTMLCanvasElement} canvas - The canvas element used for rendering the game.
    */
   constructor(canvas, keyboard) {
      this.ctx = canvas.getContext('2d');
      this.canvas = canvas;
      this.keyboard = keyboard;
      this.draw();
      this.setWorld();
      this.run();
      this.checkThrowObjects();
   }

   /**
    * Sets the world for the character and the enemies.
    * This method assigns the current world instance to the character and all enemies.
    */
   setWorld() {
      this.character.world = this;
      this.level.enemies.forEach((enemy) => (enemy.world = this));
   }

   /**
    * Pauses the game by clearing all intervals.
    */
   pauseGame() {
      this.freezeGame = true;
      this.clearIntervals();
   }

   /**
    * Clears all active intervals.
    */
   clearIntervals() {
      this.intervals.forEach((interval) => clearInterval(interval));
      this.intervals = [];
   }

   /**
    * Starts the game loop that checks collisions, handles bottle throws, and collects items.
    * Runs every 50 milliseconds.
    */
   run() {
      this.intervals.push(
         setInterval(() => {
            this.checkCollisions();
            this.hitEnemyWithBottle();
            this.collectBottles();
            this.collectCoins();
         }, 50)
      );
   }

   /**
    * Checks if the character collects any bottles and updates the bottles status bar.
    */
   collectBottles() {
      this.level.bottles.forEach((bottle, index) => {
         if (this.character.isColliding(bottle)) {
            bottleCollect.play();
            this.level.bottles.splice(index, 1);
            this.bottlesStatusBar.collectBottle();
         }
      });
   }

   /**
    * Checks if the character collects any coins and updates the coins status bar.
    */
   collectCoins() {
      this.level.coins.forEach((coin, index) => {
         if (this.character.isColliding(coin)) {
            coinsCollect.play();
            this.level.coins.splice(index, 1);
            this.coinsStatusBar.collectCoin();
            if (this.coinsStatusBar.collectedCoins === 10) {
               this.bottlesStatusBar.collectedBottles += 10;
               this.bottlesStatusBar.setPercentage(this.bottlesStatusBar.collectedBottles * 5);
            }
         }
      });
   }
   /**
    * Checks for throw objects and creates a new ThrowableObject if the throw button is pressed.
    */
   checkThrowObjects() {
      this.intervals.push(
         setInterval(() => {
            if (bottleThrown && this.keyboard.D && !this.bottlesStatusBar.collectedBottles <= 0) {
               bottleThrown = false;
               if (this.character.otherDirection) {
                  let bottle = new ThrowableObject(this.character.x - 100, this.character.y + 100, this.character.otherDirection);
                  this.throwableObjects.push(bottle);
                  this.bottlesStatusBar.collectedBottles--;
                  this.bottlesStatusBar.setPercentage(this.bottlesStatusBar.collectedBottles * 5);
               } else {
                  let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100, this.character.otherDirection);
                  this.throwableObjects.push(bottle);
                  this.bottlesStatusBar.collectedBottles--;
                  this.bottlesStatusBar.setPercentage(this.bottlesStatusBar.collectedBottles * 5);
               }
            }
         }, 100)
      );
   }

   /**
    * Checks for collisions between the character and enemies.
    * Handles character hits by enemies and updates the status bar.
    */
   checkCollisions() {
      this.level.enemies.forEach((enemy) => {
         if (this.character.isColliding(enemy) && !enemy.dead) {
            if (this.character.isAboveGround() && this.character.speedY < 0) {
               enemy.getsHitByCharacter();
            } else {
               this.character.hit();
               this.statusBar.setPercentage(this.character.energy);
            }
         }
      });
   }

   /**
    * Checks if any throwable objects collide with enemies and handles the collision.
    */
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

   /**
    * Draws all elements of the world onto the canvas.
    * The method handles translation for camera movement and updates the rendering.
    */
   draw() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      this.ctx.translate(this.camera_x, 0);
      this.addObjectsToMap(this.level.backgroundObjects);

      this.ctx.translate(-this.camera_x, 0);
      this.addToMap(this.bottlesStatusBar);
      this.addToMap(this.statusBar);
      this.addToMap(this.coinsStatusBar);
      this.addToMap(this.endbossStatusBar);
      this.ctx.translate(this.camera_x, 0);

      this.addToMap(this.character);

      this.addObjectsToMap(this.level.bottles);
      this.addObjectsToMap(this.level.clouds);
      this.addObjectsToMap(this.level.enemies);
      this.addObjectsToMap(this.throwableObjects);
      this.addObjectsToMap(this.level.coins);

      this.ctx.translate(-this.camera_x, 0);

      let self = this;
      requestAnimationFrame(() => {
         if (this.freezeGame) {
            return;
         }
         this.draw();
      });
   }

   /**
    * Adds an array of objects to the map.
    * @param {DrawableObject[]} objects
    */
   addObjectsToMap(objects) {
      objects.forEach((object) => {
         this.addToMap(object);
      });
   }

   /**
    * Adds a single object to the map.
    * @param {DrawableObject} moveableObject
    */
   addToMap(moveableObject) {
      if (moveableObject.otherDirection) {
         this.flipImage(moveableObject);
      }
      moveableObject.draw(this.ctx);

      if (moveableObject.otherDirection) {
         this.flipImageBack(moveableObject);
      }
   }

   /**
    * Flips the image horizontally for objects facing the other direction.
    * @param {moveableObject} moveableObject
    */
   flipImage(moveableObject) {
      this.ctx.save();
      this.ctx.translate(moveableObject.width, 0);
      this.ctx.scale(-1, 1);
      moveableObject.x = moveableObject.x * -1;
   }

   /**
    * Reverts the image flip done by `flipImage`.
    * @param {moveableObject} moveableObject
    */
   flipImageBack(moveableObject) {
      moveableObject.x = moveableObject.x * -1;
      this.ctx.restore();
   }
}
