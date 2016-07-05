
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
    gamerId: null,
    blinkTimer: null,
    playerTurn: false
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
        gameState.playerTurn = false;       
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
        gameState.computerSequence = [];
        clearInterval( gameState.gamerId );
        clearInterval( gameState.blinkTimer );
        gameState.gamerId = 0;
        gameState.blinkTimer = 0;
        game.playerTurn = false;
    }
    
    console.log( JSON.stringify( gameState, null, 2 ) );
}

function startButtonHandler ( event ) {
    event.preventDefault();
    
    if( gameState.isOn && gameState.isStart ){
        console.log( "resetting..." );
        console.log( gameState.gamerId );
         console.log( "Blink timer: " + gameState.blinkTimer );
        gameState.computerSequence = [];
        clearInterval( gameState.gamerId );        
        // blinkCounter();     
                
    } else if( gameState.isOn ){
        gameState.isStart = true;
        startButton.style.opacity = 1;
        blinkCounter( playGame );
 
        console.log( "Start button ..." );
    }
    console.log( JSON.stringify( gameState, null, 2 ) );
}

function blinkCounter( callback ) {
    
    var count = 0;
    var time = 300;

    gameState.blinkTimer = setInterval( updateCounter, 500 );    
    setTimeout( function() {
        stopUpdatingCounter( callback );
    }, 2000 );
        
}

function updateCounter() {
    
    if( gameState.count === "--") {
        gameState.count = "";
        countButton.style.opacity = 0;
        countButton.textContent = gameState.count;
    } else {
        gameState.count = "--";
        countButton.textContent = gameState.count;
        countButton.style.opacity = 1;                         
    }
}

function stopUpdatingCounter( callback ) {
    var color;
    

    clearInterval( gameState.blinkTimer );
    gameState.blinkTimer = 0;
    console.log( "Blink timer: " + gameState.blinkTimer );
    gameState.count = 0;
    countButton.style.opacity = 0;
    countButton.textContent = 0;
    countButton.style.opacity = 1;
    
    console.log( "Type of callback: " + typeof callback );
    if( typeof callback === "function" ) {        
        callback();
    }
    console.log( "Blink timer: " + JSON.stringify( gameState, null, 2 ) );
}

function playGame() {
    gameState.gamerId = setInterval( startGame, 300 );
}

function chooseRandomColor() {
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

function startGame() {

    if( !gameState.playerTurn ) {
        console.log( "I'm still running... " );
        var color = chooseRandomColor();
        gameState.computerSequence.push( color );
        highlightButtons();
    } else {
        console.log( "player turn" );
    }
    
}


function highlightButtons() {
    
    var len = gameState.computerSequence.length;
    var count = 0;
    var timeLapse = 2000;
    var computerSequence = gameState.computerSequence.slice();
    
    gameState.computerSequenceCopy = computerSequence;
    timeout( gameState.computerSequenceCopy );
    console.log( gameState.computerSequence );
    clearInterval( gameState.gamerId );
    
}

function timeout( copy ) {
    console.log( copy );
    if( copy.length > 0 ){
        setTimeout( function ()  {
            var color = copy.shift();
            changeColorOpacity( color );
            timeout( gameState.computerSequenceCopy );
        }, 1000 );
    }
    
}

function changeColorOpacity( color ) {
    
    console.log( "Color: "  + color );
    console.log( "Color: " + gameState.computerSequence[color] );
    
    if( color === GREEN ){
        greenBlock.style.opacity = .6;
    } else if ( color === RED ) {
        redBlock.style.opacity = .6;
    } else if ( color === BLUE ) {
        blueBlock.style.opacity = .6;
    } else if ( color === YELLOW ) {
        yellowBlock.style.opacity = .6;
    } 
    
    setTimeout( function() {
       changeButtonOpacityToOne( color );
    }, 300);
}

function changeButtonOpacityToOne( color ) {
       
       if( color === GREEN ){
           greenBlock.style.opacity = 1;
       } else if ( color === RED ) {
           redBlock.style.opacity = 1;
       } else if ( color === BLUE ) {
           blueBlock.style.opacity = 1;
       } else if ( color === YELLOW ) {
           yellowBlock.style.opacity = 1;
       }
       
       console.log( "changing opacity back to one." );
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
