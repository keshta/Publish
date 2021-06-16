$(window).bind('scroll', function () {
  if ($(window).width() > 768) {
    if ($(window).scrollTop() > 50) {
        $('.navbar').addClass('fixed');
    } else {
        $('.navbar').removeClass('fixed');
    }
    }
    if ($(window).width() > 768) {
    $(".user-menu").click(function() {
      $(this).find(".dropdown-menu").slideToggle();
    });
    }
});
