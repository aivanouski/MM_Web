// Перевод логика
var localizer_set = getCookie("localizer_set");

var lssr=location.search,lssm='elng=';
if (lssr.indexOf('elng=')!=-1) {
	elng = lssr.substr(lssr.indexOf(lssm)+lssm.length,2);
	if (typeof(locall[elng])!= "undefined") localizer_set=elng;
}

if (typeof(localizer_set)== "undefined") {
	// У нас нет языка по умолчанию
	var userLang = navigator.language || navigator.userLanguage;
	console.log('set lang to ['+userLang+']');
	if (typeof(locall[userLang])!= "undefined") {
		setCookie("localizer_set", userLang, {expires: 3600*24*30});
		chlang(userLang);
	}
} else {
	chlang(localizer_set);
}

// Попап логика
if (typeof(popd)!= "undefined") {

	var popc = getCookie("popc"); var popm={},popv=-1;

	if (typeof(popc)!= "undefined" && window.location.search.indexOf('showpop')==-1) popm=JSON.parse(popc); 	// Если у нас уже есть список закрытых попапов

	for (var key in popd) {		// Берем список активных и смотрим до тех пор пока не появится открытый - доступный для тек языка
		var popdl=popd[key]['l'];
		var pops=1;				// Show for all
		if (popdl.length>0) {
			pops=0;
			for (r=0; r<popdl.length; r++) if (popdl[r]==localizer_set) pops=1;
		}
		// Если текущий язык подходит для текущей темы
		// Проверяем была ли она блокирована ранее , если нет > ставим ее в шоу
		if (pops==1 && typeof(popm[key])== "undefined") popv=key;
	}

	if (popv!=-1) {
		popcl='en'; if (typeof(popd[popv]['t'][localizer_set])!= "undefined") popcl=localizer_set;
		$('#popt').html(popd[popv]['t'][popcl]);
		$('#pops').html(popd[popv]['s'][popcl]);
		$('#popb').html(popd[popv]['b'][popcl]);
		$("#popt").attr("popn",popv);
		if (typeof(popd[popv]['h'])!= "undefined") {
			document.getElementById("poph").style.height = popd[popv]['h'];  //  !important
			console.log('heigh change='+document.getElementById("poph").style.height);
		}
		setTimeout("$('.popup_win').fadeIn('slow')",6000);
	}

	$(".popup_win__close").on('click', function(e) {
		var popc = getCookie("popc"); var popm={};
		if (typeof(popc)!= "undefined") popm=JSON.parse(popc); 	// Если у нас уже есть список закрытых попапов
		var popn=$("#popt").attr("popn");
		popm[popn]=0;  var keystring=JSON.stringify(popm);
		setCookie("popc", keystring, {expires: 3600*24*30});
		$(".popup_win").hide();
	});

}


function chlang(lang){

	if (localizer_set != lang) setCookie("localizer_set", lang, {expires: 3600*24*30});

	var trlist=$('[localizerid]');
	trlist.each(function() {
		var lkey=$(this).attr('localizerid');
		if (typeof(locdata[lkey])!= "undefined") {
			if (typeof(locdata[lkey][lang])!= "undefined" && locdata[lkey][lang]!= "") {
				$(this).html(locdata[lkey][lang]);
			}
		}
	});

	$('[whitepaperlink]').attr('href',wplink[lang]);

	var dld={
		'zh':{
			'dla':'/img/bar/wee.png',
			'dlt':'加入WeChat',
			'dli':'img/socials/white/wechat.svg'
		},
		'ko':{
			'dla':'https://open.kakao.com/o/gmWcCnB',
			'dlt':'텔레그램 KakaoTalk',
			'dli':'img/socials/white/kakaotalk.png'
		},
		'ja':{
			'dla':'/img/bar/line_ja.png',
			'dlt':'Line に追加',
			'dli':'img/socials/color/line_logo.png'
		},
		'de':{
			'dla':'https://chat.whatsapp.com/DP5XsCwjd8H0OoY4b4EmD6',
			'dlt':'join zu whatsapp',
			'dli':'img/socials/white/whatsapp.svg'
		},
		'en':{
			'dla':'https://chat.whatsapp.com/DP5XsCwjd8H0OoY4b4EmD6',
			'dlt':'join whatsapp',
			'dli':'img/socials/white/whatsapp.svg'
		},
		'es':{
			'dla':'https://chat.whatsapp.com/DP5XsCwjd8H0OoY4b4EmD6',
			'dlt':'join whatsapp',
			'dli':'img/socials/white/whatsapp.svg'
		},
		'fr':{
			'dla':'https://chat.whatsapp.com/DP5XsCwjd8H0OoY4b4EmD6',
			'dlt':'join whatsapp',
			'dli':'img/socials/white/whatsapp.svg'
		},
		'it':{
			'dla':'https://chat.whatsapp.com/DP5XsCwjd8H0OoY4b4EmD6',
			'dlt':'join whatsapp',
			'dli':'img/socials/white/whatsapp.svg'
		},
		'pt':{
			'dla':'https://chat.whatsapp.com/DP5XsCwjd8H0OoY4b4EmD6',
			'dlt':'join whatsapp',
			'dli':'img/socials/white/whatsapp.svg'
		},
		'ru':{
			'dla':'https://chat.whatsapp.com/DP5XsCwjd8H0OoY4b4EmD6',
			'dlt':'Войти в Whatsapp',
			'dli':'img/socials/white/whatsapp.svg'
		}
	};
	/**/
	var dvol='none'; var del=document.getElementById("dla");
	if (typeof(dld[lang])!= "undefined") {
		dvol='';
		document.getElementById("dla").href = dld[lang]['dla'];
		document.getElementById("dlt").innerHTML = dld[lang]['dlt'];
		document.getElementById("dli").src = dld[lang]['dli'];
	}

	del.style.display = dvol;

}

//var script = document.createElement('script');script.src = "https://ajax.googleapis.com/ajax/libs/jquery/1.6.3/jquery.min.js";document.getElementsByTagName('head')[0].appendChild(script);

function getCookie(name) {
  var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(name, value, options) {
  options = options || {};

  var expires = options.expires;

  if (typeof expires == "number" && expires) {
    var d = new Date();
    d.setTime(d.getTime() + expires * 1000);
    expires = options.expires = d;
  }
  if (expires && expires.toUTCString) {
    options.expires = expires.toUTCString();
  }

  value = encodeURIComponent(value);

  var updatedCookie = name + "=" + value;

  for (var propName in options) {
    updatedCookie += "; " + propName;
    var propValue = options[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }

  document.cookie = updatedCookie;
}

function getHash(){
	var loc = window.location.hash.replace('#','');
	if (loc!='' && loc!='close') {
		var locel=document.getElementById('popt');
		if (s) {	// Если такое элемент есть
			var target_top= $('#'+loc).offset().top;
			$('html, body').animate({scrollTop:target_top}, 'slow');
		}
	}
}
