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
		
//		$.index.close(animationOut);
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

function onScrollviewTab(e) {
	var scrollviewTab = Alloy.createController("scrollTab").getView();
	scrollviewTab.open();
}


function onInAppNotification(e) {
	var notifier = Alloy.createWidget('com.caffeinalab.titanium.notifications', {
		message: 'Notification Test', // the message to display.

	    duration: 10000, // time after go away. Valid for iOS7+ and Android
	    icon: '/appicon.png', // icon to display on the left
	
	    elasticity: 0.5, // iOS7+ only
	    pushForce: 30, // iOS7+ only
	    usePhysicsEngine: true, // disable if you don't want on iOS7+
	
	    animationDuration: 200, // animation sliding duration
	    click: function(){
	    	alert("In-app Notification is clicked");
	    }
	});
	notifier.show("hello, world!", {
		view: $.index.app_logo
	});
}

function onPhotoGridWidget(e) {
	var image_data = [];

	var galleryCollection = Alloy.Collections.instance("gallery_table");
	galleryCollection.fetch();
	galleryCollection.map(function(image){
		Ti.API.info(image.get('image_ID'));
		Ti.API.info(image.get('image_name'));
		Ti.API.info(image.get('tag_ID'));
		image_data.push({
			properties: {
				image: Ti.Filesystem.applicationDataDirectory + "/" + image.get('image_name'),
				title: image.get('image_ID')
			}
		});
	});
	var photoGrid = Alloy.createWidget("de.manumaticx.photogrid");
	var gridWindow = photoGrid.createWindow({
	//var gridWindow = photoGrid.createView({
		data: image_data 
	});
	
	gridWindow.open();
}

function onPlaylist(e) {
	var playlist = require("com.alcoapps.androidplaylists");
	var playlists = playlist.getPlaylists();
	Ti.API.info(playlists);
//	var songs = playlist.getSongs();
//	Ti.API.info(songs);
}

function onCalendar(e) {
	if (OS_ANDROID) {
		var sq = require('ti.sq');
		Ti.API.info("module is => " + sq);
		
		// open a single window
		var win = Ti.UI.createWindow({
			backgroundColor:'#fff'
		});
		
		var calendarView = sq.createView({
			height:Ti.UI.FILL,
			top:0, bottom:'40dp',
			pagingEnabled:true,
			value:{
				month:4,day:1,year:2015
			},		
			min:{
				month:6,day:10,year:1988
			},
			max:{
				month:6,day:10,year:2018
			}
		});
		win.add(calendarView);
		
		calendarView.addEventListener('dateChanged',function(d){
			Ti.API.info(JSON.stringify(d));
			Ti.API.info(JSON.stringify(d.dateValue));
			Ti.API.info(JSON.stringify(d.value));
			Ti.API.info(JSON.stringify(calendarView.value));	
		});
		
		var button = Ti.UI.createButton({
			title:'Click to get selected value',
			height:'40dp', width:Ti.UI.FILL, bottom:0
		});		
		win.add(button);
		
		button.addEventListener('click',function(d){
			Ti.API.info(JSON.stringify(calendarView.value));
			alert(String.formatDate(calendarView.value,"long"));
		});
			
		win.open();
			} else if (OS_IOS) {
		var sq = require('ti.sq');
		Ti.API.info("module is => " + sq);
		
		// open a single window
		var win = Ti.UI.createWindow({
			backgroundColor:'#fff'
		});
		
		var calendarView = sq.createView({
			height:Ti.UI.FILL,
			width:Ti.UI.FILL,
			value:{
				month:4,day:1,year:2015
			},		
			min:{
				month:6,day:10,year:2010
			},
			max:{
				month:6,day:10,year:2018
			}
		});
		win.add(calendarView);		
		calendarView.addEventListener('dateChanged',function(d){
			Ti.API.info(JSON.stringify(d.dateValue));
			Ti.API.info(JSON.stringify(d.value));
			Ti.API.info(JSON.stringify(calendarView.value));
		});
			
		win.open();
	}
}

