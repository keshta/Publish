
var language = getCookie("languageAloCar");
if (language == "" || language == undefined || language == null) {
    language = "ar";
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}


function getFullDate() {
    if (language == "ar") {
        var days = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
        var months = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];
        var date = new Date();
        var amPm = date.getHours() >= 12 ? "م" : "ص";
        var hours = date.getHours() > 9 ? date.getHours() : "0" + String(date.getHours());
        var minutes = date.getMinutes() > 9 ? date.getMinutes() : "0" + String(date.getMinutes());
        return (days[date.getDay()] + "-" + months[date.getMonth()] + " 2020" + " " + hours + ":" + minutes + " " + amPm);
    }

    else {
        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var date = new Date();
        var amPm = date.getHours() >= 12 ? "pm" : "am";
        var hours = date.getHours() > 9 ? date.getHours() : "0" + String(date.getHours());
        var minutes = date.getMinutes() > 9 ? date.getMinutes() : "0" + String(date.getMinutes());
        return (days[date.getDay()] + "-" + months[date.getMonth()] + " 2020" + " " + hours + ":" + minutes + " " + amPm);
    }
}

function loadingPage() {
    // /Content/images/loading3.gi
    $("body").prepend('<div class="lodding-page animated infinite pulse" id="modalLoad">' +
        //'<img src="/Content/images/logo-base.png"/>' +
        '<i class="fa fa-spinner fa-spin"></i>' +
        '</div>');
}


function removeLoadingPage() {
    $("#modalLoad").remove();
}


$(document).ready(function () {
    $(".yearpicker").yearpicker();
});


//$("#modelFrom").click(function () {
//    debugger;
//    var d = $(this).next().attr("class");

//});


//$("#modelTo").click(function () {
//    debugger;
//    var d = $(this).next();

//});



$(function () {
    $('.selectMania').selectMania({
        //size: 'small',
        themes: 'red',
        placeholder: 'Please select me!',
        //removable: true,
        search: true,
    });
});

$(".number").keypress(function (e) {
    //if the letter is not digit then display error and don't type anything
    if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
        //display error message

        return false;
    }
});


$('.decimal').keypress(function (event) {
    if ((event.which != 46 || $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57)) {
        event.preventDefault();
    }
});


$("#more-search-options-btn").click(function () {
    $(this).find("i").toggleClass("fa-plus-square,fa-minus-square");
    $(".more-search-options").slideToggle();
});


$('.product_main_slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: false,
    asNavFor: '.product_nav_slider',
});
$('.comparison').slick({
    infinite: true,
    slidesToShow: 2,
    arrows: false,
    autoplay: true,
    slidesToScroll: 1
});
$('.product_nav_slider').slick({
    slidesToShow: 5,
    slidesToScroll: 1,
    asNavFor: '.product_main_slider',
    dots: false,
    focusOnSelect: true
});

// Remove active class from all thumbnail slides
$('.product_nav_slider .slick-slide').removeClass('slick-active');

// Set active class to first thumbnail slides
$('.product_nav_slider .slick-slide').eq(0).addClass('slick-active');

// On before slide change match active thumbnail to current slide
$('.product_main_slider').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
    var mySlideNumber = nextSlide;
    $('.product_nav_slider .slick-slide').removeClass('slick-active');
    $('.product_nav_slider .slick-slide').eq(mySlideNumber).addClass('slick-active');
});

$('.main-slider').slick({
    dots: false,
    infinite: true,
    speed: 500,
    fade: true,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
    cssEase: 'linear'
});

$('.brands').slick({
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1
});

$('.clients').slick({
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1
});

$('.featured').slick({
    infinite: true,
    slidesToShow: 3,
    autoplay: true,
    slidesToScroll: 1
});

$('.feedback').slick({
    infinite: true,
    slidesToShow: 1,
    autoplay: true,
    slidesToScroll: 1,
    dots: true,
    autoplaySpeed: 5000,
    arrows: false
});

$("#more-search-options-btn").click(function () {
    $(this).find("i").toggleClass("fa-plus-square fa-minus-square");
    $(".more-search-options").show();
});



function activeNavbar(selector) {
    $("#mainNavbar li").removeClass("active");
    $("#mainNavbar " + selector).addClass("active");
}


function isValidEmailAddress(emailAddress) {
    var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return pattern.test(emailAddress);
}


$("#btnChangeLang").click(function () {
    var language = jQuery.trim(String($(this).text()).toLowerCase());
    loadingPage();
    $.ajax({
        type: "POST",
        url: "/Home/ChangeLanguage",
        data: JSON.stringify(language),
        contentType: 'application/json',
        //dataType: "json",
        success: function (result) {
            window.location.reload();
        },
        failure: function (response) {
            removeLoadingPage();
            console.log(response);
        }
    });
});

//$(document).keydown(function (event) {
    
//    if (event.keyCode == 123) {
//        return false;
//    }
//    else if (event.ctrlKey && event.shiftKey && event.keyCode == 73) {
//        return false;  //Prevent from ctrl+shift+i
//    }
//});


//$(document).on("contextmenu", function (e) {
//    e.preventDefault();
//});


