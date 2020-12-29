
// Movement variables \\
var playerMovement = {  x : 0, y : 0, };
var playerSpeed = 4;

var currentPlayerPos      = { x: 300, y : 300}; // Start pos also used in physics as last pos
var updatedPlayerPos      = { x: 0, y : 0};

// Collision variables \\
var playerColider = {posXOffset : 0, posYOffset : 38, width : 72, height : 50}
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

currentRoom = Rooms.BEDROOM;


function preload() {
  character_FW = loadImage('Sprites/Char_FW_V01.png',  );
  room_Bedroom = loadImage('Sprites/Room_Bedroom_v001.png');
}

function setup() {

  imageMode(CENTER);
  rectMode(CENTER);
  
  frameRate(60);
  var cnv = createCanvas(1200, 700);
  cnv.parent("MyCanvas"); // Centred by CSS
  

}

function draw() {
 

  background(50);
  image(room_Bedroom, width/2, height/2);
  
  rect(400,400,200,200)


  GetInput();
  MoveCharacter();
  rect(300,338,72,50) 
  
  if (showColliders) { DisplayColliders };

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

function DisplayColliders(){




}




function MoveCharacter(){

  if (playerMovement.x != 0 && playerMovement.y == 0)     { updatedPlayerPos.x =  currentPlayerPos.x + playerSpeed * playerMovement.x; }

  else if(playerMovement.x == 0 && playerMovement.y != 0) { updatedPlayerPos.y = currentPlayerPos.y + playerSpeed * playerMovement.y; }

  else{
    updatedPlayerPos.y = currentPlayerPos.y + Math.round  (( playerSpeed / 1.6 )) * playerMovement.y;
    updatedPlayerPos.x = currentPlayerPos.x + Math.round  (( playerSpeed / 1.6 )) * playerMovement.x;
  }


  image(character_FW , updatedPlayerPos.x  , updatedPlayerPos.y );


  currentPlayerPos = updatedPlayerPos;
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


