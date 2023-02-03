// ------------------------------------------------
// Background render functions:
// - all graphics and models code are written here
// - at the bottom there are remarks of the enemies
//   and platforms extensions
// ------------------------------------------------

//sky drawing function
function drawBackgroundSky(grad1, grad2) {
  grad1 = color(50, 161, 168);
  grad2 = color(202, 209, 119);

  for (var i = 0; i < height; i++) {
    var inter = map(i, 0, height, 0, 1);
    var gradcolour = lerpColor(grad1, grad2, inter);
    stroke(gradcolour);
    line(0, i, width, i);
  }
}

//sun drawing function
function drawSun() {
  for (var i = 0; i < 10; i++) {
    fill(235, 172, 89, 100);
    ellipse(300, 50, 60 + i * 10);

    fill(224, 148, 47, 100);
    ellipse(300, 50, 20 + i * 8); //internal
  }
}

//drawing greeny islands
function drawGreenBackground() {
  var backg_multiplier = 600;

  for (var i = -3; i < 10; i++) {
    fill(136, 181, 94); //lightest
    ellipse(200 + i * backg_multiplier, height - 20, 400, 150);
    fill(129, 173, 87);
    ellipse(500 + i * backg_multiplier, height - 20, 300, 100);
    fill(115, 171, 82);
    ellipse(700 + i * backg_multiplier, height - 20, 350, 130);
    fill(108, 161, 76); // darkest
    ellipse(950 + i * backg_multiplier, height - 30, 300, 100);
  }
}

//function to draw the ground on which character is moving
function drawGround() {
  for (var i = 0; i < ground.length; i++) {
    //spikes
    for (var j = 0; j < 10; j++) {
      fill(77, 64, 44);
      triangle(
        ground[i].x_pos + 11,
        floorPos_y + 30 + j * 20,
        ground[i].x_pos + 11,
        floorPos_y + 50 + j * 20,
        ground[i].x_pos + 4,
        floorPos_y + 40 + j * 20
      );
      triangle(
        ground[i].x_pos + ground[i].length - 10,
        floorPos_y + 30 + j * 20,
        ground[i].x_pos + ground[i].length - 10,
        floorPos_y + 50 + j * 20,
        ground[i].x_pos + ground[i].length - 3,
        floorPos_y + 40 + j * 20
      );
    }
    //dirt
    fill(77, 64, 44);
    rect(ground[i].x_pos + 10, floorPos_y, ground[i].length - 20, height / 4);
    //grass
    fill(51, 133, 44);
    rect(ground[i].x_pos, floorPos_y, ground[i].length, 30, 5, 5, 20, 20);
  }
}

//function to draw bridges
function drawBridges() {
  stroke(117, 86, 41);
  strokeWeight(5);
  for (var i = 0; i < bridges.length; i++) {
    line(
      bridges[i].x_pos,
      floorPos_y + 1,
      bridges[i].x_pos + bridges[i].length,
      floorPos_y + 1
    );
    line(
      bridges[i].x_pos,
      floorPos_y - 30,
      bridges[i].x_pos + bridges[i].length,
      floorPos_y - 30
    );
    line(
      bridges[i].x_pos + 10,
      floorPos_y + 1,
      bridges[i].x_pos + 10,
      floorPos_y - 30
    );
    line(
      bridges[i].x_pos + bridges[i].length - 10,
      floorPos_y + 1,
      bridges[i].x_pos + bridges[i].length - 10,
      floorPos_y - 30
    );
    line(
      bridges[i].x_pos + bridges[i].length / 2,
      floorPos_y + 1,
      bridges[i].x_pos + bridges[i].length / 2,
      floorPos_y - 30
    );
    line(
      bridges[i].x_pos + 10,
      floorPos_y + 1,
      bridges[i].x_pos + bridges[i].length / 2,
      floorPos_y - 30
    );
    line(
      bridges[i].x_pos + bridges[i].length - 10,
      floorPos_y + 1,
      bridges[i].x_pos + bridges[i].length / 2,
      floorPos_y - 30
    );
  }
}

