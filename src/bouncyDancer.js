var BouncyDancer = function(top, left, timeBetweenSteps){
  // this.top = top;
  // this.left = left;
  this.oldTop;
  this.oldLeft;
  this.bodyHeight = $("body").height();
  this.bodyWidth = $("body").width();
  FancyDancer.call(this, top, left, timeBetweenSteps);

  // this.$node.css('transition', 'border-color ' + Math.floor(timeBetweenSteps) + 'ms ease-out');

  // we plan to overwrite the step function below, but we still want the superclass step behavior to work,
  // so we must keep a copy of the old version of this function

  // this.oldStep = this.step;
};

BouncyDancer.prototype = Object.create(FancyDancer.prototype);
BouncyDancer.prototype.constructor = BouncyDancer;
BouncyDancer.prototype.oldStep = Dancer.prototype.step;

BouncyDancer.prototype.movement = function(){
  this.$node.animate({
    top: this.top,
    left: this.left
  }, this.timeBetweenSteps);
}

BouncyDancer.prototype.step = function(){
  // call the old version of step at the beginning of any call to this new version of step
  this.oldStep();

  // console.log('left: ' + pos.left + ', top: ' + pos.top);
  var height = $("body").height();
  var width = $("body").width();

  this.oldTop = this.top;
  this.oldLeft = this.left;
  this.top = Math.min(Math.max((this.top + Math.random() * 500 - 250), 50), height - 50);
  this.left = Math.min(Math.max((this.left + Math.random() * 500 - 250), 50), width - 50);
  this.movement();
};

BouncyDancer.prototype.bounce = function(nearest){
  if (nearest <= 20){
    // this.canStep = false;
    //move in general direction of old position
    var pos = this.$node.position();
    console.log('1st - top: ' + this.top + ' left: ' + this.left);
    if (this.top - this.oldTop > 0){
      this.oldTop = this.top;
      this.top = Math.min(Math.max((this.top - Math.random() * 250), 50), this.bodyHeight - 50);
      this.left = Math.min(Math.max((this.left - Math.random() * 250), 50), this.bodyWidth - 50);
    } else {
      this.oldTop = this.top;
      this.top = Math.min(Math.max((this.top + Math.random() * 250), 50), this.bodyHeight - 50);
      this.left = Math.min(Math.max((this.left + Math.random() * 250), 50), this.bodyWidth - 50);
    }
    console.log('2nd - top: ' + this.top + ' left: ' + this.left);
    this.movement();

  }

}
