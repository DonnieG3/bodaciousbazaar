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

	$('[data-footer]').load('/footer.html', function() {
		$('[data-current-year]').text(new Date().getFullYear());
		updateMobileTitleFooter();
	});

	var $siteContent = $('.site-content');
	var $footerHost = $('[data-footer]');

	function isFooterVisible() {
		if (!$siteContent.length || !$footerHost.length) {
			return false;
		}

		var contentRect = $siteContent[0].getBoundingClientRect();
		var footerRect = $footerHost[0].getBoundingClientRect();

		return footerRect.top <= contentRect.bottom;
	}

	function updateMobileTitleFooter() {
		$('body').toggleClass('footer-visible', isFooterVisible());
	}

	$siteContent.on('scroll', updateMobileTitleFooter);
	$(window).on('resize', updateMobileTitleFooter);
	updateMobileTitleFooter();

});
