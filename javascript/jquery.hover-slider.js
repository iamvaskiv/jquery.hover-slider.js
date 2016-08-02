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
      this.activeData = this.getActiveElemPosition();
    },

    buildStructure: function () {
      this.slider = $('<div/>', {
        class: this.options.sliderClass
      })
      .css({
        position: 'absolute',
        left: this.activeData.left,
        width: this.activeData.width
      })
      .appendTo(this.$el);
    },

    run: function () {
      var base = this;

      base.$children.mouseover(function () {
        var self  = $(this),
            width = self.width(),
            left  = self.position().left;

        base.slider
          .stop()
          .animate({
            left: left,
            width: width
          }, base.options.speed, base.options.easing);
      });

      base.$el.mouseleave(function () {
        base.activeData = base.getActiveElemPosition();

        base.slider
          .stop()
          .animate({
            width: base.activeData.width,
            left: base.activeData.left
          }, base.options.speed, base.options.easing);
      });
    },

    getActiveElemPosition: function () {
      this.$active = this.$el.find('.' + this.options.activeElemClass);

      var activeData = {
        left:  (this.$active.length) ? this.$active.position().left : 0,
        width: (this.$active.length) ? this.$active.innerWidth() : 0
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
