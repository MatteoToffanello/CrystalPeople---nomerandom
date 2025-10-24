class Particle {
  
  constructor(x, y){
    this.life = 10;
    this.pos = createVector(x, y);
    this.prevPos = createVector(x, y)
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0.3);
    this.explosionPoint = createVector(this.pos.x, random(height/4 * 3, height));
    this.scaleFactor = random(0.3, 0.5) + map(height*width, 600*600, 1920 * 1080, 0.3, 5);
  }
  
  display(alpha, color_){
    
    if(!alpha){
      alpha = 90;
    }
    
    if(!color_){
      color_ = createVector(150, 150, 240);
    }
    
    
    strokeWeight(0);
    stroke(255);
    let stretch = lerp(0, this.prevPos.y, 0.3 + this.scaleFactor)
    stretch = constrain(stretch, 8, 30);
    fill(255, 255, 255, alpha);
    ellipse(this.prevPos.x, this.prevPos.y, 8 + this.scaleFactor, stretch);
    stretch = lerp(0, this.prevPos.y, 0.15)
    stretch = constrain(stretch, 8, 30);
    fill(color_.x, color_.y, color_.z, alpha);
    ellipse(this.prevPos.x, this.prevPos.y, 8 + this.scaleFactor, stretch);
    
    let size = constrain(stretch, 5, 18);
    fill(255, 255, 255, alpha);
    ellipse(this.pos.x, this.pos.y, size, size);
    fill(color_.x, color_.y, color_.z, alpha);
    ellipse(this.pos.x, this.pos.y, size, size);
    

    //point(this.pos.x, this.pos.y);
  }
  
  update(){
    if(frameCount % 60 == 0){
      this.life--;
    }
    
    this.prevPos = this.pos;
    this.vel.add(this.acc);
    this.pos.add(this.vel);
  }
  
  checkContact(){
    if(this.pos.y >= this.explosionPoint.y){
      return true
    }else{
      return false;
    }
  }
  
  explode(){
    let drops = [];
    drops[0] = [];
    drops[1] = [];
      for(let i = 0; i < 20; i++){
        let p = new Particle(this.pos.x, this.pos.y);
        drops[0].push(new Drop(p, false));
        let d = new Drop(p, true);
        drops[1].push(d);
      }
    return drops;
  }
  
  follow(attractor){
    let dir = p5.Vector.sub(attractor, this.pos);
    dir.normalize();
    dir.mult(0.2 + map(height*width, 600*600, 1920*1080, 0, 0.3));
    this.acc = dir;
  }
  
}