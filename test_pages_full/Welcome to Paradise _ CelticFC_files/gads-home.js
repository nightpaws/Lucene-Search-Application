var googletag = googletag || {};
googletag.cmd = googletag.cmd || [];
(function() {
var gads = document.createElement('script');
gads.async = true;
gads.type = 'text/javascript';
var useSSL = 'https:' == document.location.protocol;
gads.src = (useSSL ? 'https:' : 'http:') + 
'//www.googletagservices.com/tag/js/gpt.js';
var node = document.getElementsByTagName('script')[0];
node.parentNode.insertBefore(gads, node);
})();

 // GPT slots
 var gptAdSlots = [];
googletag.cmd.push(function() {

googletag.defineSlot('/6789706/CelticFCnet_home_page_MPU_300x250', [300, 250], 'div-gpt-ad-1424267367816-0').addService(googletag.pubads());

googletag.pubads().enableSingleRequest();
googletag.pubads().collapseEmptyDivs();
googletag.enableServices();
});
