
var startFrame = 0;
var firtRun = true;
var textSpeed = 0.25; // extra characters per frame
var frameDif = 0;

function Communication(){
    
    if (firtRun == true) { firtRun = false; startFrame = CurFrame;} // Remember to set false once com finished

    frameDif =  Math.ceil( (CurFrame - startFrame) * textSpeed); // calculate frames passed since start.
  

    
    fill(255);

    var textToPrint = dialog.Sam.Text1;
    var textToPrintThisFrame = textToPrint.slice(0,frameDif);



    textAlign(LEFT); text(textToPrintThisFrame, 320 , 280);
    //textAlign(LEFT); text(frameDif + " " + CurFrame + "" + startFrame, 320 , 240);
    


}