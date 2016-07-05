
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
    computerSequenceCopy: [],
    userSequence: [],
    gamerId: null,
    blinkTimer: null,
    playerTurn: false,
    userChoicesCorrect: false
}

function greenBlockHandler( event ){
    event.preventDefault();
    if( gameState.isOn && gameState.isStart && gameState.playerTurn ){
        console.log( "green button pressed..." );
        changeColorOpacity( GREEN );
        gameState.userSequence.push( GREEN );
    }
     
}

function redBlockHandler( event ){
    event.preventDefault();
    if( gameState.isOn && gameState.isStart && gameState.playerTurn ){
        console.log( "red button pressed..." );  
        changeColorOpacity( RED );        
        gameState.userSequence.push( RED );
    }
}

function yellowBlockHandler( event ){
    event.preventDefault();
    if( gameState.isOn && gameState.isStart && gameState.playerTurn ){
        console.log( "yellow..." );
        changeColorOpacity( YELLOW );
        gameState.userSequence.push( YELLOW );
    }
}

function blueBlockHandler( event ){
    event.preventDefault();
    if( gameState.isOn && gameState.isStart && gameState.playerTurn ){
        console.log( "blue button pressed..." );
        changeColorOpacity( BLUE );
        gameState.userSequence.push( BLUE );
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
        clearTimers();
        setGameStateToDefault();

    }
    
    console.log( JSON.stringify( gameState, null, 2 ) );
}

function clearTimers() {
    
    clearInterval( gameState.gamerId );
    gameState.gamerId = 0;
    clearInterval( gameState.blinkTimer );
    gameState.gamerId = 0;
}

function setGameStateToDefault() {
     gameState.computerSequence = [];
     gameState.userSequence = [];
     gameState.playerTurn = false;
     gameState.userChoicesCorrect = false;
}

function startButtonHandler ( event ) {
    event.preventDefault();
    
    if( gameState.isOn && gameState.isStart ){
        console.log( "resetting..." );
        
        clearTimers();
        setGameStateToDefault();
        blinkCounter( playGame );
        console.log( "Game state: " + JSON.stringify( gameState, null, 2 ) );    
                
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

    gameState.blinkTimer = setInterval( setInitialCounter, 500 );    
    setTimeout( function() {
        stopUpdatingCounter( callback );
    }, 2000 );
        
}

function setInitialCounter() {
    
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
    console.log( "Update: " + JSON.stringify( gameState, null, 2 ) );
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
        if( gameState.userChoicesCorrect ) {
            if( gameState.computerSequence.length === 20 ) {
                /* highlightButtons();
                gameState.playerTurn = true; */
                console.log( "game won..." );
                // TODO: restart game
            } else {
                var color = chooseRandomColor();
                gameState.computerSequence.push( color );
                // TODO: create updateCounter function
                updateCounter();
                highlightButtons();
                gameState.playerTurn = true;
            }
        } else {
            // TODO: show response
            highlightButtons();
            gameState.playerTurn = true;       
        }
        
    } else {
     
        var playerTurnId
        var userChoicesCorrect = compareUserSequenceToComputerSequence();       
        gameState.userChoicesCorrect = userChoicesCorrect;
        gameState.playerTurn = false;
        console.log( "player turn" );
    }
    
}

function highlightButtons() {
    
    var computerSequence = gameState.computerSequence.slice();
    
    gameState.computerSequenceCopy = computerSequence;
    timeout( gameState.computerSequenceCopy );
    console.log( "gameState.computerSequence: " + JSON.stringify( gameState.computerSequence, null, 2 ) );
    console.log( "gameState.computerSequenceCopy: " + JSON.stringify( gameState.computerSequenceCopy, null, 2 ) );
    // clearInterval( gameState.gamerId );
    
}

function timeout( computerSequence ) {
    console.log( "Computer sequence: " + JSON.stringify( computerSequence, null, 2 ) );
    if( computerSequence.length > 0 ){
        setTimeout( function ()  {
            var color = computerSequence.shift();
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

function compareUserSequenceToComputerSequence () {
    var count = 0;
    var len = gameState.computerSequence;
    var userChoicesCorrect = true;
    for( count; count < len; count++ ){
        if( gameState.computerSequence[count] !== gameState.userSequence[count] ) {
             return false;
        }
    }
    return userChoicesCorrect;
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
