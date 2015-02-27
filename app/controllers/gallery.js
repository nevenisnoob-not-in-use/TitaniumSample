var args = arguments[0] || {};

//get the screen width in px
if (OS_ANDROID) {
var screenWidth = Math.floor(Ti.Platform.displayCaps.platformWidth / (Ti.Platform.displayCaps.dpi / 160));	
} else if (OS_IOS) {
	var screenWidth = Ti.Platform.displayCaps.platformWidth; 
}



//the column of gallery
var COLUMN = 2;
//the space between two images, keep the SPACE is the multiple of COLUMN
var SPACE = 4;
Ti.API.info(screenWidth);
Ti.API.info(Ti.Platform.displayCaps.dpi);
//Ti.API.info(imgWidth);
//show 2 pic in a row, 4px between two image;
var imgWidth = Math.floor((screenWidth - SPACE*(COLUMN + 1)) / COLUMN);
//alert(imgWidth);
var imgNo = 0;

var imagesCollection = Alloy.Collections.instance("gallery_table");
imagesCollection.fetch();
imagesCollection.map(function(image){
	Ti.API.info(image.get('image_ID'));
	Ti.API.info(image.get('image_name'));
	Ti.API.info(image.get('tag_ID'));
	var imageToDisplay = Ti.UI.createImageView({
	image: Ti.Filesystem.applicationDataDirectory + "/" + image.get('image_name'),
	width: imgWidth,
	height: imgWidth,
	left: SPACE + SPACE * Math.floor((imgNo  % COLUMN)) + Math.floor((imgNo % COLUMN)) * (imgWidth),
	top:  SPACE +　SPACE * Math.floor(imgNo / COLUMN) + Math.floor((imgNo / COLUMN)) * (imgWidth)
	});
	imageToDisplay.addEventListener("click", function(e) {
//		alert(image.get("image_ID")+" "+image.get("image_name")); 
		singlePhotoController = Alloy.createController("singlePhoto",{
			photoID : image.get('image_ID')
		}).getView();
		singlePhotoController.open();
	});
	//get the view by id $.galleryView
	$.galleryView.add(imageToDisplay);
	imgNo++;
});

function onCallCamera(e) {

	Ti.Media.showCamera({
        success:function(event){
            if(event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO){
            	/* add the pic to an imageView
                var imageView = Ti.UI.createImageView({
                    width:$.camera.width,
                    height:$.camera.height,
                    image:event.media
                });
                $.camera.add(imageView);
                */
                //passing data between windows.
                //resize the image
               var photoImage = event.media.imageAsResized(400,300);
               var photoWithTag = Alloy.createController("photoWithTag",
               		{photo: photoImage}).getView();
//               $.gallery.close();
               photoWithTag.open();
//               photoWithTag.photoView.image = event.media;
//               $.photoView.image = event.media;
            }
        },
        cancel:function(){
        },
        error:function(error){
            //error.code Ti.Media.NO_CAMERA
        },
        saveToPhotoGallery:false,
        allowEditing:false,
        autorotate: false,
        mediaTypes:[Ti.Media.MEDIA_TYPE_PHOTO],
    });
 }
 
function onOpenMusicLib(e) {
	if (OS_ANDROID) {
		var musicList = Alloy.createController("musicList").getView();
		musicList.open();		
	} else if(OS_IOS) {
		var settings = {
			success: function(picked) {
				//do something
			},
			
			error: function(error) {
				if (error.code == Titanium.Media.NO_MUSIC_PLAYER) {
					// no music player available
				} else {
					// other error, see error.code
				}
			},
			mediaTypes:[Ti.Media.MUSIC_MEDIA_TYPE_ALL],
			autohide:true
		};
		Ti.Media.openMusicLibrary(settings);
	}

}
