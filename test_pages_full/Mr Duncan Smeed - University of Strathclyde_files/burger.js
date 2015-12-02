var Burger = Burger || function() {
	//interface
	var ME = {};
	
	//private
	var burger = null;
	var sized = 0;//0 = not sized yet; 1 = sized above 680px; -1 = sized below 680px
	
	function resize() {
		var width = $('body').innerWidth() + 18;
		if(width > 680) {
			if(sized < 1) {
				//get height of the aside (uses .height() to include unit type)
				//consider using an ID on the aside to simplify this, as there is only 1 on page
				//var aside_height = $($('.course-promo')[0]).height();
				//set all tab content min-height to same as the aside's height
				$('.tab-content').css('min-height', '0px');
				//Show all tabs
				$('.burger-tab').css('display', 'inline-block');
				//Remove click event for moving to content
				$('.burger-tab, .tabs .cta').off('click.burger');
				sized = 1;
			}
			
		} else {
			if(sized > -1) {
				//Hide tabs if not expanded already
				if(!burger.hasClass('open')) {
					$('.burger-tab').not('.cta').css('display', 'none');
				}
				//unset tab content min-height
				$('.tab-content').css('min-height', '0px');
				
				//remove previous click event
				$('.burger-tab').off('click.burger');
				//Add click event to move to content
				$('.burger-tab, .tabs .cta').on('click.burger', function(e) {
					e.preventDefault();
					var anchor = $(this).find('a');		
					window.location.hash = anchor.attr('data-tab');
				});
				sized = -1;
			}
		}
	}

	//public
	ME.init = function() {
		burger = $('#content .tabs-container ul.tabs .burger');//Expand button
		if(burger !== null) {
			//Toggle expanding tab content
			burger.on('click', function(e) {
				if(!burger.hasClass('open')) {
					burger.addClass('open');
					$('.burger-tab').css('display', 'inline-block');
				} else {
					burger.removeClass('open');
					$('.burger-tab').css('display', 'none');
				}
			});
			
			$(window).on('resize', function(e) {
				resize();
			});
		
			resize();
		}
	};
	
	return ME;
}();