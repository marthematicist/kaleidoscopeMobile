
function setupGlobalVariables() {
  // screen dimensions
  xRes = windowWidth;
  yRes = windowHeight;
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
  // rotation speed
  speedX = 0.9;
  speedY = 0.1;
  // cursor position
  cX = 0.5*xRes;
  cY = 0.5*yRes;
  // radius and angle 
  r = 0.1*maxRes;
  a = 0;
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
  // number of milliseconds to wait while initializing
  waitTime = 3000;
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
  // shake control
  shakesToClear = 20;
  shakeCounter = 0;
  
  clearFirstTime = true;
  startTime = 0;
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
  startTime = millis();
  
  textAlign( CENTER );
  textSize( 60 );
  text("KALEIDOSCOPE" , 0.5*xRes , 0.5*yRes );
  textSize( 30 );
  text( "Use your device's tilt sensors to draw.\n-marthematicist-" , 0.5*xRes , 0.5*yRes + 35 );
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
  if( millis() - startTime < waitTime ) {
    
    return
  }
  if( clearFirstTime ) {
    background( bgColor );
    clearFirstTime = false;
  }

  // update cursor position
  if( abs(dRotX) < maxRotX ) {
    a -= speedY*dRotY;

  }
  if( abs(dRotY) < maxRotY ) {
    r += speedX*dRotX;
  }
  a %= 360;

  if( r > 0.5*maxRes ){
    r = 0.5*maxRes;
  }
  if( r < 0 ) {
    r = 0;
  }
  
  // update time variable
  t += dt;
  t %= 360;
  

  
  // get distance from center to cursor
  var d = r;
  
  // distance ratio
  var dr = d / ( 0.5*min(xRes,yRes) );
  
  // size of marker
  var marker = lerp( minMarker , maxMarker , dr );
  
  
  
  
  // set marker color
  fillColor = color( t , 100 , 100 , markerAlpha );
  
  // Set the fill color
  fill( fillColor );
  
  for( i = 0 ; i < numSpokes ; i++ ){
    var ang = a +  i/numSpokes * 360 ;
    var x = 0.5*xRes + r*cos(ang);
    var y = 0.5*yRes + r*sin(ang);
    ellipse( x , y , marker , marker);
  }
  
  
  
}



function deviceShaken() {
  shakeCounter++;
  if( shakeCounter >= shakesToClear ){
    shakeCounter = 0;
    background( bgColor );
  }
}
