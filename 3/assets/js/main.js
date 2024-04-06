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
}
function switchTabs(tab) {
	document.getElementsByClassName('TicketKing')[0].style.display = 'none';
	document.getElementsByClassName('BuyPage')[0].style.display = 'none';
	document.getElementsByClassName('Contact')[0].style.display = 'none';
	document.getElementsByClassName(tab)[0].style.display = 'block';
	if (window.innerWidth < 640)
	{
		console.log('xD');
		document.getElementsByClassName('hamburger')[0].click();
	}
}