var ColorDancer = function(top, left, timeBetweenSteps){
  Dancer.call(this, top, left, timeBetweenSteps);
  this.show = true;

  // we plan to overwrite the step function below, but we still want the superclass step behavior to work,
  // so we must keep a copy of the old version of this function

  // this.oldStep = this.step;
};

ColorDancer.prototype = Object.create(Dancer.prototype);
ColorDancer.prototype.constructor = ColorDancer;

ColorDancer.prototype.step = function(){
  // call the old version of step at the beginning of any call to this new version of step
  Dancer.prototype.step.call(this);
  // toggle() is a jQuery method to show/hide the <span> tag.
  // See http://api.jquery.com/category/effects/ for this and
  // other effects you can use on a jQuery-wrapped html tag.
  this.$node.toggle({
    complete: function(){
      var newColor = 'rgb(';
      newColor += Math.floor(Math.random() * 255) + ',';
      newColor += Math.floor(Math.random() * 255) + ',';
      newColor += Math.floor(Math.random() * 255);
      newColor += ')';
      if (this.show) {
        this.show = false;
      } else {
        this.setPosition($("body").height() * Math.random(), $("body").width() * Math.random());
        this.$node.css('border-color', newColor);
        this.show = true;
      }
    }.bind(this)
  });

};
