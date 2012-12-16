$(function() {

	var laserColor = '#82f167';

	var elmt = $("#element");
	var bg = $('#bg');
	var hover = $('#hover');

	var elmtW = $(elmt).width();
	var elmtH = $(elmt).height();

	var imgBg = $(bg).attr('src');
	var imgHover = $(hover).attr('src');

	$('#element').html('<div class="item"><div class="hover"><div class="laser"></div></div></div>');
	$('.item').css('height', elmtH+'px');
	$('.item').css('width', elmtW+'px');
	$('.item').css('background','url('+imgBg+')');
	$('.item').css('background-size', elmtW + 'px ' + elmtH + 'px' );
	$('.hover').css('background','url('+imgHover+')');
	$('.hover').css('background-size', elmtW + 'px ' + elmtH + 'px' );

	$('.laser').css('background', laserColor);
	$('.laser').css('box-shadow', '0 0 23px 7px '+ laserColor);
});