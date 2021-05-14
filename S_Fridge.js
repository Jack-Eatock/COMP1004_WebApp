function FridgeInteraction(){
    strokeWeight(6);  stroke(255); fill(0); rect(400, 190,400,320); strokeWeight(1);  
    noStroke(); fill(255); textSize(28); textAlign(CENTER);
    text("Fridge! \n Press Y to Eat", 600, 300);
    text("Press E to exit!", 600, 450);

    if (keyIsDown(89)){Eat();} // Y
}

function Eat(){
    HungerPercent.percent += 5; IsInteracting = false; return;
}