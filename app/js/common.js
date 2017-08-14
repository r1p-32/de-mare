$(function() {

	$('.fade-slider').slick({
		dots: true,
		arrows: false,
		fade: true,
		accessibility: false,
		slidesToShow: 1,
		slidesToScroll: 1
	});

	$('.price-slider').slick({
		nextArrow: '<button type="button" class="slider-arr slider-arr_next"><i>&#xE80C</i></button>',
		prevArrow: '<button type="button" class="slider-arr slider-arr_prev"><i>&#xE80D</i></button>',
		arrows: true,
		accessibility: false,
		slidesToShow: 4,
		slidesToScroll: 1,
		responsive: [
		{
			breakpoint: 1199,
			settings: {
				slidesToShow: 3
			}
		},
		{
			breakpoint: 991,
			settings: {
				slidesToShow: 2
			}
		},
		{
			breakpoint: 767,
			settings: {
				slidesToShow: 1
			}
		}
		]
	});

	function getGallerySettings(){
		return {
			nextArrow: '<button type="button" class="slider-arr slider-arr_next"><i>&#xE80C</i></button>',
			prevArrow: '<button type="button" class="slider-arr slider-arr_prev"><i>&#xE80D</i></button>',
			arrows: true,
			infinite: false,
			accessibility: false,
			slidesToShow: 1,
			slidesToScroll: 1,
			centerMode: true,
			centerPadding: '30%',
		}
	}

	$('.gallery-slider').slick(getGallerySettings());

	$('.btn-nav').click(function(){
		$(this).toggleClass('active');
		$('.main-mnu').slideToggle('slow');
	});

	$('.reviews-item__cut').textTailor({
		fit: false
	});

	$('.reviews-item').hover(
		function(){
			$(this).children(".review-full").addClass("active");
		}, function(){
			$(this).children(".review-full").removeClass("active");
		});

	$('.team-item__descr').equalHeights();

	$('ul.gallery-filter').on('click', 'li:not(.active)', function() {
		var filtered = $(this).attr('data-filter');
		$('.gallery-slider').slick('slickUnfilter');
		$(this).addClass('active').siblings().removeClass('active');
		if (filtered != 'all') {
			$('.gallery-slider').slick('unslick');
			$('.gallery-slider').slick(getGallerySettings());
			console.log('test');
			$('.gallery-slider').slick('slickFilter', '.' + filtered);
		} else {
			$('.gallery-slider').slick('unslick');
			$('.gallery-slider').slick(getGallerySettings());
			$('.gallery-slider').slick('slickUnfilter');
		}
	});

});