(function($) {
	
	function imageScale(nKey){
		$(".modalImageGallery[data-key='"+nKey+"'] img").css({"max-height":"none","max-width":"none"});
		sets={}
		mheight=$(".modalImageGallery[data-key='"+nKey+"'] img").height();
		mwidth=$(".modalImageGallery[data-key='"+nKey+"'] img").width();
		$(".modalImageGallery[data-key='"+nKey+"'] img").css({"max-height":"100%","max-width":"100%"});
		wHeight=parseInt($(window).height())*0.8;
		wWidth=parseInt($(window).width())*0.8;
		a=$(".modalImageGallery[data-key='"+nKey+"'] .modalImageGalleryDescription");
		if(a){
			setTimeout(function() {
				b=a.outerHeight();
				a.css("top","-"+b+"px");
			}, 300);
			//b=a.outerHeight();
			//a.css("top","-"+b+"px");
		}
		
		if(mwidth>wWidth || mheight > wHeight){
			wScale=wWidth/mwidth; hScale=wHeight/mheight;
			if(wScale < hScale){
				sets.width=mwidth*wScale; sets.height=mheight*wScale;
			}else{
				sets.width=mwidth*hScale; sets.height=mheight*hScale;
			}
		
			sets.height=sets.height+20;
		}else{
			sets.height=mheight+20; sets.width=mwidth;
		}
		return sets;
	}
	
	function resizeBox(opts){
		sets={}
		sets.width=$(".modalPopup").width();
		sets.height=$(".modalPopup").height();
		run=0;
		if(opts.width){
			if(sets.width != opts.width){
				run=1; 
				sets.width=opts.width;
			}
		}
		if(opts.height){
			if(sets.height !== opts.height){
				run=1;
				sets.height=opts.height;
			}
		}
		if(run==1){
			$(".modalPopup").animate(sets);
		}
	}
	var methods = {
		resize:function(opts){
			resizeBox(opts)
		},
		close:function(){
			$(".modalHider,.modalPopup").fadeOut(400,function(){
				$(".modalHider,.modalPopup").remove();
			})
		}
    };
	
    $.fn.modalPopup = function( options ) {
		 if ( methods[options] ) {
            return methods[ options ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        }
        // Establish our default settings
		var defaults = {
			backgroundColor: 'FFFFFF',
			zIndex:1000,
			width:500,
			height:250,
			color: '000000',
			boxShadow: '0px 2px 10px 10px #000',
			padding:20,
			close:'',
			escKey:true,
			onClose:false,
			onLoad:false,
			onEscKey:false,
        };
        var settings = $.extend({},defaults, options);
		var escKey=settings.escKey;
		onClose=settings.onClose;
		onLoad=settings.onLoad;
		function closePopup(e){
			e.stopImmediatePropagation()
			if(onClose){
				onClose();
			}
			
			$(".modalHider,.modalPopup").fadeOut(400,function(){

				$(".modalHider,.modalPopup").remove();
			})
		}
		
		
		$(document).on('click tap','.modalClose,.modalCloseImg',function(e){
			if(escKey==false){
				return;
			}
			closePopup(e);
		});
		$(document).on('click tap','.modalHider',function(e){
			if(escKey==false){
				return;
			}
			closePopup(e);
		});
		
		$(document).on('keyup','body',function(e) {
			if(escKey==false){
				return;
			}else{
				if (e.keyCode == 27){
					if(settings.onEscKey){
						settings.onEscKey();
					}
					closePopup();
				}
			}
		});
		displaySlide=0;
		$(document).on('click tap','.nextSlide',function(e){
			e.preventDefault(); e.stopImmediatePropagation();
			cKey=displaySlide;
			nKey=parseInt(displaySlide)+1;
			if(nKey>($(".modalImageGallery").length-1)){
				nKey=0;
			}
			displaySlide=nKey;
			$(".modalImageGallery[data-key='"+cKey+"']").fadeOut(function(){
				$(".modalImageGallery[data-key='"+nKey+"']").fadeIn(200,function(){
					sets=imageScale(nKey);
					$(".modalPopup").animate(sets,200,function(){
						a=$(".modalImageGallery[data-key='"+nKey+"'] .modalImageGalleryDescription");
						if(a){
							b=a.outerHeight();
							//a.css("top","-"+b+"px");
						}
					});
				});
			});
			nKey2=nKey+1;
			
			$(".modalPaginate .counter .cPage").text(nKey2);
		});
		$(document).on('click tap','.prevSlide',function(e){
			e.preventDefault(); e.stopImmediatePropagation();
			cKey=displaySlide;
			nKey=parseInt(displaySlide)-1;
			if(nKey<0){
				nKey=$(".modalImageGallery").length-1;
			}
			displaySlide=nKey;
			$(".modalImageGallery[data-key='"+cKey+"']").fadeOut(function(){
				$(".modalImageGallery[data-key='"+nKey+"']").fadeIn(200,function(){
					sets=imageScale(nKey);
					$(".modalPopup").animate(sets,200,function(){
						a=$(".modalImageGallery[data-key='"+nKey+"'] .modalImageGalleryDescription");
						if(a){
							b=a.outerHeight();
							//a.css("top","-"+b+"px");
						}
					});
				});
			});
			nKey2=nKey+1;
			$(".modalPaginate .counter .cPage").text(nKey2);
		});

        return this.each( function() {
            // We'll get back to this in a moment
			zIndex2=settings.zIndex-1;
			if(settings.width>$(window).width()){
				settings.width=$(window).width()-(settings.padding*2);
			}
			
			if(settings.height>$(window).height()){
				settings.height=$(window).height();
			}
			if(onLoad){
				onLoad();
			}
			nHtml=$(this).html();
			var elementType = $(this).prop('tagName').toLowerCase();
			showGroup=0;
			if(elementType=='img' || $(this).hasClass("modalGroup")){
				showGroup=1;
				nHtml='';
				rel=$(this).attr('rel');
				totalImg=$(elementType+"[rel='"+rel+"']").length;
				slideKey=parseInt($(this).attr('data-key'));
				$(elementType+"[rel='"+rel+"']").each(function(key,val){
					if(elementType=='img'){
						k='<img src="'+$(this).attr('data-fullImg')+'" alt="'+key+'" />';
					}else{
						k=val;
					}
					nHtml+='<div class="modalImageGallery" data-key="'+key+'">'+k;
					if($(this).attr('data-description')){
						nHtml+='<div class="modalImageGalleryDescription"><p>'+$(this).attr('data-description')+'</p></div>';
					}
					nHtml+='</div>';
				});
				slideKey2=slideKey+1;
				displaySlide=slideKey;
				nHtml+='<div class="modalPaginate"><div class="prevSlide">Prev</div> <div class="counter"><span class="cPage">'+slideKey2+'</span> of '+totalImg+'</div> <div class="nextSlide">Next</div></div>';
			}
			theHtml='<div class="modalHider" style="z-index:'+zIndex2+'; background-color:#'+settings.backgroundColor+';"></div><div class="modalPopup" style=" z-index:'+settings.zIndex+'; display:none; background-color:#'+settings.backgroundColor+'; box-shadow:'+settings.boxShadow+'; width:'+settings.width+'px; height:'+settings.height+'px; padding:'+settings.padding+'px; color:#'+settings.color+';"><div class="modal">';
			theHtml=theHtml+nHtml;
			if(settings.close=='image'){
				closeClass='modalCloseImg';
				closeContent='';
			}else if(settings.close=='none'){
				closeClass='';
				closeContent='';
				escKey=false;
			}else{
				closeClass='modalClose';
				closeContent='<span>Close</span>';
			}
			theHtml=theHtml+'</div><div class="'+closeClass+'">'+closeContent+'</div></div>';
			$("body").append(theHtml);
			
			$(".modalHider,.modalPopup").fadeIn(function(){
				if(showGroup==1){
					sets=imageScale(displaySlide);
					$(".modalPopup").animate(sets,200,function(){
						a=$(".modalImageGallery[data-key='"+displaySlide+"'] .modalImageGalleryDescription");
						if(a){
							b=a.outerHeight();
							//console.log('2'+b);
							//a.css("top","-"+b+"px");
						}
					});
				}
			});
			if(showGroup==1){
				$(".modalImageGallery[data-key='"+slideKey+"']").show();
			}
			mHeight=$(".modal").height();
			if(mHeight<$(".modalPopup").height()){
				aTop=$(".modalPopup").height()-mHeight-$(".modalClose").height();
				if(aTop>0){
					$(".modalClose").css("top",aTop+"px");
				}
			}
			if(settings.onLoad){
				settings.onLoad();
			}
			
        });
    }
}(jQuery));