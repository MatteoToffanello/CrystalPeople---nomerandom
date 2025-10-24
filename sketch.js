

let generators = [];

let particles = [];

let attractor;

let drops = [];

let frameInterval;

let flag = true;

let xoff = 1, yoff  =1;
let inc = 0.1;

function setup() {
  if(windowWidth <= 1920 && windowHeight<= 1080){
      createCanvas(windowWidth, windowHeight);
  }else{
      createCanvas(1920, 1080);
  }
  for(let i = 0; i < 3; i++){
    generators.push(createVector(random(width/6, width/6 * 5), 0));
  }
  
  attractor = createVector(width/3 * 2, height/2);
  

  
  frameInterval = floor(random(180, 360));
  //console.log(frameInterval);
}

function draw() {
  background(0);
  
  strokeWeight(5)
  stroke(250, 250, 255);
  textSize(height/15);
  text('M a t t o f f a r t', width/8, height/8);
  
  //frameRate(30)
  
  xoff += inc;
  yoff += inc;
  
    strokeWeight(20);
  stroke(230, 200, 180);
  point(attractor.x + map(noise(xoff, yoff), 0, 1, -10, 10), attractor.y + map(noise(xoff, yoff), 0, 1, -10, 10));
  
  if(frameCount % frameInterval == 0){
    let randomIndex = floor(random(0, 3));
    generators[randomIndex] = createVector(random(width/6, width/6 * 5), 0);
  }
  
  if(frameCount % 30 == 0 && flag){
    
    let randomIndex = floor(random(0, 3));
    //console.log(randomIndex);
    particles.push(new Particle(generators[randomIndex].x, 0));
    
  }
  
  for(let i = 0; i < particles.length; i++){
    particles[i].update();
    particles[i].display();
    if(particles[i].checkContact() && flag){
      //flag = false
      let r = particles[i].explode();
      drops = concat(drops, r[1]);
      particles.splice(i, 1);
      i--;
    }
  }
  
  //console.log(drops.length);
  for(let i = 0 ; i < drops.length; i++){
    if(drops[i].isAtLight(attractor) || drops[i].shouldDie()){
      console.log("YES");
      drops.splice(i, 1);
      i--;
    }else{
      drops[i].seek(attractor);
      drops[i].update();
      drops[i].display();
    }
  }
  
  console.log(particles.length + drops.length);
  
  
  
}