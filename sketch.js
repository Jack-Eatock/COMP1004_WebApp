// Main GamePlay vars
var RateDecresePerFrameE = 0.124;
var RateDecresePerFrameH = 0.018;
var RateDecresePerFrameS = 0.126;
var RateDecresePerFrameSY = 0.01;

// Movement variables \\
var playerMovement = {  x : 0, y : 0, };
var playerSpeed = 4;
var CurrentPlayerPos = { x: 600,   y : 300  }; // Start pos, also stores player pos

// UI
var PlayerNotice = "Welcome to isolation!";

StudyPercent = { p : 100,
  set percent(val){ if (val < 0 ){ this.p = 0 } else if (val > 100){this.p = 100;} else {this.p = val;}},
  get percent (){return this.p;}}

HungerPercent = { p : 100,
  set percent(val){ if (val < 0 ){ this.p = 0 } else if (val > 100){this.p = 100;} else {this.p = val;}},
  get percent (){return this.p;}}

EnergyPercent = { p : 100,
  set percent(val){ if (val < 0 ){ this.p = 0 } else if (val > 100){this.p = 100;} else {this.p = val;}},
  get percent (){return this.p;}}

SanityPercent = { p : 100,
  set percent(val){ if (val < 0 ){ this.p = 0 } else if (val > 100){this.p = 100;} else {this.p = val;}},
  get percent (){return this.p;}}


// Collision variables \\
var playerColiderOffsets = 
{ 
  XTopLeftOffset   : -30, YTopLeftOffset    : 15, 
  XTopRightOffset  :  30, YTopRightOffset   : 15, 
  XBotLeftOffset   : -30, YBotLeftOffset    : 60, 
  XBotrightOffset  :  30, YBotrightOffset   : 60, 
}

// Loading rooms
var Images = []
var currentRoom = 0;

// Triggers
var curTrigEvent = 0;

var modeDebug = false;
var GameBeingPlayed = 0;

function preload() {
  data = loadJSON('Maps.json');  // loads required data
}

function SetupImages(){
  var imagesToLoad = data.ImagesToPreload;
  for (var x = 0; x < imagesToLoad.length; x++){
    var newImage = loadImage(imagesToLoad[x].url);
    Images.push(newImage);
  }
}

function setup() {
  SetupImages()     // prepares all images
  imageMode(CENTER);
  //rectMode(CENTER);
  
  frameRate(60);
  var cnv = createCanvas(1200, 700);
  cnv.parent("MyCanvas"); // Centred by CSS

  //let Col = data.rooms[0].name;
}

function draw() {
  // Set background to black.
  background(0);


  // Debug Tools \\
  CheatTeleportToRoom(true);
  // Debug Tools \\
  
  switch (GameBeingPlayed){
    case (0) : 
      DrawRoom();
      GetInput();
      MoveCharacter();
      break;
    
    // Sleep Mini Game, Cloud Jumping. 
    case (1) : 

      break;
    
  }

  if (!modeDebug){DrawUI();}

  // Notifications
  UpdateText(3, 'Notice : ' + PlayerNotice);
  
}

function PlayerTriedToInteract(){

  // Check which object is currently interactable.
  switch (curTrigEvent) {
    case (0):  break; // Nothin interactable.
    case (1):  StudyPercent.percent  += 10; break; // Nothin interactable.
    case (2): EnergyPercent.percent += 10; break; // Nothin interactable.
  
    default:
      break;
  }

}

function PlayerCouldInteract(event){
  var startText = "Press SPACE to INTERACT with : ";
  switch (event) {
    case (0):  break; // Nothin interactable.
    case (1): PlayerNotice = startText + "Computer!"; break; // Pc
    case (2): PlayerNotice = startText + "Bed!"; break; // Pc
  
    default:
      break;
  }
}

// Debug function \\
function CheatTeleportToRoom(active)
{
  if (!active){return;}
  if (keyIsDown(49)) {currentRoom = 1; } 
  if (keyIsDown(50)) {currentRoom = 2; } 
  if (keyIsDown(51)) {currentRoom = 3; } 
  if (keyIsDown(52)) {currentRoom = 4; } 
  if (keyIsDown(53)) {currentRoom = 5; } 
  if (keyIsDown(54)) {currentRoom = 6; } 
  if (keyIsDown(55)) {currentRoom = 0; } 
}

