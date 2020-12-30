
// Movement variables \\
var playerMovement = {  x : 0, y : 0, };
var playerSpeed = 4;

var CurrentPlayerPos      = { x: 300,   y : 300  }; // Start pos, also stores player pos

// Collision variables \\
var playerColiderOffsets = 
{ 
  XTopLeftOffset   : -30, YTopLeftOffset    : -10, 
  XTopRightOffset  :  30, YTopRightOffset   : -10, 
  XBotLeftOffset   : -30, YBotLeftOffset    : 60, 
  XBotrightOffset  :  30, YBotrightOffset   : 50, 
}

var showColliders = true;



// Images to Preload  \\
let character_FW;
let room_Bedroom;

// Rooms \\
const Rooms = {
  BEDROOM:  'Bedroom',
  KITCHEN:  'Kitchen',
  BATHROOM: 'Bathroom',
  HALLWAY:  'Hallway'
}



currentRoom = 0;


function preload() {
  character_FW = loadImage('Sprites/Char_FW_V01.png',  );
  room_Bedroom = loadImage('Sprites/Room_Bedroom_v001.png');

  
  // Data
  data = loadJSON('Maps.json');

}

function setup() {

   // SimplifyDataLoading
  

  imageMode(CENTER);
  //rectMode(CENTER);
  
  frameRate(60);
  var cnv = createCanvas(1200, 700);
  cnv.parent("MyCanvas"); // Centred by CSS

  let Col = data.rooms[0].name;


}

function draw() {
 
 

  background(50);
  image(room_Bedroom, width/2, height/2);
  
  rect(400,400,200,200)
  rect(900,300,100,100)


  GetInput();
  MoveCharacter();
 
  
  //if (showColliders) { DisplayColliders };

}

function LoadLevel(room){
  switch (room){

    case Rooms.BEDROOM:
      break;

    case Rooms.KITCHEN:
      break;

    case Rooms.BEDROOM:
      break;

    case Rooms.BEDROOM:
      break;
  }     


}

function DisplayColliders()
{

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
          Colliding = true;
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
  text('Nx' + CurrentPlayerPos.x + ' Ny' + CurrentPlayerPos.y, 300, 30);

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
    text('Collision : false ', 800, 30);
  } else{text('Collision : true ', 800, 30);}

  image(character_FW , CurrentPlayerPos.x  , CurrentPlayerPos.y ); 
}


function GetInput() {

  if (keyIsDown(LEFT_ARROW) && keyIsDown(RIGHT_ARROW))  {  playerMovement.x =  0; }
  else{

    if (keyIsDown(LEFT_ARROW))  {  playerMovement.x = -1; }
    if (keyIsDown(RIGHT_ARROW)) {  playerMovement.x =  1; }
    if (!keyIsDown(RIGHT_ARROW) && !keyIsDown(LEFT_ARROW) ) { playerMovement.x = 0;}
  }

  if (keyIsDown(UP_ARROW) && keyIsDown(DOWN_ARROW))  {  playerMovement.y =  0; }
  else{

    if (keyIsDown(UP_ARROW))   {  playerMovement.y =  -1; }
    if (keyIsDown(DOWN_ARROW)) {  playerMovement.y =   1; }
    if (!keyIsDown(UP_ARROW) && !keyIsDown(DOWN_ARROW) ) { playerMovement.y = 0;}
  }
 
}


