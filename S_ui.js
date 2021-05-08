///////// UI \\\\\\\\\
var PlayerNotice = "Welcome to isolation!";


// Defines the functionality of a percent obj
class Percent{
  constructor(){this._percent = 100;}
  get percent(){return this._percent;}
  set percent(val){if (val < 0 ){ this._percent = 0 } else if (val > 100){this._percent = 100;} else {this._percent = val;}}
}

// Now simple create the variables.
var StudyPercent  = new Percent; var HungerPercent = new Percent;
var EnergyPercent = new Percent; var SanityPercent = new Percent;

/** 
 * Painfully long but actually simple method to draw all the ui
 * Usefull in making slight changes to the ui.
 */
function DrawUI(){

    // Apply the change per frame to each variable bar.
    StudyPercent.percent -= RateDecresePerFrameS;
    HungerPercent.percent -= RateDecresePerFrameH;
    EnergyPercent.percent -= RateDecresePerFrameE;

    // For each that has run out, start reducing sanity.
    if (StudyPercent.percent  == 0){ SanityPercent.percent -= RateDecresePerFrameSY}
    if (HungerPercent.percent == 0){ SanityPercent.percent -= RateDecresePerFrameSY}
    if (EnergyPercent.percent == 0){ SanityPercent.percent -= RateDecresePerFrameSY}

    // First draw the bars of colour depending on their values
    noStroke();  textSize(20); textAlign(CENTER);
    //fill(18,130,84);  rect(width / 2 + 70 , 22, StudyPercent.percent,  12);  // Study
   //fill(147,10,10);  rect(width / 2 - 50 , 22, HungerPercent.percent, 12);  // Hunger
    //fill(10,104,147); rect(width / 2 - 170, 22, EnergyPercent.percent, 12);  // Energy
    fill(107,13,156); rect(width / 2 - 170, 40, (SanityPercent.percent / 100) * 340 , 12); // Sanity

    /// Now overlay the image of the outline over the top, this allows for 
    // interesting designs.
    stroke(255); fill(255); textSize(20); textAlign(CENTER);
   // image(Images[12] , width/2 , 28); 
   // image(Images[12] , width/2 - 120 , 28);
   // image(Images[12] , width/2 + 120 , 28);
    image(Images[13] , width/2 , 46); 


    // New images instead
    // Base colour
    image(Images[28] , 100 , 46);  // Hunger
    image(Images[30] , 175 , 46);  // Energy
    image(Images[32] , 250 , 46);  // Study

    // Block out
    fill(0); stroke(0);  rect(70 , 18, 60 , (56/100) * (100 - HungerPercent.percent));  // Hunger
    fill(0); stroke(0);  rect(145 , 18, 60 , (56/100) * (100 - EnergyPercent.percent));  // Energy
    fill(0); stroke(0);  rect(220 , 18, 60 , (56/100) * (100 - StudyPercent.percent));  // Study
    
    // Outline
    image(Images[29] , 100 , 46); // Hunger
    image(Images[31] , 175 , 46); // Energy
    image(Images[33] , 250 , 46); // Study

    // Finally add the text
    noStroke(); fill(255); textSize(15); textAlign(CENTER);
    text("Hunger", 100, 94);
    text("Energy", 175, 94);
    text("Study", 250, 94);

    //text("Sanity", width/2 + 200, 51);
    //text("Sanity", width/2 - 200, 51);
    textSize(18);
    text("- - - - ]|I{•------» ⓢΔ几𝕚Ⓣｙ «------•}I|[ - - - -", width/2 , 75);

    // Time is precalculated in time script soo no worries ;) 
    textAlign(LEFT);

    //text("CurFrame: " + CurFrame + " RealtimeSecs: " +  RealTimeSeconds + "\n RealtimeSecsRounded: " +  RealTimeSecRounded + " Scaled Secs: " + ScaledSeconds,      98 , 578);
    text("[             ]",90,639);
    text("" + ScaledHourToDisplay + " : " + ScaledMinToDisplay + "",      100 , 640);
    text(" [" + ScaledDayToDisplay  + "/03/2020]  " , 1000 , 640 );

    /*
    textAlign(LEFT);
    text("Time [ " + ScaledHours + " : " + ScaledMinutes + " ]",      98 , 578);
    text("[" + ScaledDay  + "/03/2020] ", 100 , 600);
  */


    //textSize(12);
   //text("Sanity", width/2 - 130 , 50);
    
}


/** 
 * Simple method to update on screen text. 
 * Makes it easier to update font size etc without changing each.
 */
function UpdateText(ref, newText){
    // Default vals
    noStroke(0); fill(255); textSize(20); textAlign(LEFT);
  
    switch(ref){
      case (0): { text(newText, 800, 25); break;}
      case (1): { text(newText, 500, 25); break;}
      case (2): { text(newText, 200, 25); break;}
      case (3): {textAlign(CENTER); text(newText, width/2, 640); break;}
    }
  
  
  }