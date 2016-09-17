
function setupGlobalVariables() {
  // screen dimensions
  xRes = 960;
  yRes = 1400;
  maxRes = max( xRes , yRes );
  // global rotation in x and y directions
  gRotX = 0;
  gRotY = 0;
  // attenutation of rotation input
  attenX = 0.05;
  attenY = 0.05;
  // maximum rotation input
  maxRotX = 30;
  maxRotY = 30;
  // cursor position
  cX = 0.5*xRes;
  cY = 0.5*yRes;
  // cursor velocity
  vX = 0;
  vY = 0;
  // set the color mode to HSB (hue, saturation, brightness)
  colorMode( HSB );
  // color schemes
  bgColor = color( 0 , 0 , 100 , 1);
  drawColor = color( 0 , 0 , 0 , 1);
  markerColor = color( 0 , 0 , 0 , 1);
  // how transparent the marker is
  markerAlpha = 0.15;
  // number of frames to wait while initializing
  waitFrames = 200;
  // frame counter;
  frameCounter = 0;
  // the number of "spokes"
  numSpokes = 12;
  // time variables
  t = 0;
  dt = 1;
  // minMarker and maxMarker control the smallest and largest
  // size of the dots drawn
  minMarker = 7;
  maxMarker = 40;
}



// setup runs once when the script starts
function setup() {
  // set up global variables
  setupGlobalVariables();
  
  // set up canvas size
  createCanvas( xRes , yRes );

  // do not draw borders
  noStroke();
  // set the angle mode to degrees
  angleMode( DEGREES );
  background( bgColor );
  
}

function draw() {
  frameCounter++;
  // the current device rotation measurements
  var rotX = rotationX;
  var rotY = rotationY;
  // how much the device has changed from the global
  var dRotX = gRotX - rotX;
  var dRotY = gRotY - rotY;
  // re-calculate the global rotation
  gRotX = attenX*rotX + (1-attenX)*gRotX;
  gRotY = attenY*rotY + (1-attenX)*gRotY;
  
  // if still in setup, don't draw anything
  if( frameCounter < waitFrames ) {
    textAlign( CENTER );
    textSize( 60 );
    text("KALEIDOSCOPE" , 0.5*xRes , 0.5*yRes );
    textSize( 30 );
    text( "Use your device's tilt sensors to draw. \n -marthematicist-" , 0.5*xRes , 0.5*yRes + 35 );
    return
  }
  if( frameCounter == waitFrames) {
    background( bgColor );
  }

  // update cursor position
  if( abs(dRotX) < maxRotX ) {
    cX -= dRotY;
  }
  if( abs(dRotY) < maxRotY ) {
    cY -= dRotX;
  }
  if( cX > maxRes ){
    cX = maxRes;
  }
  if( cX < 0 ){
    cX = 0;
  }
  if( cY > maxRes ){
    cY = maxRes;
  }
  if( cY < 0 ) {
    cY = 0;
  }
  
  // update time variable
  t += dt;
  t %= 360;
  
  // get cursor position, relative to center of screen
  var x = cX - 0.5*xRes;
  var y = cY - 0.5*yRes;
  
  // get distance from center to cursor
  var d = sqrt( x*x + y*y );
  
  // distance ratio
  var dr = d / ( 0.5*min(xRes,yRes) );
  
  // size of marker
  var marker = lerp( minMarker , maxMarker , dr );
  
  
  
  
  // set marker color
  fillColor = color( t , 100 , 100 , markerAlpha );
  
  // Set the fill color
  fill( fillColor );
  // translate to center of screen
  translate( 0.5*xRes , 0.5*yRes );
  
  for( i = 0 ; i < numSpokes ; i++ ){
    rotate( 360 / numSpokes );
    ellipse( x , y , marker , marker);
    
  }
  
  
  
}



function keyTyped() {
  if( key === 's' ) {
    saveCanvas( 'canvas' , 'jpg' );
    console.log("saved");
  }
}
