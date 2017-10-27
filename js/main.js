$(document).ready(function() {
  
  //video slider
    $(".video_slider-thumbs").slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: ".video_slider-choise",
        dots: false,
        arrows: true,
        focusOnSelect: true,
        infinite: false,
        responsive: 
        [
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 2
            }
          }
        ]
    });
    $(".video_slider-choise").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        asNavFor: ".video_slider-thumbs",
        infinite: false
    });

    
  //video popup
    $('.popup-vimeo').magnificPopup({
      disableOn: 700,
      type: 'iframe',
      mainClass: 'mfp-fade',
      removalDelay: 160,
      preloader: false,
      fixedContentPos: false
    });

  //press list slider
    $('.press__list').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        dots: false,
        arrows: true,
        autoplay: false,
        adaptiveHeight: true,
        speed: 2000,
        responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1
          }
        }
      ]
    });

});    