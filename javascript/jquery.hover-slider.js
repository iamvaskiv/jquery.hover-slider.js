(function($){

  $.fn.hoverSlider = function(options) {

    //default settings
    var defaults = {
      sliderClass     : 'hover-slider',
      activeElemClass : 'active',
      animDuration    : 400,
      easing          : 'swing'
    };

    //merge setting with user's options
    var settings = $.extend(true, {}, defaults, options);

    //general variables
    var self     = $(this),
        slider   = $('<div />').addClass(settings.sliderClass).appendTo(self),
        active   = self.find('.' + settings.activeElemClass),
        child    = self.children(),
        speed    = settings.animDuration,
        easing   = settings.easing,
        aLeftPos = 0, //default active elem left position
        aWidth   = 0; // default elem width

    //check for active
    if (active.length) {
      getActiveDefaultPosition();

      //default (active) position for slider elem
      slider.css({
        'position' : 'absolute',        
        'left'  : aLeftPos,
        'width' : aWidth
      });
    }

    function getActiveDefaultPosition() {
      active   = self.find('.' + settings.activeElemClass),
      aLeftPos = active.position().left,
      aWidth   = active.innerWidth();
    }

    //hover on child elem
    child.mouseover(function(){
      var leftPos = $(this).position().left,
          width   = $(this).width();

      slider
        .stop()
        .animate({
          'left'  : leftPos,
          'width' : width
        }, speed, easing);
    });

    //mouseleave on base parent (self)
    self.mouseleave(function(){
      if (active.length) {
        getActiveDefaultPosition();

        slider
          .stop()
          .animate({
            'left'  : aLeftPos,
            'width' : aWidth
          }, speed, easing);
      } else {
        // if there is no active elem
        slider
          .stop()
          .animate({
            'width' : 0
          }, speed, easing);
      }
    });
  };

}(jQuery));
