var args = arguments[0] || {};

function onCreateOptionsMenu(e) {
  if (e.actionBar) {
    e.actionBar.title = "About";
  }
}

function onAlert(e) {
	alert("button is clicked.");
}

/**
 * Cleans up the controller
 * 
 * http://www.tidev.io/2014/09/18/cleaning-up-alloy-controllers/
 */
function destroy() {
  $.off();
}

/**
 * Initializes the controller
 */
function init() {

  $.on('createOptionsMenu', onCreateOptionsMenu);

}

var matrix2d = Ti.UI.create2DMatrix();
matrix2d = matrix2d.rotate(90); // in degrees
matrix2d = matrix2d.scale(3); // scale to 1.5 times original size
matrix2d = matrix2d.translate(0,600);
var a = Ti.UI.createAnimation({
	transform: matrix2d,
	duration: 500,
	autoreverse: true,
	repeat: 3
});
$.otherButton.animate(a);

// PUBLIC
exports.destroy = destroy;
exports.init = init;