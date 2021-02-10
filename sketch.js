///////// Main GamePlay vars \\\\\\\\\
var RateDecresePerFrameE = 0.017; var RateDecresePerFrameH = 0.018;
var RateDecresePerFrameS = 0.026; var RateDecresePerFrameSY = 0.01;

///////// Movement variables \\\\\\\\\
var PlayerMovement = {  x : 0, y : 0, };
var PlayerSpeed = 4;
var CurrentPlayerPos = { x: 600,   y : 300  }; // Start pos, also stores player pos

///////// UI \\\\\\\\\
var PlayerNotice = "Welcome to isolation!";

// Defines the functionality of a percent obj
class Percent{
  constructor(){this._percent = 100;}
  get percent(){return this._percent;}
  set percent(val){if (val < 0 ){ this._percent = 0 } else if (val > 100){this._percent = 100;} else {this._percent = val;}}
}

// Now simple create the variables.
var StudyPercent  = new Percent; var HungerPercent = new Percent;
var EnergyPercent = new Percent; var SanityPercent = new Percent;

///////// Collision variables \\\\\\\\\
var playerColiderOffsets = 
{ 
   XTopLeftOffset   : -30, YTopLeftOffset    : 15, 
   XTopRightOffset  :  30, YTopRightOffset   : 15, 
   XBotLeftOffset   : -30, YBotLeftOffset    : 60, 
   XBotrightOffset  :  30, YBotrightOffset   : 60, 
}

///////// Animation \\\\\\\\\
var AnimTimers = [];
var AnimationIdentity = 0;

///////// Loading rooms \\\\\\\\\
var Images = []
var CurrentRoom = 0;

///////// Triggers \\\\\\\\\
var CurTrigEvent = 0;

var ModeDebug = false;
var GameBeingPlayed = 0;

///////// Animating \\\\\\\\\
var CurFrame = 0; // iterates every frame, updates tickClock every 60. (a second)
var TickClock = 0; // will keep track of seconds, reset every minute. ( 60 secs)
var CurHour = 0;

///////// Bedroom Vars \\\\\\\\\
var IsPlantAlive = true;

///////// Showing SIngle Image On screen. E.g notes / text \\\\\\\\\
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
 * - Should be run when the player presses the interact key
 * - Check what current event is ready to activate.
 * - Run the event accordingly.
 */
function PlayerTriedToInteract(){

  // Check which object is currently interactable.
  switch (CurTrigEvent) {
    case (0):  break; // Nothin interactable.
    case (1):  StudyPercent.percent  += 10; break; // Nothin interactable.
    case (2):  EnergyPercent.percent += 10; break; // Nothin interactable.
    case (3):  IsOnlyImageShowing = true; break; // Nothin interactable.
    case (4):  IsPlantAlive = false; Images[23] = Images[24]; break; // Make plant dead.
    case (5):  CharacterInteraction(); break; // Char interaction
  
    default:
      break;
  }

}

/** 
 * - Should run if the player's collider collides with an interactable object
 * - Set the text appropriately to the event that can be activated. 
 * - Display yellow outline around object
 */
function PlayerCouldInteract(event){
  var startText = "Press SPACE to INTERACT with : ";
  switch (event) {
    case (0):  break; // Nothin interactable.
    case (1): image(Images[20] , 476  , 200 );  PlayerNotice = startText + "Computer!"; break; // Pc
    case (2): image(Images[22] ,  453 ,  466 ); PlayerNotice = startText + "Bed!"; break; // Bed
    case (3): image(Images[21] , 366.5  , 292 ); PlayerNotice = startText + "Notes!"; break; // Notes
    case (4): if (IsPlantAlive == true){ image(Images[25] , 599  ,176 );}  PlayerNotice = startText + "Plant!"; break;
    case (5): image(Images[27] , 366.5  , 292 );  break; // Char interaction
    
    default:
      break;
  }
}

/** 
 * Should run when the player tries to interact with one of their flat mates.
 */
