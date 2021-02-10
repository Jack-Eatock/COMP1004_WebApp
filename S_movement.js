
///////// Movement variables \\\\\\\\\
var PlayerMovement = {  x : 0, y : 0, };
var PlayerSpeed = 4;
var CurrentPlayerPos = { x: 600,   y : 300  }; // Start pos, also stores player pos


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



