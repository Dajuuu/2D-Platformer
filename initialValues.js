/*

The Game Project 7 - Final Project

initialValues.js

*/

//--------------------------------------------------------
// Here, all of variables, objects and arrays are declared
//--------------------------------------------------------

//character related variables
var gameChar_x;
var gameChar_y;
var floorPos_y;
var scrollPos;
var gameChar_world_x;

var isLeft;
var isRight;
var isFalling;
var isPlummeting;
var isJumping;

//adding textures to the canvas
var clouds;
var mountains;
var trees;
var canyons;
var collectables;
var ground;
var bridges;
var greenBackground;
var enemies;
var platforms;
var flagpole;

//lives and score
var game_score;
var lives;
var lives_start;

//sound variables
var backgroundSound;
var coinSound;
var plummetingSound;
var jumpingSound;
var opponentContactSound;
var flagpoleReachedSound;

// ---------------------------
// Preloading fonts and sounds
// ---------------------------

function preload() {
  Lato = loadFont("resources/Lato-Regular.ttf");

  soundFormats("mp3", "wav");

  //all sounds are initialised here with adjusted volumes
  backgroundSound = loadSound("sound/BackgroundMusic.mp3");
  backgroundSound.setVolume(0.05);
  coinSound = loadSound("sound/Coins.mp3");
  coinSound.setVolume(0.2);
  plummetingSound = loadSound("sound/Falling.mp3");
  plummetingSound.setVolume(0.15);
  jumpingSound = loadSound("sound/Jumping.wav");
  jumpingSound.setVolume(0.1);
  opponentContactSound = loadSound("sound/OpponentContact.wav");
  opponentContactSound.setVolume(0.1);
  flagpoleReachedSound = loadSound("sound/FlagpoleReached.wav");
  flagpoleReachedSound.setVolume(0.2);
}

// -------------------------------------------
// Starting game function:
// - assigning initial values to the variables
// - arrays and objects
// -------------------------------------------

