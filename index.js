
var greenBlock = document.getElementById( "greenBlock" );
var redBlock = document.getElementById( "redBlock" );
var yellowBlock = document.getElementById( "yellowBlock" );
var blueBlock = document.getElementById( "blueBlock" );
var startButton = document.getElementById( "startContainer" );
var strictButton = document.getElementById( "strictContainer" );
var onButton = document.getElementById( "on" );
var offButton = document.getElementById( "off" );
var countButton = document.getElementById( "countContainer" );
var LOW_OPACITY = .3;
var GREEN = 1;
var RED = 2;
var BLUE = 3;
var YELLOW = 4;

var gameState = {
    isOn: false,
    isStart: false,
    isStrict: false, 
    count: "--",
    computerSequence: [],
    userSequence: [],
    isBlinking: false
}

function greenBlockHandler( event ){
    event.preventDefault();
    if( gameState.isOn && gameState.isStart ){
        console.log( "green button pressed..." );
    }
     
}

function redBlockHandler( event ){
    event.preventDefault();
    if( gameState.isOn && gameState.isStart ){
        console.log( "red button pressed..." );   
    }
}

function yellowBlockHandler( event ){
    event.preventDefault();
    if( gameState.isOn && gameState.isStart ){
        console.log( "yellow..." );
    }
}

function blueBlockHandler( event ){
    event.preventDefault();
    if( gameState.isOn && gameState.isStart ){
        console.log( "blue button pressed..." );
    }
}

function onHandler ( event ) {
    event.preventDefault();
    
    if( !gameState.isOn ){
        gameState.isOn = true;
        onButton.style.opacity = 1; // Green A70
        offButton.style.opacity = LOW_OPACITY;   // Grey 900 
        if( countButton.textContent !== "--" ){
            gameState.count = "--";
            countButton.textContent = gameState.count;
        }
                
    } 
    console.log( JSON.stringify( gameState, null, 2 ) );
}

function offHandler ( event ) {
    event.preventDefault();
    
    if( gameState.isOn ){
        gameState.isOn = false;
        offButton.style.opacity = 1;   // Black 500 
        onButton.style.opacity = LOW_OPACITY;  // Green 700
        gameState.isStart = false;
        startButton.style.opacity = LOW_OPACITY;
        gameState.isStrict = false;
        strictButton.style.opacity = LOW_OPACITY;
        gameState.count = "";
        countButton.textContent = gameState.count;
    }
    
    console.log( JSON.stringify( gameState, null, 2 ) );
}

function startButtonHandler ( event ) {
    event.preventDefault();
    var color;
    
    if( gameState.isOn && gameState.isStart ){
        console.log( "resetting..." );    
        blinkCounter();        
    } else if( gameState.isOn ){
        gameState.isStart = true;
        startButton.style.opacity = 1;
        blinkCounter();
        color = choseRandomColor();
        gameState.computerSequence.push( color );
        highlightButtons();
        console.log( "Start button ..." );
    }
    console.log( JSON.stringify( gameState, null, 2 ) );
}

function blinkCounter() {
    
    var count = 0;
    var time = 300;
    gameState.isBlinking = true;
    
    for ( count; count < 5; count++ ) {
        
        if( count % 2 === 0 ){
            time += 300;
        } else {
          time += 300;
        }
        (function( count ) {
            window.setTimeout(function() {  
                console.log( "Count: " + gameState.count );
                if( count === 4 ){
                    gameState.count = 0;
                    countButton.style.opacity = 0;
                    countButton.textContent = 0;
                    countButton.style.opacity = 1;
                    gameState.isBlinking = false;
                } else if( gameState.count === "--") {
                   gameState.count = "";
                   countButton.style.opacity = 0;
                   countButton.textContent = gameState.count;
                } else {
                    gameState.count = "--";
                    countButton.textContent = gameState.count;
                    countButton.style.opacity = 1;                         
                } 
  
            }, time );
        })( count )
        
        
    }
    
}

function choseRandomColor() {
    var num = Math.random();
    var color;
    if( num >= .75 ) {
         color = YELLOW;
    } else if( num >= .5 ) {
         color = BLUE;
    } else if( num >= .25 ) {
         color = RED;
    } else {
         color = GREEN;
    }
    
    return color;
}

function highlightButtons() {
    if( !gameState.isBlinking ) {
        console.log( gameState.computerSequence );
    }
    
}

function strictButtonHandler ( event ) {
    event.preventDefault();
        
    if( gameState.isOn && gameState.isStart && !gameState.isStrict ){ 
        gameState.isStrict = true;
        strictButton.style.opacity = 1;
        console.log( "strict button pressed... " );
    } else if( gameState.isOn && gameState.isStart && gameState.isStrict ) {
         gameState.isStrict = false;
         strictButton.style.opacity = LOW_OPACITY;
    }
    
    console.log( JSON.stringify( gameState, null, 2 ) );
}

greenBlock.addEventListener( "click", greenBlockHandler );
redBlock.addEventListener( "click", redBlockHandler );
yellowBlock.addEventListener( "click", yellowBlockHandler );
blueBlock.addEventListener( "click", blueBlockHandler );
onButton.addEventListener( "click", onHandler );
offButton.addEventListener( "click", offHandler );
startButton.addEventListener( "click", startButtonHandler );
strictButton.addEventListener( "click", strictButtonHandler );