//function to draw clouds
function drawClouds() {
  for (var i = 0; i < clouds.length; i++) {
    fill(255);
    ellipse(
      clouds[i].x_pos,
      clouds[i].y_pos,
      clouds[i].size,
      clouds[i].size - 10
    );
    ellipse(clouds[i].x_pos + 20, clouds[i].y_pos - 7, clouds[i].size);
    ellipse(clouds[i].x_pos + 40, clouds[i].y_pos - 5, clouds[i].size);
    ellipse(
      clouds[i].x_pos + 35,
      clouds[i].y_pos - 15,
      (clouds[i].size * 3) / 4
    );
    ellipse(
      clouds[i].x_pos + 55,
      clouds[i].y_pos + 3,
      clouds[i].size - 10,
      clouds[i].size / 2
    );
    clouds[i].x_pos -= 0.05;
  }
}

//function to draw mountains
function drawMountains() {
  var mtn_count = -2;
  var mtn_multiplier = 550;
  while (mtn_count < 6) {
    for (var i = 0; i < mountains.length; i++) {
      let mtn_draw = triangle(
        mountains[i].x_bottom_left_corner + mtn_count * mtn_multiplier,
        height,
        mountains[i].x_bottom_right_corner + mtn_count * mtn_multiplier,
        height,
        mountains[i].x_upper_corner + mtn_count * mtn_multiplier,
        mountains[i].y_upper_corner
      );

      if (!mountains[i].mtn_infront) {
        //when ! - light colour is in front
        fill(90, 94, 86); //dark
        mtn_draw;
      } else {
        fill(111, 117, 104); //light
        mtn_draw;
      }
    }
    mtn_count++;
  }
}

//function to draw trees objects
function drawTrees() {
  for (var i = 0; i < trees.length; i++) {
    //trunk
    fill(92, 60, 28);
    triangle(
      trees[i].trunk_x_left,
      floorPos_y,
      trees[i].trunk_x_right,
      floorPos_y,
      (trees[i].trunk_x_left + trees[i].trunk_x_right) / 2,
      floorPos_y - 50
    );
    triangle(
      trees[i].trunk_x_left - 10,
      floorPos_y - 110,
      trees[i].trunk_x_right - 5,
      floorPos_y - 110,
      (trees[i].trunk_x_left + trees[i].trunk_x_right) / 2,
      floorPos_y - 10
    );

    //treetop
    fill(35, 92, 28);
    ellipse(
      trees[i].trunk_x_left - 20,
      floorPos_y - 100,
      trees[i].treetop_left_size
    );
    ellipse(
      trees[i].trunk_x_right - 10,
      floorPos_y - 120,
      trees[i].treetop_right_size
    );

    //hole
    fill(48, 42, 19);
    ellipse(
      (trees[i].trunk_x_left + trees[i].trunk_x_right) / 2,
      floorPos_y - 20,
      10,
      14
    );
  }
}

//function to draw player's lives
function drawLives() {
  for (var i = 0; i < lives; i++) {
    fill(194, 23, 23);
    ellipse(36 + 32 * i, 62, 15);
    ellipse(23 + 32 * i, 62, 15);
    triangle(16 + 32 * i, 65, 43 + 32 * i, 65, 30 + 32 * i, 82);

    //white thingys
    fill(255);
    ellipse(37 + 32 * i, 61, 8);
    ellipse(23 + 32 * i, 61, 8);

    fill(194, 23, 23);
    ellipse(35 + 32 * i, 63, 10);
    ellipse(21 + 32 * i, 63, 10);
  }
}

