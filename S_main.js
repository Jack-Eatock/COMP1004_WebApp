///////// Main GamePlay vars \\\\\\\\\
var RateDecresePerFrameE = 0.017; var RateDecresePerFrameH = 0.018;
var RateDecresePerFrameS = 0.026; var RateDecresePerFrameSY = 0.01;
var ModeDebug = false;
var GameBeingPlayed = 0;

///////// Loading rooms \\\\\\\\\
var Images = []
var CurrentRoom = 0;

// Time
var CurFrame = 0; // iterates every frame, updates tickClock every 60. (a second)
var TickClock = 0; // will keep track of seconds, reset every minute. ( 60 secs)
var CurHour = 0;

///////// Bedroom Vars \\\\\\\\\
var IsPlantAlive = true;

///////// Showing Single Image On screen. E.g notes / text \\\\\\\\\
var ImageToShow = 0;
var IsOnlyImageShowing = false;


/** 
 * Preload all the data into a easily accessed variable.
 */
function preload() {
  data = loadJSON('Maps.json');  // loads required data
}

/** 
 * - Grab all the references to the images that need to be loaded.
 * - Loop through each reference, preloading the image into a temp variable
 * - Add the ready loaded image into an easily accessable array.
 */
function SetupImages(){
  var imagesToLoad = data.ImagesToPreload;
  for (var x = 0; x < imagesToLoad.length; x++){
    var newImage = loadImage(imagesToLoad[x].url);
    Images.push(newImage);
  }
}


/** 
 * Any functionality to run before the main program. 
 * - Prepare all the images
 * - Set the framerate
 * - Create the canvas
 */
function setup() {
  SetupImages()     // prepares all images
  imageMode(CENTER);
  //rectMode(CENTER);
  
  frameRate(60);
  var cnv = createCanvas(1200, 700);
  cnv.parent("MyCanvas"); // Centred by CSS

}


/** 
 * Runs every frame.
 * Basically runs everything.
 */
function draw() {
  // Set background to black.
  background(0);

  // Debug Tools \\
  CheatTeleportToRoom(true);
  // Debug Tools \\
  
  // If only displaying image. Display the image and break out.
  if (IsOnlyImageShowing){
    DisplayOnlyImageUntillInput();
    GetInput();
    if (!ModeDebug){DrawUI();}
    return;
  }
  
  // Not sure to keep this atm
  switch (GameBeingPlayed){
    case (0) : 
      DrawRoom();
      GetInput();
      MoveCharacter();
      break;
    
    // Sleep Mini Game, Cloud Jumping. 
    case (1) : 
      CloudGameDisplay();
      break;     
  }

  if (!ModeDebug){DrawUI();}

  // Notifications
  UpdateText(3, 'Notice : ' + PlayerNotice);
  
  // Time stuff
  CurFrame++; // Keep track of frame
  TickClock = CurFrame / 60; // Convert current frame into Secodns.
  CurHour   = (TickClock / 7.5).toFixed(2); // 8 hours per minute

}


/** 
 * Used when you want only one image or set of images to display
 * without displaying the room etc. For example displaying the notes.
 * - Maybe make it so you can inspect objects? 
 */
function DisplayOnlyImageUntillInput(){
  image(Images[26] , width/2  , 300 );
}


/** 
 * In charge of switching level / room :
 * - First actually switch the level/room
 * - Then move the character either to the specified location passed through
 * - or if not specified place them in their default location for that room in data.
 */
function SwitchLevel(roomNum, x = 0, y = 0){
  CurrentRoom = roomNum; // Changes the room that is being displayed.

  // If spawn location is not specifically set use default
  if (x == 0 && y == 0){
    CurrentPlayerPos.x = data.rooms[roomNum].spawnLocationX;
    CurrentPlayerPos.y = data.rooms[roomNum].spawnLocationY;
  }
  else{ CurrentPlayerPos.x = x; CurrentPlayerPos.y = y;}

  // Setup Animation handles
  AnimTimers = [];

}





