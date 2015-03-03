var args = arguments[0] || {};

function openWindow(){
  var win = Alloy.createController('drawerSecondWindow').getView();
  win.open();
}

/**
 * Callback for Android OptionsMenu
 */
function onCreateOptionsMenu(e) {
  if (e.actionBar) {
    e.actionBar.title = "Main";
  }
  
  // Search Action 
  e.menu.add({
    title : "Search",
    icon : "/images/ic_action_search.png",
    showAsAction : Ti.Android.SHOW_AS_ACTION_IF_ROOM
  });

  // Refresh Action
  e.menu.add({
    title : "Refresh",
    icon : "/images/ic_action_refresh.png",
    showAsAction : Ti.Android.SHOW_AS_ACTION_IF_ROOM
  });
  
  // additional overflow menu item
  e.menu.add({
    title : "Main option",
    showAsAction : Ti.Android.SHOW_AS_ACTION_NEVER
  });

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

// PUBLIC
exports.destroy = destroy;
exports.init = init;