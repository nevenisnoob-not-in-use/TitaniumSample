// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};

(function(){
  
  /**
   * @property {Object} drawer reference
   */
  Alloy.Globals.drawer = undefined;
  /**
   * @property {Ti.UI.View} contentView 
   */
  
  Alloy.Globals.contentView = undefined;
  
  /**
   * @property {Alloy.Controller} currentCtrl   references current Controller
   * @private
   */
  var currentCtrl;
  
  /**
   * optionsmenu dispatcher
   */
  Alloy.Globals.optionsMenu = function(e) {
 //   currentCtrl.trigger('createOptionsMenu', e);
  };
  
  /**
   * opens a new controller in drawer.contentView
   * and closes the old controller
   * @param {Alloy.Controller} Controller
   */
  Alloy.Globals.open = function(_ctrl) {
  
    if (currentCtrl) {
      Alloy.Globals.contentView.remove(currentCtrl.getView());
      _.isFunction(currentCtrl.destroy) && currentCtrl.destroy();
    }
  
    currentCtrl = _ctrl;
    Alloy.Globals.contentView.add(currentCtrl.getView());
    currentCtrl.init();
  };
  
})();

