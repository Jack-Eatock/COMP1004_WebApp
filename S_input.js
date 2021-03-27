/** 
 * Reads player input
 */
function GetInput() {

    // No input should work, other than space to close the image
    if (IsInteracting){
      if (keyIsDown(69)){ IsInteracting = false;}
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