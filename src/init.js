$(document).ready(function(){
  window.dancers = [];

  $(".addDancerButton").on("click", function(event){
    /* This function sets up the click handlers for the create-dancer
     * buttons on index.html. You should only need to make one small change to it.
     * As long as the "data-dancer-maker-function-name" attribute of a
     * class="addDancerButton" DOM node matches one of the names of the
     * maker functions available in the global scope, clicking that node
     * will call the function to make the dancer.
     */

    /* dancerMakerFunctionName is a string which must match
     * one of the dancer maker functions available in global scope.
     * A new object of the given type will be created and added
     * to the stage.
     */
    var dancerMakerFunctionName = $(this).data("dancer-maker-function-name");

    // get the maker function for the kind of dancer we're supposed to make
    var dancerMakerFunction = window[dancerMakerFunctionName];

    // make a dancer with a random position
    for (var i = 0; i < 10; i++) {
      var dancer = new dancerMakerFunction(
        $("body").height() * Math.random(),
        $("body").width() * Math.random(),
        200
      );
      window.dancers.push(dancer);
      $('body').append(dancer.$node);
    };
  });

  var check = function() {
    var positions = [];
    for (var i = 0; i < window.dancers.length; i++) {
      positions.push(window.dancers[i].$node.position());
      positions[i].nearest = Infinity;
    };

    for (var i = 0; i < positions.length; i++) {
      for (var k = i + 1; k < positions.length; k++) {
        var distance = Math.sqrt(Math.pow(positions[i].top - positions[k].top, 2) + Math.pow(positions[i].left - positions[k].left, 2));
        if (distance < positions[i].nearest) {
          positions[i].nearest = distance;
        }
        if (distance < positions[k].nearest) {
          positions[k].nearest = distance;
        }
      }
    };

    for (var i = 0; i < window.dancers.length; i++) {
      if (window.dancers[i] instanceof FancyDancer) {
        window.dancers[i].changeColorByProximity(positions[i].nearest);
      }
    };


    setTimeout(check, 50);
  }
  check();


});

