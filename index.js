var canvas,
      width,
      height;
      
canvas = document.getElementById( "canvas" );
height = canvas.height;
width = canvas.width;

if( canvas.getContext ) {
    var context = canvas.getContext( "2d" );
} else {
    console.log( "Your browser does not support canvas." );
}

context.fillRect( 0, 0, 100, 100)