//Using j5 JS and WEBGL
//TODO: Implement sliders

//Customizable variables
let angle = 0;
let w = 40; //width of rendered shapes (num shapes)

let distX1 = 0;
let distY1 = 0;
let distX2 = 200; //distance of height offset
let distY2 = 200; 

let offsetAngleX = 0;
let offsetAngleY = 0;

let oscillateValue = 0;

let speed = 0.05;
let reverse = true;

let r = 120;
let g = 190;
let b = 110;
let brightness = 255;
let dlr = 255;
let dlg = 0;
let dlb = 0;

//-----------------------------------------------

let isometricAngle;
let maxDistance;
let densitySlider, speedSlider, xAngleSlider, yAngleSlider, oscillateSlider, maxDistanceSlider, dlrSlider, dlgSlider, dlbSlider, 
rSlider, gSlider, bSlider, brightnessSlider;
p5.disableFriendlyErrors = true; // disables FES

function setup() {
  createCanvas(700, 700, WEBGL);
  isometricAngle = atan(1 / sqrt(2));
  maxDistance = dist(distX1, distY1, distX2, distY2);

  // create sliders
  densitySlider = createSlider(10, 100, w, 1);
  densitySlider.position(20, 20);
  speedSlider = createSlider(0, 0.2, speed, 0.001);
  speedSlider.position(20, 50);

  xAngleSlider = createSlider(-1, 1, offsetAngleX, 0.01);
  xAngleSlider.position(20, 80);
  yAngleSlider = createSlider(-1, 1, offsetAngleY, 0.01);
  yAngleSlider.position(20, 110);

  oscillateSlider = createSlider(-1, 1, oscillateValue, 0.01);
  oscillateSlider.position(20, 140);

  maxDistanceSlider = createSlider(1, 1000, maxDistance, 10);
  maxDistanceSlider.position(20, 170);

  rSlider = createSlider(0, 255, r, 1);
  rSlider.position(600, 20);

  gSlider = createSlider(0, 255, g, 1);
  gSlider.position(600, 50);

  bSlider = createSlider(0, 255, b, 1);
  bSlider.position(600, 80);

  brightnessSlider = createSlider(0, 255, brightness, 1);
  brightnessSlider.position(600, 110);

  dlrSlider = createSlider(0, 255, dlr, 1);
  dlrSlider.position(600, 140);

  dlgSlider = createSlider(0, 255, dlg, 1);
  dlgSlider.position(600, 170);

  dlbSlider = createSlider(0, 255, dlb, 1);
  dlbSlider.position(600, 200);
}

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

  //text('red', rSlider.x * 2 + rSlider.width, 35);
  //text('green', gSlider.x * 2 + gSlider.width, 65);
  //text('blue', bSlider.x * 2 + bSlider.width, 95);
}


