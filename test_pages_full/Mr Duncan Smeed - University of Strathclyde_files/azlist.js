var AZLIST = AZLIST || function() {
	var ME = {};
	
	var grouped = true;
	var subgrouped = false;
	var groups = [];
	var searchFilter = '';
	var groupFilter = '';
	var letterFilter = '';

	function filterLetter(letter) {
		var matches = [];
			
		var items = $('.item').not('.group-heading');
		items.removeClass('match_letter');
			
		if(letter != '') {
			items.each(function(item) {
				var link = $(items[item]).find('span>a');
				var text = $(link).text().toLowerCase();
				if(text.substr(0, 1) === letter.toLowerCase()) {
					matches.push(items[item]);
				}
			});
				
			$(matches).addClass('match_letter');
				
			letterFilter = '.match_letter';
		}  else {
			letterFilter = '';
		}
		
		applyFilter();
	}
	
	function searchItems(term) {
		var matches = [];
			
		var items = $('.item').not('.group-heading');
		items.removeClass('match_search');
			
		if(term != '' && term.length >= 2) {
			items.each(function(item) {
				var link = $(items[item]).children()[0];
				var text = $(link).text().toLowerCase();
						
				if(text.indexOf(term.toLowerCase()) !== -1) {
					matches.push(items[item]);
				}
			});
				
			$(matches).addClass('match_search');
				
			searchFilter = '.match_search';
			$('#searchbox').parent().addClass('active');
		}  else {
			searchFilter = '';
			$('#searchbox').parent().removeClass('active');
		}
		
		applyFilter();
	}
		
	function showAll() {
		searchFilter = '';
		groupFilter = '';
		letterFilter = '';
		$('#a-z li a').removeClass('active-letter');
		$('.group-filter').removeClass('active-button');
		$('#searchbox').val('');
		$('#searchbox').parent().removeClass('active');
		applyFilter();
	}
		
	function applyFilter(callback) {
		if(typeof callback !== 'undefined') {
			setTimeout(function(){
				callback();
			}, 700);
		}
		
		var currentFilter = searchFilter + letterFilter;
		if(groupFilter != '') {
			currentFilter += groupFilter + '-item';
		}
		
		
		if(grouped) {
			sort = 'groupAlpha';
			if(groupFilter !== '') {
				if(currentFilter != '') {
					currentFilter += ', ';
				}
				currentFilter += ' .group-heading' + groupFilter + '.hasCount';
			} else {
				if(currentFilter != '') {
					currentFilter += ', .group-heading.hasCount';
				}
			}
		} else {
			sort = 'alpha';
			currentFilter += ':not(.group-heading)';
		}
		
		if(!subgrouped) {
			currentFilter += ':not(.group-heading.subgroup)';
		} else {
			if(grouped) {
				if(currentFilter != '') {
					currentFilter += ', ';
				} else {
					currentFilter += '.item, ';
				}
				currentFilter += '.group-heading'+groupFilter+'.subgroup.hasCount';
			}  else {
				sort = 'groupAlpha';
				if(currentFilter !== '') {
					currentFilter += ', ';	
				} else {
					currentFilter += '.item:not(.group-heading), ';
				}
				currentFilter += '.group-heading.subgroup.hasCount';
			}
		}
		
		$('.iso-container').isotope('updateSortData', $('.iso-container').children());
		
		updateCounters(currentFilter);
		
		$('.iso-container').isotope({ 
			filter: currentFilter,
			sortBy : sort
		});
		
	}
	
	function updateCounters(selector) {
		
		$('.group-heading').removeClass('hasCount');
		var items = $(selector);
		if(groupFilter !== '') {
			$('.group-heading' + groupFilter).not('.subgroup').addClass('hasCount');
			
			$('.count').each(function() {
				var group = $(this).parent().attr('data-filter');
				var groupTotal = items.filter('.' + group + '-item').length;
				$(this).text(groupTotal);
				if(groupTotal > 0) {
					$('.group-heading.' + group).not('.subgroup').addClass('hasCount');
				}
				
				if(subgrouped) {
					
					$('.'+group+'.group-heading.subgroup').each(function() {
						var subgroup = $(this).attr('data-subgroup');
						var members = $(selector+'[data-subgroup="'+subgroup+'"]').length;
						if(members > 0) {
							$(this).addClass('hasCount');
						}
					});
				}
			});
		} else {
			$('.count').each(function() {
				var group = $(this).parent().attr('data-filter');
				var groupTotal = $(searchFilter + letterFilter + '.'+group+'-item').length;
				$(this).text(groupTotal);
				if(groupTotal > 0) {
					$('.group-heading.' + group).not('.subgroup').addClass('hasCount');
				}
				
				if(subgrouped) {
					$('.'+group+'.group-heading.subgroup').each(function() {
						var subgroup = $(this).attr('data-subgroup');
						var members = $(searchFilter + letterFilter + '.' + group + '-item[data-subgroup="' + subgroup + '"]').length;
						if(members > 0) {
							$(this).addClass('hasCount');
						}
					});
				}
			});
		}
		
		$('#a-z>li>a').not('.active-letter').attr('disabled', 'disabled');
		var sel = selector.replace('.match_letter', '').replace(/^,/,'');
		
		$(sel).each(function() {
			//var alpha = $(this).attr('data-alpha').substr(0, 1).toLowerCase();
			var alpha = '';
			if(typeof $(this).find('span>a').text() !== 'undefined') {
				alpha = $(this).find('span>a').text().substr(0, 1).toLowerCase();
			}
			$('#a-z>li>a[href="#'+alpha+'"]').removeAttr('disabled');
			console.log("Enabled letter: " + alpha);
		});
	}
	
	ME.init = function() {
		var groupCount = 0;
		$('.group-filter').each(function() {
			groupCount++;
			var group = $(this).attr('data-filter');
			groups.push(group);
			$('.'+group+'-item').addClass('group'+groupCount+'-item');
		});
		$('#groups').addClass('group'+groupCount);
	
		$('.iso-container').each(function() {
			$(this).isotope({
				itemSelector : '.item',
				layoutMode : 'fitRows',
				transformsEnabled: true,
				getSortData : {
					alpha : function($elem) {
						var t = $elem.find('span>a').text();
						if(typeof t !== 'undefined') {
							return t.toLowerCase();		
						}
						console.log("Alpha: " + a);
						return 'a';
					},
					groupAlpha : function($elem) {
						var value = '';
						
						var group = '';
						for(var g = 0; g < groups.length; g++) {
							if($elem.hasClass(groups[g]) || $elem.hasClass(groups[g] + '-item')) {
								group = g + groups[g];
								break;
							}
						}
						if(group !== '') {
							value += group;
						} else {
							value += 'z'
						}
						
						var subgroup = $elem.attr('data-subgroup');
						if(typeof subgroup !== 'undefined' && subgroup !== '') {
							value += '.' + subgroup;
						} else {
							value += '.z';
						}
						
						var t = '';
						if(typeof $elem.find('span>a').text() !== 'undefined') {
							t = $elem.find('span>a').text();
						}
						
						if(t !== '') {
							value += '.' + t;
						} else {
							t = $elem.attr('data-alpha') || '';
							value += '.'+t;
						}
						value = value.toLowerCase().replace(/ /g, '');
						console.log($elem);
						console.log('GROUP: ' + group);
						console.log('SUBGROUP: ' + subgroup);
						console.log('ALPHA: ' + t);
						console.log("SORT: " + value);
						return value.toLowerCase();
					}
				},
				onLayout : function($elems, instance) {
					var t = 23;
					for(var i = 0; i < instance.$filteredAtoms.length; i++) {
						$(instance.$filteredAtoms[i]).attr('tabIndex', t++);
						$(instance.$filteredAtoms[i]).find('a').attr('tabIndex', t++);
					}
				}
			});				
		});
	
		$('#searchbox').on('keyup', function(e) {
			searchItems($(this).val().toLowerCase());
		});
		
		$('#searchbox').on('submit', function(e) {
			e.preventDefault();
		});
		
		grouped = $('#grouped').hasClass('active');
		if(!grouped) {
			groupFilter = '';
		}
			
		$('#grouped').on('click', function(e) {
			e.preventDefault();
			grouped = $('#grouped').hasClass('active');
			if(grouped) {
				$('#grouped').removeClass('active');
				grouped = false;
			} else {
				$('#grouped').addClass('active');
				grouped = true;
			}
			applyFilter();
		});
		
		subgrouped = $('#subgrouped').hasClass('active');
		$('#subgrouped').on('click', function(e) {
			e.preventDefault();
			subgrouped = $('#subgrouped').hasClass('active');
			if(subgrouped) {
				$('#subgrouped').removeClass('active');
				subgrouped = false;
			} else {
				$('#subgrouped').addClass('active');
				subgrouped = true;
			}
			applyFilter();
		});
		
		$('.group-filter').on('click', function(e) {
			e.preventDefault();
			
			if($(this).hasClass('active-button')) {
				$(this).removeClass('active-button');
				groupFilter = '';
			} else {
				$('.group-filter').addClass('active-button');
			
				var group = $(this).attr('data-filter');
				
				groupFilter = '.' + group;
				
				$('.group-filter').not(groupFilter+'-button').removeClass('active-button');
			}
			applyFilter();
		});
		
		$('#az-button').on('click', function(e) {
			e.preventDefault();
			if($(this).parent().hasClass('active')) {
				$('#a-z').slideUp("slow");
				$(this).parent().removeClass('active');
			} else {
				$('#a-z').slideDown("slow");
				$(this).parent().addClass('active');
			}
		});
		
		$('#a-z li a').each(function() {
			$(this).on('click', function(e) {
				e.preventDefault();
				if($(this).attr('disabled') != 'disabled') {
					if($(this).hasClass('active-letter')) {
						filterLetter('');
						$(this).removeClass('active-letter');
					} else {
						var letter = $(this).text();
						filterLetter(letter);
						$('#a-z li a').removeClass('active-letter');
						$(this).addClass('active-letter');
					}
				}
			});
		});
		
		$('#show-all').on('click', function(e) {
			e.preventDefault();
			showAll();
		});
		
		$('.count').each(function() {
			var group = $(this).parent().attr('data-filter');
			var groupTotal = $(searchFilter + letterFilter + '.'+group+'-item').length;
			$(this).text(groupTotal);
		});
		
		applyFilter();
	};
	
	return ME;
}();


