var mode = 0;

function Sleeping() {
    if (mode == 1){Sleep(); return;}

    // Will loop while in menu
    // Menu
   
    else if (mode == 0){

        strokeWeight(6);  stroke(255); fill(0); rect(400, 190,400,320); strokeWeight(1);  
        noStroke(); fill(255); textSize(28); textAlign(CENTER);
        text("Press Y to sleep", 600, 300);
        text("Press E to exit!", 600, 450);

        if (keyIsDown(89)){mode = 1; } // Y
    }
}


function Sleep(){
    EnergyPercent.percent += 5; ScaledHours += 8;
    Reset(); IsInteracting = false;
}

function Reset(){
    mode = 0;
}