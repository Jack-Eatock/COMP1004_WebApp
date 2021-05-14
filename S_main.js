///////// Main GamePlay vars \\\\\\\\\
var RateDecresePerFrameE = 0.010; var RateDecresePerFrameH = 0.007;
var RateDecresePerFrameS = 0.010; var RateDecresePerFrameSY = 0.01;
var ModeDebug = false;
var Cash = 5;

///////// Loading rooms \\\\\\\\\
var Images = []
var CurrentRoom = 0;

///////// Cheats \\\\\\\\\
var RateOfDecreaseMult = 4; // Multiplies decrease rate.

///////// Bedroom Vars \\\\\\\\\
var IsPlantAlive = true;

///////// Showing Single Image On screen. E.g notes / text \\\\\\\\\
var ImageToShow = 0;
var IsInteracting = false;

/** 
 * Preload all the data into a easily accessed variable.
 */
function preload() {
  data = loadJSON('Maps.json');  // loads required data
  dialog = loadJSON('Dialog.json');  // loads required data
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
  background(0);   // Set background to black.

  // Debug Tools \\
  CheatTeleportToRoom(true);
  // Debug Tools \\

  updateTime();   // Time

  // If Interacting with a specific object, run their code
  if (IsInteracting){
    //DisplayOnlyImageUntillInput(CurTrigEvent);
    GetInput();
    
    // Run the appropriate Func, depending on interaction running.
    switch (CurTrigEvent){
      case(1):  PcInteraction();   break; // PC
      case(2):  Sleeping();        break; // Bed
      case(3):  NoteInteraction();   break;  // Notes
      case(4):  PcInteraction();   break;  // Plant
      case(5):  PcInteraction();   break; // Sam
      case(6):  FridgeInteraction();   break; // Fridge
      case(7):  FridgeInteraction();   break;
    }

    if (!ModeDebug){DrawUI();}
    // Don't wanna do anything else in this func 
    return;
  }
  
 
  DrawRoom();
  GetInput();
  MoveCharacter();

  if (!ModeDebug){DrawUI();}

  // Notifications
  UpdateText(3, 'Notice : ' + PlayerNotice);
}


/** 
 * TO DELETE DELETE DELETE DELETE DELETE DELETE DELETE DELETE DELETE DELETE DELETE DELETE
 * 
 * 
 * Used when you want only one image or set of images to display
 * without displaying the room etc. For example displaying the notes.
 * - Maybe make it so you can inspect objects? 
 */
function DisplayOnlyImageUntillInput(type){
  switch (type){
    case 3 : image(Images[26] , width/2  , 300 ); break;
    case 5 :
      fill(255); rect(600 - 410, 190,820,320); // White background
      fill(0);   rect(600 - 400, 200,800,300); // Black overlay
      image( Images[0] , 250  , 270 ); 
      image( Images[10] , 940  , 430 ); 
      Communication();
        break;

  }
  
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





