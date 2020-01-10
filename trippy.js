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

//-----------------------------------------------

let isometricAngle;
let maxDistance;
let densitySlider, speedSlider, xAngleSlider, yAngleSlider, oscillateSlider, maxDistanceSlider;
p5.disableFriendlyErrors = true; // disables FES

function setup() {
  createCanvas(600, 600, WEBGL);
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
}

function draw() {
  //Canvas lighting render
  background(255);
  ortho(-500, 500, 500, -500, 0, 1300); //persective camera angle
  directionalLight(255, 0, 0, -0.5, -0.5, 0);
  noStroke();
  ambientLight(255);
  ambientMaterial(150, 100, 150);

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

  //text('red', rSlider.x * 2 + rSlider.width, 35);
  //text('green', gSlider.x * 2 + gSlider.width, 65);
  //text('blue', bSlider.x * 2 + bSlider.width, 95);
}


