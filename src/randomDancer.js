var RandomDancer = function(top, left, timeBetweenSteps){
  Dancer.call(this, top, left, timeBetweenSteps);
  this.show = true;

  // we plan to overwrite the step function below, but we still want the superclass step behavior to work,
  // so we must keep a copy of the old version of this function

  // this.oldStep = this.step;
};

RandomDancer.prototype = Object.create(Dancer.prototype);
RandomDancer.prototype.constructor = RandomDancer;

RandomDancer.prototype.step = function(){
  // call the old version of step at the beginning of any call to this new version of step
  Dancer.prototype.step.call(this);
  // toggle() is a jQuery method to show/hide the <span> tag.
  // See http://api.jquery.com/category/effects/ for this and
  // other effects you can use on a jQuery-wrapped html tag.
  this.$node.toggle({
    complete: function(){
      if (this.show) {
        this.show = false;
      } else {
        this.setPosition($("body").height() * Math.random(), $("body").width() * Math.random());
        this.show = true;
      }
    }.bind(this)
  });

};
