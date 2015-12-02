var UOS = UOS || {};

UOS.is_ios = (navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false);

UOS.SkipToContent = UOS.SkipToContent || function() {
	var ME = {};
	
	function _init() {
		var skip = $('<div>');
		skip.css('position', 'absolute');
		skip.css('top', '150px');
		skip.css('width', '150px');
		skip.html('<a href="#content">Skip to content...</a>');
		skip.attr('tab-index', 1);
		skip.hide();
		
		$('a.logo', skip).on('focus', function() {
			skip.show();
		});
		
		$('a.logo', skip).on('blur', function() {
			skip.hide();
		});
		
		$('a.logo').append(skip);
	}
	
	ME.init = _init;
	
	return ME;
};

UOS.Accordian = UOS.Accordian || function() {
	
	//private
	function _setup_accordian(element) {
		var content_id = element.attr('data-tab');
		var content_group = element.attr('data-group');
		
		//console.log("Content: " + content_id);
		
		var content =  $('div.uos-accordian-content[data-tab="'+content_id+'"]');
		var iframe = content.find('iframe');
		content.hide();
		content.addClass('uos-accordian-inactive');
		
		var expand = function() {
			content.slideDown('slow');
			content.removeClass('uos-accordian-inactive');
			element.find('i').removeClass('fa-level-down');
			element.find('i').addClass('fa-level-up');
			
			if(iframe.length > 0) {
				iframe.each(function() {
					var src = $(this).attr('src');
					$(this).attr('src', '');
					$(this).attr('src', src);
				});
			}
		}
		
		var collapse = function() {
			content.slideUp('slow');
			content.addClass('uos-accordian-inactive');
			element.find('i').removeClass('fa-level-up');
			element.find('i').addClass('fa-level-down');
		}
		
		element.on('click', function(e) {
			e.preventDefault();
			if(content.hasClass('uos-accordian-inactive')) {
				expand();
			} else {
				collapse();
			}
		});
		
		$('.uos-accordian-expandall[data-group="'+content_group+'"]').on('click', function(e) {
			e.preventDefault();
			expand();
		});
		
		$('.uos-accordian-collapseall[data-group="'+content_group+'"]').on('click', function(e) {
			e.preventDefault();
			collapse();
		});
		
	}

	function _init() {
		$('a.uos-accordian').each(function() {
			_setup_accordian($(this));
		});
	}
	
	//
	
	ME = 	{
					//public
					init	:	_init
				}
				
	return ME;
	
}();

UOS.RandomHome = UOS.RandomHome || function() {
	function _init() {
		var heads = $('.feature-home');
		var html = [];
		for(var i = 0; i < heads.length; i++) {
			html[i] = $(heads[i]).html();
		}
		
		var num = Math.round(Math.random() * heads.length);
		for(var i = 0; i < heads.length; i++) {
			if(num >= heads.length) {
				num = 0;
			}
			
			$(heads[i]).html(html[num++]);
		}
	}
	
	return {
		init	:	_init
	}
}();

UOS.RandomInfo = UOS.RandomInfo || function() {

	//private
	function _init() {
		//console.log("Randomising info...");
		var sources = $('.alt-content-source'); //array of source to get content from
		var source_indices = [];//array to store the index of each source used during randomisation
		
		$('.uos-alt-content').each(function() {//for every random content container
			var num = Math.round(Math.random() * sources.length);//generate a random source index
			//console.log("Generated " + num);
			
			var tries = 0;
			while($.inArray(num, source_indices) > -1 && num < sources.length && tries < 10) { //check if index is not already used
				num = Math.round(Math.random() * sources.length);//generate another random source index
				//console.log("Generated " + num);
				if(tries == 9) {
					num = sources.length;
				} 
				tries++;
			}
			
			//console.log("Using " + num);
			
			if(num < sources.length) {//if random index is of sources size then just leave it's content alone
				//console.log("Swapping content...");
				source_indices[source_indices.length] = num;//store newly used index
				$(this).html($(sources[num]).html());//swap out html from source to container
			}
		});
		//console.log(source_indices);
		//console.log("Randomising info complete!");
	}
	
	//
	
	var ME = 	{
							//public
							init	:	_init
						};
	
	return ME;
}();

