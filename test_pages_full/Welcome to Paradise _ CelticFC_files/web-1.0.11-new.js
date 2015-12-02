/*
 HTML5 Shiv v3.6.2 | @afarkas @jdalton @jon_neal @rem | MIT/GPL2 Licensed
*/
(function(l,f){function m(){var a=e.elements;return"string"==typeof a?a.split(" "):a}function i(a){var b=n[a[o]];b||(b={},h++,a[o]=h,n[h]=b);return b}function p(a,b,c){b||(b=f);if(g)return b.createElement(a);c||(c=i(b));b=c.cache[a]?c.cache[a].cloneNode():r.test(a)?(c.cache[a]=c.createElem(a)).cloneNode():c.createElem(a);return b.canHaveChildren&&!s.test(a)?c.frag.appendChild(b):b}function t(a,b){if(!b.cache)b.cache={},b.createElem=a.createElement,b.createFrag=a.createDocumentFragment,b.frag=b.createFrag();
a.createElement=function(c){return!e.shivMethods?b.createElem(c):p(c,a,b)};a.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+m().join().replace(/\w+/g,function(a){b.createElem(a);b.frag.createElement(a);return'c("'+a+'")'})+");return n}")(e,b.frag)}function q(a){a||(a=f);var b=i(a);if(e.shivCSS&&!j&&!b.hasCSS){var c,d=a;c=d.createElement("p");d=d.getElementsByTagName("head")[0]||d.documentElement;c.innerHTML="x<style>article,aside,figcaption,figure,footer,header,main,nav,section{display:block}mark{background:#FF0;color:#000}</style>";
c=d.insertBefore(c.lastChild,d.firstChild);b.hasCSS=!!c}g||t(a,b);return a}var k=l.html5||{},s=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,r=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,j,o="_html5shiv",h=0,n={},g;(function(){try{var a=f.createElement("a");a.innerHTML="<xyz></xyz>";j="hidden"in a;var b;if(!(b=1==a.childNodes.length)){f.createElement("a");var c=f.createDocumentFragment();b="undefined"==typeof c.cloneNode||
"undefined"==typeof c.createDocumentFragment||"undefined"==typeof c.createElement}g=b}catch(d){g=j=!0}})();var e={elements:k.elements||"abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup main mark meter nav output progress section summary time video",version:"3.6.2",shivCSS:!1!==k.shivCSS,supportsUnknownElements:g,shivMethods:!1!==k.shivMethods,type:"default",shivDocument:q,createElement:p,createDocumentFragment:function(a,b){a||(a=f);if(g)return a.createDocumentFragment();
for(var b=b||i(a),c=b.frag.cloneNode(),d=0,e=m(),h=e.length;d<h;d++)c.createElement(e[d]);return c}};l.html5=e;q(f)})(this,document);

