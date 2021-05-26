
var startFrame = 0;
var firtRun = true;
var textSpeed = 0.25; // extra characters per frame
var frameDif = 0;
var textToPrint = "ERROR";
var comData;
var textToPrintThisFrame = "";
var writingText = true;
// Remember what convo on for each character

var convoNum = 0;
let Convos = [0,0,0]

// Sam
// Tod
// Alex

function Communication(CharNum){

    if (firtRun == true) { 
        firtRun = false; 
        comData = dialog.Characters; 
        startFrame = CurFrame;

        convoNum = comData[charNum].convonum;
        console.log(Convos[convoNum]);
        textToPrint = comData[charNum].convo[Convos[convoNum]].text;
    } // Remember to set false once com finished

    
    frameDif =  Math.ceil( (CurFrame - startFrame) * textSpeed); // calculate frames passed since start.

    // Background.
    fill(255); rect(600 - 410, 190,820,320); // White background
    fill(0);   rect(600 - 400, 200,800,300); // Black overlay

    // Display Characters
    image( Images[comData[charNum].imgNum] , 250  , 270 ); 
    image( Images[0] , 940  , 430 ); 

    // Display Text
    fill(255); textSize(20);
    textToPrintThisFrame = textToPrint.slice(0,frameDif);
    textAlign(LEFT); text(textToPrintThisFrame, 320 , 280);

    textAlign(CENTER); textSize(34);
    text("Press Space for next ", 600 , 430);
    text("Press E to exit", 600 , 480);

    if (textToPrintThisFrame == textToPrint){
        writingText = false;
    }
    
   
    if (!writingText){
        // Next using space
        if (keyIsDown(32)){  
            
            if (Convos[convoNum] + 1 < comData[charNum].convo.length){
                Convos[convoNum] += 1;
            }
            else{
                Convos[convoNum] = 0;
            }
           
            firtRun = true;
            console.log("AASDASD");
            writingText = true;

        }
    }
  

    // Exit using E
    if (keyIsDown(69)){  IsInteracting = false; firtRun = true; return;}

}