var args = arguments[0] || {};
var sound;

var musicCollection = Alloy.Collections.instance("music_table");
musicCollection.fetch();
musicCollection.map(function(music){
	Ti.API.info(music.get('music_ID'));
	Ti.API.info(music.get('music_name'));
	Ti.API.info(music.get('tag_ID'));
	var musicName = Ti.UI.createLabel({
		text: music.get('music_name'),
		height: 48,
		width: Ti.UI.FILL,
	});
	musicName.addEventListener("click", function(e) {
//		alert(music.get('music_name'));
		if (sound == null) {
			sound = Ti.Media.createSound({
			url: Titanium.Filesystem.applicationDataDirectory + "/" + music.get('music_name'),
			preload: true
			});
			sound.play();				
		} else if (sound.isPlaying()) {
			sound.stop();
		} else {
			sound.play();
		}
	});
	
	$.musicListScroll.add(musicName);
});

function onDownloadMusic() {
	var fileNameString = new Date().getTime();
	
	var xhr = Titanium.Network.createHTTPClient({
	onload: function() {
		// first, grab a "handle" to the file where you'll store the downloaded data
		var fileToSave = Ti.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory + "/" + fileNameString + '.mp3');
		if (fileToSave.exists()) {
			alert("the music has already been downloaded");
		} else {
			fileToSave.write(this.responseData); // write to the file
			saveFileNameToDB(fileNameString+'.mp3');
		}
	},
	timeout: 10000
	});
	xhr.open('GET','http://www.freesound.org/data/previews/2/2686_5150-lq.mp3');
	xhr.send();
	xhr.ondatastream = function(e) {
		Ti.API.info('ONDATASTREAM - PROGRESS: ' + e.progress);
	};
	
    
    //saveFileNameToDB('music1.mp3');

}

function saveFileNameToDB(musicName) {
//	alert(imageName);
	var music = Alloy.createModel('music_table', {
		//upcase, lowcase
		music_name: musicName,
		//this is a dummy tag ID
		tag_ID: '1'
	});
	music.save();
}