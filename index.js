
var greenBlock = document.getElementById( "greenBlock" );
var redBlock = document.getElementById( "redBlock" );
var yellowBlock = document.getElementById( "yellowBlock" );
var blueBlock = document.getElementById( "blueBlock" );
var startButton = document.getElementById( "startContainer" );
var strictButton = document.getElementById( "strictContainer" );
var onButton = document.getElementById( "on" );
var offButton = document.getElementById( "off" );

var gameState = {
    isOn: false,
    isStart: false,
    isStrict: false
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
        offButton.style.opacity = .3;   // Grey 900          
    } 
    console.log( JSON.stringify( gameState, null, 2 ) );
}

function offHandler ( event ) {
    event.preventDefault();
    
    if( gameState.isOn ){
        gameState.isOn = false;
        offButton.style.opacity = 1;   // Black 500 
        onButton.style.opacity = .3;  // Green 700
        gameState.isStart = false;
        startButton.style.opacity = .3;
        gameState.isStrict = false;
        strictButton.style.opacity = .3;
    }
    
    console.log( JSON.stringify( gameState, null, 2 ) );
}

function startButtonHandler ( event ) {
    event.preventDefault();
    
    if( gameState.isOn && gameState.isStart ){
        console.log( "resetting..." );     
    } else if( gameState.isOn ){
        gameState.isStart = true;
        startButton.style.opacity = 1;
        console.log( "Start button ..." );
    }
    console.log( JSON.stringify( gameState, null, 2 ) );
}

function strictButtonHandler ( event ) {
    event.preventDefault();
        
    if( gameState.isOn && gameState.isStart ){ 
        gameState.isStrict = true;
        strictButton.style.opacity = 1;
        console.log( "strict button pressed... " );
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
