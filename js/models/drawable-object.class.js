class DrawableObject {
   img;
   imageCache = [];
   currentImage = 0;

   loadImage(path) {
      this.img = new Image();
      this.img.src = path;
   }

   loadRandomImage(imagesArray) {
      const randomIndex = Math.floor(Math.random() * imagesArray.length);
      const chosenImage = imagesArray[randomIndex];
      this.loadImage(chosenImage);
  }
  

   draw(ctx) {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
   }

   drawFrame(ctx) {
      if (this instanceof Character || this instanceof Chicken) {
         ctx.beginPath();
         ctx.lineWidth = '1';
         ctx.strokeStyle = 'blue';
         ctx.rect(this.x, this.y, this.width, this.height);
         ctx.stroke();
      }
   }

   loadImages(array) {
      array.forEach((path) => {
         let img = new Image();
         img.src = path;
         this.imageCache[path] = img;
      });
   }
}
