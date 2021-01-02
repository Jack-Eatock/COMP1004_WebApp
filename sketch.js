
// Movement variables \\
var playerMovement = {  x : 0, y : 0, };
var playerSpeed = 4;

var CurrentPlayerPos = { x: 600,   y : 300  }; // Start pos, also stores player pos

// Collision variables \\
var playerColiderOffsets = 
{ 
  XTopLeftOffset   : -30, YTopLeftOffset    : 15, 
  XTopRightOffset  :  30, YTopRightOffset   : 15, 
  XBotLeftOffset   : -30, YBotLeftOffset    : 60, 
  XBotrightOffset  :  30, YBotrightOffset   : 60, 
}

var showColliders = true;

var Images = [
  {img : null}, // 0 - Character
  {img : null}, // 1 - Room_Bedroom
  {img : null}, // 2 - Room_Bedroom_Outline
  {img : null}, // 3 - Hallway_Walls
  {img : null}, // 4 - RoomBedroomGarry_Outline
  {img : null}, // 5 - RoomBedroomSam_Outline
  {img : null}, // 6 - RoomKitchen
  {img : null}, // 7 - RoomBedroomTod_Outline
  {img : null}  // 8 - RoomBedroomAlex_Outline
]

currentRoom = 0;

function preload() {
  preloadImages()     // prepares all images
  data = loadJSON('Maps.json');  // loads required data
}

function preloadImages(){

  Images[0].img = loadImage('Sprites/Props/Char_FW_V01.png');
  Images[1].img = loadImage('Sprites/Bedroom/Room_Bedroom_v001.png');
  Images[2].img = loadImage('Sprites/Bedroom/Room_Bedroom_Outline.png')
  Images[3].img = loadImage('Sprites/Hallway/Hallway_Walls.png')
  Images[4].img = loadImage('Sprites/GarryBedroom/Room_BedroomGarry_Outline.png')
  Images[5].img = loadImage('Sprites/SamBedroom/Room_BedroomSam_Outline.png')
  Images[6].img = loadImage('Sprites/Kitchen/Room_Kitchen_Outline.png')
  Images[7].img = loadImage('Sprites/TodBedroom/Room_BedroomTod_Outline.png')
  Images[8].img = loadImage('Sprites/AlexBedroom/Room_BedroomAlex_Outline.png')
}

function setup() {
  imageMode(CENTER);
  //rectMode(CENTER);
  
  frameRate(60);
  var cnv = createCanvas(1200, 700);
  cnv.parent("MyCanvas"); // Centred by CSS

  let Col = data.rooms[0].name;
}

function draw() {
  background(0);

  if (keyIsDown(69)) {currentRoom = 1; } 
  if (keyIsDown(81)) {currentRoom = 6; } 


  //image(Images[1].img, 600, 350);
  DrawRoom();
  GetInput();
  MoveCharacter();
 
  //if (showColliders) { DisplayColliders };
}

function PlayerTriedToInteract(){

}


function DrawRoom(){

  //if (keyIsDown(65)){ currentRoom = 1 ;}
  textSize(32);
  text('CurrentRoom ' + currentRoom, 500, 50);

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
        image(Images[currObj.imgNum].img , currObj.x  , currObj.y ); 
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
            case 0: Colliding = true; break;
            case 1: SwitchLevel(Cols[i].Room, Cols[i].SpwnX, Cols[i].SpwnY);    break;
          }
      }
    }
  }
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
  textSize(32);
  text('Nx' + CurrentPlayerPos.x + ' Ny' + CurrentPlayerPos.y, 200, 50);

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
    text('Collision : false ', 800, 50);
  } else{text('Collision : true ', 800, 50);}

  image(Images[0].img , CurrentPlayerPos.x  , CurrentPlayerPos.y ); 
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
  if (keyIsDown(32)){PlayerTriedToInteract();}

} 


