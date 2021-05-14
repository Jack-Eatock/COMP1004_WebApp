// Time scale
var TimeScale = 1000; // The amount to multiply seconds by

// Time general
var CurFrame = 0; // iterates every frame, updates tickClock every 60. (a second)
var RealTimeSeconds = 0; // will keep track of seconds, reset every minute. ( 60 secs)
var RealTimeSecRounded = 0;

// Time for UI
var ScaledSeconds = 0;
var ScaledMinutes = 0; // literally jsut the current minute
var ScaledHours = 0; // Hour scaled to match a clock 
var ScaledDay = 1; // the value is the start day

var ScaledHourToDisplay;
var ScaledMinToDisplay;
var ScaledDayToDisplay;

var secondCoutner = 0;

function updateTime(){

    // General Unscaled.
    CurFrame++; // Keep track of frame
    RealTimeSeconds = CurFrame / 60; // Convert current frame into Seconds.
    RealTimeSecRounded = Math.floor(RealTimeSeconds);


    // Scaled for UI.
    ScaledSeconds = Math.floor((RealTimeSeconds - ((60 / TimeScale) * secondCoutner)) * TimeScale);
    if (ScaledSeconds > 60){ScaledSeconds = 0;  secondCoutner++; ScaledMinutes++}

    if (ScaledMinutes > 60){ScaledMinutes = 0; ScaledHours++; }
        
    if (ScaledHours >=  24)  { ScaledHours = ScaledHours - 24;ScaledDay++;  }
  
    if (ScaledHours < 10){ ScaledHourToDisplay = "0" + ScaledHours  }
    else{ScaledHourToDisplay = ScaledHours}
    
    if (ScaledMinutes < 10){ ScaledMinToDisplay = "0" + ScaledMinutes  }
    else{ScaledMinToDisplay = ScaledMinutes}

    if (ScaledDay < 10){ ScaledDayToDisplay = "0" + ScaledDay;  }
    else{ScaledDayToDisplay = ScaledDay}
      
    

   // ScaledHours = (RealTimeSeconds/TimeScale).toFixed(2); 
    


    TotalHoursScaled = (RealTimeSeconds / TimeScale).toFixed(2); // 8 hours per minute

    


    /*
    CurHourScaled = Math.floor(TotalHoursScaled); 

    if (CurHourScaled > 24){
        CurHourScaled
    }

    CurMinuteScaled = Math.floor((TotalHoursScaled - CurHourScaled) * 60);
    Day += Math.floor(CurHourScaled / 24)*/
}

