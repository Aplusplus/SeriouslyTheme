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
			fixLogoAfter: 100 + 6*20,
			states: {
				SCROLLED_PAST_NAV:'scrolled-past-nav'
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
		$('.product').each(function(i,e){
			$(this).css('transition-delay',50+(i*50)+'ms');
		});

		// bind image zoom
		$('#product .image_container').click(function(){
			self.$B.toggleClass('imagezoom');
		});


		// tell css about touch
		
		self.$B.addClass( !!('ontouchstart' in window) ? 'touch' : 'no-touch');
		
		
		// provide additional styling to the menu 
		if($('.category.selected').length) {
			$('#nav').addClass('cat_active');
		}

		$('header').hover(function(){
			self.$B.addClass('hover-header');
		},function() {
			self.$B.removeClass('hover-header');
		});

		$('#logotype').click(function(e){

			// if logo is fixed to top and is clicked scroll to top before going back to the homepage
			if(self._bodyHasState(self.states.SCROLLED_PAST_NAV)) {
				e.preventDefault();
				$W.scrollTop(0);
			}
		});

		$('div.image_container').wrapInner('<div class="inner" />');
		

		// clicking on the whole product leads to the product page, like a boss
		$('#products .product').click(function(){
			$(this).find('h1 a').trigger('click');
		});

		// bind window events
		
		$W.on({
			load:self.loaded,
			resize:self.resize,
			scroll:self.scroll
		});

		// magic
		// self.listView = new window.infinity.ListView($('#container'));

		// finally tell CSS that JS is here and has its back – this triggers animations
		self.$B.addClass('js');
	};



	self.loaded = function(event){
		W.log('loaded');
		self.$B.addClass('loaded');

		$('div.image_container .inner figure').each(function(){
			
		})
	};

	self.resize = function(event){
		window.log('resize');
	};

	self.scroll = function(event){
		
		W.log($W.scrollTop(),self.fixLogoAfter);
		if($W.scrollTop() > self.fixLogoAfter) {

			// scrolled past logo
			self._adjustBodyState(self.states.SCROLLED_PAST_NAV);

		} else {
			// on top or scrolling past
			self._adjustBodyState(self.states.SCROLLED_PAST_NAV,true);

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