var mobileNavigation = {
	'main': {
		'title'		: '',
		'navType'	: '',
		'link'		: '',
		'rel'		: '',
		'subNav' : {
			'home': {
				'title'		: 'home',
				'navType'	: 'mobileSubNavPage',
				'link'		: 'index',
				'rel'		: ''
			},
			'team': {
				'title'		: 'teams &amp; fixtures',
				'navType'	: 'mobileSubNav',
				'link'		: '',
				'rel'		: '1-teams'
			},
			'news': {
				'title'		: 'news',
				'navType'	: 'mobileSubNav',
				'link'		: '',
				'rel'		: '1-news'
			},
			'tickets': {
				'title'		: 'tickets',
				'navType'	: 'mobileSubNav',
				'link'		: '',
				'rel'		: '1-tickets'
			},
			'celtictv': {
				'title'		: 'celtic tv',
				'navType'	: 'mobileSubNavPage',
				'link'		: 'http://www.celticfc.tv',
				'rel'		: ''
			},
			'hospitality': {
				'title'		: 'hospitality',
				'navType'	: 'mobileSubNav',
				'link'		: '',
				'rel'		: '1-hospitality'
			},
			'club': {
				'title'		: 'club',
				'navType'	: 'mobileSubNav',
				'link'		: '',
				'rel'		: '1-club'
			},
			'shop': {
				'title'		: 'shop',
				'navType'	: 'mobileSubNav',
				'link'		: '',
				'rel'		: '1-shop'
			},
			'more': {
				'title'		: 'more',
				'navType'	: 'mobileSubNav',
				'link'		: '',
				'rel'		: '1-more'
			}
		}
	},
	'teams': {
		'title'		: 'teams',
		'navType'	: 'mobileSubNav',
		'link'		: '',
		'rel'		: '1-teams',
		'subNav' : {
			'back': {
				'title'		: 'back to main menu',
				'navType'	: 'mobileSubNavReturn',
				'link'		: '',
				'rel'		: '1-main'
			},
			'link1':{
				'title'		: 'Players',
				'navType'	: 'mobileSubNav',
				'link'		: '',
				'rel'		: '2-teams-link1',
				'subNav'	: {
					'back': {
						'title'		: 'back to teams',
						'navType'	: 'mobileSubNavReturn',
						'link'		: '',
						'rel'		: '2-teams'
					},
					'item1': {
						'title'		: 'First Team',
						'navType'	: 'mobileSubNavPage',
						'link'		: 'team',
						'rel'		: ''
					},
					'item2': {
						'title'		: 'Under 20s',
						'navType'	: 'mobileSubNavPage',
						'link'		: 'team/youths',
						'rel'		: ''
					},
					'item3': {
						'title'		: 'Academy',
						'navType'	: 'mobileSubNavPage',
						'link'		: 'team/academy',
						'rel'		: ''
					},
					'item4': {
						'title'		: 'Women and Girls',
						'navType'	: 'mobileSubNavPage',
						'link'		: 'team/women',
						'rel'		: ''
					}
				}
			},
			'link2':{
				'title'		: 'Fixtures',
				'navType'	: 'mobileSubNav',
				'link'		: '',
				'rel'		: '2-teams-link2',
				'subNav'	: {
					'back': {
						'title'		: 'back to teams',
						'navType'	: 'mobileSubNavReturn',
						'link'		: '',
						'rel'		: '2-teams'
					},
					'item1': {
						'title'		: 'First Team',
						'navType'	: 'mobileSubNavPage',
						'link'		: 'fixtures',
						'rel'		: ''
					},
					'item2': {
						'title'		: 'Development Squad',
						'navType'	: 'mobileSubNavPage',
						'link'		: 'fixtures/youths',
						'rel'		: ''
					},
					'item3': {
						'title'		: "Women's Team",
						'navType'	: 'mobileSubNavPage',
						'link'		: 'fixtures/women',
						'rel'		: ''
					}
				}
			},
			'link3':{
				'title'		: 'League Table',
				'navType'	: 'mobileSubNav',
				'link'		: '',
				'rel'		: '2-teams-link3',
				'subNav'	: {
					'back': {
						'title'		: 'back to teams',
						'navType'	: 'mobileSubNavReturn',
						'link'		: '',
						'rel'		: '2-teams'
					},
					'item1': {
						'title'		: 'SPFL Premiership',
						'navType'	: 'mobileSubNavPage',
						'link'		: 'table',
						'rel'		: ''
					},
					'item2': {
						'title'		: 'Development Squad',
						'navType'	: 'mobileSubNavPage',
						'link'		: 'table/youths',
						'rel'		: ''
					},
					'item3': {
						'title'		: "Women's Team",
						'navType'	: 'mobileSubNavPage',
						'link'		: 'table/women',
						'rel'		: ''
					}
				}
			}
		}
	},
	'news': {
		'title'		: 'news',
		'navType'	: 'mobileSubNav',
		'link'		: '',
		'rel'		: '1-news',
		'subNav' : {
			'back': {
				'title'		: 'back to main menu',
				'navType'	: 'mobileSubNavReturn',
				'link'		: '',
				'rel'		: '1-main'
			},
			'link1':{
				'title'		: 'Show All',
				'navType'	: 'mobileSubNavPage',
				'link'		: 'news',
				'rel'		: ''
			},
			'link2':{
				'title'		: 'First Team',
				'navType'	: 'mobileSubNavPage',
				'link'		: 'news/firstteam',
				'rel'		: ''
			},
			'link3':{
				'title'		: 'Under 20s',
				'navType'	: 'mobileSubNavPage',
				'link'		: 'news/under20',
				'rel'		: ''
			},
			'link4':{
				'title'		: 'Match Reports',
				'navType'	: 'mobileSubNavPage',
				'link'		: 'news/matchreport',
				'rel'		: ''
			},
			'link5':{
				'title'		: 'Women\'s Team',
				'navType'	: 'mobileSubNavPage',
				'link'		: 'news/women',
				'rel'		: ''
			},
			'link6':{
				'title'		: 'Tickets',
				'navType'	: 'mobileSubNavPage',
				'link'		: 'news/tickets',
				'rel'		: ''
			},
			'link7':{
				'title'		: 'Commercial',
				'navType'	: 'mobileSubNavPage',
				'link'		: 'news/commercial',
				'rel'		: ''
			},
			'other':{
				'title'		: 'Other',
				'navType'	: 'mobileSubNav',
				'link'		: '',
				'rel'		: '2-news-other',
				'subNav'	: {
					'back': {
						'title'		: 'back to news',
						'navType'	: 'mobileSubNavReturn',
						'link'		: '',
						'rel'		: '2-news'
					},
					'item1': {
						'title'		: 'Academy',
						'navType'	: 'mobileSubNavPage',
						'link'		: 'news/academy',
						'rel'		: ''
					},
					'item2': {
						'title'		: 'Publications',
						'navType'	: 'mobileSubNavPage',
						'link'		: 'pages/publications',
						'rel'		: ''
					},
					'item3': {
						'title'		: 'Text Alerts',
						'navType'	: 'mobileSubNavPage',
						'link'		: 'pages/newstexts',
						'rel'		: ''
					}
				}
			}
		}
	},
	'tickets': {
		'title'		: 'tickets',
		'navType'	: 'mobileSubNav',
		'link'		: '',
		'rel'		: '1-tickets',
		'subNav' : {
			'back': {
				'title'		: 'back to main menu',
				'navType'	: 'mobileSubNavReturn',
				'link'		: '',
				'rel'		: '1-main'
			},
			'item1': {
				'title'		: 'Home Tickets',
				'navType'	: 'mobileSubNavPage',
				'link'		: 'tickets',
				'rel'		: ''
			},
			'item2': {
				'title'		: 'Away Tickets',
				'navType'	: 'mobileSubNavPage',
				'link'		: 'tickets/away',
				'rel'		: ''
			},
			'item3': {
				'title'		: 'Ticket Office',
				'navType'	: 'mobileSubNavPage',
				'link'		: 'tickets',
				'rel'		: ''
			},
            'item4': {
                'title'		: 'New Access Control',
                'navType'	: 'mobileSubNavPage',
                'link'		: 'tickets/accesscontrol',
                'rel'		: ''
            },
			'item5': {
				'title'		: 'Away Ticket Reg Scheme',
				'navType'	: 'mobileSubNavPage',
				'link'		: 'tickets/awayreg',
				'rel'		: ''
			},
			'item6': {
				'title'		: 'Print @ Home',
				'navType'	: 'mobileSubNavPage',
				'link'		: 'tickets/ticketfast',
				'rel'		: ''
			},
			'link7':{
				'title'		: 'Matchday',
				'navType'	: 'mobileSubNav',
				'link'		: '',
				'rel'		: '2-tickets-link7',
				'subNav'	: {
					'back': {
						'title'		: 'back to tickets',
						'navType'	: 'mobileSubNavReturn',
						'link'		: '',
						'rel'		: '2-tickets'
					},
					'item1': {
						'title'		: 'Next Match Details',
						'navType'	: 'mobileSubNavPage',
						'link'		: 'matchday',
						'rel'		: ''
					},
					'item2': {
						'title'		: 'Getting to Celtic Park',
						'navType'	: 'mobileSubNavPage',
						'link'		: 'pages/gettinghere',
						'rel'		: ''
					},
					'item3': {
						'title'		: 'Stadium Plan',
						'navType'	: 'mobileSubNavPage',
						'link'		: 'pages/stadiumplan',
						'rel'		: ''
					},
					'item4': {
						'title'		: 'First Time Fans',
						'navType'	: 'mobileSubNavPage',
						'link'		: 'tickets/firsttimefans',
						'rel'		: ''
					},
					'item5': {
						'title'		: 'Supporters w/ Disabilities',
						'navType'	: 'mobileSubNavPage',
						'link'		: 'pages/fansdisabilities',
						'rel'		: ''
					},
					'item6': {
						'title'		: 'Ground Regulations',
						'navType'	: 'mobileSubNavPage',
						'link'		: 'pages/corporate_groundregulations',
						'rel'		: ''
					},
					'item7': {
						'title'		: 'Unacceptable Conduct',
						'navType'	: 'mobileSubNavPage',
						'link'		: 'pages/corporate_unacceptableconduct',
						'rel'		: ''
					},
					'item8': {
						'title'		: 'Big Screen Messages',
						'navType'	: 'mobileSubNavPage',
						'link'		: 'pages/bigscreens',
						'rel'		: ''
					}
				}
			},
			'item8':{
				'title'		: 'Season Tickets',
				'navType'	: 'mobileSubNavPage',
				'link'		: 'http://www.soundofceltic.com?utm_source=celticfc&utm_medium=navmob&utm_campaign=stlink',
				'rel'		: ''
			}
		}
	},
	'hospitality': {
		'title'		: 'hospitality',
		'navType'	: 'mobileSubNav',
		'link'		: '',
		'rel'		: '1-hospitality',
		'subNav' : {
			'back': {
				'title'		: 'back to main menu',
				'navType'	: 'mobileSubNavReturn',
				'link'		: '',
				'rel'		: '1-main'
			},
			'item1': {
				'title'		: 'Hospitality Home',
				'navType'	: 'mobileSubNavPage',
				'link'		: 'hospitality',
				'rel'		: ''
			},
			'item2': {
				'title'		: 'Kerrydale Bar',
				'navType'	: 'mobileSubNavPage',
				'link'		: 'hospitality/kerrydalebar',
				'rel'		: ''
			},
			'item3': {
				'title'		: 'Meetings and Events',
				'navType'	: 'mobileSubNavPage',
				'link'		: 'hospitality/nonmatchday',
				'rel'		: ''
			},
			'item4': {
				'title'		: 'Number 7 Restaurant',
				'navType'	: 'mobileSubNavPage',
				'link'		: 'hospitality/number7',
				'rel'		: ''
			},
			'item5': {
				'title'		: 'Upcoming Events',
				'navType'	: 'mobileSubNavPage',
				'link'		: 'hospitality/events',
				'rel'		: ''
			},
			'item6': {
				'title'		: 'Offsite Catering',
				'navType'	: 'mobileSubNavPage',
				'link'		: 'hospitality/offsitecatering',
				'rel'		: ''
			},
			'item7': {
				'title'		: 'Terms and Conditions',
				'navType'	: 'mobileSubNavPage',
				'link'		: 'hospitality/tncs',
				'rel'		: ''
			},
			'item8': {
				'title'		: 'Contact Us',
				'navType'	: 'mobileSubNavPage',
				'link'		: 'hospitality/contact',
				'rel'		: ''
			}
		}
	},
	'club': {
		'title'		: 'club',
		'navType'	: 'mobileSubNav',
		'link'		: '',
		'rel'		: '1-club',
		'subNav' : {
			'back': {
				'title'		: 'back to main menu',
				'navType'	: 'mobileSubNavReturn',
				'link'		: '',
				'rel'		: '1-main'
			},
			'item1': {
				'title'		: 'Contact Information',
				'navType'	: 'mobileSubNavPage',
				'link'		: 'pages/contactinfo',
				'rel'		: ''
			},
			'item2': {
				'title'		: 'History',
				'navType'	: 'mobileSubNavPage',
				'link'		: 'pages/history',
				'rel'		: ''
			},
			'item3': {
				'title'		: 'Jobs',
				'navType'	: 'mobileSubNavPage',
				'link'		: 'pages/jobs',
				'rel'		: ''
			},
			'item4': {
				'title'		: 'Stadium Tours',
				'navType'	: 'mobileSubNavPage',
				'link'		: 'pages/tours',
				'rel'		: ''
			},
			'link5': {
				'title'		: 'Soccer Academy',
				'navType'	: 'mobileSubNav',
				'link'		: '',
				'rel'		: '2-club-link5',
				'subNav'	: {
					'back': {
						'title'		: 'back to club',
						'navType'	: 'mobileSubNavReturn',
						'link'		: '',
						'rel'		: '2-club'
					},
					'item1': {
						'title'		: 'Holiday Skill Schools',
						'navType'	: 'mobileSubNavPage',
						'link'		: 'pages/celticsocceracademy_skillschools',
						'rel'		: ''
					},
					'item2': {
						'title'		: 'Weekly Skill Schools',
						'navType'	: 'mobileSubNavPage',
						'link'		: 'pages/celticsocceracademy_weeklyschools',
						'rel'		: ''
					},
					'item3': {
						'title'		: 'Play on the Park',
						'navType'	: 'mobileSubNavPage',
						'link'		: 'pages/celticsocceracademy_playonthepark',
						'rel'		: ''
					},
					'item4': {
						'title'		: 'Team Training',
						'navType'	: 'mobileSubNavPage',
						'link'		: 'pages/celticsocceracademy_clubdevelopment',
						'rel'		: ''
					},
					'item5': {
						'title'		: 'Make a Booking',
						'navType'	: 'mobileSubNavPage',
						'link'		: 'courses',
						'rel'		: ''
					},
					'item6': {
						'title'		: 'International',
						'navType'	: 'mobileSubNavPage',
						'link'		: 'pages/celticsocceracademy_international',
						'rel'		: ''
					},
					'item7': {
						'title'		: 'Coaches Convention',
						'navType'	: 'mobileSubNavPage',
						'link'		: 'pages/celticsocceracademy_convention',
						'rel'		: ''
					}
				}
			},
			'link6':{
				'title'		: 'Social Policies',
				'navType'	: 'mobileSubNav',
				'link'		: '',
				'rel'		: '2-club-link6',
				'subNav'	: {
					'back': {
						'title'		: 'back to club',
						'navType'	: 'mobileSubNavReturn',
						'link'		: '',
						'rel'		: '2-club'
					},
					'item1': {
						'title'		: 'Social Mission Statement',
						'navType'	: 'mobileSubNavPage',
						'link'		: 'pages/corporate_socialmission',
						'rel'		: ''
					},
					'item2': {
						'title'		: 'Unacceptable Conduct',
						'navType'	: 'mobileSubNavPage',
						'link'		: 'pages/corporate_unacceptableconduct',
						'rel'		: ''
					},
					'item3': {
						'title'		: 'Ground Regulations',
						'navType'	: 'mobileSubNavPage',
						'link'		: 'pages/corporate_groundregulations',
						'rel'		: ''
					},
					'item4': {
						'title'		: 'Social Charter',
						'navType'	: 'mobileSubNavPage',
						'link'		: 'pages/corporate_socialcharter',
						'rel'		: ''
					},
					'item5': {
						'title'		: 'Fans with Disabilities',
						'navType'	: 'mobileSubNavPage',
						'link'		: 'pages/fansdisabilities',
						'rel'		: ''
					}
				}
			},
			'link7':{
				'title'		: 'Corporate',
				'navType'	: 'mobileSubNav',
				'link'		: '',
				'rel'		: '2-club-link7',
				'subNav'	: {
					'back': {
						'title'		: 'back to club',
						'navType'	: 'mobileSubNavReturn',
						'link'		: '',
						'rel'		: '2-club'
					},
					'item1': {
						'title'		: 'Board of Directors',
						'navType'	: 'mobileSubNavPage',
						'link'		: 'pages/corporate_boardofdirectors',
						'rel'		: ''
					},
					'item2': {
						'title'		: 'Investor News',
						'navType'	: 'mobileSubNavPage',
						'link'		: 'pages/corporate_investornews',
						'rel'		: ''
					},
					'item3': {
						'title'		: 'Boiler Room Scam Advice',
						'navType'	: 'mobileSubNavPage',
						'link'		: 'news/4477',
						'rel'		: ''
					},
					'item4': {
						'title'		: 'Stock Exchange Notification',
						'navType'	: 'mobileSubNavPage',
						'link'		: 'pages/corporate_stockexchange',
						'rel'		: ''
					},
					'item5': {
						'title'		: 'Share Price',
						'navType'	: 'mobileSubNavPage',
						'link'		: 'http://www.londonstockexchange.com/exchange/prices-and-markets/stocks/summary/company-summary.html?fourWayKey=GB0004339189GBGBXAIMI',
						'rel'		: ''
					},
					'item6': {
						'title'		: 'Share Capital',
						'navType'	: 'mobileSubNavPage',
						'link'		: 'pages/corporate_sharecapital',
						'rel'		: ''
					}
				}
			},
			'link8':{
				'title'		: 'Other',
				'navType'	: 'mobileSubNav',
				'link'		: '',
				'rel'		: '2-club-link8',
				'subNav'	: {
					'back': {
						'title'		: 'back to club',
						'navType'	: 'mobileSubNavReturn',
						'link'		: '',
						'rel'		: '2-club'
					},
					'item1': {
						'title'		: 'Location',
						'navType'	: 'mobileSubNavPage',
						'link'		: 'pages/gettinghere',
						'rel'		: ''
					},
					'item2': {
						'title'		: 'Club FAQs',
						'navType'	: 'mobileSubNavPage',
						'link'		: 'pages/clubfaqs',
						'rel'		: ''
					}
				}
			}
		}
	},
	'shop': {
		'title'		: 'shop',
		'navType'	: 'mobileSubNav',
		'link'		: '',
		'rel'		: '1-shop',
		'subNav' : {
			'back': {
				'title'		: 'back to main menu',
				'navType'	: 'mobileSubNavReturn',
				'link'		: '',
				'rel'		: '1-main'
			},
			'item1': {
				'title'		: 'Online Shop',
				'navType'	: 'mobileSubNavPage',
				'link'		: 'http://celticsuperstore.co.uk/stores/celtic/default.aspx?portal=SI2NJA2K&CMP=PEC-SI2NJA2K',
				'rel'		: ''
			},
			'item2': {
				'title'		: 'A Piece of Paradise',
				'navType'	: 'mobileSubNavPage',
				'link'		: 'pages/pieceofparadise',
				'rel'		: ''
			},
			'item3': {
				'title'		: 'Seat Plaques',
				'navType'	: 'mobileSubNavPage',
				'link'		: 'pages/plaques',
				'rel'		: ''
			},
			'item4': {
				'title'		: 'Bricks and Paving Stones',
				'navType'	: 'mobileSubNavPage',
				'link'		: 'bricks',
				'rel'		: ''
			},
			'item5': {
				'title'		: 'Shop Locations',
				'navType'	: 'mobileSubNavPage',
				'link'		: 'pages/shopfinder',
				'rel'		: ''
			},
			'item6': {
				'title'		: 'Celtic FC Prints',
				'navType'	: 'mobileSubNavPage',
				'link'		: 'http://www.celticfcprints.net/ ',
				'rel'		: ''
			},
			'item7': {
				'title'		: 'Publications',
				'navType'	: 'mobileSubNavPage',
				'link'		: 'pages/publications',
				'rel'		: ''
			},
			'item8': {
				'title'		: 'Celtic TV',
				'navType'	: 'mobileSubNavPage',
				'link'		: 'http://www.celticfc.tv',
				'rel'		: ''
			}
		}
	},
	'more': {
		'title'		: 'more',
		'navType'	: 'mobileSubNav',
		'link'		: '',
		'rel'		: '1-more',
		'subNav' : {
			'back': {
				'title'		: 'back to main menu',
				'navType'	: 'mobileSubNavReturn',
				'link'		: '',
				'rel'		: '1-main'
			},
			'fans': {
				'title'		: 'fans',
				'navType'	: 'mobileSubNav',
				'link'		: '',
				'rel'		: '2-more-fans',
				'subNav'	: {
					'back': {
						'title'		: 'back to more',
						'navType'	: 'mobileSubNavReturn',
						'link'		: '',
						'rel'		: '2-more'
					},
					'item1': {
						'title'		: 'Supporters with Disabilities',
						'navType'	: 'mobileSubNavPage',
						'link'		: 'pages/fansdisabilities',
						'rel'		: ''
					},
					'link2':{
						'title'		: 'Young Hoops Club',
						'navType'	: 'mobileSubNav',
						'link'		: '',
						'rel'		: '3-more-fans-link2',
						'subNav'	: {
							'back': {
								'title'		: 'back to fans',
								'navType'	: 'mobileSubNavReturn',
								'link'		: '',
								'rel'		: '3-more-fans'
							},
							'item1': {
								'title'		: 'Home',
								'navType'	: 'mobileSubNavPage',
								'link'		: 'pages/younghoops',
								'rel'		: ''
							},
							'item2': {
								'title'		: 'Events',
								'navType'	: 'mobileSubNavPage',
								'link'		: 'pages/younghoops_events',
								'rel'		: ''
							},
							'item3': {
								'title'		: 'Mascot',
								'navType'	: 'mobileSubNavPage',
								'link'		: 'pages/younghoops_mascot',
								'rel'		: ''
							},
							'item4': {
								'title'		: 'Gallery',
								'navType'	: 'mobileSubNavPage',
								'link'		: 'pages/younghoops_gallery',
								'rel'		: ''
							},
							'item5': {
								'title'		: 'Competitions',
								'navType'	: 'mobileSubNavPage',
								'link'		: 'pages/younghoops_competitions',
								'rel'		: ''
							},
							'item6': {
								'title'		: 'Q &amp; A',
								'navType'	: 'mobileSubNavPage',
								'link'		: 'pages/younghoops_qanda',
								'rel'		: ''
							},
							'item7': {
								'title'		: 'What our Member\'s Think',
								'navType'	: 'mobileSubNavPage',
								'link'		: 'pages/younghoops_testimonials',
								'rel'		: ''
							}
						}
					},
					'link3':{
						'title'		: 'Mobile',
						'navType'	: 'mobileSubNav',
						'link'		: '',
						'rel'		: '3-more-fans-link3',
						'subNav'	: {
							'back': {
								'title'		: 'back to fans',
								'navType'	: 'mobileSubNavReturn',
								'link'		: '',
								'rel'		: '3-more-fans'
							},
							'item1': {
								'title'		: 'CelticLive',
								'navType'	: 'mobileSubNavPage',
								'link'		: 'celticlive',
								'rel'		: ''
							},
							'item2': {
								'title'		: 'Text Alerts',
								'navType'	: 'mobileSubNavPage',
								'link'		: 'pages/newstexts',
								'rel'		: ''
							},
							'item3': {
								'title'		: 'Official App',
								'navType'	: 'mobileSubNavPage',
								'link'		: 'pages/mobile',
								'rel'		: ''
							},
							'item4': {
								'title'		: 'Powershot Challenge',
								'navType'	: 'mobileSubNavPage',
								'link'		: 'http://powershotchallenge.com/celticfc/',
								'rel'		: ''
							}
						}
					},
					'link4':{
						'title'		: 'Supporters',
						'navType'	: 'mobileSubNav',
						'link'		: '',
						'rel'		: '3-more-fans-link4',
						'subNav'	: {
							'back': {
								'title'		: 'back to fans',
								'navType'	: 'mobileSubNavReturn',
								'link'		: '',
								'rel'		: '3-more-fans'
							},
							'item1': {
								'title'		: 'Supporters Liaison Officer',
								'navType'	: 'mobileSubNavPage',
								'link'		: 'pages/supporterliaisonofficer',
								'rel'		: ''
							},
							'item2': {
								'title'		: 'Supporter Charter',
								'navType'	: 'mobileSubNavPage',
								'link'		: 'pages/supportercharter',
								'rel'		: ''
							},
							'item3': {
								'title'		: 'Complaints',
								'navType'	: 'mobileSubNavPage',
								'link'		: 'pages/supportercomplaints',
								'rel'		: ''
							},
							'item4': {
								'title'		: 'Supporters\' Clubs',
								'navType'	: 'mobileSubNavPage',
								'link'		: 'pages/supportersclubs',
								'rel'		: ''
							}
						}
					}
				}
			},
			'item2': {
				'title'		: 'Celtic FC Foundation',
				'navType'	: 'mobileSubNavPage',
				'link'		: 'http://www.celticfc.net/charity',
				'rel'		: ''
			},
			'item3': {
				'title'		: 'Celtic FC Travel',
				'navType'	: 'mobileSubNavPage',
				'link'		: 'http://www.celticfctravel.com/',
				'rel'		: ''
			},
			'item4': {
				'title'		: 'Celtic Pools',
				'navType'	: 'mobileSubNavPage',
				'link'		: 'http://www.celticfc.net/pools',
				'rel'		: ''
			},
			'item5': {
				'title'		: 'Sponsors',
				'navType'	: 'mobileSubNavPage',
				'link'		: 'sponsors',
				'rel'		: ''
			},
			'item6': {
				'title'		: 'Publications',
				'navType'	: 'mobileSubNavPage',
				'link'		: 'pages/publications',
				'rel'		: ''
			}
		}
	}
}

