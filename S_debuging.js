
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
