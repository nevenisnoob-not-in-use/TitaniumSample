function tabHandler(e) {
  console.log('selected tab ', e.tab);
}

var drawerAbout = Alloy.createController("drawerAbout").getView();
var musicList = Alloy.createController("musicListView").getView();
var musicTable = Alloy.createController("musicTableView").getView();

$.scrollableView.addView(drawerAbout);
$.scrollableView.addView(musicList);
$.scrollableView.addView(musicTable);

$.paging.setScrollableView($.scrollableView);