// Runs every frame.
function DrawRoom(){

  //if (keyIsDown(65)){ currentRoom = 1 ;}
  if (modeDebug){UpdateText(1, 'CurrentRoom ' + currentRoom)};

  // First we need to obtain a reference to all the Images we should load and their positions.
  var ObjToDraw =  data.rooms[currentRoom].ObjectsToDraw;  
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

      case 1:
        image(Images[currObj.imgNum] , currObj.x  , currObj.y ); 
        break;
    }
  }
}

function SwitchLevel(roomNum, x = 0, y = 0){
  currentRoom = roomNum; // Changes the room that is being displayed.

  // If spawn location is not specifically set use default
  if (x == 0 && y == 0){
    CurrentPlayerPos.x = data.rooms[roomNum].spawnLocationX;
    CurrentPlayerPos.y = data.rooms[roomNum].spawnLocationY;
  }
  else{ CurrentPlayerPos.x = x; CurrentPlayerPos.y = y;}
}

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
 var Cols =  data.rooms[currentRoom].Colliders;  // Grab the colliders for this room. Optimsie later!
 var Colliding = false;     
 var eventTrigFlag = false; // Ensures a new event trig is found. Or set default.

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
            case 2: PlayerCouldInteract(Cols[i].Event); eventTrigFlag = true; curTrigEvent = Cols[i].Event;  // Trigger
          }
      }
    }
  }
  // If no trig event found reset
  if (!eventTrigFlag){curTrigEvent = 0; PlayerNotice = "null";}
 }

 // Make sure the player does not go out side the canvas border.
 for (var j = 0; j < CordsToCheck.length; j++){
  PointX = CordsToCheck[j].X;
  PointY = CordsToCheck[j].Y;
  if (PointX >=  width || PointX <= 0 || PointY <= 0 || PointY >= height) {Colliding = true;}
 }

 return Colliding;
}

function MoveCharacter()
{
  if (modeDebug){ UpdateText(2, 'Nx' + CurrentPlayerPos.x + ' Ny' + CurrentPlayerPos.y);}
 
  var xAddition = 0; // X Change in movement
  var yAddition = 0; // Y .. 

  // First calculate the new position of the character if they moved. 
  // Might change later, basically keeps movement speed the same even when both up and left etc is pressed at the same time. Ideally would use Normalised Vector3 For direction.

  // Check if it is only X axis
  if (playerMovement.x != 0 && playerMovement.y == 0)     { xAddition =  playerSpeed * playerMovement.x; }
  // Check if it is only Y axis
  else if(playerMovement.x == 0 && playerMovement.y != 0) { yAddition = playerSpeed * playerMovement.y; }
  // Check if it is noth X and Y axis
  else{
    yAddition =   Math.round  (( playerSpeed / 1.6 )) * playerMovement.y;
    xAddition =   Math.round  (( playerSpeed / 1.6 )) * playerMovement.x;
  }
  // Determines if the Character will colide if it moves. If not move!
  if (!IsColliding(CurrentPlayerPos.x + xAddition, CurrentPlayerPos.y + yAddition, playerColiderOffsets)) {
    CurrentPlayerPos.x += xAddition;
    CurrentPlayerPos.y += yAddition;
    if (modeDebug){UpdateText(0,"Collision : false")}  
  } else{ if (modeDebug){UpdateText(0,"Collision : true")}}

  image(Images[0] , CurrentPlayerPos.x  , CurrentPlayerPos.y ); 
}


function GetInput() {

  // Keycode 65 = a   Keycode 87 = s
  if (keyIsDown(65) && keyIsDown(68))  {  playerMovement.x =  0; }
  else{
    if (keyIsDown(65)) {  playerMovement.x = -1; } 
    if (keyIsDown(68)) {  playerMovement.x =  1; } 
    if (!keyIsDown(65) && !keyIsDown(68) ) { playerMovement.x = 0;}
  }
  
  // keycode 68 = d   Keycode 83 = w
  if (keyIsDown(87) && keyIsDown(83))  {  playerMovement.y =  0; }
  else{
    if (keyIsDown(87)) {  playerMovement.y =  -1; }
    if (keyIsDown(83)) {  playerMovement.y =   1; }
    if (!keyIsDown(87) && !keyIsDown(83) ) { playerMovement.y = 0;}
  }

  // Player tries to Interact
  if (keyIsDown(32)){ PlayerTriedToInteract();}

} 


function UpdateText(ref, newText){
  // Default vals
  noStroke(0); fill(255); textSize(20); textAlign(LEFT);

  switch(ref){
    case (0): { text(newText, 800, 25); break;}
    case (1): { text(newText, 500, 25); break;}
    case (2): { text(newText, 200, 25); break;}
    case (3): {textAlign(CENTER); text(newText, width/2, 90); break;}
  }


}


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
}




