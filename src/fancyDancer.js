var FancyDancer = function(top, left, timeBetweenSteps){
  this.top = top;
  this.left = left;
  Dancer.call(this, top, left, timeBetweenSteps);

  // this.$node.css('transition', 'border-color ' + Math.floor(timeBetweenSteps) + 'ms ease-out');

  // we plan to overwrite the step function below, but we still want the superclass step behavior to work,
  // so we must keep a copy of the old version of this function

  // this.oldStep = this.step;
};

FancyDancer.prototype = Object.create(Dancer.prototype);
FancyDancer.prototype.constructor = FancyDancer;
FancyDancer.prototype.oldStep = Dancer.prototype.step;

FancyDancer.prototype.step = function(){
  // call the old version of step at the beginning of any call to this new version of step
  this.oldStep();
  // toggle() is a jQuery method to show/hide the <span> tag.
  // See http://api.jquery.com/category/effects/ for this and
  // other effects you can use on a jQuery-wrapped html tag.
  // var newColor = 'rgb(';
  // newColor += Math.floor(Math.random() * 255) + ',';
  // newColor += Math.floor(Math.random() * 255) + ',';
  // newColor += Math.floor(Math.random() * 255);
  // newColor += ')';

  // console.log('left: ' + pos.left + ', top: ' + pos.top);
  var height = $("body").height();
  var width = $("body").width();

  // var styleSettings = {
  //   top: Math.min(Math.max((pos.top + Math.random() * 100 - 50), 50), height - 50),
  //   left: Math.min(Math.max((pos.left + Math.random() * 100 - 50), 50), width - 50)
  //   // 'border-color': newColor
  // };
  // this.$node.css(styleSettings);

  this.top = Math.min(Math.max((this.top + Math.random() * 500 - 250), 50), height - 50);
  this.left = Math.min(Math.max((this.left + Math.random() * 500 - 250), 50), width - 50);

  this.$node.animate({
    top: this.top,
    left: this.left
  }, this.timeBetweenSteps);

};

FancyDancer.prototype.changeColorByProximity = function(nearest){

  var saturation;

  if (nearest > 300) {
    saturation = 0;
  } else if (nearest <= 30) {
    saturation = 100;
  } else {
    saturation = Math.abs(100 - Math.floor((nearest - 30) / 2,7));
  }

  var brightness = saturation * 0.5;

  // background-color: hsla(224, 50%, 45%, 1);
  var newColor = 'hsla(224, ' + saturation + '%, ' + brightness + '%, 1)';
  this.$node.css('border-color', newColor);

}
