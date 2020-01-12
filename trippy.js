//Using j5 JS and WEBGL
//TODO: Implement sliders

//Customizable variables
let angle = 0;
let w = 40; //width of rendered shapes (num shapes)

let distX1 = 0;
let distY1 = 0;
let distX2 = 400; //distance of height offset
let distY2 = 400; 

let offsetAngleX = 0;
let offsetAngleY = 0;

let oscillateValue = 0;

let speed = 0.05;
let reverse = true;

let r = 220;
let g = 180;
let b = 80;
let brightness = 255;
let dlr = 255;
let dlg = 120;
let dlb = 110;

//-----------------------------------------------

let isometricAngle;
let maxDistance;
let densitySlider, speedSlider, xAngleSlider, yAngleSlider, oscillateSlider, maxDistanceSlider, dlrSlider, dlgSlider, dlbSlider, 
rSlider, gSlider, bSlider, brightnessSlider;
p5.disableFriendlyErrors = true; // disables FES

function windowResized() {
  resizeCanvas(windowHeight, windowHeight);
}

//Setup canvas and objects
function setup() {
  var canvas = createCanvas(windowHeight, windowHeight, WEBGL);
  canvas.style('display', 'block');

  //Define angle and distance of rendering cubes
  isometricAngle = atan(1 / sqrt(2));
  maxDistance = dist(distX1, distY1, distX2, distY2);

  // create sliders
  densitySlider = createSlider(10, 100, w, 1);
  densitySlider.position(100, 20);
  densitySlider.addClass("slider");

  speedSlider = createSlider(0, 0.2, speed, 0.001);
  speedSlider.position(100, 50);
  speedSlider.addClass("slider");

  xAngleSlider = createSlider(-1, 1, offsetAngleX, 0.01);
  xAngleSlider.position(100, 80);
  xAngleSlider.addClass("slider");

  yAngleSlider = createSlider(-1, 1, offsetAngleY, 0.01);
  yAngleSlider.position(100, 110);
  yAngleSlider.addClass("slider");

  oscillateSlider = createSlider(-1, 1, oscillateValue, 0.01);
  oscillateSlider.position(100, 140);
  oscillateSlider.addClass("slider");

  maxDistanceSlider = createSlider(1, 1000, maxDistance, 10);
  maxDistanceSlider.position(100, 170);
  maxDistanceSlider.addClass("slider");

  rSlider = createSlider(0, 255, r, 1);
  rSlider.position(100, 260);
  rSlider.addClass("slider");

  gSlider = createSlider(0, 255, g, 1);
  gSlider.position(100, 290);
  gSlider.addClass("slider");

  bSlider = createSlider(0, 255, b, 1);
  bSlider.position(100, 320);
  bSlider.addClass("slider");

  brightnessSlider = createSlider(0, 255, brightness, 1);
  brightnessSlider.position(100, 350);
  brightnessSlider.addClass("slider");

  dlrSlider = createSlider(0, 255, dlr, 1);
  dlrSlider.position(100, 380);
  dlrSlider.addClass("slider");

  dlgSlider = createSlider(0, 255, dlg, 1);
  dlgSlider.position(100, 410);
  dlgSlider.addClass("slider");

  dlbSlider = createSlider(0, 255, dlb, 1);
  dlbSlider.position(100, 440);
  dlbSlider.addClass("slider");

  setupText();

}

//Render objects and lighting
function draw() {
  //Canvas lighting render
  noStroke();
  background(255);
  ortho(-700, 700, 700, -700, 0, 2000); //persective camera angle
  directionalLight(dlr, dlg, dlb, -0.5, -0.5, 0); //lighting 
  ambientLight(brightness);
  ambientMaterial(r, g, b);

  //Isometric view angle
  rotateX(isometricAngle + offsetAngleX);
  rotateY(-QUARTER_PI + offsetAngleY);

  //Draw x number of times
  for (let z = 0; z < height; z += w) { //row
    for (let x = 0; x < width; x += w) { //col 
      push();

      let d = dist(x, z, width / 2, height / 2); //distance rate
      let offset = map(d, 0, maxDistance, -PI, PI); //offset between shapes
      let a = angle + offset; 
      let h = floor(map(sin(a) + oscillateValue, -1, 1, 50, 300)); //height change

      translate(x - width / 2, 0, z - height / 2);
      box(w, h, w);

      pop();
    }
  }

  if (reverse) {
    angle += speed;
  } else {
    angle -= speed;
  }

  //Sliders value change
  w = densitySlider.value();
  speed = speedSlider.value();
  offsetAngleX = xAngleSlider.value();
  offsetAngleY = yAngleSlider.value();
  oscillateValue = oscillateSlider.value();
  maxDistance = maxDistanceSlider.value();
  r = rSlider.value();
  g = gSlider.value();
  b = bSlider.value();
  brightness = brightnessSlider.value();
  dlr = dlrSlider.value();
  dlg = dlgSlider.value();
  dlb = dlbSlider.value();
}

function setupText() {
  var densityText = document.getElementById("densityText");
  densityText.style.left = densitySlider.x * 1.4 - densitySlider.width + "px";
  densityText.style.top = "5px";

  var speedText = document.getElementById("speedText");
  speedText.style.left = speedSlider.x * 1.4 - speedSlider.width + "px";
  speedText.style.top = "35px";

  var offsetAngleXText = document.getElementById("offsetAngleXText");
  offsetAngleXText.style.left = xAngleSlider.x * 1.4 - xAngleSlider.width + "px";
  offsetAngleXText.style.top = "65px";

  var offsetAngleYText = document.getElementById("offsetAngleYText");
  offsetAngleYText.style.left = yAngleSlider.x * 1.4 - yAngleSlider.width + "px";
  offsetAngleYText.style.top = "95px";

  var oscillateText = document.getElementById("oscillateText");
  oscillateText.style.left = oscillateSlider.x * 1.4 - oscillateSlider.width + "px";
  oscillateText.style.top = "125px";

  var maxDistanceText = document.getElementById("maxDistanceText");
  maxDistanceText.style.left = maxDistanceSlider.x * 1.4 - maxDistanceSlider.width + "px";
  maxDistanceText.style.top = "155px";

  //------

  var rText = document.getElementById("rText");
  rText.style.left = rSlider.x * 1.4 - rSlider.width + "px";
  rText.style.top = "245px";

  var gText = document.getElementById("gText");
  gText.style.left = gSlider.x * 1.4 - gSlider.width + "px";
  gText.style.top = "275px";

  var bText = document.getElementById("bText");
  bText.style.left = bSlider.x * 1.4 - bSlider.width + "px";
  bText.style.top = "305px";

  var brightnessText = document.getElementById("brightnessText");
  brightnessText.style.left = brightnessSlider.x * 1.4 - brightnessSlider.width + "px";
  brightnessText.style.top = "335px";

  var dlrText = document.getElementById("dlrText");
  dlrText.style.left = dlrSlider.x * 1.4 - dlrSlider.width + "px";
  dlrText.style.top = "365px";

  var dlgText = document.getElementById("dlgText");
  dlgText.style.left = dlgSlider.x * 1.4 - dlgSlider.width + "px";
  dlgText.style.top = "395px";

  var dlbText = document.getElementById("dlbText");
  dlbText.style.left = dlbSlider.x * 1.4 - dlbSlider.width + "px";
  dlbText.style.top = "425px";
}


