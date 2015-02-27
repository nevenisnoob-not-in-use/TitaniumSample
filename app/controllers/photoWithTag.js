var args = arguments[0] || {};

$.photoView.image = args.photo;

//button for saving the pic
function onOk(e) {
	
    var fileNameString = new Date().getTime();
    //Ti.API.info(fileNameString);
    //alert(fileNameString);
    //file name could not have space!!!
    var fileToSave = Ti.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory + "/" + fileNameString + '.jpg');
    //var fileToSave = Ti.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory + "/" + 'image.jpg');
    saveFileNameToDB(fileNameString+'.jpg');
    //saveFileNameToDB("image.jpg");
    fileToSave.write($.photoView.image);	
    
	
	var galleryView = Alloy.createController("gallery").getView();
	galleryView.open();
	$.photoWithTag.close();
}

//button for canceling the pic save 
function onCancel(e) {
//	$.photoWithTag.close();
		Ti.Media.showCamera({
        success:function(event){
 
            if(event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO){
            	/*
                var imageView = Ti.UI.createImageView({
                    width:$.camera.width,
                    height:$.camera.height,
                    image:event.media
                });
                $.camera.add(imageView);
                */
               $.photoView.image = event.media;
            }
        },
        cancel:function(){
        	var galleryView = Alloy.createController("gallery").getView();
			galleryView.open();
			$.photoWithTag.close();
        },
        error:function(error){

        },
        saveToPhotoGallery:false,
 
        allowEditing:false,

        mediaTypes:[Ti.Media.MEDIA_TYPE_PHOTO],
    });
}
//tagsName is an array
//saveFileNameToDB(imageName, tagsName)
function saveFileNameToDB(imageName) {
//	alert(imageName);
	var image = Alloy.createModel('gallery_table', {
		//upcase, lowcase
		image_name: imageName,
		//this is a dummy tag ID
		tag_ID: '1'
	});
	image.save();
}
