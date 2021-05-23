
var curGameRunning = false;
var mode = 0;

function PcInteraction(){
    if (keyIsDown(69)){ Reset(); IsInteracting = false; return;a}
    if (mode == 1){WorkGameMode(); return;}
    else if (mode == 2){StudyGameMode(); return;}

    // Will loop while in menu
    // Menu
   
    else if (mode == 0){
        image(Images[37] , 615  , 400);
        //strokeWeight(6);  stroke(255); fill(0); rect(400, 190,400,320); strokeWeight(1);  
        noStroke(); fill(255); textSize(28); textAlign(CENTER);
        text("Welcome Eren, \n would you like to: \n Study (Y)  or  Work (N)", 600, 300);
        text("Press E to exit!", 600, 450);

        if (keyIsDown(89)){ curGameRunning = true; mode = 2;} // Y
        else if (keyIsDown(78)){curGameRunning = true; mode = 1; } // N
    }

}

function WorkGameMode(){
    Cash += 5; Reset(); IsInteracting = false;
}

function StudyGameMode(){
    StudyPercent.percent += 10; 


    // Game Loop 
    //strokeWeight(6);  stroke(255); fill(0); rect(400, 190,400,320); strokeWeight(1);  
    image(Images[37] , 615  , 400);

    if (!curGameRunning){ Reset(); IsInteracting = false;}
}

function Reset(){
    mode = 0;
    curGameRunning = false;
}