//function to draw player's score icon
function drawScore() {
  //coin
  strokeWeight(3);
  stroke(200, 180, 0);
  fill(252, 186, 0);
  ellipse(30, 25, 20);
  ellipse(30 - 7, 18 + 21, 3);
  ellipse(30 + 5, 18 + 23, 2);
  ellipse(30 - 2, 18 + 28, 1);
  noStroke();
  fill(163, 75, 201, 230);
  //crystal
  beginShape();
  vertex(30 - 3, 25);
  vertex(30, 25 - 5);
  vertex(30 + 3, 25);
  vertex(30, 25 + 5);
  endShape();
}

//function to draw a house as a flagpole indicator
function drawFlagpole_House() {
  noStroke();
  //walls
  fill(138, 135, 81);
  rect(flagpole.x_pos - 100, floorPos_y - 200, 300, 200);

  //door
  stroke(163, 49, 21);
  strokeWeight(3);
  fill(179, 57, 27);
  rect(flagpole.x_pos - 10, floorPos_y - 57, 30, 55);

  //chimney
  stroke(38, 38, 29);
  strokeWeight(3);
  fill(48, 48, 35);
  rect(flagpole.x_pos - 70, floorPos_y - 260, 40, 50);
  rect(flagpole.x_pos - 80, floorPos_y - 265, 60, 10);

  //roof
  stroke(50, 117, 184);
  strokeWeight(3);
  fill(54, 132, 209);
  triangle(
    flagpole.x_pos - 120,
    floorPos_y - 200,
    flagpole.x_pos + 220,
    floorPos_y - 200,
    flagpole.x_pos + 50,
    floorPos_y - 280
  );
  noStroke();

  //windows colour change when character reaches the flagpole
  for (var i = 0; i < 2; i++) {
    windows_colour = color(23, 25, 36);
    if (flagpole.isReached) {
      windows_colour = color(201, 209, 54);
      fill(windows_colour);
      rect(flagpole.x_pos - 70 + 140 * i, floorPos_y - 150, 80, 50);
      // add your jumping facing forwards code
      //head
      fill(217, 215, 176);
      ellipse(flagpole.x_pos - 40, floorPos_y - 50 - 73, 20, 20);

      //body
      fill(53, 69, 150);
      rect(flagpole.x_pos - 7 - 40, floorPos_y - 42 - 73, 15, 15);

      //arms
      fill(50, 51, 59);
      rect(flagpole.x_pos - 12 - 40, floorPos_y - 58 - 73, 5, 20);
      rect(flagpole.x_pos + 8 - 40, floorPos_y - 58 - 73, 5, 20);
    } else {
      fill(windows_colour);
      rect(flagpole.x_pos - 70 + 140 * i, floorPos_y - 150, 80, 50);
    }
  }
}

//function to check if character has reached the flagpole
function checkFlagpole_House() {
  var d = abs(gameChar_world_x - flagpole.x_pos);

  if (d <= 15) {
    flagpoleReachedSound.play();
    flagpole.isReached = true;
    backgroundSound.disconnect();
    backgroundSound.stop();
  }
}

//function to check if player dies when plummeting
function checkPlayerDie() {
  if (gameChar_y > height) {
    lives -= 1;
    plummetingSound.play();
    startGame();
    backgroundSoundCount = 3;
  }
}

//function to draw canyon objects.
function drawCanyons(t_canyons) {
  fill(54, 74, 59, 0);
  rect(t_canyons.x_upper_left, floorPos_y, t_canyons.width, 300);
}

//function to check character is over a canyon.
function checkCanyons(t_canyons) {
  if (
    gameChar_world_x >= t_canyons.x_upper_left + 7 &&
    gameChar_world_x <= t_canyons.x_upper_left + t_canyons.width - 7 &&
    gameChar_y >= floorPos_y
  ) {
    isPlummeting = true;
    isFalling = true;
    isRight = false;
    isLeft = false;
    isJumping = false;
  } else {
    isPlummeting = false;
  }

  if (isPlummeting && !isJumping) {
    gameChar_y += 10;
  }
}