function onNappDrawer(e) {
	var leftMenuView = Ti.UI.createView({
		backgroundColor:'white',
		width: Ti.UI.FILL,
		height: Ti.UI.FILL
	});
	
	var centerView = Ti.UI.createView({
		backgroundColor:'white',
		width: Ti.UI.FILL,
		height: Ti.UI.FILL
	});
	
	var rightMenuView = Ti.UI.createView({
		backgroundColor:'#ddd',
		width: Ti.UI.FILL,
		height: Ti.UI.FILL
	});
	
	
	// create a menu
	var leftTableView = Ti.UI.createTableView({
		font:{fontSize:12},
		rowHeight:40,
		data:[
			{title:'Toggle Left View'},
			{title:'Change Center Windowr'}, 
			{title:'Default Window'} 
		]
	});
	leftMenuView.add(leftTableView);
	leftTableView.addEventListener("click", function(e){
		Ti.API.info("isAnyWindowOpen: " + drawer.isAnyWindowOpen());
		switch(e.index){
			case 0:
				drawer.toggleLeftWindow(); //animate back to center
				alert("You clicked " + e.rowData.title + ". Implement menu structure.. ");
				break;
			case 1:
				drawer.setCenterWindow(Ti.UI.createView({backgroundColor:"red"}));
				drawer.toggleLeftWindow(); //animate back to center
				break;
			case 2:
				drawer.setCenterWindow(centerView);
				drawer.toggleLeftWindow(); //animate back to center
				break;
		}
	});
	
	
	// Action Bar - FAKE example
	var actionBar = Ti.UI.createView({
		top:0,
		height:"44dp",
		backgroundColor:"#333"
	});
	var leftToolbarBtn = Ti.UI.createButton({
		title:"Left",
		left: "6dp",
		backgroundColor:"transparent",
		color: "#FFF"
	});
	leftToolbarBtn.addEventListener("click", function(){
		drawer.toggleLeftWindow();
	});
	var rightToolbarBtn = Ti.UI.createButton({
		title:"Right",
		right: "6dp",
		backgroundColor:"transparent",
		color: "#FFF"
	});
	rightToolbarBtn.addEventListener("click", function(){
		drawer.toggleRightWindow();
	});
	var centerLabel = Ti.UI.createLabel({
		text:"NappDrawer",
		font:{
			fontSize:"14dp",
			fontWeight:"bold"
		},
		color: "#FFF"
	});
	actionBar.add(leftToolbarBtn);
	actionBar.add(rightToolbarBtn);
	actionBar.add(centerLabel);
	centerView.add(actionBar);
	
	
	
	// create interface
	var scrollView = Ti.UI.createScrollView({
		layout:"vertical",
		left:0,right:0,top:"44dp",
	    contentHeight:'auto',
	    contentWidth:"100%",
	    showVerticalScrollIndicator: true,
	    showHorizontalScrollIndicator: false
	});
	
	
	
	
	var slider = Ti.UI.createSlider({
		top: "20dp", width: "280dp",
	    min: 0, max: 1,
	    value: 0.2
	});
	var label = Ti.UI.createLabel({
	    text: "Parallax: " + slider.value,
	    color:"#000",
	    top: "15dp"
	});
	slider.addEventListener('touchend', function(e) {
		label.setText("Parallax: " + e.source.value);
	    drawer.setParallaxAmount(e.source.value);
	});
	scrollView.add(label);
	scrollView.add(slider);	
	
	var gestureModeBtn = Ti.UI.createButton({title:"Gesture Mode: ALL", toggled:true, top:10});
	gestureModeBtn.addEventListener("click", function(e){
		if(!e.source.toggled){
			var mode = "ALL";
			drawer.setOpenDrawerGestureMode(NappDrawerModule.OPEN_MODE_ALL);
		} else {
			var mode = "NONE";
			drawer.setOpenDrawerGestureMode(NappDrawerModule.OPEN_MODE_NONE);
		}
		gestureModeBtn.setTitle("Gesture Mode: " + mode);
		e.source.toggled = !e.source.toggled;
		
	});
	scrollView.add(gestureModeBtn);
	
	
	function updateSlider(value){
		slider.value=value;
		slider.fireEvent("touchend", {source:{value:value}});
	}
	
	// animation mode
	var animationMode = 0;
	var animationModeBtn = Ti.UI.createButton({
		title:"Animation Mode: NONE", 
		top:10
	});
	var aniModeText;
	animationModeBtn.addEventListener("click", function(e){
		if(animationMode == 3){
			animationMode = 0;
		} else {
			animationMode++;
		}
		switch(animationMode){
			case 0:
				drawer.setAnimationMode(NappDrawerModule.ANIMATION_NONE);
				updateSlider(0.2);
				aniModeText = "NONE";
				break;
			case 1:
				drawer.setAnimationMode(NappDrawerModule.ANIMATION_SLIDEUP);
				updateSlider(0);
				aniModeText = "SLIDEUP";
				break;
			case 2:
				drawer.setAnimationMode(NappDrawerModule.ANIMATION_ZOOM);
				updateSlider(0);
				aniModeText = "ZOOM";
				break;
			case 3:
				drawer.setAnimationMode(NappDrawerModule.ANIMATION_SCALE);
				updateSlider(0);
				aniModeText = "SCALE";
				break;
		}
		animationModeBtn.setTitle("Animation Mode: " + aniModeText);
	});
	scrollView.add(animationModeBtn);
	
	centerView.add(scrollView);
	
	
	// CREATE THE MODULE
	var NappDrawerModule = require('dk.napp.drawer');
	var drawer = NappDrawerModule.createDrawer({
		fullscreen:false, 
		leftWindow: leftMenuView,
		centerWindow: centerView,
		rightWindow: rightMenuView,
		fading: 0.2, // 0-1
		parallaxAmount: 0.2, //0-1
		shadowWidth:"40dp", 
		leftDrawerWidth: "200dp",
		rightDrawerWidth: "200dp",
		animationMode: NappDrawerModule.ANIMATION_NONE,
		closeDrawerGestureMode: NappDrawerModule.CLOSE_MODE_MARGIN,
		openDrawerGestureMode: NappDrawerModule.OPEN_MODE_ALL,
		orientationModes: [Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT]
	});
	
	
	drawer.addEventListener("didChangeOffset", function(e){
		//Ti.API.info("didChangeOffset: " + e.offset);
	});
	
	drawer.addEventListener("windowDidOpen", function(e){
		if(e.window == NappDrawerModule.LEFT_WINDOW) {
			Ti.API.info("windowDidOpen - LEFT DRAWER");
		} else if (e.window == NappDrawerModule.RIGHT_WINDOW) {
			Ti.API.info("windowDidOpen - RIGHT DRAWER");
		}
	});
	drawer.addEventListener("windowDidClose", function(e){
		Ti.API.info("windowDidClose");
	});
	
	
	// Action Bar - REAL example
	drawer.addEventListener('open', onNavDrawerWinOpen);
	function onNavDrawerWinOpen(evt) {
	    this.removeEventListener('open', onNavDrawerWinOpen);
	
	    if(this.getActivity()) {
	        // need to explicitly use getXYZ methods
	        var actionBar = this.getActivity().getActionBar();
	
	        if (actionBar) {
	            // Now we can do stuff to the actionbar  
	            actionBar.setTitle('NappDrawer Example');
	            
	            // show an angle bracket next to the home icon,
	            // indicating to users that the home icon is tappable
	            actionBar.setDisplayHomeAsUp(true);
	
	            // toggle the left window when the home icon is selected
	            actionBar.setOnHomeIconItemSelected(function() {
	                drawer.toggleLeftWindow();
	           });
	        }
	    }    
	}
	
	
	// lets open it
	drawer.open();
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
// })
// $.index.add(view);
//error code, said the hide() function 
if (OS_ANDROID) {
//	$.index.activity.actionBar.hide();
}

$.index.open();
