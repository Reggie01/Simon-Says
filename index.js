
var greenBlock = document.getElementById( "greenBlock" );
var redBlock = document.getElementById( "redBlock" );
var yellowBlock = document.getElementById( "yellowBlock" );
var blueBlock = document.getElementById( "blueBlock" );
var startButton = document.getElementById( "startContainer" );
var strictButton = document.getElementById( "strictContainer" );

function greenBlockHandler( event ){
   event.preventDefault();
   console.log( "green button pressed..." );
}

function redBlockHandler( event ){
   event.preventDefault();
   console.log( "red button pressed..." );

}

function yellowBlockHandler( event ){
   event.preventDefault();
   console.log( "yellow..." );
}

function blueBlockHandler( event ){
   event.preventDefault();
   console.log( "blue button pressed..." );
}

function startButtonHandler ( event ) {
   event.preventDefault();
   console.log( "Start button ..." );
}

function strictButtonHandler ( event ) {
  event.preventDefault();
  console.log( "strict button pressed... " );
}

greenBlock.addEventListener( "click", greenBlockHandler );
redBlock.addEventListener( "click", redBlockHandler );
yellowBlock.addEventListener( "click", yellowBlockHandler );
blueBlock.addEventListener( "click", blueBlockHandler );
startButton.addEventListener( "click", startButtonHandler );
strictButton.addEventListener( "click", strictButtonHandler );