//enemies render and check functions

function Enemy(x, y, range) {
  this.x = x;
  this.y = y;
  this.range = range;

  this.currentX = x;
  this.inc = 1;

  this.update = function () {
    this.currentX += this.inc;

    if (this.currentX >= this.x + this.range) {
      this.inc = -1;
    } else if (this.currentX < this.x) {
      this.inc = 1;
    }
  };
  this.draw = function () {
    this.update();
    //head
    fill(217, 215, 176);
    rect(this.currentX - 8, this.y - 23, 17, 10);
    rect(this.currentX - 8, this.y - 34, 17, 10);
    fill(204, 202, 167);
    rect(this.currentX - 9, this.y - 33, 19, 10);

    //eyes
    fill(31, 31, 29);
    rect(this.currentX - 6, this.y - 32, 4, 7);
    rect(this.currentX + 2, this.y - 32, 4, 7);

    //body
    fill(184, 183, 158);
    rect(this.currentX - 7, this.y - 22, 15, 15);
    //bones across
    fill(201, 200, 169);
    rect(this.currentX - 2, this.y - 22, 5, 15);
    rect(this.currentX - 7, this.y - 18, 15, 5);

    //legs
    fill(191, 190, 163);
    rect(this.currentX - 8, this.y - 10, 5, 10);
    rect(this.currentX + 4, this.y - 10, 5, 10);

    //arms
    fill(150, 149, 134);
    rect(this.currentX - 12, this.y - 22, 5, 15);
    rect(this.currentX + 8, this.y - 22, 5, 15);
  };
  this.checkContact = function (gc_x, gc_y) {
    var d = dist(gc_x, gc_y, this.currentX, this.y);

    if (d < 23) {
      return true;
    }
    return false;
  };
}

//collectable items render and check functions
/*
    Collectables uses almost the same constructor function as the Enemies, 
    with one small exception. The collectables move on the y axis, in a loop, 
    while enemies move on the x axis.
*/
function Collectables(x, y, range) {
  this.x = x;
  this.y = y;
  this.range = range;

  this.currentY = y;
  this.inc = 0.3;

  this.update = function () {
    this.currentY += this.inc;

    if (this.currentY >= this.y + this.range) {
      this.inc = -0.3;
    } else if (this.currentY < this.y) {
      this.inc = 0.3;
    }
  };
  this.draw = function () {
    this.update();
    //coin
    strokeWeight(3);
    stroke(200, 180, 0);
    fill(252, 186, 0);
    ellipse(this.x, this.currentY, 30);
    ellipse(this.x - 7, this.currentY + 21, 6);
    ellipse(this.x + 5, this.currentY + 23, 4);
    ellipse(this.x - 2, this.currentY + 28, 2);
    noStroke();
    fill(163, 75, 201, 230);
    //crystal
    beginShape();
    vertex(this.x - 5, this.currentY);
    vertex(this.x, this.currentY - 8);
    vertex(this.x + 5, this.currentY);
    vertex(this.x, this.currentY + 8);
    endShape();
  };
  this.checkContact = function (gc_x, gc_y) {
    var d = dist(gc_x, gc_y, this.x, this.currentY);

    if (d < 55) {
      return true;
    }
    return false;
  };
}

//platforms render and check functions
function Platform(x, y, length) {
  var p = {
    x: x,
    y: y,
    length: length,
    draw: function () {
      fill(77, 64, 44);
      rect(this.x, this.y, this.length, 20, 3, 3);
      fill(51, 133, 44);
      rect(this.x, this.y, this.length, 5, 3, 3, 0, 0);
    },
    checkContact: function (gc_x, gc_y) {
      if (gc_x > this.x && gc_x < this.x + this.length) {
        var d = this.y - gc_y + 4;

        if (d >= 0 && d < 5) {
          return true;
        }
        return false;
      }
    },
  };
  return p;
}
