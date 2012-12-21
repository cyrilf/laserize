
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

			//Get infos from the element
			var $this = $(this);
			var thisW = $this.width();
			var thisH = $this.height();

			var $childrens = $this.children();
			var bg = $($childrens[0]);
			var hover = $($childrens[1]);

			var imgBg = bg.attr('src');
			var imgHover = hover.attr('src');

			//Creation of our structure to display the effect
			$this.html('<div class="laserize_item">\
							<div class="laserize_hover">\
								<div class="laserize_laser"></div>\
							</div>\
						</div>');

			//Some basic CSS
			$this.find('.laserize_item').css({
				'height': thisH+'px',
				'width': thisW+'px',
				'background':'url('+imgBg+')',
				'background-size': thisW + 'px ' + thisH + 'px'
			});
			$this.find('.laserize_hover').css({
				'position':'relative',
				'z-index':'2',
				'background':'url('+imgHover+')',
				'background-size': thisW + 'px ' + thisH + 'px'
			});
			$this.find('.laserize_laser').css({
				'position':'absolute',
				'opacity':'0'
			});

			//Laser style depending on options
			if(typeof opts.laser == "object") {
				$this.find('.laserize_laser').css(opts.laser);
			} else {
				$this.find('.laserize_laser').css({'border-radius':'50%', 'box-shadow':'0 0 23px 7px '+ opts.laser, 'background':opts.laser});
			}

			//Styles depending on the orientation
			var itemHover = {'height':'100%'};
			var itemNonHover = {'height':'0'};
			if(opts.orientation === 'vertical') {
				$this.find('.laserize_hover').css({'width':'100%', 'height':'0', 'transition': 'height ' + opts.speed + ' ease'});
				$this.find('.laserize_laser').css({'bottom':'-2px','width':'100%','height':'3px'});
			} else {
				$this.find('.laserize_hover').css({'height':'100%', 'width':'0', 'transition': 'width ' + opts.speed + ' ease'});
				$this.find('.laserize_laser').css({'right':'-2px','width':'3px','height':'100%'});
				itemHover = {'width':'100%'};
				itemNonHover = {'width':'0'};
			}

			//Hover effect
			$this.find(".laserize_item").hover(
				function () {
					$this.find('.laserize_hover').css(itemHover);
					$this.find('.laserize_laser').css({'opacity':'1', 'transition-delay':'0s'});
				},
				function () {
					//if onlyOnce is set to true, doesn't reset css on the unhover transition
					if(!opts.onlyOnce) {
						$this.find('.laserize_hover').css(itemNonHover);
						$this.find('.laserize_laser').css({'opacity':'0', 'transition':'opacity .25s ease', 'transition-delay':'.75s'});
					}
				}
			);

			//Check if the animation is finished or reach the limit specified, in this case launch the callback
			if(opts.callback) {
				//calcul the limit before callback is called
				var limitFix = true;
				var limitCallback = opts.limitCallback;
				if( typeof limitCallback === 'string' && limitCallback.slice(-1) === '%') {
						limitCallback = limitCallback.slice(0,-1)/100;
						limitFix = false;
				} else {
					limitCallback = parseFloat(limitCallback);
				}

				var limitV = 0, limitH = 0;
				if(limitFix) {
					limitV = limitH = limitCallback;
				} else {
					limitV = thisH - (thisH - thisH * limitCallback);
					limitH = thisW - (thisW - thisW * limitCallback);
				}

				//Check if the limit is reach
				//Don't know if setInterval is the best option here..
				//Do a pull request if you want.
				var interval = setInterval(function(){
					var bool = false;
					if(opts.orientation === 'vertical') {
						if(parseInt($this.find('.laserize_hover').css('height'), 10) >= limitV)
							bool = true;
					} else {
						if(parseInt($this.find('.laserize_hover').css('width'),10) >= limitH)
							bool = true;
					}
					if(bool) {
						opts.callback();
						clearInterval(interval);
					}
				}, 500);
			}
		}); // each
	}; // opts

	$.fn.laserize.defaults = {
		//Css or just color of the laser
		//laser : {'border-radius':'50%', 'box-shadow':'0 0 23px 7px red', 'background':'red'},
		laser : 'red'
		//orientation of the laser
		, orientation : 'vertical'
		//Do the hover animation only one time
		, onlyOnce : false
		//Speed of the animation
		, speed : '0.85s'
		//callback when animation is done
		, callback : null
		//limit from which the callback can be called
		, limitCallback : '100%'
	};
})(jQuery);

//Call to the jquery function
$(function() {
	$('#zone1').laserize();

	$('#zone2').laserize(
		{
			laser : '#82f167',
			orientation :'horizontal',
			onlyOnce : false,
			speed : '1.50s',
			callback : function() { console.log('ok'); },
			limitCallback : '75%'
		});
});