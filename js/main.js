
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

			$this.find('.item').css({'height': thisH+'px', 'width': thisW+'px', 'background':'url('+imgBg+')', 'background-size': thisW + 'px ' + thisH + 'px'});
			$this.find('.hover').css({'position':'relative','z-index':'2','background':'url('+imgHover+')','background-size': thisW + 'px ' + thisH + 'px' });
			$this.find('.laser').css({'position':'absolute','border-radius':'50%','opacity':'0', 'background':opts.laserColor, 'box-shadow':'0 0 23px 7px '+ opts.laserColor});

			var itemHover = {'height':'100%'};
			var itemNonHover = {'height':'0'};
			if(opts.orientation === 'vertical') {
				$this.find('.hover').css({'width':'100%', 'height':'0'});
				$this.find('.laser').css({'bottom':'-2px','width':'100%','height':'3px'});
				$this.find('.hover').css('transition', 'height .85s ease');
			} else {
				$this.find('.hover').css({'height':'100%', 'width':'0'});
				$this.find('.laser').css({'right':'-2px','width':'3px','height':'100%'});
				$this.find('.hover').css('transition', 'width .85s ease');
				itemHover = {'width':'100%'};
				itemNonHover = {'width':'0'};
			}

			$this.find(".item").hover(
					function () {
						$this.find('.hover').css(itemHover);
						$this.find('.laser').css({'opacity':'1', 'transition-delay':'0s'});
					},
					function () {
						$this.find('.hover').css(itemNonHover);
						$this.find('.laser').css({'opacity':'0', 'transition':'opacity .25s ease', 'transition-delay':'.75s'});
					}
				);
	}); // each
}; // opts

	$.fn.laserize.defaults = {
		laserColor: 'red',
		orientation: 'vertical'
	};
})(jQuery);

//Call to the jquery function
$(function() {
	$('.laserZone').laserize({laserColor:'#82f167', orientation:'vertical'});
});