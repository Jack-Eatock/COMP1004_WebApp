
var curGameRunning = false;
var mode = 0;



// Study Game
var FirstTimeFlag = false;
var questionNum = 0;
var qdata;
var userGuess;
var AskingQ = true;
var Rewarded = false;

function PcInteraction(){
  
    if (mode == 1){WorkGameMode(); return;}
    else if (mode == 2){StudyGameMode(); return;}
    if (keyIsDown(69)){ Reset();  IsInteracting = false; return;}
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

    

    textAlign(CENTER);  textSize(38);
    image(Images[37] , 615  , 400);
    text("(A)", 380, 330);
    text("Real", 380, 380);
    text("(D)", 800, 330);
    text("Fake", 800, 380);
    text("(E)xit", 810, 440);
    if (FirstTimeFlag == false){
        qdata = questions.Emails;
        questionNum = Math.floor(Math.random() * qdata.length);  // final num - 1
        //console.log(questionNum);

        FirstTimeFlag = true;
    }
    
    
    if (AskingQ){
        image(Images[qdata[questionNum].imageVal], 595, 350);

        if (keyIsDown(65) || keyIsDown(68)){
            if (keyIsDown(65)){ userGuess = "1" } // a
            else if (keyIsDown(68)){ userGuess = "0"} // d
            AskingQ = false;
        }
     
    }
    else{
        if (!Rewarded){
            
            if (userGuess == qdata[questionNum].result){
                Cash += 2;
                EnergyPercent.percent -+ 1;
            }
    
            Rewarded = true;
        }

        textAlign(CENTER);  textSize(40);
        image(Images[37] , 615  , 400);

        // Correct
        if (userGuess == qdata[questionNum].result){
            text("Correct Answer!", 600, 250);
            textSize(25);
            text("Well done!", 600, 290);
            textAlign(LEFT);
            text("+ 2 Cash", 530, 330);
            text("- 1 Energy", 530, 370);
        }

        // Incorrect
        else{
            text("Incorrect Answer!", 600, 250);
            textSize(25); 
            text("Better luck next time!", 600, 290);
            textAlign(LEFT);
            text("+ 0 Cash ", 550, 330);
            text("- 1 Energy", 550, 370);

        }

        textSize(35);textAlign(CENTER);
        text("Press SPACE for next email", 600, 430);
        if (keyIsDown(32)){  FirstTimeFlag = false; AskingQ = true; Rewarded = false; } // a
    }

    
    


    if (keyIsDown(69)){ Reset(); IsInteracting = false; return;}
    //Cash += 5; Reset(); IsInteracting = false;
}

function StudyGameMode(){
    //StudyPercent.percent += 10; 

    // Trivea 
    // Set up
    if (FirstTimeFlag == false){
        qdata = questions.Questions;
        questionNum = Math.floor(Math.random() * qdata.length);  // final num - 1
        //console.log(questionNum);

        FirstTimeFlag = true;
    }

    // Ask question?

    if (AskingQ){
         // Base image
        image(Images[37] , 615  , 400);


        // Display current questions 
        textAlign(LEFT);  textSize(22);
        text(qdata[questionNum].question, 320, 250);
        text("(A) " + qdata[questionNum].a, 320, 290);
        text("(B) "+ qdata[questionNum].b, 320, 340);
        text("(C) "+ qdata[questionNum].c, 320, 390);
        text("(D) "+ qdata[questionNum].d, 320, 440);
        text("(E)xit", 810, 440);

        // key pressed
        if (keyIsDown(65) || keyIsDown(66)|| keyIsDown(67)||keyIsDown(68) ){
            // Take their guess
            if (keyIsDown(65)){ userGuess = "a" } // a
            else if (keyIsDown(66)){ userGuess = "b"} // b
            else if (keyIsDown(67)){ userGuess = "c" } // c
            else if (keyIsDown(68)){ userGuess = "d"} // d
            AskingQ = false;
        }
    }
    else{

        if (!Rewarded){

            if (userGuess == qdata[questionNum].answer){
                StudyPercent.percent += 10;
                EnergyPercent.percent -= 1;
            }
            else{
                EnergyPercent.percent -= 1;
            }
            Rewarded = true;
        }

        textAlign(CENTER);  textSize(40);
        image(Images[37] , 615  , 400);
        // if correct
        if (userGuess == qdata[questionNum].answer){
            text("Correct Answer!", 600, 250);
            textSize(25);
            text("Well done!", 600, 290);
            textAlign(LEFT);
            text("+ 10 Study", 530, 330);
            text("- 1 Energy", 530, 370);

           
        }
        else{
            text("Incorrect Answer!", 600, 250);
            textSize(25); 
            text("Better luck next time!", 600, 290);
            textAlign(LEFT);
            text("+ 0 Study", 550, 330);
            text("- 1 Energy", 550, 370);

            
        }

        textSize(35);textAlign(CENTER);
        text("Press SPACE for next question", 600, 430);
        if (keyIsDown(32)){  FirstTimeFlag = false; AskingQ = true; Rewarded = false; } // a
    }




    if (keyIsDown(69)){ Reset(); IsInteracting = false; FirstTimeFlag = false; return ;}
    if (!curGameRunning){ Reset(); IsInteracting = false;}
}

function Reset(){
    mode = 0;
    curGameRunning = false;
    FirstTimeFlag = false; AskingQ = true; Rewarded = false;
}