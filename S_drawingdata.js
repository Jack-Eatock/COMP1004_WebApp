///////// Animation \\\\\\\\\
var AnimTimers = [];
var AnimationIdentity = 0;


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
  
  
// AHHH CLOUDS

function CloudGameDisplay(){

    background(131, 169,255);
    noStroke();  textSize(20); textAlign(CENTER);
    fill(0);  rect(width / 2 - 600  , 0, 1200,  100); 
    image(Images[14] , 600 , 350); 
  
  }