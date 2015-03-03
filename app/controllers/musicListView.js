//performance test: ListView vs. TableView.setData vs. TableView.appendRow
//listview
var args = arguments[0] || {};
var sound;
var listView = Ti.UI.createListView();

var data = [];

var musicCollection = Alloy.Collections.instance("music_table");
musicCollection.fetch();
musicCollection.map(function(music){
	Ti.API.info(music.get('music_ID'));
	Ti.API.info(music.get('music_name'));
	Ti.API.info(music.get('tag_ID'));
	data.push({
		properties: {
			title: music.get('music_name')
		}
	});
});

for (var i = 0; i < 1000; i++) {
	data.push({
		properties: {
			title: "test_fake_data"
		}
	});
}

var section = Ti.UI.createListSection({items: data});
listView.sections = [section];
listView.addEventListener("itemclick",function(e){
	var item = e.section.getItemAt(e.itemIndex);
	alert(item.properties.title);
	if (sound == null) {
		sound = Ti.Media.createSound({
		url: Titanium.Filesystem.applicationDataDirectory + "/" + item.properties.title,
		preload: true
		});
		sound.play();				
	} else if (sound.isPlaying()) {
		sound.stop();
	} else {
		sound.play();
	}
});

$.musicListView.add(listView);

function destroy() {
  $.off();
}

function onCreateOptionsMenu(e) {
  if (e.actionBar) {
    e.actionBar.title = "MusicListView";
  }
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
