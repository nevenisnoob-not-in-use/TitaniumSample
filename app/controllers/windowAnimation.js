var args = arguments[0] || {};

$.windowAnimation.transform = Titanium.UI.create2DMatrix().scale(0);
$.windowAnimation.open();

var a = Ti.UI.createAnimation({
    transform : Ti.UI.create2DMatrix().scale(1.1),
    duration : 2000,
});
a.addEventListener('complete', function(){
    $.windowAnimation.animate({
        transform: Ti.UI.create2DMatrix(),
        duration: 200
    });
});

function animateOpen() {
    $.windowAnimation.animate(a);
}