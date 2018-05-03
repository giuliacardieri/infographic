// makes the slow scroll effect
var slowScroll = function slowScroll(element) {
    $('html, body').animate({
        scrollTop: $(element).offset().top
    }, 1000);
    window.location.hash = element;
};

var dragSlider = function dragSlider(dragElement, resizeElement, container) {
	
	// Initialize the dragging event on mousedown.
	dragElement.on('mousedown touchstart', function(e) {
    
		dragElement.addClass('draggable');
		resizeElement.addClass('resizable');

		// Check if it's a mouse or touch event and pass along the correct value
		var startX = (e.pageX) ? e.pageX : e.originalEvent.touches[0].pageX;

		// Get the initial position
		var dragWidth = dragElement.outerWidth(),
		posX = dragElement.offset().left + dragWidth - startX,
		containerOffset = container.offset().left,
		containerWidth = container.outerWidth();

		// Set limits
		minLeft = containerOffset + 10;
		maxLeft = containerOffset + containerWidth - dragWidth - 10;

		// Calculate the dragging distance on mousemove.
		dragElement.parents().on("mousemove touchmove", function(e) {

			// Check if it's a mouse or touch event and pass along the correct value
			var moveX = (e.pageX) ? e.pageX : e.originalEvent.touches[0].pageX;

			leftValue = moveX + posX - dragWidth;


			// Prevent going off limits
			if ( leftValue < minLeft) {
				leftValue = minLeft;
			} else if (leftValue > maxLeft) {
				leftValue = maxLeft;
			}

			// Translate the handle's left value to masked divs width.
			widthValue = (leftValue + dragWidth/2 - containerOffset)*100/containerWidth+'%';

			// Set the new values for the slider and the handle. 
			// Bind mouseup events to stop dragging.
			$('.draggable').css('left', widthValue).on('mouseup touchend touchcancel', function () {
				$(this).removeClass('draggable');
				resizeElement.removeClass('resizable');
			});

			$('.resizable').css('width', widthValue);
		}).on('mouseup touchend touchcancel', function(){
			dragElement.removeClass('draggable');
			resizeElement.removeClass('resizable');
		});
		e.preventDefault();
	}).on('mouseup touchend touchcancel', function(e){
		dragElement.removeClass('draggable');
		resizeElement.removeClass('resizable');
	});
}

// Call & init
$(document).ready(function() {
	
	$('.section-medal__slider').each(function() {
		var el = $(this);
			
		// Adjust the slider
		var width = el.width()+'px';
		el.find('.resize img').css('width', width);
			
		// Bind dragging events
		dragSlider(el.find('.handle'), el.find('.resize'), el);
	});

	$('.section__btn-wrapper').on('click', function() {
		slowScroll('.section-whatisagility');
	});

		// actions when scroll happens
  $(window).scroll(function() {
    if (($('.section-whatisagility').offset().top <= $(window).scrollTop()) && 
    	($('.section-benefits').offset().top) > $(window).scrollTop()) {
	      	$('.svg__text').addClass('animated');
  	} else if (
  		($('.section-benefits').offset().top <= $(window).scrollTop()) && 
  		($('.section-medal').offset().top) > $(window).scrollTop()) {
	      	$('.clock').addClass('animated');
	      if (($('.section-benefits__illustration-wrapper.illustration-1').offset().top <= $(window).scrollTop()) && 
    		($('.section-medal').offset().top) > $(window).scrollTop()) {
	      	$('.feedback').addClass('animated');
    		}
	      if (($('.section-benefits__illustration-wrapper.illustration-2').offset().top <= $(window).scrollTop()) && 
    		($('.section-medal').offset().top) > $(window).scrollTop()) {
	      	$('.graph').addClass('animated');
    		}
	      if (($('.section-benefits__illustration-wrapper.illustration-3').offset().top <= $(window).scrollTop()) && 
    		($('.section-medal').offset().top) > $(window).scrollTop()) {
	      	$('.trophy').addClass('animated');
    		}
  	}
  });

});

// Update sliders on resize.
$(window).resize(function() {
	
  $('.section-medal__slider').each(function() {
    var el = $(this);
    var width = el.width()+'px';
    el.find('.resize img').css('width', width);
  });
	
});