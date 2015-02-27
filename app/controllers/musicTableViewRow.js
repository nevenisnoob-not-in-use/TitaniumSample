//performance test: ListView vs. TableView.setData vs. TableView.appendRow
//TableView.appendRow
var args = arguments[0] || {};

var sound;


var tableView = Ti.UI.createTableView();

var musicCollection = Alloy.Collections.instance("music_table");
musicCollection.fetch();
musicCollection.map(function(music){
	Ti.API.info(music.get('music_ID'));
	Ti.API.info(music.get('music_name'));
	Ti.API.info(music.get('tag_ID'));
	var row = Ti.UI.createTableViewRow({
		title: music.get('music_name')
	});
	tableView.appendRow(row);
});

var rowFake = Ti.UI.createTableViewRow({
	title: "test_fake_data"
});


for (var i = 0; i < 1000; i++) {
	tableView.appendRow(rowFake);
}

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

$.musicTableViewRow.add(tableView);