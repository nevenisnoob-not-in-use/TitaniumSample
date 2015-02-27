var args = arguments[0] || {};

var TiDrawerLayout = require('com.tripvi.drawerlayout');
var contentView = Ti.UI.createView();

var leftView = Ti.UI.createTableView({ backgroundColor: '#ccc' });
		
var drawer = TiDrawerLayout.createDrawer({
	contentView: contentView,
    leftView: leftView
});