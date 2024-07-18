let level1;

/**
 * Initializes the first level with specified game objects.
 *
 * @param {Object} params - Additional parameters for initializing the level (currently not used).
 */

function initLevel(params) {
   level1 = new Level(
      [
         new Chicken(),
         new Chicken(),
         new Chicken(),
         new Chicken(),
         new Chicken(),
         new Chicken(),
         new Chicken(),
         new Chicken(),
         new SmallChicken(),
         new SmallChicken(),
         new SmallChicken(),
         new SmallChicken(),
         new SmallChicken(),
         new SmallChicken(),
         new SmallChicken(),
         new SmallChicken(),
         new Endboss(),
      ],
      [new Clouds()],
      [
         new BackgroundObject('./img/5_background/layers/air.png', -719, 0),
         new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', -719, 0),
         new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', -719, 0),
         new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', -719, 0),

         new BackgroundObject('./img/5_background/layers/air.png', 0, 0),
         new BackgroundObject('./img/5_background/layers/3_third_layer/1.png', 0, 0),
         new BackgroundObject('./img/5_background/layers/2_second_layer/1.png', 0, 0),
         new BackgroundObject('./img/5_background/layers/1_first_layer/1.png', 0, 0),

         new BackgroundObject('./img/5_background/layers/air.png', 719, 0),
         new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', 719, 0),
         new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', 719, 0),
         new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', 719, 0),

         new BackgroundObject('./img/5_background/layers/air.png', 719 * 2, 0),
         new BackgroundObject('./img/5_background/layers/3_third_layer/1.png', 719 * 2, 0),
         new BackgroundObject('./img/5_background/layers/2_second_layer/1.png', 719 * 2, 0),
         new BackgroundObject('./img/5_background/layers/1_first_layer/1.png', 719 * 2, 0),

         new BackgroundObject('./img/5_background/layers/air.png', 719 * 3, 0),
         new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', 719 * 3, 0),
         new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', 719 * 3, 0),
         new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', 719 * 3, 0),
      ],
      [
         new Bottles(),
         new Bottles(),
         new Bottles(),
         new Bottles(),
         new Bottles(),
         new Bottles(),
         new Bottles(),
         new Bottles(),
         new Bottles(),
         new Bottles(),
      ],
      [
         new Coins(),
         new Coins(),
         new Coins(),
         new Coins(),
         new Coins(),
         new Coins(),
         new Coins(),
         new Coins(),
         new Coins(),
         new Coins(),
      ]
   );
}
