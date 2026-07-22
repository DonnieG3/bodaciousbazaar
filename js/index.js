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

	$('[data-footer]').load('/footer.html?v=20260722-footer', function() {
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

	var $photoLightbox = $('#photo-lightbox');
	var $photoLightboxImage = $('.photo-lightbox__image');

	function closePhotoLightbox() {
		$photoLightbox.removeClass('is-open').attr('aria-hidden', 'true');
		$photoLightboxImage.attr('src', '').attr('alt', '');
		$('body').removeClass('photo-lightbox-open');
	}

	$('.gallery-photo').on('click', function() {
		var $image = $(this).find('img');

		$photoLightboxImage.attr('src', $image.attr('src')).attr('alt', $image.attr('alt'));
		$photoLightbox.addClass('is-open').attr('aria-hidden', 'false');
		$('body').addClass('photo-lightbox-open');
		$('.photo-lightbox__close').focus();
	});

	$('.photo-lightbox__close').on('click', closePhotoLightbox);

	$photoLightbox.on('click', function(e) {
		if (e.target === this) {
			closePhotoLightbox();
		}
	});

	$(document).on('keyup', function(e) {
		if (e.key === 'Escape' && $photoLightbox.hasClass('is-open')) {
			closePhotoLightbox();
		}
	});

});
