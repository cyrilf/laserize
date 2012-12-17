
/*
 * Laserize a jQuery Plugin
 * Transform two images onto an hover laser effect
 *
 * Copyright 2012 CYRIL F, http://cyrilf.com
 * Released under the MIT License
 */

(function($) {
	$.fn.laserize = function(options) {

		var opts = $.extend({}, $.fn.laserize.defaults, options);
		return this.each(function() {

			var $this = $(this);
			var $childrens = $this.children();

			var bg = $($childrens[0]);
			var hover = $($childrens[1]);

			var thisW = $this.width();
			var thisH = $this.height();

			var imgBg = bg.attr('src');
			var imgHover = hover.attr('src');

			$this.html('<div class="item"><div class="hover"><div class="laser"></div></div></div>');

			$('.item').css('height', thisH+'px');
			$('.item').css('width', thisW+'px');
			$('.item').css('background','url('+imgBg+')');
			$('.item').css('background-size', thisW + 'px ' + thisH + 'px' );
			$('.hover').css('background','url('+imgHover+')');
			$('.hover').css('background-size', thisW + 'px ' + thisH + 'px' );

			if(opts.orientation === 'vertical') {
				$('.hover').css({'width':'100%'});
				$('.laser').css({'bottom':'-2px','width':'100%','height':'3px'});
			} else {
				$('.hover').css({'height':'100%'});
				$('.laser').css({'right':'-2px','width':'3px','height':'100%'});
			}

			$('.laser').css('background', opts.laserColor);
			$('.laser').css('box-shadow', '0 0 23px 7px '+ opts.laserColor);
		}); // each
	}; // opts

	$.fn.laserize.defaults = {
		laserColor: 'red',
		orientation: 'vertical'
	};
})(jQuery);

//Call to the jquery function
$(function() {
	$('#element').laserize({laserColor:'#82f167'});
});