function startGame() {
  //game character position
  gameChar_x = width / 2;
  gameChar_y = floorPos_y;

  //boolean variables to control the movement of the game character
  isLeft = false;
  isRight = false;
  isFalling = false;
  isPlummeting = false;
  isJumping = true;

  //variable to control the background scrolling
  scrollPos = 0;

  //counter to start the background music
  backgroundSoundCount = 0;

  //game score when starting the game
  game_score = 0;

  //all of the arrays, objects and constructors
  trees = [
    {
      treetop_left_size: 70,
      treetop_right_size: 110,
      trunk_x_left: 100,
      trunk_x_right: 150,
    },
    {
      treetop_left_size: 100,
      treetop_right_size: 90,
      trunk_x_left: -450,
      trunk_x_right: -380,
    },
    {
      treetop_left_size: 100,
      treetop_right_size: 90,
      trunk_x_left: 0,
      trunk_x_right: 50,
    },
    {
      treetop_left_size: 100,
      treetop_right_size: 130,
      trunk_x_left: 1000,
      trunk_x_right: 1070,
    },
    {
      treetop_left_size: 90,
      treetop_right_size: 140,
      trunk_x_left: 1100,
      trunk_x_right: 1150,
    },
    {
      treetop_left_size: 90,
      treetop_right_size: 140,
      trunk_x_left: 2200,
      trunk_x_right: 2250,
    },
    {
      treetop_left_size: 100,
      treetop_right_size: 110,
      trunk_x_left: 2300,
      trunk_x_right: 2350,
    },
    {
      treetop_left_size: 80,
      treetop_right_size: 110,
      trunk_x_left: 2400,
      trunk_x_right: 2430,
    },
    {
      treetop_left_size: 80,
      treetop_right_size: 110,
      trunk_x_left: 3700,
      trunk_x_right: 3760,
    },
    {
      treetop_left_size: 90,
      treetop_right_size: 120,
      trunk_x_left: 3840,
      trunk_x_right: 3900,
    },
    {
      treetop_left_size: 100,
      treetop_right_size: 150,
      trunk_x_left: 4000,
      trunk_x_right: 4060,
    },
    {
      treetop_left_size: 100,
      treetop_right_size: 120,
      trunk_x_left: 4100,
      trunk_x_right: 4140,
    },
    {
      treetop_left_size: 80,
      treetop_right_size: 130,
      trunk_x_left: 4800,
      trunk_x_right: 4860,
    },
    {
      treetop_left_size: 100,
      treetop_right_size: 100,
      trunk_x_left: 5100,
      trunk_x_right: 5140,
    },
    {
      treetop_left_size: 60,
      treetop_right_size: 140,
      trunk_x_left: 5300,
      trunk_x_right: 5340,
    },
    {
      treetop_left_size: 70,
      treetop_right_size: 130,
      trunk_x_left: 5900,
      trunk_x_right: 5950,
    },
  ];

  clouds = [
    { x_pos: -150, y_pos: 190, size: 53 },
    { x_pos: 0, y_pos: 150, size: 50 },
    { x_pos: 150, y_pos: 130, size: 48 },
    { x_pos: 450, y_pos: 120, size: 46 },
    { x_pos: 600, y_pos: 110, size: 35 },
    { x_pos: 800, y_pos: 70, size: 40 },
    { x_pos: 1100, y_pos: 160, size: 45 },
    { x_pos: 1300, y_pos: 100, size: 55 },
    { x_pos: 1450, y_pos: 120, size: 52 },
    { x_pos: 1800, y_pos: 150, size: 35 },
    { x_pos: 2000, y_pos: 80, size: 52 },
    { x_pos: 2200, y_pos: 130, size: 56 },
    { x_pos: 2400, y_pos: 110, size: 50 },
    { x_pos: 2550, y_pos: 90, size: 51 },
    { x_pos: 2700, y_pos: 100, size: 52 },
  ];

  mountains = [
    {
      y_upper_corner: 130,
      x_upper_corner: 140,
      x_bottom_left_corner: -200,
      x_bottom_right_corner: 340,
      mtn_infront: false,
    },
    {
      y_upper_corner: 220,
      x_upper_corner: 340,
      x_bottom_left_corner: 180,
      x_bottom_right_corner: 550,
      mtn_infront: false,
    },
    {
      y_upper_corner: 190,
      x_upper_corner: 780,
      x_bottom_left_corner: 480,
      x_bottom_right_corner: 970,
      mtn_infront: true,
    },
    {
      y_upper_corner: 180,
      x_upper_corner: 200,
      x_bottom_left_corner: 0,
      x_bottom_right_corner: 350,
      mtn_infront: false,
    },
    {
      y_upper_corner: 100,
      x_upper_corner: 500,
      x_bottom_left_corner: 300,
      x_bottom_right_corner: 770,
      mtn_infront: true,
    },
    {
      y_upper_corner: 170,
      x_upper_corner: 0,
      x_bottom_left_corner: -400,
      x_bottom_right_corner: 100,
      mtn_infront: false,
    },
  ];

  canyons = [
    { x_upper_left: -2000, width: 1500 },
    { x_upper_left: 1300, width: 750 },
    { x_upper_left: 2750, width: 650 },
    { x_upper_left: 4250, width: 100 },
    { x_upper_left: 4600, width: 100 },
  ];

  collectables = [
    new Collectables(-740, floorPos_y - 203, 20, false),
    new Collectables(180, floorPos_y - 52, 20, false),
    new Collectables(1080, floorPos_y - 52, 20, false),
    new Collectables(1560, floorPos_y - 152, 20, false),
    new Collectables(1970, floorPos_y - 190, 20, false),
    new Collectables(2595, floorPos_y - 255, 20, false),
    new Collectables(3480, floorPos_y - 52, 20, false),
    new Collectables(3830, floorPos_y - 202, 20, false),
    new Collectables(4030, floorPos_y - 202, 20, false),
    new Collectables(4910, floorPos_y - 142, 20, false),
  ];

  enemies = [
    new Enemy(-200, floorPos_y, 90),
    new Enemy(1700, floorPos_y - 150, 100),
    new Enemy(2400, floorPos_y, 100),
    new Enemy(3700, floorPos_y, 80),
    new Enemy(3950, floorPos_y, 50),
    new Enemy(4450, floorPos_y, 60),
  ];

  platforms = [
    new Platform(-580, floorPos_y - 70, 150),
    new Platform(-660, floorPos_y - 120, 90),
    new Platform(-770, floorPos_y - 150, 60),
    new Platform(1300, floorPos_y - 70, 150),
    new Platform(1500, floorPos_y - 100, 120),
    new Platform(1630, floorPos_y - 150, 220),
    new Platform(2550, floorPos_y - 200, 90),
    new Platform(2700, floorPos_y - 60, 150),
    new Platform(2780, floorPos_y - 260, 90),
    new Platform(2935, floorPos_y - 280, 100),
    new Platform(2870, floorPos_y - 110, 130),
    new Platform(3040, floorPos_y - 160, 110),
    new Platform(3100, floorPos_y - 230, 90),
    new Platform(3200, floorPos_y - 110, 90),
    new Platform(3780, floorPos_y - 150, 300),
    new Platform(3680, floorPos_y - 90, 100),
    new Platform(4800, floorPos_y - 90, 220),
  ];

  ground = [
    { x_pos: -500, length: 800 },
    { x_pos: 900, length: 400 },
    { x_pos: 2050, length: 700 },
    { x_pos: 3550, length: 700 },
    { x_pos: 4350, length: 250 },
    { x_pos: 4700, length: 1300 },
  ];

  bridges = [
    { x_pos: 280, length: 640 },
    { x_pos: 3400, length: 170 },
  ];

  flagpole = { isReached: false, x_pos: 5600 };
}
