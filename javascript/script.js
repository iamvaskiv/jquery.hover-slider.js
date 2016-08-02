(function($) {
  $('.demo-1 ul').hoverSlider({
    onInit: function () {
      console.log('fired');
    }
  });
  $('.demo-2 ul').hoverSlider();

  $('.demo-1 ul a, .demo-2 ul a').click(function (e) {
    e.preventDefault();
  });
}(jQuery));
