var args = arguments[0] || {};

//$.singlePicIDTest.text = args.photoID;
if (OS_ANDROID) {
var screenWidth = Math.floor(Ti.Platform.displayCaps.platformWidth / (Ti.Platform.displayCaps.dpi / 160));	
var screenHeight = Math.floor(Ti.Platform.displayCaps.platformHeight / (Ti.Platform.displayCaps.dpi / 160));	

} else if (OS_IOS) {
	var screenWidth = Ti.Platform.displayCaps.platformWidth; 
	var screenHeight = Ti.Platform.displayCaps.platformHeight; 

}


var imagesCollection = Alloy.Collections.instance("gallery_table");
imagesCollection.fetch({
	//query: "select image_name from gallery_table where image_ID = " + args.photoID
	query: "select * from gallery_table"
});
//set the iamge label.
var picIndex = 0;
//show the image which be clicked.
var currentPicIndex = 0;
imagesCollection.map(function (image){
	if (OS_IOS) {
		var singlePicView = Ti.UI.createScrollView({
			contentHeight: "auto",
			contentWidth: "auto",
			width: Ti.UI.FILL,
			height: Ti.UI.FILL,
			minZoomScale: 0,
			maxZoomScale: 2
		});
	} else if (OS_ANDROID) {
		var singlePicView = Ti.UI.createView({
			width: Ti.UI.FILL,
			height: Ti.UI.FILL
		});
	}

	var singlePic = Ti.UI.createImageView({
		image: Ti.Filesystem.applicationDataDirectory + "/" + image.get('image_name'),
		//can't use Ti.UI.FILL/SIZE here, otherwise you'll get the wrong data
		height: screenHeight,
		width: screenWidth,
		//with canScale you could scroll your image after pinched out
		canScale: true,
//		enableZoomControls: true
	}); 
	//iamge pinch in/out on Android
	if (OS_ANDROID) {
		var baseHeight = singlePic.height;
		Ti.API.info("baseHeight" + baseHeight);
		var baseWidth = singlePic.width;
		singlePic.addEventListener("pinch", function(e){
//			var transformMatrix = Ti.UI.create2DMatrix().scale(e.scale);
//			e.source.transform = transformMatrix;
			singlePic.height = baseHeight * e.scale;
			singlePic.width = baseWidth * e.scale;
			Ti.API.info("pinched to " + e.scale*100 + "%");
		});
		//remember the height and the width when you touch the screen
		singlePic.addEventListener("touchstart",function(e){
			baseHeight = singlePic.height;
			baseWidth = singlePic.width;
		});
	}
	
	var singlePicName = Ti.UI.createLabel({
		bottom: 24,
		text: picIndex
	});
	singlePicView.add(singlePic);
	singlePicView.add(singlePicName);
	Ti.API.info("image_ID = " + image.get("image_ID"));
	Ti.API.info("args.photoID = " + args.photoID);
	if (image.get("image_ID") == args.photoID){
		currentPicIndex = picIndex;
	}
	//begin the slideshow
	singlePic.addEventListener("longclick",function(){
		Ti.API.info("long click");
	});
	$.singlePicGroup.addView(singlePicView);
	picIndex++;
	Ti.API.info("the index is " + picIndex);
});
$.singlePicGroup.currentPage = currentPicIndex;

//close the window
// $.singlePic.addEventListener("click", function(){
	// Ti.API.info("image is clicked, close.");
	// $.singlePhoto.close();
// });

// $.singlePhoto.transform = Titanium.UI.create2DMatrix().scale(0);
// $.singlePhoto.open();
// 
// var a = Ti.UI.createAnimation({
    // transform : Ti.UI.create2DMatrix().scale(1.1),
    // duration : 2000,
// });
// a.addEventListener('complete', function(){
    // $.singlePhoto.animate({
        // transform: Ti.UI.create2DMatrix(),
        // duration: 200
    // });
// });
// 
// function animationRun() {
    // $.singlePhoto.animate(a);
// }