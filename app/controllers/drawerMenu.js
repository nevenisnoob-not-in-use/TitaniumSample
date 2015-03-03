var args = arguments[0] || {};

var selected;

/**
 * TableView Click-listener Callback
 * @param {Object} event
 */
function onSelect(e) {
  if (e.row !== selected) {
    selectRow(e.row);
    _.defer(function() {
      Alloy.Globals.drawer.toggleLeftWindow();
    });
  }
}

/**
 * Select menu by row
 * @param {controllers.menuRow} Row
 */
function selectRow(_row) {
  if (selected) {
    selected.setActive(false);
  }

  selected = _row;
  selected.setActive(true);

  _.defer(function() {
    Alloy.Globals.open(Alloy.createController(_row.controller, {
      parent : args.parent
    }));
  });
}

/**
 * Select menu by index
 * @param {Number} Index
 */
exports.select = function(_index) {
  selectRow(_.first($.drawerMenu.getData()).getRows()[_index]);
};