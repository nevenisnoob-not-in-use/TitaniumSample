var args = arguments[0] || {};

// fill undefined args with defaults
_.defaults(args, {
    indicatorColor: "#000",
    indicatorHeight: 5,
    tabs: false,
    scrollOffset: 40,
    height: args.tabs ? 48 : 5,
    width: Ti.UI.FILL
});

// additional adjustments for tabs
if (args.tabs) {
    args.tabs = {
      dividerColor: "#ccc",
      width: args.tabWidth
    };
}

// apply properties of Ti.UI.View that can be applied to paging control view
[
    "backgroundColor",
    "backgroundImage",
    "backgroundLeftCap",
    "backgroundRepeat",
    "backgroundTopCap",
    "borderRadius",
    "borderWidth",
    "bottom",
    "height",
    "horizontalWrap",
    "left",
    "opacity",
    "right",
    "top",
    "visible",
    "width",
    "zIndex"
].forEach(function(prop){ _.has(args, prop) && ($.pagingcontrol[prop] = args[prop]); });

// NOTE: THIS DOES NOT WORK ANYMORE WITH ALLOY 1.4.0
// try to find scrollable view as child of parent
// this should work, if pagingcontrol is scrollable view have the same parent
// otherwise you can pass it with args or setScrollableView
if (args.__parentSymbol){
    args.__parentSymbol.children.length > 0 &&
    ($.scrollableView = _.find(args.__parentSymbol.children, function(child){
        return child.apiName === "Ti.UI.ScrollableView";
    }));
}

// assign passed reference of scrollable view
(_.has(args, "scrollableView")) && ($.scrollableView = args.scrollableView);

if ($.scrollableView){
    postLayout(init);
}

/**
 * calls back after postlayout
 * @param {Function} callback
 * @param {Boolean} orientation change  wether called from oc callback
 */
function postLayout(callback, oc){

    if (!oc && $.pagingcontrol.size.width){
        callback();
    }else{
        // wait for postlayout event to get the pagingcontrol size
        $.pagingcontrol.addEventListener('postlayout', function onPostLayout(){

            // callback
            callback();

            // remove eventlistener
            $.pagingcontrol.removeEventListener('postlayout', onPostLayout);
        });
    }
}

/**
 * initialization method
 */
function init(){

    if (args.tabs) {

      // create tabs
      $.tabsCtrl = Widget.createController('tabs', {
        tabs: args.tabs,
        titles: _.map($.scrollableView.getViews(), function(v){ return v.title; })
      });

      // add tabs
      $.pagingcontrol.add($.tabsCtrl.getView());

      // add bottom border
      $.pagingcontrol.add(Ti.UI.createView({
        width: Ti.UI.FILL,
        height: 2,
        bottom: 0,
        backgroundColor: '#ededed'
      }));

      // add tab select listener
      $.tabsCtrl.on('select', function(e){
        $.trigger('select', { tab: e.tab, view: e.view });
        $.scrollableView.currentPage = e.tab;
        $.indicator.setLeft(e.tab * $.iWidth);
      });
    }

    // create the indicator view
    $.indicator = Ti.UI.createView({
        backgroundColor: args.indicatorColor,
        height: args.indicatorHeight,
        width: Ti.UI.SIZE,
        bottom: 0,
        left: 0,
        zIndex: 2
    });

    adjustePositions();

    // add the indicator
    $.pagingcontrol.add($.indicator);

    // add scroll listener to scrollable view
    $.scrollableView.addEventListener('scroll', onScroll);
    Ti.Gesture.addEventListener('orientationchange', onOrientationChange);
}

/**
 * Callback for scroll event
 */
function onScroll(e){
    // update the indicator position
    $.indicator.setLeft(e.currentPageAsFloat * $.iWidth);

    args.tabs && updateOffset(e.currentPageAsFloat);
}

/**
 * sets the tab bar offset
 * @param {Number} index
 */
function updateOffset(index){
  var width = $.pagingcontrol.size.width,
  tabsWidth = $.tabsCtrl.getWidth(),
  maxOffset = tabsWidth - width,
  tabSpace = tabsWidth * index / $.scrollableView.views.length,
  measurement = require('alloy/measurement');
  
  if (width < tabsWidth){

    var offset = tabSpace - args.scrollOffset,    
    offsetDp = offset < maxOffset ? offset : maxOffset,
    newOffset = OS_IOS ? (offsetDp < 0 ? 0 : offsetDp) : measurement.dpToPX(offsetDp);

    $.pagingcontrol.setContentOffset(
      { x: newOffset, y: 0},
      { animated: false }
    );
  }

}

/**
 * Callback for orientationchange event
 */
function onOrientationChange(e){
    postLayout(adjustePositions, true);
}

/**
 * Adjust initial layout positions
 */
function adjustePositions() {
  var totalWidth = args.tabs ? $.tabsCtrl.getWidth() : $.pagingcontrol.size.width;
  $.iWidth = Math.floor(totalWidth / $.scrollableView.views.length);
  $.indicator.setWidth($.iWidth);
  $.indicator.setLeft($.scrollableView.getCurrentPage() * $.iWidth);
}

/**
 * if you need to set it in the controller
 * @param {Ti.UI.Scrollableview} scrollable view
 */
exports.setScrollableView = function(_sv){
    $.scrollableView = _sv;
    postLayout(init);
};

/**
 * removes orientationchange Listener
 */
exports.destroy = function(){
    Ti.Gesture.removeEventListener('orientationchange', onOrientationChange);
    args.tabs && $.tabsCtrl.off();
};
