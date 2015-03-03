var Menu;

initDrawer();

/**
 * initializes drawer navigation
 */
function initDrawer() {
  // Android only
  if (OS_ANDROID) {
    
    // Load module
    var TiDrawerLayout = require('com.tripvi.drawerlayout');
    
    // define menu and main content view
    menu = Alloy.createController('drawerMenu', {
      parent : $.drawerIndex
    });
    
    // this is just a wrapper
    // actual content views are add to this later
    Alloy.Globals.contentView = Ti.UI.createView({
      width : Ti.UI.FILL,
      height : Ti.UI.FILL
    });

    Alloy.Globals.drawer = TiDrawerLayout.createDrawer({
      leftView : menu.getView(),
      centerView : Alloy.Globals.contentView,
      leftDrawerWidth : 240
    });

    Alloy.Globals.drawer.addEventListener('draweropen', onDrawerChange);
    Alloy.Globals.drawer.addEventListener('drawerclose', onDrawerChange);

    $.drawerIndex.add(Alloy.Globals.drawer);
    
  }
  
  $.drawerIndex.open();
}

/**
 * Android callback for {Ti.UI.Window} open event
 */
function onOpen() {
  
  var activity = $.drawerIndex.activity;

  if (activity) {

    var actionBar = activity.getActionBar();

    activity.onCreateOptionsMenu = function(e) {
      e.menu.clear();

      e.activity = activity;
      e.actionBar = actionBar;

      if (!Alloy.Globals.drawer.isLeftDrawerOpen) {
        // use a global method to forward this event to the nested controller
        Alloy.Globals.optionsMenu(e);
      } else {
        actionBar.title = "TiDrawer Demo";
      }
      
      // Here, we add an Overflow Menu with options that are visible on every window
      // (you can still hook other options into the overflow)
      
      e.menu.add({
        title : "Help",
        showAsAction : Ti.Android.SHOW_AS_ACTION_NEVER
      });
      
      e.menu.add({
        title : "Settings",
        showAsAction : Ti.Android.SHOW_AS_ACTION_NEVER
      });
    };

    if (actionBar) {
      actionBar.displayHomeAsUp = true;
      actionBar.title = "TiDrawer Demo";
      actionBar.onHomeIconItemSelected = function() {
        Alloy.Globals.drawer.toggleLeftWindow();
      };
    }
  };
  
  init();

  return true;
}

/**
 * callback for drawer open / close event
 * @param {Object} event
 */
function onDrawerChange(e) {
  $.drawerIndex.activity.invalidateOptionsMenu();
}

/**
 * initializes the Controller
 */
function init() {
  menu.select(0);
  OS_ANDROID && $.drawerIndex.activity.invalidateOptionsMenu();
}