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

	$('.btn-nav').click(function(){
		$(this).toggleClass('active');
		$('.main-mnu').slideToggle('slow');
	});

	$('.reviews-item__cut').textTailor({
		fit: false
	});

	$('.reviews-item').hover(
		function(){
			$(this).children(".review-full").css("display", "flex");
		}, function(){
			$(this).children(".review-full").css("display", "none");
		});

	$('.team-item__descr').equalHeights();

	// function galleryInit(){
	// 	new Vue({
	// 		el: '.gallery-slider.active',
	// 		components: {
	// 			'carousel-3d': Carousel3d.Carousel3d,
	// 			'slide': Carousel3d.Slide
	// 		}
	// 	});
	// }

	// galleryInit();

	// $('ul.tabs-caption').on('click', 'li:not(.active)', function() {
	// 	$(this)
	// 	.addClass('active').siblings().removeClass('active')
	// 	.closest('.tabs').find('.tabs-content').removeClass('active').eq($(this).index()).addClass('active');
	// 	$('.gallery-slider').removeClass('active');
	// 	$('.tabs-content.active').children('.gallery-slider').addClass('active');
	// 	galleryInit();
	// });

});