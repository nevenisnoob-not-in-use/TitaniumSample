//performance test: ListView vs. TableView.setData vs. TableView.appendRow
//tableView.setData
var args = arguments[0] || {};

var sound;


var tableData = [];

var musicCollection = Alloy.Collections.instance("music_table");
musicCollection.fetch();
musicCollection.map(function(music){
	Ti.API.info(music.get('music_ID'));
	Ti.API.info(music.get('music_name'));
	Ti.API.info(music.get('tag_ID'));
	tableData.push({
		title: music.get('music_name')
	});
});

for (var i = 0; i < 1000; i++) {
	tableData.push({
		title: "test_fake_data"
	});
}

var tableView = Ti.UI.createTableView({
	data: tableData
});

tableView.data = tableData;

tableView.addEventListener("click",function(e){
	alert(e.rowData.title);
	if (sound == null) {
		sound = Ti.Media.createSound({
		url: Titanium.Filesystem.applicationDataDirectory + "/" + e.rowData.title,
		preload: true
		});
		sound.play();				
	} else if (sound.isPlaying()) {
		sound.stop();
	} else {
		sound.play();
	}
});

$.musicTableView.add(tableView);