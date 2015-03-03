var args = arguments[0] || {};

function init() {
  
  // set title
  $.drawerMenuRow.title = args.title;
  
  // bind info about associated controller
  $.drawerMenuRow.controller = args.controller;

}

/**
 * Sets the row (in-)active
 * Called by menu
 * @param {Boolean} active
 */
$.drawerMenuRow.setActive = function(_active) {
  $.drawerMenuRow.setBackgroundColor( _active ? "#333333" : "#3F3D3D" );
};

init();