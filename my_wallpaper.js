new p5(); //  Without including this line of code, color cannont be assigned to a
//  variable name outside of the draw function - this allows color to
//  be parameterised

//  Parameters for Geometric function:
let origin = 100; // Point that all drawn shapes are based around
let mainDiam = 60; // Diameter of the main Circle
let secondaryDiam = 40; // Diameter of the Secondary circles
let AccentScaleFactor = 0.5; // Scales the accent circles in relation to secondaries
let imageScale = 1.5; // Works like AccentScaleFactor, except for all elements

let fillCol = color(84, 123, 123); //  Color parameter for fill color main
let strokeCol = color(72, 148, 148); //  Color parameter for strokeColor main
let lineWeight = 15; //  Sets strokeWeight of main element
let nonMainFill = color(255, 255, 255); //  Color of fill for circles other than main
let nonMainStroke = color(72, 148, 148); //  Color of stroke for non main elements
let nonMainlineWeight = 1; //  Stroke weight of nonMain elements, i.e. secondary circles
let ROTATE_CANVAS = true; //  Boolean used for conditonal statement
let canvasRotation = 75;

function setup_wallpaper(pWallpaper) {
  pWallpaper.output_mode(GRID_WALLPAPER);
  pWallpaper.resolution(A3);
  pWallpaper.show_guide(false); //set this to false when you're ready to print

  //Grid settings
  pWallpaper.grid_settings.cell_width = 200;
  pWallpaper.grid_settings.cell_height = 150;
  pWallpaper.grid_settings.row_offset = 100;
}

function wallpaper_background() {
  background(240, 255, 240);
}

function my_symbol() {
  Geometric(origin, origin);
}


/*
  Section containing main methods for glyphs
  Glyph functions make calls to support functions in order to be
  drawn, parsing in Parameters as they do so
*/


function Geometric() {
  if (ROTATE_CANVAS) { //  Beyond conditional toolsets, I wasn't sure how else to implement a conditional in a static context
    translate(origin, origin);
    rotate(canvasRotation);
    origin = 0;
  }
  if (mainDiam < 50) { //  Executes when the central circle diameter is small enough - changes aesthetic to be like mottled skin in a way
    strokeCol = color(240, 255, 240);
    nonMainStroke = color(240, 255, 240);
    nonMainFill = color(72, 148, 148);
  }
  doDrawSetup(strokeCol, lineWeight)

  //  Main Circle
  fill(fillCol);
  ellipse(origin, origin, mainDiam * imageScale, mainDiam * imageScale);

  // Handles the drawing of secondary elements
  fill(nonMainFill);
  strokeWeight(nonMainlineWeight);
  stroke(nonMainStroke);
  GeoCircles(origin - 60, origin, secondaryDiam * imageScale, AccentScaleFactor);
}


/*
  <-----    Help function section   ----->
*/

/*
  GeoCircles is a fucntion that supports the Geometric glyph function.
  This function handles drawing the secondary and accent circles and works
  by being passed four parameters. centreX specifies the centre x coord of
  the circle, centreY the centre y coord, diam the width and height, and
  scaleOfAccents how the accent circles are scaled in comparison to the secondary
  circles.
*/

function GeoCircles(centreX, centreY, diam, scaleOfAccents) {
  for (let i = 0; i < 2; i++) { //  For Loop handles Secondary Circles
    ellipse(centreX + (i * 120), centreY, diam, diam); //  Left to right
    ellipse(centreY, centreX + (i * 120), diam, diam); //  Top to bottom
  }
  if (secondaryDiam > 115) { //  Removes accent circles when secondaries are sized over 115 PX
    return;
  }
  for (let i = 0; i < 2; i++) { //  For loop that handles accent circles
    ellipse(centreX + 3.75 + (i * 112.5), centreX + 3.75, //  Top left to top right
      diam / 3 * scaleOfAccents, diam / 3 * scaleOfAccents);
    ellipse(centreX + 3.75 + (i * 112.5), centreY + 56.25, //  Bottom left to bottom right
      diam / 3 * scaleOfAccents, diam / 3 * scaleOfAccents);
  }
}

/*
  Function that is used in both glyphs as a way of setting up
  intial stroke and strokeWeight values. strokeColor sets stroke() and
  strokeThickness sets strokeWeight(). Does not set fill color, as this is set
  to white, (255, 255, 255), for all glyphs by default.
*/

function doDrawSetup(strokeColor, strokeThickness) {
  strokeWeight(strokeThickness);
  stroke(strokeColor)
}
