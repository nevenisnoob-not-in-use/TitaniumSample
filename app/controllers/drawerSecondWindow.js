var args = arguments[0] || {};

function onOpen() {
  
  var activity = $.drawerSecondWindow.getActivity();

  if (activity) {

    var actionBar = activity.getActionBar();

    if (actionBar) {
      actionBar.displayHomeAsUp = true;
      actionBar.title = "Second Window";
      actionBar.onHomeIconItemSelected = function() {
        $.drawerSecondWindow.close();
      };
    }
  };

  return true;
}