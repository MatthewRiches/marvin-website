/* global variables */
var timeout, slideshow = null;
/* when document is ready */
$(document).ready(function(e) {
	/* toggles the navigation and sets data that the user did this */
	$('button').click(function(e) {
		$(this).toggleClass('close');
		$('#nav').toggleClass('active').data('user', '');
	});
	/* for all links that begin with a hash, animate to that hash */
	$('a[href^="#"]:not(.page)').click(function(e) {
			var hash = $(this).attr('href');
			$('html, body').animate({
				scrollTop: $(hash).offset().top-$('#nav').height()
				}, 500, function(e) {
					window.location.hash = hash.substr(1);
				});
			e.preventDefault();
			return false;
	});
	/* generic pager control for section that have multiple items, like testimonials */
	$('.pager a').click(function(e){
		var index = $(this).index();
		$(this).parent().find('a').removeClass('active');
		$(this).addClass('active');
		$(this).parent().parent().find('.quote').addClass('hidden').eq(index).removeClass('hidden').fadeIn();
		e.preventDefault();
		return false;
	})
	/* run the slideshow function every 5 secons (the phone shows different screenshots) */
	slideshow = setInterval(function(){slide()}, 5000);
});
/* if the hash changes without a click animate to it */
$(window).on('hashchange', function() {
	$('html, body').animate({scrollTop: $(window.location.hash).offset().top-$('#nav').height()}, 500);
	e.preventDefault();
	return false;
});
/* when the windows is scrolled the navigation will show if the screen is above tablet size
and the user hasn't already opened the menu. */
$(window).scroll(function () { 
    if (!timeout && typeof $('#nav').data('user') == 'undefined' && $(window).width() > 1024) {
        timeout = setTimeout(function () {
            clearTimeout(timeout);
            timeout = null;
            if ($(window).scrollTop() >= $('#splash').offset().top && !$('#nav').hasClass('active')) {
				$('button').addClass('close');
				$('#nav').addClass('active');
            } else if($(window).scrollTop() <= 100) {
				$('button').removeClass('close');
				$('#nav').removeClass('active');
			}
        }, 1000);
    }
});
/* slideshow, fade out the last one and then insert is at the start. Items are positioned 
absolutely so the last child will be on top going backwards. */
var slide = function(){
	$('.slideshow img:last').fadeOut(1000, function(){$(this).insertBefore($('.slideshow img:first').show())});
}

