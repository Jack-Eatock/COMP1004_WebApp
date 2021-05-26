
///////// Triggers \\\\\\\\\
var CurTrigEvent = 0;
var BooleanDecisionRequired = false;
var charNum = 0;

/** 
 * - Should be run when the player presses the interact key
 * - Check what current event is ready to activate.
 * - Run the event accordingly.
 */
function PlayerTriedToInteract(){

  
    // Check which object is currently interactable.
    switch (CurTrigEvent) {
      case (0):  break; // Nothin interactable.
      case (1):  IsInteracting = true; break; // PC interactable.
      case (2):  IsInteracting = true; break; // Bed interactable.
      case (3):  IsInteracting = true; break; // Nothin interactable.
      case (4):  IsPlantAlive = false; Images[23] = Images[24]; break; // Make plant dead.
      case (5):  IsInteracting = true;  charNum = 0; break; // Sam Char interaction
      case (6):  IsInteracting = true; break; // Fridge Interaction
      case (7):  IsInteracting = true;  charNum = 1; break; // Tod Char interaction
      case (8):  IsInteracting = true;  charNum = 2; break; // Alex Char interaction

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
    //noFill(); stroke(228,218,18); strokeWeight(4);
    var startText = "Press SPACE to INTERACT with : ";
    switch (event) {
      case (0):  break; // Nothin interactable.
      case (1): image(Images[20] , 476  , 200 );  PlayerNotice = startText + "Computer!"; break; // Pc
      case (2): image(Images[22] ,  453 ,  466 ); PlayerNotice = startText + "Bed!"; break; // Bed
      case (3): image(Images[21] , 366.5  , 292 ); PlayerNotice = startText + "Notes!"; break; // Notes
      case (4): if (IsPlantAlive == true){ image(Images[25] , 599  ,176 );}  PlayerNotice = startText + "Plant!"; break;
      case (5): image(Images[27] , 702  , 353 ); PlayerNotice = startText + "Sam!";   break; // Char interaction
      case (6):image(Images[45] , 91  , 180 ); PlayerNotice = startText + "Fridge"; break; // Fridge Interaction
      case (7): image(Images[46] , 510  , 410 ); PlayerNotice = startText + "Tod!"; break;
     case (8): image(Images[47] , 520  , 300 ); PlayerNotice = startText + "Alex!"; break;

      default:
        break;
    }
  }
  
  /** 
   * Should run when the player tries to interact with one of their flat mates.
   */
  function CharacterInteraction(charNum){
    switch(charNum){
      case 0: PlayerNotice =  "Interacting with Sam!";  break;
    }


    
  }

