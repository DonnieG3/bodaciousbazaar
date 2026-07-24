$(document).ready(function(){

	(function($) {

		$('#header__icon').click(function(e){
			e.preventDefault();
			$('body').toggleClass('with--sidebar');
		});
    
    $('#site-cache').click(function(e){
      $('body').removeClass('with--sidebar');
    });

	})(jQuery);

	$('[data-footer]').load('/footer.html?v=20260724-mobile-social', function() {
		$('[data-current-year]').text(new Date().getFullYear());
		updateMobileTitle();
	});

	var $siteContent = $('.site-content');
	var $hero = $('.hero');
	var $footerHost = $('[data-footer]');

	function isFooterVisible() {
		if (!$siteContent.length || !$footerHost.length) {
			return false;
		}

		var contentRect = $siteContent[0].getBoundingClientRect();
		var footerRect = $footerHost[0].getBoundingClientRect();

		return footerRect.top <= contentRect.bottom;
	}

	function updateMobileTitle() {
		var heroBottom = $hero.outerHeight() || 0;
		var footerVisible = isFooterVisible();
		$('body').toggleClass('show-mobile-title', $siteContent.scrollTop() >= heroBottom && !footerVisible);
		$('body').toggleClass('footer-visible', footerVisible);
	}

	$siteContent.on('scroll', updateMobileTitle);
	$(window).on('resize', updateMobileTitle);
	updateMobileTitle();

});
