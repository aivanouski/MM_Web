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
/*
  progressInfo={
	  total:9267589.681978757,
	  bonus:10,
	  tokens:10921662.681979999,
	  erc20:"804.3909764527846",
	  participants:"660",
	  payments : {
		  BTC:{type: "BTC", amount: "283.5878617"},
		  ETH:{type: "ETH", amount: "11963.03284067698"},
		  USD:{type: "USD", amount: "3938702"},
		  LTC:{type: "LTC", amount: "216.19669814999997"}
	  }
  };
*/
  if (window.progressInfo) {
    var progress = window.progressInfo;
	//console.log(progress);
    var current = parseInt(progress.total).toLocaleString();
    var btc = parseInt(progress.payments.BTC.amount).toLocaleString();
    var eth = parseInt(progress.payments.ETH.amount).toLocaleString();
    var usd = parseInt(progress.payments.USD.amount).toLocaleString();
    var amm = (parseInt(progress.tokens) + parseInt(progress.bonus)).toLocaleString();

	var popl = (parseInt(progress.participants) + 868).toLocaleString();
	
	
    $('.js-progress-total').text(current);
    $('.js-progress-fiat').text(usd);
    $('.js-progress-btc').text(btc);
    $('.js-progress-eth').text(eth);
    $('.js-progress-amm').text(amm);
	$('.js-progress-popl').text(popl);

    if (progress.erc20) {
      var alt = parseInt(progress.erc20).toLocaleString();
      $('.founded-money-alt').show().find('span').text(alt);
    }
	
	resetPB();
	
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
    var deadline = new Date(2017, 10, 17, 23, 59);  // 17

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


function resetPB(){
	/*// прапорциональный прогресс бар
	dd=65;
	var ls=$('.js-progress-amm'); 
	if (ls.length>0) {
		var vals=$(ls[0]).html();
		var vali = parseInt(vals.replace(/&nbsp;/g, ""));
		//var vali = vals.split('&nbsp;').join('');
		//console.log('['+vali+'|'+vals+']');
	}

	var lw=$('.progress-bar-current'); 
	if (lw.length>0) {
		// 16%- 1000 71% 15000
		var np=[[0.16,1000000],[0.80,15000000]];
		var dd2=parseInt(np[1][0]*vali/(np[1][1]/100))+3;
		if (dd2>40) dd=dd2;
		//console.log(dd+'|'+np[1][0]+'|'+vali+'|'+np[1][1]+'|');
		//lw[0].style.width=dd+"%";
		$(lw[0]).width(dd+"%");
	}*/	
}
