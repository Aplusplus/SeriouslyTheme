/**
* Seriously Tictail Theme Scripts
* @author: uli@aplusplus.org
*
*/
(function(W, document, jQuery, undefined) {

	var TT_SERIOUSLY = {
			version: 0.2,
			logoheight:100,
			spacing:20,
			fixLogoAfter: 50,
			breakpointOneCol:1030,
			states: {
				SCROLLED_PAST_NAV:'scrolled-past-nav',
				SCROLLED_TO_RELATED:'scrolled-to-related',
				SMALL_CONTENT:'small-content',
			}
		},
		$W = $(W),
		self = TT_SERIOUSLY;


	// document ready
	self.init = function(){

		self.$B = $('body');

		// enable responsive images
		$('figure.responsive').picture();

		// prepare intro animation
		$('#products .product').each(function(i,e){
			$(this).css('transition-delay',50+(i*50)+'ms');
		});

		// bind image zoom
		$('#product .image_container').click(function(){
			

			if(!!('ontouchstart' in window)) {

				if(!self.$B.is('.imagezoom')) {
					self.$B.toggleClass('imagezoom');
					$('.image_container').scrollTo({top:0,left:200},{duration:400,easign:'elasout'});
				} 

			} else {
				self.$B.toggleClass('imagezoom');
			}
		});

		$('.image_container figure').each(function(){
			var $t = $(this); 
			$t.addClass('loading').imagesLoaded(function(){
				$t.removeClass('loading').addClass('loaded');
			});
		});




		// tell css about touch
		
		self.$B.addClass( !!('ontouchstart' in window) ? 'touch' : 'no-touch');
		
		
		// provide additional styling to the menu 
		if($('.category.selected').length) {
			$('#nav').addClass('cat_active');
		}

		// fix edge case with 2 line top menu also rechecked upon resizing
		$('.child_navigation').css('top',$('#nav').height());
		

		$('header').hover(function(){
			self.$B.addClass('hover-header');
		},function() {
			self.$B.removeClass('hover-header');
		});

		$('#logotype').click(function(e){

			// if logo is fixed to top and is clicked scroll to top before going back to the homepage
			if(self._bodyHasState(self.states.SCROLLED_PAST_NAV)) {
				e.preventDefault();
				$W.scrollTo(0,500);
				return;
			}

			$('#container').addClass('exit');
		});

		$('#nav a,.product a').blur(function(e){
			$('#container').addClass('exit');
		});



		// shorten text on the listing page, looks better
		$('.text.compact').dotdotdot();


		// bind window events
		$W.load(self.loaded);


		$W.on({
			resize:self.resize,
			scroll:self.scroll
		});


			setTimeout(function(){
				W.log('init scroll');
				W.scrollTo(0, $('#product').length ? self.fixLogoAfter+1 : 1);
			},10);
			
		


		// finally tell CSS that JS is here and has its back – this triggers animations
		self.$B.addClass('js');
	};



	self.loaded = function(event){
		W.log('loaded');
		self.$B.addClass('loaded');
		self.resize();
		
	};

	self.resize = function(event){
		window.log('resize');

		if($('#container').outerHeight()<$W.height()) {
			self._adjustBodyState(self.states.SMALL_CONTENT);

		} else {
			// on top or scrolling past
			self._adjustBodyState(self.states.SMALL_CONTENT,true);
		}

		$('.child_navigation').css('top',$('#nav').height());

		self.scroll();
	};

	self.scroll = function(event){
		
		var sT = $W.scrollTop();
		// W.log('scroll',sT);
		if(sT > self.fixLogoAfter) {
			// scrolled past logo
			self._adjustBodyState(self.states.SCROLLED_PAST_NAV);
			

		} else {
			// on top or scrolling past
			self._adjustBodyState(self.states.SCROLLED_PAST_NAV,true);
		} 

		// when related come into view unfix the product description above
		if($('.loaded #products.related').length) {
			
			var $p = $('#products.related'),
				pixelsInScreen = -1 * ($p.offset().top - sT - $W.height());

				if(pixelsInScreen > 0 && $W.width() > self.breakpointOneCol && self._bodyHasState(self.states.SCROLLED_PAST_NAV)) {
					self._adjustBodyState(self.states.SCROLLED_TO_RELATED);
					window.log('scrolled to related …');
				} else {
					self._adjustBodyState(self.states.SCROLLED_TO_RELATED,true);
				}


		}


	};

	self._adjustBodyState = function(state,remove) {

		var has = self._bodyHasState(state);
		if(has && remove === true) {
			self.$B.removeClass(state);
		} else if (!has && remove === undefined) {
			self.$B.addClass(state);
		}

	};

	self._bodyHasState = function(state) {
		return self.$B.hasClass(state);
	};


	$(self.init);

 }(window, document, jQuery));