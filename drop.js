class Drop{
  
  constructor(particle, follow){
    let min_ = -1 - map(height*width, 600*600, 1920*1080, 0, 2);
    let max_ = 1 + map(height*width, 600*600, 1920*1080, 0, 2);
    this.startPos = particle.pos;
    this.particle = particle;
    this.particle.vel = createVector(random(min_, max_), random(min_, max_));
    this.follow = follow;
    this.alpha = 90;
  }
  
  display(){
    this.particle.display(this.alpha, createVector(255, 255, 180));
  }
  
  update(){
    this.particle.update();
  }
  
  seek(attractor){
    let maxDis = p5.Vector.sub(attractor, this.starPos).mag();
    let minDis = 0;
    let dir = p5.Vector.sub(attractor, this.particle.pos);
    //console.log(dir.mag());
    this.alpha = map(dir.mag(), minDis, maxDis, 16, 100)
    
    //console.log(this.alpha);
    this.particle.follow(attractor);
  }
  
  isAtLight(attractor){
    if(this.alpha <= 20){
      return true;
    }else{
      return false;
    }
  }
  
  shouldDie(){
    return (this.particle.life <= 0);
  }
  
}