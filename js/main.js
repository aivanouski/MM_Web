$(document).ready(function() {
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

  if (window.progressInfo) {
    var progress = window.progressInfo;
    var current = parseInt(progress.tokens).toLocaleString();
    $('.progress-current span:first-child').text(current);

    var btc = parseInt(progress.payments.BTC.amount).toLocaleString();
    var eth = parseInt(progress.payments.ETH.amount).toLocaleString();

    $('.founded-money-btc span').text(btc);
    $('.founded-money-eth span').text(eth);
  }

  window.sr = ScrollReveal({
    duration: 1500,
    opacity: 0,
    distance: '20px',
    scale: 1
  });

  sr.reveal('.reveal-first', { delay: 1000 }, 300);
  sr.reveal('.reveal-section');
  sr.reveal('.reveal-section p');

  $('.countdown').each(function() {
    var $el = $(this);
    var deadline = new Date(2017, 10, 17, 23, 59);

    update();

    setInterval(update, 1000);

    function update() {
      var frame = getTimeRemaining(deadline);

      ['days', 'hours', 'seconds', 'minutes'].forEach(function(key) {
        $el.find('[data-key="' + key + '"]').text(frame[key]);
      })
    }
  });

  /*
  var inview = new Waypoint.Inview({
    element: $('.hero_desc')[0],
    exited: function() {
      $('.countdown-panel').addClass('visible')
    },

    entered: function() {
      $('.countdown-panel').removeClass('visible')
    }
  });
  */

  function getTimeRemaining(endtime) {
    var t = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    var days = Math.floor(t / (1000 * 60 * 60 * 24));

    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  }
});