$(window).load(function(){
	bxLen=$(".bxslider li").length;
	if(bxLen>1){
		$('.bxslider').show().bxSlider({auto:true,speed:2500,pause:6000,touchEnabled:true});
	}else{
		$(".bxslider").show();
	}
	if (navigator.appVersion.indexOf("MSIE") != -1) {
		$('nav td a').css({'width':'146px'});
	}
});
var menu='off';
var mmenu=0;
function showMenu(a,e,type) {
	if(type=='show') {
		var h = 0;
		if(menu=='on') {
			if($(a).hasClass('active')){
				window.location.href=$(a).data("href");
			}
			$(a).siblings().children('.fullMenu').hide();
		}
		menu = 'on';
		if($('.news').length === 0) {
		} else {
			//h = $('.news').css('height');
			//$('.fullMenu').css({'height':h});
		}
		$(a).children('.fullMenu').show();
		$(a).siblings().removeClass('active');
		$(a).addClass('active');
		e.preventDefault();
	} else if(type='hide') {
		$(a).siblings().removeClass('active');
		$(a).removeClass('active');
		page=$('body').data('page');
		$(a).parent().children("[rel="+page+"]").addClass('active');
		$(a).children('.fullMenu').hide();
		menu = 'off';
	}
}

function createMobileNav(navArray,idName) {
	menu = '';
	$.each(menuStart, function(i, item) {
		menu+='<li class="'+item['navType']+'"';
		if(item['rel'].length>0) {
			menu+=' rel="'+item['rel']+'" ';
		}
		if(item['link'].length>0) {
			menu+=' data-href="'+item['link']+'" ';
		}
		menu+='><span>'+item['title']+'</span>';
		if(item['navType']=='mobileSubNav'){
			menu+='<div class="triangle"></div>';
		}
		menu+='</li>';
	});


	return menu;
}
function fadeNext() {
	$('.rotator').each(function() {
		if($(this).children("ul").children("li").length>1){
			$(this).children("ul").children('li').first().fadeOut().appendTo($(this).children('ul'));
			$(this).children("ul").children('li').first().fadeIn();
			h=$(this).children("ul").children('li').first('img').css('height');
			$(this).children('ul').css({'height':h});
		}
	});
}
$(document).ready(function() {

	if($('body').width()<489) {
		 $("meta[name=viewport]").attr('content','width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no');
	} else if($('body').width()>767 && $('body').width()<1023) {
		 $("meta[name=viewport]").attr('content','width=device-width, initial-scale=1, maximum-scale=3, minimum-scale=1, user-scalable=no');
	}

	$(window).load(function(){
		$('.rotator').each(function() {
			$(this).children("ul").children('li:not(:first)').hide();
			h=$(this).children("ul").children('li').first('img').css('height');
			$(this).children('ul').css({'height':h});
		});

		if ($('.rotator').length != 0) {
			setInterval(fadeNext, 4000);
		}

		if($('body').data('page')=='hospitality') {
			mh=0;
			$('.hospitalitySubData > ul > li').each(function() {
				if($(this).height()>=mh) { mh=$(this).height(); }
			});
			tmh=mh+40;
			$('.hospitalitySub').css({'height':tmh+'px'});
		}

	});


	$(document).on('mouseenter','.menuItem',function(e) {
		//showMenu(this,e,'show');

	});
	$(document).on('mouseleave','.menuItem',function(e) {
		showMenu(this,e,'hide');
	});

	$(document).on('click tap','.logo',function() {
		window.location.href=$("header").data("siteurl");
	});

	$(document).on('click','#loginBtn',function() {
		$('#cfcLogin').submit();
	});
	var oHPT=$(".playersTable li").height();
	$(document).on('click tap','.playersTable li,.sponsorsTable li',function(e){
		e.preventDefault(); e.stopImmediatePropagation();
		href=$(this).attr('data-href');
		if(href != '' && href != undefined){
			sLen=$("header").data("siteurl").length;
			if(href.substr(0,sLen) != $("header").data("siteurl")){
				window.open(href)
			}else{
				window.location.href=href;
			}
		}else{
			if($(this).children('.playerDescription').length > 0 && $(this).children('.playerDescription').text() != ''){
				$(".playerDecsription").hide();
				$(".playersTable li").css("height","");
				$(".playerName").css("bottom","0px");
				nH=$(this).height();
				if($(this).children(".playerDescription").css("display") == 'none'){
					$(".playerDescription").hide();
					$(this).children(".playerDescription").show();
					h=$(this).children(".playerDescription").height()+nH;
					$(this).css("height",h+"px");
					$(this).children(".playerName").css("bottom",$(this).children(".playerDescription").height()+"px");
				}else{
					$(this).children(".playerDescription").hide();
					$(this).css("height","");
					$(this).children(".playerName").css("bottom","0px");
				}
			}
		}
	});
	$(document).on('tap click','.bx-wrapper',function(e) {
		if(menu=='on') {
			e.preventDefault();
		}
	});

	$(document).on('tap click mouseenter','.menuItem',function(e) {
		if(e.target.nodeName!='A') {
			e.stopImmediatePropagation();
			e.preventDefault();
		}
		if(menu=='on' && $(this).children('.fullMenu').css('display')!='none') {
			if(e.target.nodeName != 'SPAN' && e.target.nodeName != 'IMG'){
				if(e.target.nodeName=='A') {
					window.location.href=e.target.href;
					e.stopImmediatePropagation();
				} else {
					return;
				}
			}
			var link=e.target.href;
			if(!link){
				var link = $(this).attr('data-href');
			}
			var site='';
			var webUrl=$('header').data('siteurl');
			var l = webUrl.length;
			if(typeof link === 'undefined') { } else {
				if(link.substr(0,4)!='http') {
					site=$('header').data('siteurl');
					link=site+link;
				}
				if(link.substr(0,l)==webUrl) {
					window.location.href = link;
				} else {
					window.open(link);
				}
			}
		} else {
			showMenu(this,e,'show');
		}
	});

	$(document).on('click tap','.sponsorLinks li',function(e){
		e.stopImmediatePropagation(); e.preventDefault();
		if($(this).data('href')){
			window.open($(this).data('href'));
		}
	});

	$(document).on('tap','html',function(e) {
		if(!$(e.target).parent().hasClass('menuItem')) {
			if(menu=='on') {
				$('.menuItem.active').children('.fullMenu').hide();
				$('.menuItem.active').removeClass('active');
				page=$('body').data('page');
				$('.menuItem[rel='+page+']').addClass('active');
				menu = 'off';
			}
		} else {
			showMenu($(e.target).parent(),e,'show');
			e.stopPropagation(); e.preventDefault();
		}
	});

	$(document).on('mouseenter tap','.hospitalitySub li',function(e) {
		index=$(this).index()+1;
		$(this).siblings().removeClass('active');
		$(this).addClass('active');
		$('.hospitalitySubData > ul > li').css({'display':'none'});
		$('.hospitalitySubData > >:nth-child('+index+')').css({'display':'block'});
		var target = $( $('.hospitalitySubData > >:nth-child('+index+')')).offset();
		var target = target.top+50;
		if($('body').width()<489) {
			$.mobile.silentScroll(target);
		}
        return false;
	});

	$(document).on('tap click','.hospitalitySubData li',function(e) {
		if($(window).width()<='749') {
			$('.hospdata').hide();
			$(this).children('.hospdata').show();
		}
	});

	$(document).on('tap click','html',function(e) {
		e.stopImmediatePropagation();
		if($(e.target).attr('id')!='mobileNav' && !$(e.target).hasClass('mobileSubNavPage')  && !$(e.target).hasClass('mobileSubNav') && !$(e.target).hasClass('mobileSubNavReturn') && mmenu=='250px' && !$(e.target).hasClass('mobileMenu')) {
			$('.mobileMenu').trigger('click');
		}
	});

	$(document).on('tap click','.mobileSubNavPage,.secondaryNav li, .quickNav .box',function(e) {
		e.stopImmediatePropagation();
		e.stopPropagation();
		e.preventDefault();
		var link=String($(this).data('href'));
		var site='';
		var webUrl=$('header').data('siteurl');
		var l = webUrl.length;
		if(link.substr(0,4)!='http' && link != 'back') {
			site=$('header').data('siteurl');
			link=site+link;
		}
		if(link=='http://www.celticfc.net/pools') {
			window.open(link);
			return;
		}
		if(link.substr(0,l)==webUrl) {
			window.location.href = link;
		} else if(link=="back") {
			history.back(1);
		} else {
			window.open(link);
		}
	});

	$(document).on('tap click','.mobileSubNav',function(e) {
		e.stopImmediatePropagation();
		e.stopPropagation();
		e.preventDefault();
		rel = $(this).attr('rel');
		if(rel != 'undefined'){
			rel = rel.split("-");
			nextLevel=parseInt(rel[0])+1;
            console.log(rel);
			menuSection=rel[1];
			menuSubSection='';
            menuSubSubSection='';
			menuStructure = '';
            if(rel[0]>2) {
                menuSubSection=rel[2];
                menuSubSubSection=rel[3];
                menuStart=mobileNavigation[menuSection]['subNav'][menuSubSection]['subNav'][menuSubSubSection]['subNav'];
            } else if(rel[0]>1) {
				menuSubSection=rel[2];
				menuStart=mobileNavigation[menuSection]['subNav'][menuSubSection]['subNav'];
			} else {
				menuStart=mobileNavigation[menuSection]['subNav'];
			}
			currentidname = '';
			nextidname = '';
			if(nextLevel==2) {
				currentidname='menuLevelOne';
				nextidname='menuLevelTwo';
			}else if(nextLevel==3) {
				currentidname='menuLevelTwo';
				nextidname='menuLevelThree';
			}else if(nextLevel==4) {
				currentidname='menuLevelThree';
				nextidname='menuLevelFour';
			}
			menuStructure = createMobileNav(menuStart,nextidname);
			$('#'+nextidname).html(menuStructure);
			$('#'+currentidname).promise().done(function() {
				$('#'+currentidname).css({'left':'auto'}).animate({
					opacity: 0.25,
					right: '250px'
				});
			});
			$('#'+nextidname).css({'display':'block'}).animate({
				opacity: 1,
				left: '0'
			});
		}
	});

	$(document).on('tap click','.mobileSubNavReturn',function(e) {
		e.stopImmediatePropagation();
		e.stopPropagation();
		rel = $(this).attr('rel');
		rel = rel.split("-");
        console.log(rel);
		menuSection=rel[1];
        menuSubSection=rel[2];
		lastLevel=parseInt(rel[0]);
		currentidname = '';
		lastidname = '';
		menuStructure = '';
        console.log(lastLevel);
		if(lastLevel==1) {
			lastidname='menuLevelOne';
			currentidname='menuLevelTwo';
			menuStructure=mmm;
		}else if(lastLevel==2) {
			lastidname='menuLevelTwo';
			currentidname='menuLevelThree';
			menuStart=mobileNavigation[menuSection]['subNav'];
			menuStructure = createMobileNav(menuStart,lastidname);
		}else if(lastLevel==3) {
			lastidname='menuLevelThree';
			currentidname='menuLevelFour';
			menuStart=mobileNavigation[menuSection]['subNav'][menuSubSection]['subNav'];
			menuStructure = createMobileNav(menuStart,lastidname);
		}
		$('#'+lastidname).html(menuStructure);
		$('#'+currentidname).promise().done(function() {
			$('#'+currentidname).css({'left':'auto'}).animate({
				opacity: 0,
				left: '250px'
			});
		});
		$('#'+lastidname).css({'display':'block'}).animate({
			opacity: 1,
			right: '0'
		});
	});

	$(document).on('swipeleft swiperight','body', function(e) {
		e.stopPropagation();
		e.preventDefault();
	});

	$(document).on('touchmove','#mobileNav', function(e) {
		if(mmenu=='250px' && $('#mobileNav').height()>=364) {
			e.stopImmediatePropagation();
			e.stopPropagation();
			e.preventDefault();
		}
	});

	$(document).on('touchmove','body', function(e) {
		if(mmenu=='250px' && $('#mobileNav').height()>=364) {
			e.stopImmediatePropagation();
			e.stopPropagation();
			e.preventDefault();
		}
	});

	$(document).on('click tap','.mobileMenu', function(e) {
		e.stopImmediatePropagation();
		if(typeof mmm==='undefined') {
			menuStart=mobileNavigation['main']['subNav'];
			mmm = createMobileNav(menuStart,'menuLevelOne');
		}
		$('#menuLevelOne').html(mmm);
		if($('#pageContent').css('left')=='250px') {
			mmenu='0';
			$('#mobileMenuIcon').removeClass('active');
		} else {
			mmenu='250px';
			$('#mobileNav').addClass('active');
			$('#mobileMenuIcon').addClass('active');
		}
		$('#pageContent').animate({
			left: mmenu
		}, {
			complete: function() {
				if(mmenu=="0") {
					$('#mobileNav').removeClass('active');
					$('#menuLevelOne').css({'left':'0','right':'0','opacity':'1'});
					$('#menuLevelTwo').css({'left':'250px','right':'0','opacity':'0.25','display':'hidden'});
					$('#menuLevelThree').css({'left':'250px','right':'0','opacity':'0.25','display':'hidden'});
					$('#menuLevelFour').css({'left':'250px','right':'0','opacity':'0.25','display':'hidden'});
				}
			}
		});
	});

	$(window).bind( 'orientationchange', function(e){
		var h = 0;
		if($('.news').length === 0) {
		} else {
			h = $('.news').css('height');
			$('.fullMenu').css({'height':h});
		}

	});

	$(document).on('click tap','.newsItem, .newsFeedItem',function(e){
		if($(this).attr('data-newsId')){
			e.preventDefault(); e.stopImmediatePropagation();
			window.location.href=$('header').data('siteurl')+'news/'+$(this).attr('data-newsId');
		}
	});
	$(document).on('click tap','.mobileTicketsTable > tbody > tr',function(e){
		e.stopImmediatePropagation(); e.preventDefault();
		url=$(this).attr('data-link');
		if(!$(this).hasClass('noLink')){
			if(url != '' && url != 'undefined' && url != undefined){
				len=$("header").data("siteurl").length;
				if(url.substr(0,len) != $("header").data("siteurl")){
					window.open(url);
				}else{
					window.location.href=url;
				}
			}
		}
	});

	if($('.videoP').length>0){
		if($(".videoP").attr('data-ctv')){
			a='&useCTV=1';
		}else{
			a='';
		}
		$.ajax({
			type:"GET",
			url:$("header").data('siteurl')+"assets/scripts/ajax.ajax",
			data:"page=loadVideo&videoId="+$(".videoP").attr('data-videoId')+"&width="+$(".videoP").width()+a,
			dataType:"json",
			success:function(data){
				$(".videoP").html(data['player']);
			}
		});
	}

	$(document).on('change','select[name="filterSeason"]',function(e){
		window.location.href=$("header").data('siteurl')+"fixtures/"+$(".contentStructure").data("squad")+"/season/"+$("select[name='filterSeason'] option:selected").val();
	});
	$(document).on('change','select[name="msn"]',function(e){
		if($("select[name='msn'] option:selected").val() != ''){
			window.location.href=$("header").data('siteurl')+$("select[name='msn'] option:selected").val();
		}
	});

	$(document).on('keydown','input[type=text],input[type=password]',function(e){
		if (e.keyCode == 13){
			$(this).closest('form').submit();
		}
	});

	$(document).on('keydown','.newsSearchBar input',function(e){
		if(e.keyCode==13){
			$(".newsSearchBtn").trigger("click");
		}
	});

	$(document).on('click tap','.newsSearchBtn',function(e){
		e.stopImmediatePropagation();
		term=$("input[name='newsSearch']").val()
		startDate=$("#startDate").val();
		endDate=$("#endDate").val();
		$('.hide').show();
		$.ajax({
			type:"GET",
			url:$("header").data('siteurl')+"assets/scripts/ajax.ajax",
			data:"page=searchNews&searchTerm="+term+"&startDate="+startDate+"&endDate="+endDate,
			dataType:"json",
			success:function(data){
				$(".newsStories").html(data['text']);
				$(".hide").hide();
			}
		});
	});
	$(document).on('click tap','.newsShowHide',function(e){
		e.stopImmediatePropagation(); e.preventDefault();
		if($(".newsShowHide p").attr('data-state')=='hide'){
			$(".newsSearchBar").slideDown();
			$(".newsShowHide p").attr('data-state','show');
		}else{
			$(".newsSearchBar").slideUp(function(){
				$(".newsSearchBar").css("display","");
			});

			$(".newsShowHide p").attr('data-state','hide');
		}
	});

	$(document).on('click tap','.pagination a',function(e){
		e.stopImmediatePropagation(); e.preventDefault();
		if(!$(this).hasClass('inactive')){
			data="page="+$(this).parent().attr('data-page')+"Page&dataPage="+$(this).attr('data-page');
			if($(".newsStories").attr('data-newsFeed') != undefined && $(".newsStories").attr('data-newsFeed') != ''){
				data+="&newsFeed="+$(".newsStories").attr('data-newsFeed');
				if (typeof term != 'undefined') {
					data+="&searchTerm="+term+"&startDate="+startDate+"&endDate="+endDate;
				}
			}
			$(".hide").show();
			$.ajax({
				type:"GET",
				url:$("header").data('siteurl')+"assets/scripts/ajax.ajax",
				data:data,
				dataType:"json",
				success:function(data){
					$(".newsStories").html(data['text']);
					$(".hide").hide();
					$("html, body").animate({ scrollTop: 0 }, 1000);
				}
			});
		}
	});

	$(document).on('click tap','.newsPopular li',function(e){
		e.stopImmediatePropagation(); e.preventDefault();
		href=$(this).attr('data-href');
		if(href != ''){
			window.location.href=href;
		}
	});

	//Loop through all a tags on a template page
	if($(".rtearea a").length>0){
		siteUrlLen=$("header").data('siteurl').length;
		$(".rtearea a").each(function(key,val){
			if($(this).attr('href')){
				if($(this).attr('href').substr(0,siteUrlLen) != $("header").data("siteurl") && $(this).attr('href').substr(0,6) != 'mailto'){
					$(this).attr('target','_blank');
				}
			}
		});
	}
	if($(".textCentre a").length>0){
		siteUrlLen=$("header").data('siteurl').length;
		$(".textCentre a").each(function(key,val){
			if($(this).attr('href').substr(0,siteUrlLen) != $("header").data("siteurl")){
				$(this).attr('target','_blank');
			}
		});
	}

	$(document).on('click tap','.stores li',function(e){
		e.preventDefault();
		e.stopImmediatePropagation();
		if($(this).hasClass("SoldOut")){
		}else{
			window.location.href=$("header").data("siteurl")+$(".stores").attr('data-url')+"/"+$(this).data('itemid');
		}
	});

	$(document).on('click tap','.courseSubmit',function(e){
		e.preventDefault(); e.stopImmediatePropagation();
		c=$(this).parent().siblings("form").children("input[name='itemCost']").val();
		a=$("input[name='MC_requiredPlaces']").val();
		b=a*c;
		$(this).parent().siblings("form").children("input[name='amount']").val(b);
	});

	$(document).on('click tap','.plus',function(e){
		e.stopImmediatePropagation();
		a=$(this).siblings("input[type='text']");
		v=parseInt(a.val());
		v2=v+1;
		if(v2>a.attr('data-max')){ v2=v; }
		$(this).siblings("input[type='text']").val(v2);
	});

	$(document).on('click tap','.minus',function(e){
		e.stopImmediatePropagation();
		a=$(this).siblings("input[type='text']");
		v=parseInt(a.val());
		v2=v-1;
		if(v2<a.attr('data-min')){ v2=v; }
		$(this).siblings("input[type='text']").val(v2);
	});

	$(document).on('click tap','.submitForm',function(e){
		e.preventDefault(); e.stopImmediatePropagation();
		$(this).closest("form").trigger("submit");
	});
	$(document).on('click tap','.submitFormParent',function(e){
		e.preventDefault(); e.stopImmediatePropagation();
		$(this).parent().siblings("form").trigger("submit");
	});
	$(document).on('click tap','.submitFormScreen',function(e){
		e.preventDefault(); e.stopImmediatePropagation();
		$(this).siblings("form").trigger("submit");
	});
	$(document).on('click tap','.cancelForm',function(e){
		e.preventDefault(); e.stopImmediatePropagation();
		history.back(1);
	});

	$(document).on('click tap','#rightAdvert,#leftAd',function(e){
		e.preventDefault(); e.stopImmediatePropagation();
		if($(this).attr('data-url')){
			window.open($(this).attr('data-url'));
		}
	});
	$(document).on('keyup','.bricksLine',function(e){
		v=$(this).val();
		v=v.substr(0,14);
		l=$(this).attr('data-line');
		$(".bricksText[data-line="+l+"]").text(v);
	});

    $(document).on('click tap','.addToBasket',function(e){
        e.preventDefault(); e.stopImmediatePropagation();
        data='page=addToBasket';
        if($(".bricksLine[data-line='1']").val()){
            data+='&lineOne='+encodeURIComponent($(".bricksLine[data-line='1']").val());
        }
        if($(".bricksLine[data-line='2']").val()){
            data+='&lineTwo='+encodeURIComponent($(".bricksLine[data-line='2']").val());
        }
        if($(".bricksLine[data-line='3']").val()){
            data+='&lineThree='+encodeURIComponent($(".bricksLine[data-line='3']").val());
        }
        data+='&productId='+$(".itemInfo").data('itemid');
        $.ajax({
            type:"GET",
            url:$("header").data('siteurl')+"assets/scripts/ajax.ajax",
            data:data,
            success:function(data){
                window.location.href=$("header").data('siteurl')+"bricks/basket";
            }
        });
    });

    $(document).on('click tap','.removeFromBasket',function(e){
        e.preventDefault(); e.stopImmediatePropagation();
        data='page=removeFromBasket';
        data+='&productId='+$(this).data('itemid');
        $.ajax({
            type:"GET",
            url:$("header").data('siteurl')+"assets/scripts/ajax.ajax",
            data:data,
            context:this,
            success:function(data){
                if(data=='empty'){
                    window.location.reload();
                }else{
                    $(this).parent().parent().fadeOut(function(){
                        $(this).remove();
                    })
                    $(".totalCost").html(data);
                }
            }
        });
    });

    $(document).on('click tap','.addItem',function(e){
        e.preventDefault(); e.stopImmediatePropagation();
        data='page=addToBasket';
        if($(this).siblings(".itemInfoSmall:first").children(".lineOne").text()){
            data+='&lineOne='+$(this).siblings(".itemInfoSmall:first").children(".lineOne").text()
        }
        if($(this).siblings(".itemInfoSmall:first").children(".lineTwo").text()){
            data+='&lineTwo='+$(this).siblings(".itemInfoSmall:first").children(".lineTwo").text()
        }
        if($(this).siblings(".itemInfoSmall:first").children(".lineThree").text()){
            data+='&lineThree='+$(this).siblings(".itemInfoSmall:first").children(".lineThree").text()
        }
        data+='&productId='+$(this).data('itemid');

        $.ajax({
            type:"GET",
            url:$("header").data('siteurl')+"assets/scripts/ajax.ajax",
            data:data,
            success:function(data){
                window.location.reload();
            }
        });
    });

	$(document).on('focus','.aDate',function(e){
		$(this).datepicker({ changeMonth:true, changeYear: true,dateFormat:'dd/mm/yy' });
	});
	if($('.matchdayInfo .matchdayContent').length > 0){
		$(".matchdayInfo .matchdayContent .matchdayInfoNav ul li:first").addClass("active");
		$(".matchdayInfo .matchdayInfoMobileNav ul li:first").addClass("active");
	}

	$(document).on('click tap','.matchdayInfo .matchdayContent',function(e){
		e.stopImmediatePropagation(); e.preventDefault();
		if($(".matchdayInfoNav").css("display")!='none'){
			$(this).children(".matchdayInfoNav").children().children().first().trigger("click")
		}else{
			$(this).siblings(".matchdayInfoMobileNav").children().children().first().trigger("click")
		}
	});

	$(document).on('click tap','.matchdayInfo .matchdayContent .matchdayInfoNav li',function(e){
		e.preventDefault(); e.stopImmediatePropagation();
		sect=$(this).attr('data-section');
		if(sect != ''){
			if(sect.substr(0,4)=='http'){
				window.open(sect);
			}else{
				n=0;
				$(".matchdayInfo .matchdayInfoSection").css("display","none");
				if($(this).hasClass('active')){
					$(this).parent().parent().parent().siblings("."+sect).hide();
					n=1;
				}else{
					$(this).parent().parent().parent().siblings("."+sect).show()
				}
				$(".matchdayInfo .matchdayContent .matchdayInfoNav li").removeClass("active");
				if(n==0){
					$(this).addClass('active');
				}
			}
		}
	});
	$(document).on('click tap','.matchdayInfo .matchdayInfoMobileNav li',function(e){
		e.preventDefault(); e.stopImmediatePropagation();
		sect=$(this).attr('data-section');
		if(sect != ''){
			if(sect.substr(0,4)=='http'){
				window.open(sect);
			}else{
				n=0;
				$(".matchdayInfoMobileSection").css("display","none");
				if($(this).hasClass('active')){
					$(this).children("."+sect).hide();
					n=1;
				}else{
					$(this).children("."+sect).show()
				}
				$(".matchdayInfo .matchdayInfoMobileNav li").removeClass("active");
				if(n==0){
					$(this).addClass('active');
				}
			}
		}
	});
	$(document).on('click tap','#plaquesContinue',function(e){
		e.stopImmediatePropagation(); e.preventDefault();
		thedata='page=seatPlaques';
		thedata+='&'+$("#seatPlaquesForm").serialize();
		$.ajax({
			type:"GET",
			url:$("header").data('siteurl')+"assets/scripts/ajax.ajax",
			data:thedata,
			success:function(data){
				window.location.href=$("header").data('siteurl')+"seatplaques?errorId=1&errorMessage=We have received your enquiry and will be in touch soon";
			}
		});
	});

	$(document).on('click tap','.loginHead div',function(e){
		e.stopImmediatePropagation(); e.preventDefault();
		target=$(this).data('form');
		if(target.substr(0,4)=='http'){
			window.location.href=target;
		}else{
			$(".loginHead div").removeClass("active");
			$(this).addClass("active");
			$(".loginInfo form").hide();
			$(".loginInfo #"+target).show();
		}
	});
	$(document).on('click tap','#submitBtnParent',function(e){
		e.preventDefault(); e.stopImmediatePropagation();
		action=$(this).parent().parent().attr('action');
		tData=$(this).parent().parent().serialize();
		target=$(".loginHead div.active").data("form");
		$.ajax({
			type:"POST",
			url:action,
			data:tData,
			dataType:"json",
			success:function(data){
				$(".loginInfo #"+target).replaceWith(data['html']);
				$(".loginInfo #"+target).show();
			}
		});
	});

	$(document).on('click tap','.cfcForgotPw2Submit',function(e){
		e.preventDefault(); e.stopImmediatePropagation();
		action=$('#cfcForgot2').attr('action');
		tData=$('#cfcForgot2').serialize();
		target=$(".loginHead div.active").data("form");
		$.ajax({
			type:"POST",
			url:action,
			data:tData,
			dataType:"json",
			success:function(data){
				$(".loginInfo #"+target).replaceWith(data['html']);
				$(".loginInfo #"+target).show();
			}
		});
	});

	$(document).on('click tap','.reloadPage',function(e){
		e.preventDefault(); e.stopImmediatePropagation();
		window.location.reload();
	});

	$(document).on('click tap','#showLogin',function(e){
		e.preventDefault(); e.stopImmediatePropagation();
		$(".loginHead div[data-form='cfcLogin']").trigger("click");
	});


	function isLocalStorageNameSupported() {
	  var testKey = 'test', storage = window.sessionStorage;
	  try {
		storage.setItem(testKey, '1');
		storage.removeItem(testKey);
		return true;
	  } catch (error) {
		return false;
	  }
	}

	$(document).on('click tap','#regSubmit',function(e){
		e.stopImmediatePropagation();
		e.preventDefault();
		canUseStorage=isLocalStorageNameSupported();
		$("html, body").animate({ scrollTop: 0 }, "fast");
		var stop=0;
		var field='';
		$('.errorText').empty();
		$('#regForm').find('select').each(function(key, value) {
			$(this).removeClass();
			if(stop==1) { return; }
			id=$(this).attr('id');
			val = $("#"+id+" option:selected").val();
			if($(this).attr('required')=='required') {
				if(val==false) {
					field=$(this).attr('placeholder');
					$(this).addClass('unNotOk');
					stop=1;
					return;
				}
			}
			if(canUseStorage==true){
				localStorage.setItem(id,val);
			}
		});
		$('#regForm').find('input').each(function(key, value) {
			$(this).removeClass();
			//alert($(this).attr('required')+'-'+$(this).attr('id'));
			if(stop==1) { return; }
			if($(this).attr('required')=='required') {

				if($(this).val()=='') {
					field=$(this).attr('placeholder');
					$(this).addClass('unNotOk');
					stop=1;
					return;
				}
			}
			id=$(this).attr('id');
			if($(this).attr('type') == 'text')
			{
				val = $(this).val();
			}
			else if($(this).attr('type')=='checkbox')
			{
				if($(this).is(':checked'))
				{
					val=1;
				}
				else
				{
					val=0;
				}
			}
			if(val != undefined)
			{
				if(canUseStorage==true){
					localStorage.setItem(id,val);
				}
			}
		});
		if(stop==1) {
			$('.errorText').html("'"+field+"' cannot be left empty.");
			return;
		}
		if($('#termsandconditions').is(':checked')) { } else {
			$('.errorText').html("You must accept our terms and conditions to register.");
			return;
		}
		if($('#password').val()!=$('#confirmpassword').val()) {
			$("#password").addClass('unNotOk');
			$("#confirmpassword").addClass('unNotOk');
			$('.errorText').html("Your passwords did not match.");
			return;
		}
		if($('#password').val().length<6 || $('#password').val().length>15) {
			$('.errorText').html("Your password needs to be between 6 and 15 characters.");
			return;
		}
		if($('#password').val()==$('#passwordReminder').val()) {
			$('.errorText').html("Your password cannot be your reminder.");
			return;
		}
		uname=checkUsername();
		if(uname=='taken') {
			$('.errorText').html("That username is already taken.");
			return;
		}
		if(uname=='short') {
			$('.errorText').html("That username is too short.");
			return;
		}
		if(uname=='long') {
			$('.errorText').html("That username is too long.");
			return;
		}
		$("#regForm").submit();
	});

	$(document).on('keydown', '#regForm #usernamecfc,#regForm #password,#regForm #confirmpassword,#regForm #email,#regForm #confirmEmail', function(e) {
		if (e.keyCode == 32) return false;
	});

	$(document).on('blur', '#regForm #usernamecfc', function(e) {
		uname=checkUsername();
	});

	$(document).on('click tap','#profileSubmit',function(){
		$("#profileForm").submit();
	});

	$(document).on('change','select[name="teamType"]',function(e){
		window.location.href=$("header").data("siteurl")+$("select[name='teamType'] option:selected").val();
	});
});

