// JavaScript Document
var UOS = UOS || {};
UOS.BetaExpand = UOS.BetaExpand || function() {

	var PUBLIC = {};
	
	PUBLIC.init = 	function() {
						$( ".cross" ).click(function() {
		
							$( "div#betaBanner" ).slideUp(1000);
			
						});
					};
	return PUBLIC;
	
	
}();