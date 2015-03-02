function onGalleryLoading(e) {
//    alert($.label.text);
	var logoAnimetion = require('alloy/animation');
	logoAnimetion.popIn($.app_logo);
	
	//close the index window after 0.5 sec in order to check the animation
	setTimeout(function(){
		//var args = arguments[0] || {};
		var galleryView = Alloy.createController("gallery").getView();
		galleryView.left = Ti.Platform.displayCaps.platformWidth;
		var animationIn = Ti.UI.createAnimation();
		animationIn.left = 0;
		animationIn.duration = 2000;
		//var animetion = require('alloy/animation');
		//animetion.crossFade($.index,galleryView,1000);
		//iOS
		//galleryView.open(modal : true);
		galleryView.open(animationIn);
		
		var animationOut = Ti.UI.createAnimation();
		animationOut.left = -Ti.Platform.displayCaps.platformWidth;
		animationOut.duration = 2000;
		
		$.index.close(animationOut);
	},500);
	
	//for download the music data, comment it after you got the music data
	//onDownloadMusic();
}

//2d matrix animation
function onLogo2Click(e) {
	var matrix2d = Ti.UI.create2DMatrix();
	matrix2d = matrix2d.rotate(90); // in degrees
	matrix2d = matrix2d.scale(3); // scale to 1.5 times original size
	matrix2d = matrix2d.translate(0,600);
	var a = Ti.UI.createAnimation({
		transform: matrix2d,
		duration: 500,
		autoreverse: true,
		repeat: 3
	});
	$.app_logo2.animate(a);
}

//3D matrix animation
function onLogo3Click(e) {
	if (OS_IOS) {
			var matrix3d = Ti.UI.create3DMatrix();
		matrix3d = matrix3d.rotate(180,1,1,0); // in degrees
		matrix3d = matrix3d.scale(2,2,2); // scale to 1.5 times original size
		var a = Ti.UI.createAnimation({
			transform: matrix3d,
			duration: 500,
			autoreverse: true,
			repeat: 3
		});
		$.app_logo3.animate(a);
	} else if (OS_ANDROID) {
		alert("matrix3D animation can't run on Android");
	}
}

//basic animation
function onLogo4Click(e) {
	var a = Ti.UI.createAnimation({
		opacity: 0.5,
		right: 100,
		duration: 500
	});
	$.app_logo4.animate(a);
}

//webview test
function onLogo5Click(e) {
	//listens for background worker thread events
	//multi-thread test
	Ti.App.addEventListener("WORKER",function(e){
	    // convert the event into a string (for simplicity)
	    var msg = JSON.stringify(e.data);
	    // update the view label
	    $.app_logo5.text = msg;
	    // and write to the log
	    Ti.API.info( "msg:"+msg );
	});
}

//facebook API test
function onFacebookClick(e) {
	var win = Ti.UI.createWindow({backgroundColor: 'white'});
	var fb = require('facebook');
	fb.appid = 389757191205267;
	fb.permissions = ['publish_stream'];
	fb.forceDialogAuth = true;
	fb.addEventListener('login', function(e) {
	    if (e.success) {
	        alert('Logged in');
			var data = {
			    link : "http://www.appcelerator.com",
			    name : "Appcelerator Titanium Mobile",
			    message : "Checkout this cool open source project for creating mobile apps",
			    caption : "Appcelerator Titanium Mobile",
			    picture : "http://developer.appcelerator.com/assets/img/DEV_titmobile_image.png",
			    description : "You've got the ideas, now you've got the power. Titanium translates " +
			                  "your hard won web skills into native applications..."
			};
			fb.dialog("feed", data, function(e) {
			    if(e.success && e.result) {
			        alert("Success! New Post ID: " + e.result);
			    } else {
			        if(e.error) {
			            alert(e.error);
			        } else {
			            alert("User canceled dialog.");
			        }
			    }
			});
	    }
	});
	fb.addEventListener('logout', function(e) {
	    alert('Logged out');
	});
	    
	// Add the button.  Note that it doesn't need a click event listener.
	win.add(fb.createLoginButton({
	    top : 50,
	    style : fb.BUTTON_STYLE_WIDE
	}));
	win.open();
}

//notification test
function onNotification(e){
	if (OS_ANDROID) {
		var notification = Ti.Android.createNotification({
			contentTitle: "Android notification",
			contentText: "notification form Titanium",
			//you need to know android intent category
			contentIntent: Ti.Android.createPendingIntent({intent: Ti.Android.createIntent({})}),
//			icon: Ti.App.Android.R.drawable.warn,
			number:2,
			when: new Date().getTime()
		});
		Ti.Android.NotificationManager.notify(8,notification);
//		notification.setLatestEventInfo("2nd title","2nd content",notification.contentIntent);
	} else if (OS_IOS) {
		var notification = Ti.App.iOS.scheduleLocalNotification({
			alertAction:"iOS notification",
			alertBody:"the first iOS notification",
			badge:1,
			date: new Date(new Date().getTime()+3000)
		});
		Ti.App.iOS.scheduleLocalNotification({
			date: new Date(new Date().getTime() + 6000),
			alertBody: "the second notification.",
			badge: 99,
			userInfo: {"url":"http://www.download.com/resource/asset.json"},
			category: "DOWNLOAD_CATEGORY"
		});
	}
}

//plugin test (something wrong with the drawer plugin)
function onDrawerClick(e){
	if (OS_ANDROID) {
		var drawerMenu = Alloy.createController("menu").getView();
		drawerMenu.open();
	}
}

//performance test: listView
function onListViewClick(e) {
	var musicListView = Alloy.createController("musicListView").getView();
	musicListView.open();	
} 

//performance test: tableView
function onTableViewClick(e) {
	var musicTableView = Alloy.createController("musicTableView").getView();
	musicTableView.open();
}

//performance test: TableView.appendRow
function onTableViewRowClick(e) {
	var musicTableRowView = Alloy.createController("musicTableViewRow").getView();
	musicTableRowView.open();
}

//embed JS lib test
function onWebViewWithJSlib(e) {
	var win = Ti.UI.createWindow();
	var webview = Ti.UI.createWebView({
		url: "/raphael-test.html"
	});
	win.add(webview);
	win.open();
}

//gesture test, shake the phone to enter the gallery.
Ti.Gesture.addEventListener("shake",function(e){
	Ti.API.info("shaked");
	var galleryView = Alloy.createController("gallery").getView();
	galleryView.open();
	$.index.close();
}); 

// //custom module
// var test = require("me.nevenisnoob.example");
// var view = test.createExample({
	// color: "blue",
	// height:50,
	// width:50
// });
// $.index.add(view);

$.index.open();
