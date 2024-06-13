window.onload = function () {
	window.addEventListener('scroll', function (e) {
		if (window.pageYOffset > 100) {
			document.querySelector("header").classList.add('is-scrolling');
		} else {
			document.querySelector("header").classList.remove('is-scrolling');
		}
	});

	const menu_btn = document.querySelector('.hamburger');
	const mobile_menu = document.querySelector('.mobile-nav');

	menu_btn.addEventListener('click', function () {
		menu_btn.classList.toggle('is-active');
		mobile_menu.classList.toggle('is-active');
	});

	const getCookie = (name) => {
		const value = " " + document.cookie;
		console.log("value", `==${value}==`);
		const parts = value.split(" " + name + "=");
		return parts.length < 2 ? undefined : parts.pop().split(";").shift();
	  };
	
	  const setCookie = function (name, value, expiryDays, domain, path, secure) {
		const exdate = new Date();
		exdate.setHours(
		  exdate.getHours() +
			(typeof expiryDays !== "number" ? 365 : expiryDays) * 24
		);
		document.cookie =
		  name +
		  "=" +
		  value +
		  ";expires=" +
		  exdate.toUTCString() +
		  ";path=" +
		  (path || "/") +
		  (domain ? ";domain=" + domain : "") +
		  (secure ? ";secure" : "");
	  };
	
	  const $cookiesBanner = document.querySelector(".Cookies");
	  const $cookiesBannerButton = $cookiesBanner.querySelector("button");
	  const cookieName = "CookiesBanner";
	  const hasCookie = getCookie(cookieName);
	
	  if (!hasCookie) {
		$cookiesBanner.style.display = 'block';
	  }
	
	  $cookiesBannerButton.addEventListener("click", () => {
		setCookie(cookieName, "closed");
		$cookiesBanner.remove();
	  });
}

var lang = "PL";
var current_tab = 'TicketKingPL';

function switchTabs(tab) {
	if (lang == "PL") {
		tab = tab.replace("EN","PL");
		document.getElementsByClassName('navEN')[0].style.display = 'none';
		document.getElementsByClassName('navPL')[0].style.display = 'block';
	}
	else {
		tab = tab.replace("PL","EN");
		document.getElementsByClassName('navPL')[0].style.display = 'none';
		document.getElementsByClassName('navEN')[0].style.display = 'block';
	};
	current_tab = tab;
	document.getElementsByClassName('TicketKingPL')[0].style.display = 'none';
	document.getElementsByClassName('TicketKingEN')[0].style.display = 'none';
	document.getElementsByClassName('BuyPagePL')[0].style.display = 'none';
	document.getElementsByClassName('BuyPageEN')[0].style.display = 'none';
	document.getElementsByClassName('ContactPL')[0].style.display = 'none';
	document.getElementsByClassName('ContactEN')[0].style.display = 'none';	
	document.getElementsByClassName(tab)[0].style.display = 'block';
	if (window.innerWidth < 640)
	{
		document.getElementsByClassName('hamburger')[0].click();
	}	
}

function switchLang() {
	if (lang == "PL") {
		lang = "EN";
	}
	else {
		lang = "PL";
	};
	switchTabs(current_tab);
}