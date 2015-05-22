/* global */
var timeout, slideshow = null;
$(document).ready(function(e) {
	$('button').click(function(e) {
		$(this).toggleClass('close');
		$('#nav').toggleClass('active').data('user', '');
	});
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
	$('.pager a').click(function(e){
		var index = $(this).index();
		$(this).parent().find('a').removeClass('active');
		$(this).addClass('active');
		$(this).parent().parent().find('.quote').addClass('hidden').eq(index).removeClass('hidden').fadeIn();
		e.preventDefault();
		return false;
	})
	slideshow = setInterval(function(){slide()}, 5000);
});
$(window).on('hashchange', function() {
	$('html, body').animate({scrollTop: $(window.location.hash).offset().top-$('#nav').height()}, 500);
	e.preventDefault();
	return false;
});
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
var slide = function(){
	$('.slideshow img:last').fadeOut(1000, function(){$(this).insertBefore($('.slideshow img:first').show())});
}

