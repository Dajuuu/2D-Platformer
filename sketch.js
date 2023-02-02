/* Here is a quick overview of what is in the game directory:

    - sketch.js             - contains setup, draw and key controls. Main file
    - characterRender.js    - player/game character model
    - backgroundRender.js   - all of the scenery models (such as mountains, enemies, etc.)
    - initalValues.js       - values, variables, arrays and global objects
    - p5.min.js             - p5 main library
    - p5.sound.min.js       - p5 sound library
    - Lato-Regular.ttf      - font used in the game
    - index.html            - html file
    - sound folder          - all sound effects are stored here as well as a ReadMe.txt 
                              file with sources of those sounds    
*/

// --------------------------------------
// Setup function:
// - here you can set the number of lives
// - set the size of the canvas
// --------------------------------------
function setup() {
  createCanvas(1224, 576);
  floorPos_y = (height * 3) / 4;

  //Number of starting lives
  lives = 3;

  //This line is for the player to have ability to restore the initial number of lives after reseting
  lives_start = lives;

  //Calling start game
  startGame();
}

// -------------------------------------------------------------------
// In draw function every function is called in fixed order as well as
// (background) scrolling for certain functions with different values
// and logic behind those (character logic, flagpole logic, etc.)
// -------------------------------------------------------------------
function draw() {
  //gradient sky
  drawBackgroundSky();
  noStroke();

  //sun with scrolling
  push();
  translate(scrollPos * 0.03, 0);
  drawSun();
  pop();

  //clouds with scrolling
  push();
  translate(scrollPos * 0.1, 0);
  drawClouds();
  pop();

  //mountains with scrolling
  push();
  translate(scrollPos * 0.3, 0);
  drawMountains();
  pop();

  //draw green background with scrolling
  push();
  translate(scrollPos * 0.5, 0);
  drawGreenBackground();
  pop();

  //this scrolling value is the same for all functions below
  push();
  translate(scrollPos, 0);

  //draw canyons with its check function call
  for (var i = 0; i < canyons.length; i++) {
    drawCanyons(canyons[i]);
    checkCanyons(canyons[i]);
  }

  //draw trees
  drawTrees();

  //draw ground
  drawGround();

  //draw bridges
  drawBridges();

  //draw flagpole - the flagpole is the entrance to the house
  drawFlagpole_House();

  //drawing enemies
  for (var i = 0; i < enemies.length; i++) {
    noStroke();
    enemies[i].draw();

    //contact with enemies logic
    var isContact = enemies[i].checkContact(gameChar_world_x, gameChar_y);

    if (isContact) {
      gameChar_world_x = width / 2;
      opponentContactSound.play();
      lives -= 1;
      backgroundSoundCount = 3;

      if (lives > 0) {
        startGame();
        backgroundSoundCount = 3;
        break;
      }
    }
  }

  //drawing collectables/coins
  for (var i = 0; i < collectables.length; i++) {
    if (!collectables[i].isFound) {
      noStroke();
      collectables[i].draw();

      //contact with coins logic
      var isContact = collectables[i].checkContact(
        gameChar_world_x,
        gameChar_y
      );

      if (isContact) {
        game_score += 1;
        collectables[i].isFound = true;
        coinSound.play();
      }
    }
  }

  //drawing platforms
  for (var i = 0; i < platforms.length; i++) {
    noStroke();
    platforms[i].draw();
  }

  pop(); // <--- ending of the scrolling

  //draw player's lives (hearts) on the screen
  drawLives();

  //score counter and score icon in the top left corner
  noStroke();
  textSize(20);
  drawScore();
  fill(255);
  textFont(Lato);
  text(game_score, 52, 32);

  //game over text
  if (lives < 1) {
    fill(255);
    noStroke();
    textSize(30);
    textFont(Lato);
    text(
      "Game over. Press space to restart.",
      width / 2 - 200,
      height / 2 - 50
    );
    return;
  }

  //level complete text - reaching the flagpole (house)
  if (flagpole.isReached) {
    fill(255);
    noStroke();
    textSize(30);
    textFont(Lato);
    text(
      "You've won! Press space if you want to play again",
      width / 2 - 300,
      height / 2 - 50
    );
    backgroundSound.stop();
    return;
  }

  //draw game character.
  drawGameChar();

  //checking if player dies
  checkPlayerDie();

  //flagpole logic
  if (!flagpole.isReached) {
    checkFlagpole_House();
  }

  // Logic to make the game character and camera move.
  if (isLeft) {
    if (gameChar_x > width * 0.4) {
      //controling camera movement speed
      gameChar_x -= 4;
    } else {
      scrollPos += 4;
    }
  }
  if (isRight) {
    if (gameChar_x < width * 0.4) {
      //controling camera movement speed
      gameChar_x += 4;
    } else {
      scrollPos -= 4; // negative for moving against the background
    }
  }

  // Logic to make the game character rise and fall.
  // Also when on the platforms
  if (gameChar_y < floorPos_y) {
    var isContact = false;
    for (var i = 0; i < platforms.length; i++) {
      if (platforms[i].checkContact(gameChar_world_x, gameChar_y)) {
        isContact = true;
        isFalling = false;
        break;
      }
    }
    if (!isContact) {
      isFalling = true;
      gameChar_y += 3.2;
    }
  } else {
    isFalling = false;
  }

  // Update real position of gameChar for collision detection.
  gameChar_world_x = gameChar_x - scrollPos;
}

// ---------------------
// Key control functions
// ---------------------
function keyPressed() {
  if (!flagpole.isReached) {
    //right arrow
    if (keyCode == 39 || keyCode == 68) {
      isRight = true;
      backgroundSoundCount++;
    }

    //left arrow
    if (keyCode == 37 || keyCode == 65) {
      isLeft = true;
      backgroundSoundCount++;
    }

    //space-bar
    if (keyCode == 32 || keyCode == 87) {
      backgroundSoundCount++;
      if (isJumping) {
        if (!isFalling && !isPlummeting) {
          jumpingSound.play();
          gameChar_y -= 136; //jumping height "power"
        }
        if (lives < 1) {
          lives = lives_start;
          startGame();
          backgroundSoundCount = 3;
        }
      }
    }
    // initialising background sound
    if (backgroundSoundCount == 1) {
      backgroundSound.connect();
      backgroundSound.play();
      backgroundSound.loop();
    }
  }

  //ability to reset the game after player reaches the flagpole
  if (flagpole.isReached && lives > 0) {
    //space-bar
    if (keyCode == 32 || keyCode == 87) {
      gameChar_world_x = 0;
      backgroundSoundCount = 0;
      backgroundSound.stop();
      lives = lives_start;
      startGame();
    }
  }
}

function keyReleased() {
  //right arrow
  if (keyCode == 39 || keyCode == 68) {
    isRight = false;
  }

  //left arrow
  if (keyCode == 37 || keyCode == 65) {
    isLeft = false;
  }
}
