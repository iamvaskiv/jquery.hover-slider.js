;(function ($) {

  // Default options for the plugin
  var defaults = {
    sliderClass     : 'hover-slider',
    activeElemClass : 'active',
    speed           : 400,
    easing          : 'swing',
    onInit          : null
  };

  // Plugin constructor
  function HoverSlider(elem, options) {
    this.el = elem;

    // Merge the options given by the user with the defaults
    this.options = $.extend({}, defaults, options);

    this.init();
  }

  HoverSlider.prototype = {
    init: function () {
      this.cache();
      this.buildStructure();
      this.run();
      this.callback();
    },

    cache: function () {
      this.$el        = $(this.el);
      this.$active    = this.$el.find('.' + this.options.activeElemClass);
      this.$children  = this.$el.children();
      this.activeData = this.getElementPosition(this.$active);
    },

    buildStructure: function () {
      this.slider = $('<div/>', {
        class: this.options.sliderClass
      })
      .css({
        position: 'absolute',
        left: this.activeData.left,
        top: this.activeData.top,
        width: this.activeData.width,
        height: this.activeData.height
      })
      .appendTo(this.$el);
    },

    run: function () {
      var base = this;

      base.$children.mouseover(function () {
        var self = $(this),
            pos  = base.getElementPosition(self);

        base.slider
          .stop()
          .animate({
            left: pos.left,
            top: pos.top,
            width: pos.width,
            height: pos.height
          }, base.options.speed, base.options.easing);
      });

      base.$el.mouseleave(function () {
        base.$active = base.$el.find('.' + base.options.activeElemClass);
        base.activeData = base.getElementPosition(base.$active);

        base.slider
          .stop()
          .animate({
            width: base.activeData.width,
            height: base.activeData.height,
            left: base.activeData.left,
            top: base.activeData.top
          }, base.options.speed, base.options.easing);
      });
    },  

    getElementPosition: function (elem) {
      var $elem = $(elem);

      var activeData = {
        left:  ($elem.length) ? $elem.position().left : 0,
        top:  ($elem.length) ? $elem.position().top : 0,
        width: ($elem.length) ? $elem.innerWidth() : 0,
        height: ($elem.length) ? $elem.innerHeight() : 0
      }

      return activeData;
    },

    callback: function () {
      var onInit = this.options.onInit;

      if (typeof onInit === 'function') {
        onInit.call(this.el);
      }
    }
  }

  /* Create a lightweight plugin wrapper around the "Plugin" constructor,
     preventing against multiple instantiations.
    ------------------------------------------- */
  $.fn.hoverSlider = function (options) {
    this.each(function () {
      if (!$.data(this, "plugin_hoverSlider")) {
        $.data(this, "plugin_hoverSlider", new HoverSlider(this, options));
      }
    });

    return this;
  };

}(jQuery));