var MobileHover = MobileHover || function() {

    var hoverClass = 'hover',
        target = 'a, button, input[type="submit"], input[type="reset"], input[type="button"], .flexslider, .flex-next, .flex-prev, .filter-button, li.haschildren', 
        preventMouseover = false;

    function forTouchstart() {
        preventMouseover = true
    };

    function forMouseover() {
        if (preventMouseover === false) {
            $(this).addClass(hoverClass);
        }
    };

    function forMouseout() {
        $(this).removeClass(hoverClass);
    };

    function init() {
        $('body').on('touchstart', target, forTouchstart);
        $('body').on('mouseover ', target, forMouseover);
        $('body').on('mouseout', target,  forMouseout);
	};

    return {
        init: init
    };
}();

var AutoComplete = AutoComplete || function() {
	ME = {};
	
	//private
	var active = false;
	function suggest(elem, values) {
		var pos = elem.position();
		
		var div = elem.parent().find('.suggestions')[0];
		
		
		var close_suggestions = function(e) {
			div.remove();
			if(elem.val() !== null && elem.val() !== "") {
				console.log('Starting compare: ' + elem.val());
				var text = elem.val().toLowerCase();
				var poss = null;
				var poss_index = -1;
					
				for(var v = 0; v <  values.length; v++) {
					if(values[v] !== null) {
						var value = values[v].toLowerCase();
						var index = value.indexOf(text);
						if(index !== -1) {
							console.log('Suggestion found V: ' + values[v] + " - I: " + index);
							if(poss == null || index < poss_index) {
								poss = values[v];
								poss_index = index;
							}
						}
					}
				}
				
				if(poss !== null) {
					elem.val(poss);
				} else {
					elem.val('');
				}
			}
		}
		
		
		if(typeof div !== "undefined" && div !== null) {
			div = $(div);
			div.html('');
		} else {
			div = $('<div>');
			elem.parent().append(div);
			div.css('position', 'absolute');
			div.css('left', pos.left);
			div.css('top', pos.top + elem.height() + 5);
			div.css('margin-left', elem.css('margin-left'));
			div.css('width', elem.width());
			div.css('z-index', 50);
			div.css('background', 'white');
			div.css('border', '1px solid');
			div.css('overflow-x', 'hidden');
			div.css('overflow-y', 'auto');
			div.css('max-height', '250px');
			div.addClass('suggestions');
			console.log("Created DIV");
			
			var over = true;
			
			elem.parent().on('mouseover', function(e) {
			    over = true;
				console.log("OVER!");
			});
			
			elem.parent().on('mouseout', function(e) {
				over = false;
				console.log("OUT!");
			});
			
			$(window).on('mousedown', function(e) {
				console.log("DOWN!");
				if(!over) {
					close_suggestions(e);
				}
			});
			
			$(window).on('resize', function(e) {
				var pos = elem.position();
				div.css('left', pos.left);
				div.css('top', pos.top + elem.height() + 5);
				div.css('margin-left', elem.css('margin-left'));
				div.css('width', elem.width()); 
			});
		}
		
		var ul = $('<ul>');
		
		//ul.on('click', 'li', close_suggestions);
		
		var text = elem.val().toLowerCase();
		var matches = 0;
		for(var v = 0; v <  values.length; v++) {
			if(values[v] !== null) {
				var value = values[v].toLowerCase();
				if(value.indexOf(text) !== -1) {
					var li = $('<li>');
					li.css('float', 'none');
					li.css('text-align', 'left');				
					li.text(values[v]);
					ul.append(li);
					matches++;
				}
			}
		}
		
		if(matches > 0) {
			div.append(ul);
			
			ul.on('click', 'li', function(e) {
				elem.val($(this).text());
				elem.focus();
				div.remove();
			});
		}
	}
	
	//public
	ME.init = function(data) {
		$.each(data, function(key, value) {
			var elem = $('#'+key);
			
			elem.on('focus', function(e) {
				suggest(elem, value);
			});
			
			elem.on('keyup', function(e) {
				if(e.keyCode == 38) {
					var div = $(elem.parent().find('.suggestions')[0]);
					if(div !== null) {
						var active = $(div.find('li.active'));
						if(active == null || active.length <= 0) {
							var first = $(div.find('li').first());
							first.addClass('active');
							elem.val(first.text());
						} else {
							active.prev().addClass('active');
							elem.val(active.prev().text());
							active.removeClass('active');
						}
					}
				} else if(e.keyCode == 40) {
					var div = $(elem.parent().find('.suggestions')[0]);
					if(div !== null) {
						var active = $(div.find('li.active'));
						if(active == null || active.length <= 0) {
							var first = $(div.find('li').first());
							first.addClass('active');
							elem.val(first.text());
						}  else {
							active.next().addClass('active');
							elem.val(active.next().text());
							active.removeClass('active');
						}
					}
				} else if(e.keyCode == 13) {
					elem.blur();
					
				} else {
					suggest(elem, value);
				}
			});
		});
	}

	return ME;
}();