$(window).resize(function(){
	if($(".videoP").length>0){
		w=$(".videoP").width();
		h=Math.floor((w/16)*9);
		jwplayer().resize(w,h);
	}
	if($(".playerDescription").length>0){
		//Set bottom on names
		$(".playerDescription").each(function(index){
			if($(this).css('display') != 'none'){
				h=$(this).height();
				nH=h+$(".menuItem").children("img").height();
				$(this).siblings('.playerName').css("bottom",h+"px");
				$(this).parent(".menuItem").css("height",nH+"px");
			}
		});
	}
});

var typewatch = (function(){
  var timer = 0;
  return function(callback, ms){
    clearTimeout (timer);
    timer = setTimeout(callback, ms);
  }
})();

var uname = '';
function checkUsername(){
	$("#usernamecfc").removeClass().addClass('unCheck');
	$.post("assets/scripts/uac.ajax",{ username:$("#usernamecfc").val() } ,function(data)
	{
		if(data=='taken')
		{
			$("#usernamecfc").removeClass().addClass('unNotOk');
			uname="ue1";
		}
		else
		{
			if(data=='short')
			{
				$("#usernamecfc").removeClass().addClass('unNotOk');
				uname="ue2";
			}
			else if(data=='long')
			{
				$("#usernamecfc").removeClass().addClass('unNotOk');
				uname="ue3";
			}
			else
			{
				$("#usernamecfc").removeClass().addClass('unOk');
				uname="";
			}
		}
	});
}
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
  ga('create', 'UA-8389567-1', 'auto');
  ga('send', 'pageview');






