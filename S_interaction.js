
///////// Triggers \\\\\\\\\
var CurTrigEvent = 0;


/** 
 * - Should be run when the player presses the interact key
 * - Check what current event is ready to activate.
 * - Run the event accordingly.
 */
function PlayerTriedToInteract(){

    // Check which object is currently interactable.
    switch (CurTrigEvent) {
      case (0):  break; // Nothin interactable.
      case (1):  StudyPercent.percent  += 10;  break; // Nothin interactable.
      case (2):  EnergyPercent.percent += 10; break; // Nothin interactable.
      case (3):  IsInteracting = true; break; // Nothin interactable.
      case (4):  IsPlantAlive = false; Images[23] = Images[24]; break; // Make plant dead.
      case (5):  IsInteracting = true; CharacterInteraction(0); break; // Char interaction
    
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
      case (5): image(Images[27] , 702  , 353 ); PlayerNotice = startText + "Sam!";   break; // Char interaction
      
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