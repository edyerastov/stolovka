jQuery(document).ready(function ($) {
	$(".menu-slider").owlCarousel({
		nav : false, 
     	items: 1,
     	loop: true
	})
	$('.slider-right').click(function() {
	   $('.menu-slider').trigger('next.owl.carousel');
	});
	$('.slider-left').click(function() {
	   $('.menu-slider').trigger('prev.owl.carousel');
	});
	
});