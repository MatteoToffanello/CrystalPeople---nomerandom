class Drop{
  
  constructor(particle, follow){
    let min_ = -0.5;
    let max_ = 0.5;
    this.startPos = particle.pos;
    this.particle = particle;
    this.particle.vel = createVector(random(min_, max_), random(min_, max_));
    this.follow = follow;
    this.alpha = 90;
  }
  
  display(){
    this.particle.display(this.alpha);
  }
  
  update(){
    this.particle.update();
  }
  
  seek(attractor){
    let maxDis = p5.Vector.sub(attractor, this.starPos).mag();
    let minDis = 0;
    let dir = p5.Vector.sub(attractor, this.particle.pos);
    //console.log(dir.mag());
    this.alpha = map(dir.mag(), minDis, maxDis, 15, 100)
    
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
  
}