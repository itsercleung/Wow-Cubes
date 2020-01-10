//Using j5 JS and WEBGL
//TODO: Implement sliders

//Customizable variables
let angle = 0; //angle @ where to start oscillating
let w = 50; //width of rendered shapes (num shapes)

let distX1 = 0;
let distY1 = 0;
let distX2 = 200;
let distY2 = 200;

let offsetAngleX = 0;
let offsetAngleY = 0;

let oscillateValue = 0;

let speed = 0.05;
let reverse = true;

//-----------------------------------------------

let isometricAngle;
let maxDistance;

function setup() {
  createCanvas(600, 600, WEBGL);
  isometricAngle = atan(1 / sqrt(2));
  maxDistance = dist(distX1, distY1, distX2, distY2);
}

function draw() {
  background(255);
  ortho(-500, 500, 500, -500, 0, 1300); //persective camera angle
  directionalLight(255, 0, 0, -0.5, -0.5, 0);
  noStroke();
  ambientLight(200);
  ambientMaterial(150, 100, 150);

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
}
