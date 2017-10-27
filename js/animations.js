function setScrollHandlers() {
    
    $(window).scroll(function() {
        scrollTop = $(this).scrollTop();
        hiddenCount = $('.hidden').length;
        
        if (!mobileNavToggled || window.innerWidth > 1023) {
            if (scrollTop > $videoSection.height() - 30) $topbar.addClass('visible');
            else $topbar.removeClass('visible');    
        }
        
        if (scrollTop > $videoSection.height()) $video.pause();
        else $video.play();
        
        if (hiddenCount > 0 && loaded) {
            $('.hidden').each(function(i, el) {
                fadeInOffset = ($(el).data('offset')) ? $(el).data('offset') : 200;
                
                if (scrollTop > $(el).offset().top - window.innerHeight + fadeInOffset) {
                    
                    images = $(el).find('img.lazy');
                    
                    if (images.length > 0) {
                        images.each(function(j, img) {
                            $(img).attr('src', $(img).data('src'));    
                        
                            if (j == images.length - 1) $(el).removeClass('hidden');
                        });    
                    } else $(el).removeClass('hidden');
                    
                }
            });
        }
    });
    
}

function setAnimationsStuff() {
    if (window.innerWidth > 1023) {
        $('section:not(.roadmap):not(.details):not(.structure):not(.team):not(.escrow)').addClass('hidden');
        $('.roadmap h3, .timeline, .tree, .tree__items .item, .tree__footer').addClass('hidden');
        $('.details h3, .timeline, .details__item').addClass('hidden');
        $('.structure h3, .structure .graphics, .structure .bounties').addClass('hidden');
        $('.team h3, .escrow h3, .team__item').addClass('hidden');
    }
    
    setTimeout(function() {
        $('section:first').removeClass('hidden');
        loaded = true;
    }, 2400);
    
    $('.socials').hover(function() {
        $(this).parents('section').addClass('animated');
    }, function() {});
}