function CharacterInteraction(){

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
 *    [DEBUG FUNCTION]
 *  - Allow the player to press the number keys and switch rooms easily
 */
function CheatTeleportToRoom(active)
{
  if (!active){return;} // I don't think a switch can be used in this case :(
  if (keyIsDown(49)) {CurrentRoom = 1; } 
  if (keyIsDown(50)) {CurrentRoom = 2; } 
  if (keyIsDown(51)) {CurrentRoom = 3; } 
  if (keyIsDown(52)) {CurrentRoom = 4; } 
  if (keyIsDown(53)) {CurrentRoom = 5; } 
  if (keyIsDown(54)) {CurrentRoom = 6; } 
  if (keyIsDown(55)) {CurrentRoom = 0; } 
}


/** 
 * This function:
 *  - Retrieves all data required to draw the current room
 *  - Loops through the data, displaying them accordingly.
 */
function DrawRoom(){

  //if (keyIsDown(65)){ currentRoom = 1 ;}
  if (ModeDebug){UpdateText(1, 'CurrentRoom ' + CurrentRoom)};

  // DISPLAY STATIC IMAGES \\

  // First we need to obtain a reference to all the Images we should load and their positions.
  var ObjToDraw =  data.rooms[CurrentRoom].ObjectsToDraw;  
  var currObj;

  // Loop through each object to draw.
  for (var imgNum = 0; imgNum < ObjToDraw.length; imgNum++){
    // Spawn the correct object depending on the type.
    currObj = ObjToDraw[imgNum]
    switch (currObj.Type){

      case 0: // The object is a Rect()
        if (currObj.Colour == 1){ stroke(0);fill(0);} // Object is black
        else {stroke(255);fill(255);}

        rect(currObj.x, currObj.y, currObj.width, currObj.height);
        break;

      case 1: // Displaying a still image
        image(Images[currObj.imgNum] , currObj.x  , currObj.y ); 
        break;
    }
  }

  // Not all objects are static. Some are animated. Display them \\
  DisplayAnimations();
} 



/** 
 * This function:
 *  - Grabs the required data for the animations that should be drawn
 *  - Manages each animation running, storing the time since last frame for each
 *  - Then displays the correct frame and updates the time running for each anim.
 */
function DisplayAnimations(){

  // DISPLAY ANIMATIONS \\
  var animationsToDraw = data.rooms[CurrentRoom].AnimationsToDraw;
  var curAnim; var timeNeeded4NextFrame;  var curFrame;

 
  // Iterate through each animation stored.
  for (var anim = 0; anim < animationsToDraw.length; anim++){
    curAnim = animationsToDraw[anim];

    if (AnimTimers[anim] == null){ // The animation has not been set up.
      var animTimer = {
        frame : 0, // The index to reference the correct animation frame.
        timeOfLastFrame : 0
      }
      
      AnimTimers.push(animTimer); // Set it up.
    }

    /**
     * Play the correct frame. 
     * The current animation is curAnim
     * The current frame is AnimTimers[anim].frame
     * So check if we are still on the same frame.
     * each frame has a duration, check if the last
     */

    curFrame = curAnim.Frames[AnimTimers[anim].frame];
    timeNeeded4NextFrame = AnimTimers[anim].timeOfLastFrame + curFrame.Duration;

    if ( TickClock >= timeNeeded4NextFrame){ // Switch to next frame.
      // Check if last frame. ADD THIS
      if ( AnimTimers[anim].frame + 1 >= curAnim.Frames.length){
        AnimTimers[anim].frame = 0;
        AnimTimers[anim].timeOfLastFrame = TickClock;
      }
      else{
        AnimTimers[anim].frame++; // Iterate frame 
        AnimTimers[anim].timeOfLastFrame = TickClock; // update time of last frame.
        curFrame = curAnim.Frames[AnimTimers[anim].frame];
      }
    }

    // Now that the correct frame is selected. 
    // Display the appropriate frame in the correct pos
  
    image(Images[curFrame.imgNum] , curFrame.x  , curFrame.y );
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



/** 
 * Checks if the player is colliding with any colliders / triggers
 * - Takes the current position, calculates the 4 points for the player colider
 * - Loops through each collider for the room they are in
 * - Checking if the player is colliding with any, if they are react accordingly
 * - Based on the type of collider. Some prevent movement, Act as event triggers etc
 */
function IsColliding(PosX, PosY, Offsets)
{
  let CordsToCheck =
  [
    { X : PosX + Offsets.XTopLeftOffset,   Y : PosY + Offsets.YTopLeftOffset },
    { X : PosX + Offsets.XTopRightOffset,  Y : PosY + Offsets.YTopRightOffset },
    { X : PosX + Offsets.XBotLeftOffset,   Y : PosY + Offsets.YBotLeftOffset },
    { X : PosX + Offsets.XBotrightOffset,  Y : PosY + Offsets.YBotrightOffset }
  ]
  var PointX;
  var PointY;

 // Now we know where the player will be. Calculate if the new pos is overlapping any colliders.
 var Cols =  data.rooms[CurrentRoom].Colliders;  // Grab the colliders for this room. Optimsie later!
 var Colliding = false;     
 var eventTrigFlag = false; // Ensures a new event trig is found. Or set default.
 var eventToStart =  0;

 for (var i = 0; i < Cols.length; i++) { // Check all the colliders within the room.
  for (var j = 0; j < CordsToCheck.length; j++){

    PointX = CordsToCheck[j].X;
    PointY = CordsToCheck[j].Y;

    if (PointX >= Cols[i].X1 && PointX <= Cols[i].X2){  // Within X bounds
      if (PointY >= Cols[i].Y1 && PointY <= Cols[i].Y2) // Within Y bounds
      {
          // Okay so the new position will collide with this specific collider. Now what?  
          // Check what affect the collision should have.
          switch (Cols[i].Type){
            case 0: Colliding = true; break; // basic
            case 1: SwitchLevel(Cols[i].Room, Cols[i].SpwnX, Cols[i].SpwnY); break; // doors
            case 2: eventToStart = Cols[i].Event; eventTrigFlag = true;  // Trigger
          }
      }
    }
  }
 }
   // If no trig event found reset
   if (!eventTrigFlag){CurTrigEvent = 0; PlayerNotice = "null";}
   else{ // There was an event found, Make sure only one is set.
     CurTrigEvent = eventToStart;
     PlayerCouldInteract(eventToStart);
   }

 // Make sure the player does not go out side the canvas border.
 for (var j = 0; j < CordsToCheck.length; j++){
  PointX = CordsToCheck[j].X;
  PointY = CordsToCheck[j].Y;
  if (PointX >=  width || PointX <= 0 || PointY <= 0 || PointY >= height) {Colliding = true;}
 }
  return Colliding;
}



/** 
 * - Take in the userinput
 * - Move the character accordingly, taking into account any collisions.
 */
function MoveCharacter()
{
  if (ModeDebug){ UpdateText(2, 'Nx' + CurrentPlayerPos.x + ' Ny' + CurrentPlayerPos.y);}
 
  var xAddition = 0; // X Change in movement
  var yAddition = 0; // Y .. 

  // First calculate the new position of the character if they moved. 
  // Might change later, basically keeps movement speed the same even when both up and left etc is pressed at the same time. Ideally would use Normalised Vector3 For direction.

  // Check if it is only X axis
  if (PlayerMovement.x != 0 && PlayerMovement.y == 0)     { xAddition =  PlayerSpeed * PlayerMovement.x; }
  // Check if it is only Y axis
  else if(PlayerMovement.x == 0 && PlayerMovement.y != 0) { yAddition = PlayerSpeed * PlayerMovement.y; }
  // Check if it is noth X and Y axis
  else{
    yAddition =   Math.round  (( PlayerSpeed / 1.6 )) * PlayerMovement.y;
    xAddition =   Math.round  (( PlayerSpeed / 1.6 )) * PlayerMovement.x;
  }
  // Determines if the Character will colide if it moves. If not move!
  if (!IsColliding(CurrentPlayerPos.x + xAddition, CurrentPlayerPos.y + yAddition, playerColiderOffsets)) {
    CurrentPlayerPos.x += xAddition;
    CurrentPlayerPos.y += yAddition;
    if (ModeDebug){UpdateText(0,"Collision : false")}  
  } else{ if (ModeDebug){UpdateText(0,"Collision : true")}}

  image(Images[0] , CurrentPlayerPos.x  , CurrentPlayerPos.y ); 
}


/** 
 * Reads player input
 */
function GetInput() {

  // No input should work, other than space to close the image
  if (IsOnlyImageShowing){
    if (keyIsDown(69)){ IsOnlyImageShowing = false;}
    return;
  }

  // Keycode 65 = a   Keycode 87 = s
  if (keyIsDown(65) && keyIsDown(68))  {  PlayerMovement.x =  0; }
  else{
    if (keyIsDown(65)) {  PlayerMovement.x = -1; } 
    if (keyIsDown(68)) {  PlayerMovement.x =  1; } 
    if (!keyIsDown(65) && !keyIsDown(68) ) { PlayerMovement.x = 0;}
  }
  
  // keycode 68 = d   Keycode 83 = w
  if (keyIsDown(87) && keyIsDown(83))  {  PlayerMovement.y =  0; }
  else{
    if (keyIsDown(87)) {  PlayerMovement.y =  -1; }
    if (keyIsDown(83)) {  PlayerMovement.y =   1; }
    if (!keyIsDown(87) && !keyIsDown(83) ) { PlayerMovement.y = 0;}
  }

  // Player tries to Interact
  if (keyIsDown(32)){ PlayerTriedToInteract();}

} 




/** 
 * Simple method to update on screen text. 
 * Makes it easier to update font size etc without changing each.
 */
function UpdateText(ref, newText){
  // Default vals
  noStroke(0); fill(255); textSize(20); textAlign(LEFT);

  switch(ref){
    case (0): { text(newText, 800, 25); break;}
    case (1): { text(newText, 500, 25); break;}
    case (2): { text(newText, 200, 25); break;}
    case (3): {textAlign(CENTER); text(newText, width/2, 640); break;}
  }


}



/** 
 * Painfully long but actually simple method to draw all the ui
 * Usefull in making slight changes to the ui.
 */
function DrawUI(){

    // Apply the change per frame to each variable bar.
    StudyPercent.percent -= RateDecresePerFrameS;
    HungerPercent.percent -= RateDecresePerFrameH;
    EnergyPercent.percent -= RateDecresePerFrameE;

    // For each that has run out, start reducing sanity.
    if (StudyPercent.percent  == 0){ SanityPercent.percent -= RateDecresePerFrameSY}
    if (HungerPercent.percent == 0){ SanityPercent.percent -= RateDecresePerFrameSY}
    if (EnergyPercent.percent == 0){ SanityPercent.percent -= RateDecresePerFrameSY}

    // First draw the bars of colour depending on their values
    noStroke();  textSize(20); textAlign(CENTER);
    fill(18,130,84);  rect(width / 2 + 70 , 22, StudyPercent.percent,  12);  // Study
    fill(147,10,10);  rect(width / 2 - 50 , 22, HungerPercent.percent, 12);  // Hunger
    fill(10,104,147); rect(width / 2 - 170, 22, EnergyPercent.percent, 12);  // Energy
    fill(107,13,156); rect(width / 2 - 170, 40, (SanityPercent.percent / 100) * 340 , 12); // Sanity

    /// Now overlay the image of the outline over the top, this allows for 
    // interesting designs.
    stroke(255); fill(255); textSize(20); textAlign(CENTER);
    image(Images[12] , width/2 , 28); 
    image(Images[12] , width/2 - 120 , 28);
    image(Images[12] , width/2 + 120 , 28);
    image(Images[13] , width/2 , 46); 

    // Finally add the text
    noStroke(); fill(255); textSize(15); textAlign(CENTER);
    text("Hunger", width/2, 15);
    text("Energy", width/2 - 120, 15);
    text("Study", width/2 + 120, 15);

   // text("Sanity", width/2 + 200, 51);
    //text("Sanity", width/2 - 200, 51);
    textSize(18);
    text("- - - - ]|I{•------» ⓢΔ几𝕚Ⓣｙ «------•}I|[ - - - -", width/2 , 75);

    var hour = Math.floor(CurHour);
    var minute = Math.floor((CurHour - hour) * 60);
    textAlign(LEFT);
    text("Time [ " + hour + " : " + minute + " ]",      98 , 578);
    text("[02/03/2020] ", 100 , 600);

    //textSize(12);
   //text("Sanity", width/2 - 130 , 50);
    
}











// AHHH CLOUDS

function CloudGameDisplay(){

  background(131, 169,255);
  noStroke();  textSize(20); textAlign(CENTER);
  fill(0);  rect(width / 2 - 600  , 0, 1200,  100); 
  image(Images[14] , 600 , 350); 

}



