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
    var mappingSidebar300x250Unit = googletag.sizeMapping().
        addSize([0, 0], []).
        addSize([765, 50], [300, 250]).build();


googletag.defineSlot('/6789706/celticfcnet_wholesite_MPU_300x250', [300, 250], 'div-gpt-ad-1424267096866-0').defineSizeMapping(mappingSidebar300x250Unit).addService(googletag.pubads());
googletag.pubads().enableSingleRequest();
googletag.pubads().collapseEmptyDivs();
googletag.enableServices();
});
