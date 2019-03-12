jQuery(document).ready(function ($) {
	var slider = $('.menu-slider');
	var thumbnailSlider = $('.thumbnail-menu-slider');
	var duration = 500;

	slider.owlCarousel({
		loop:true,
		nav:false,
		dots: false,
		items:1
	}).on('changed.owl.carousel', function (e) {
		thumbnailSlider.trigger('to.owl.carousel', [e.item.index, duration, true]);
	});

	thumbnailSlider.owlCarousel({
		loop:false,
		nav:false,
		items:3,
		margin: 5,
		dots: false
	}).on('click', '.owl-item', function () {
		slider.trigger('to.owl.carousel', [$(this).index(), duration, true]);

	}).on('changed.owl.carousel', function (e) {
		slider.trigger('to.owl.carousel', [e.item.index, duration, true]);
	});
});