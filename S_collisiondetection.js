///////// Collision variables \\\\\\\\\
var playerColiderOffsets = 
{ 
   XTopLeftOffset   : -30, YTopLeftOffset    : 15, 
   XTopRightOffset  :  30, YTopRightOffset   : 15, 
   XBotLeftOffset   : -30, YBotLeftOffset    : 60, 
   XBotrightOffset  :  30, YBotrightOffset   : 60, 
}


/** 
 * Checks if the player is colliding with any colliders / triggers
 * - Takes the current position, calculates the 4 points for the player colider
 * - Loops through each collider for the room they are in
 * - Checking if the player is colliding with any, if they are react accordingly
 * - Based on the type of collider. Some prevent movement, Act as event triggers etc
 */
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
 var Cols =  data.rooms[CurrentRoom].Colliders;  // Grab the colliders for this room. Optimsie later!
 var Colliding = false;     
 var eventTrigFlag = false; // Ensures a new event trig is found. Or set default.
 var eventToStart =  0;

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
            case 2: eventToStart = Cols[i].Event; eventTrigFlag = true;  // Trigger
          }
      }
    }
  }
 }
   // If no trig event found reset
   if (!eventTrigFlag){CurTrigEvent = 0; PlayerNotice = "You're exploring";}
   else{ // There was an event found, Make sure only one is set.
     CurTrigEvent = eventToStart;
     PlayerCouldInteract(eventToStart);
   }

 // Make sure the player does not go out side the canvas border.
 for (var j = 0; j < CordsToCheck.length; j++){
  PointX = CordsToCheck[j].X;
  PointY = CordsToCheck[j].Y;
  if (PointX >=  width || PointX <= 0 || PointY <= 0 || PointY >= height) {Colliding = true;}
 }
  return Colliding;
}