var mobileNavToggled = false;

$(document).ready(function() {
    $('.faq__nav a').click(function(e) {
        e.preventDefault();
        
        var target = $(this).attr('href');
        
        $('html, body').animate({
            scrollTop: $(target).offset().top-100
        }, 200, 'linear');
    });
    
    $('.faq__nav').perfectScrollbar();
    
    $('.mobile-nav-toggle').click(function() {
        $('.top-bar_fixed').toggleClass('toggled');
        $('.mobile-mask').stop().fadeToggle(200, 'linear');
    });
    
    $('.faq__item h5').click(function() {
        $(this).parents('.faq__item').toggleClass('opened');
    })
});