// ===============================
// ===============================

var scrollTop = 0;

var $topbar = $('.top-bar_fixed'),
    $hero = $('.hero'),
    $iframe = $('.video-modal__inner iframe'),
    hiddenCount = 0, fadeInOffset = 100,
    loaded = false, mobileNavToggled = false,
    images = null;

// ===============================
// ===============================

function initScroller() {
    $('.team__wrap .scroll-forward').click(function() {
        var $thisScroller = $(this).parents('.team__wrap');
        var destination   = $thisScroller.scrollLeft() + 241;

        $thisScroller.animate({scrollLeft: destination}, 200, 'linear');
    });

    $('.team__wrap .scroll-back').click(function() {
        var $thisScroller = $(this).parents('.team__wrap');
        var destination   = $thisScroller.scrollLeft() - 241;

        $thisScroller.animate({scrollLeft: destination}, 200, 'linear');
    });

    if (window.innerWidth < 768) {
        $('.team__wrap__inner').each(function(i, el) {
            var newWidth = 241 * $(el).find('.team__item').length + 293;
            $(el).css('width', newWidth);
        });

        $('.team__wrap').perfectScrollbar();

        $('.team__wrap').scroll(function() {
            $(this).find('.btns-wrap').css('transform', 'translateX('+$(this).scrollLeft()+'px)');
        });
    }

}

function resizeScroller() {
    $('.team__wrap').perfectScrollbar('destroy');
    $('.team__wrap__inner').css('width', '');

    $('.team__wrap').off('scroll');

    if (window.innerWidth > 1024) $('.team__wrap').scrollLeft(0);

    initScroller();
}

function setScrollHandlers() {

    $(window).scroll(function() {
        scrollTop = $(this).scrollTop();
        hiddenCount = $('.hidden').length;

        if (!mobileNavToggled || window.innerWidth > 1023) {
            if (scrollTop > $hero.height() - 30) $topbar.addClass('visible');
            else $topbar.removeClass('visible');
        }
    });

}

function setModalsStuff() {

    $('.team__item .img-wrap').click(function(e) {
        var target = '.person-modal[data-id="'+$(this).parents().data('id')+'"]';

        $(target).fadeIn(200, 'linear', function() {
            $('body').css('overflow', 'hidden');
        });
    });

    $('.team__item .links a, .person-modal__inner, .video-modal__inner').click(function(e) {
        e.stopPropagation();
    });

    $('.close-modal, .modal-window').click(function(e) {
        $('body').css('overflow', '');
        $('.modal-window').fadeOut(200, 'linear', function() {
            $iframe.attr('src', '');
        });
    });

    $('.toggle-video, .thumbs .video-slide').click(function() {
        var id = $(this).data('video');
        var link = "https://player.vimeo.com/video/"+id;

        $iframe.attr('src', link);
        $iframe.parents('.modal-window').fadeIn(200, 'linear', function() {
            $('body').css('overflow', 'hidden');
        });
    });

}

function getNumberString(num) {
    return (num < 10) ? '0'+num : num;
}

function getTime(string) {
     var final = new Date(string);
     var now = new Date();
     var timer = final - now;

     if (final > now) {
         var day = parseInt(timer/(60*60*1000*24));
         var hour = parseInt(timer/(60*60*1000))%24;
         var min = parseInt(timer/(1000*60))%60;
         var sec = parseInt(timer/1000)%60;

         $('.days-count').text(getNumberString(day));
         $('.hours-count').text(getNumberString(hour));
         $('.minutes-count').text(getNumberString(min));
         $('.seconds-count').text(getNumberString(sec));
     } else {
         $('.days-count').text(00);
         $('.hours-count').text(00);
         $('.minutes-count').text(00);
         $('.seconds-count').text(00);
     }
}

function setNavbarStuff() {
    $('nav a, .top-bar__logo, .subscribe-link').click(function(e) {

		if ($(this).attr('target')=='') {

			e.preventDefault();

			var target = $($(this).attr('href')).offset().top;

			$('html, body').animate({
				scrollTop: target
			}, 200, 'linear');

			$('.top-bar_fixed').removeClass('toggled');
			mobileNavToggled = false;
			$('.mobile-mask').stop().fadeOut(200, 'linear');

		}

    });

    $('.mobile-nav-toggle').click(function() {
        $('.top-bar_fixed').toggleClass('toggled');
        if (scrollTop < window.innerHeight) $('.top-bar_fixed').toggleClass('visible');
        $('.mobile-mask').stop().fadeToggle(200, 'linear');
        mobileNavToggled = !mobileNavToggled;
    });

    $('.details__item').click(function() {
        $(this).toggleClass('opened');
    });
}

// ===============================
// ===============================
/**/

oCL=0;
//console.log('[runs]');

/*
$(document).ready(function() {
    onDocumentready();
});

function onDocumentready() {
    $(window).load(function() {
        console.log('[onContentLoad]');
		onContentLoad();
    });
}
*/
setTimeout(function() {
	onContentLoad();
	//console.log('1sec');
}, 500);

$(window).resize(function() {
    resizeScroller();
});

function onContentLoad() {
    //console.log('[onContentLoad-run('+oCL+')]');
	if (oCL==1) return true;
	
	oCL=1;
	$('html, body').animate({
        scrollTop: 0
    }, 10);

    var instance = $("img.lazy").Lazy({
        chainable: false
    });

    $('div[data-style]').each(function(i, el) {
        $(el).attr('style', $(el).data('style'));
    });

    setTimeout(function() {
        $('.preloader').fadeOut(200, 'linear', function() {
            showContent();
			getHash();
        });
    }, 500);
}

function showContent() {
    $('.main-container').addClass('loaded');

    initScroller();
    setScrollHandlers();
    setModalsStuff();
    setNavbarStuff();

    setInterval(function() {
        getTime('2017/11/17 22:59 UTC');
    }, 1000);

    $('.quotes__slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
        arrows: true,
        infinite: true
    });
}

// ===============================
// ===============================

$('form').submit(function(e) {
    var regexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    $(this).find('.input-wrap').removeClass('error');

    var value = $(this).find('input').val();

    if (!regexp.test(value)) {
        $(this).find('.input-wrap').addClass('error');
        return false;
    }
})