UOS.Discovery = UOS.Discovery || function() {

	var container = null;

	function getColumnWidth() {
		var columns = 3;
		if($(window).width() <= 680) {
			columns = 1;
		} else if($(window).width() <= 800) {
			columns = 2;
		}
		
		var cw = container.width() / columns;
		return cw;
	}

	function _init() {
		container = $('.discover > .iso');
		
		var w = getColumnWidth();
		$('.discover > .iso > .item').width(w - 10);
		
		container.isotope({
			resizable: false,
			itemSelector : '.item',
			sortBy : 'original-order',
			masonry : {	
				columnWidth	:	w	
			}
		});
	
		container.imagesLoaded(function() {
			window.setTimeout(function() {
				container.isotope('reLayout');
			}, 1000);
		});

		$(window).smartresize(function(e) {
			var cw = getColumnWidth();
			$('.discover > .iso > .item').width(cw - 10);
			container.isotope({
				masonry : {	
					columnWidth	:	cw 
				} 
			});
		});
	}
	
	return {
		init	:	_init
	}
}();

UOS.RHSFacts = UOS.RHSFacts || function() {
    var container = null;

	function _init() {
		container = $('.newswrapper.iso');
		
		container.isotope({
			resizable: false,
			itemSelector : '.item',
            masonry : { 
                columnWidth: 1
			}
		});
	
		container.imagesLoaded(function() {
			window.setTimeout(function() {
				container.isotope('reLayout');
			}, 1000);
		});
        
        $(window).smartresize(function(e) {
			container.isotope('reLayout');
		});
    }
	
	return {
		init	:	_init
	}
}();

UOS.Accessibility = UOS.Accessibility || function() {
	function _init() {
		console.log("Setting up uos.accessibility");
		$('body').one('keyup', function(e) {
			e = e || event;
			var code = e.keyCode || e.which;
			console.log("Keydown fired - " + code);
			if(code == 9) {
				console.log("tab pressed");
				$('body').addClass('accessibility');
			} else {
				console.log(code + "pressed!");
			}
		});			
	}
	
	return {
		init	:	_init
	};
}();

UOS.LightBox = UOS.LightBox || function() {
	function display(text) {
		var div = $('<div>');
		div.css({
			'position'	:	'fixed',
			'top'			:	0,
			'left'			:	0,
			'width'		:	'100%',
			'height'		:	'100%',
			'z-index'	:	10,
			'background-color'	:	'#000',
			'opacity'	:	0.5
		});
		div.addClass('uos-lightbox');
		
		var span = $('<span>');
		span.css({
			'position'	:	'fixed',
			'width'	:	'100%',
			'padding'	:	'5%',
			'top'	:	'40%',
			'left'	:	0,
			'background-color'	:	'white',
			'text-align'	:	'center',
			'z-index'	:	20
		});
		span.addClass('uos-lightbox');
		span.html(text);
		
		$('body').append(div);
		$('body').append(span);
		
		$('body').one('click', '.uos-lightbox', function(e) {
			div.remove();
			span.remove();
		});
	
	}
	
	var ME = {
		display	:	display
	};
	return ME;
		
}();

$(function(){
	$('.newsleft section:gt(1), .pressrelease ul li:gt(5)').hide();
	
	function showLeft(e) {
		e.preventDefault();
		$('.newsleft section:hidden:lt(2), .pressrelease ul li:hidden:lt(2)').slideDown();
	}
	
	$('.newsright .newswrapper section:gt(4)').hide();
	
	function showRight(e) {
		e.preventDefault();
		$('.newsright .newswrapper section:hidden:lt(4)').slideDown();
	}
	
	function update() {
		var right = $('.newsright .newswrapper section:hidden');
		var left = $('.newsleft section:hidden, .pressrelease ul li:hidden');
		
		if(!right.length > 0) {
			$('.newsright .buttongreen2').hide();
		}
		
		if(!left.length > 0) {
			$('.newsleft .buttongreen2, .pressrelease .buttongreen').hide();
		}
		
		if(!right.length > 0 && !left.length > 0) {
			$('.buttongreen').hide();
		}
	}
	
	$('.buttongreen, .buttongreen2').on('click', function(e) {
		showLeft(e);
		showRight(e);
		update();
	});
	
	$('.newsleft .buttongreen2').on('click', function(e) { 
		showLeft(e); 
		update(); 
	});
	
	$('.newsright .buttongreen2').on('click', function(e) { 
		showRight(e);
		update();
	});
	
	});

UOS.getQueryString =  function() { 
	  var assoc  = {};
	  var decode = function (s) { return decodeURIComponent(s.replace(/\+/g, " ")); };
	  var queryString = location.search.substring(1); 
	  var keyValues = queryString.split('&'); 

	  for(var i in keyValues) { 
		var key = keyValues[i].split('=');
		if(key.length > 1) {
		  assoc[decode(key[0])] = decode(key[1]);
		}
	  } 

	return assoc; 
}
