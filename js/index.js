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

	$('[data-footer]').load('/footer.html?v=20260724-footer-contact', function() {
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
	var $galleryPhotos = $('.gallery-photo');
	var currentPhotoIndex = 0;
	var touchStartX = 0;
	var touchStartY = 0;

	function showPhotoAt(index) {
		var photoCount = $galleryPhotos.length;

		if (!photoCount) {
			return;
		}

		currentPhotoIndex = (index + photoCount) % photoCount;

		var $image = $galleryPhotos.eq(currentPhotoIndex).find('img');
		$photoLightboxImage.attr('src', $image.attr('src')).attr('alt', $image.attr('alt'));
	}

	function showNextPhoto() {
		showPhotoAt(currentPhotoIndex + 1);
	}

	function showPreviousPhoto() {
		showPhotoAt(currentPhotoIndex - 1);
	}

	function closePhotoLightbox() {
		$photoLightbox.removeClass('is-open').attr('aria-hidden', 'true');
		$photoLightboxImage.attr('src', '').attr('alt', '');
		$('body').removeClass('photo-lightbox-open');
	}

	$('.gallery-photo').on('click', function() {
		currentPhotoIndex = $galleryPhotos.index(this);

		showPhotoAt(currentPhotoIndex);
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
		if (e.key === 'ArrowRight' && $photoLightbox.hasClass('is-open')) {
			showNextPhoto();
		}
		if (e.key === 'ArrowLeft' && $photoLightbox.hasClass('is-open')) {
			showPreviousPhoto();
		}
	});

	$photoLightbox.on('touchstart', function(e) {
		var touch = e.originalEvent.touches[0];

		touchStartX = touch.clientX;
		touchStartY = touch.clientY;
	});

	$photoLightbox.on('touchend', function(e) {
		var touch = e.originalEvent.changedTouches[0];
		var deltaX = touch.clientX - touchStartX;
		var deltaY = touch.clientY - touchStartY;

		if (Math.abs(deltaX) < 50 || Math.abs(deltaX) < Math.abs(deltaY)) {
			return;
		}

		if (deltaX < 0) {
			showNextPhoto();
		} else {
			showPreviousPhoto();
		}
	});

});
