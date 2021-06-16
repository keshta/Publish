

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



function activeNavbar(selector) {
    $("#mainNavbar li").removeClass("active");
    $("#mainNavbar " + selector).addClass("active");
}


function chkSizeFile(file) {
    var kb = parseFloat(file.size) / 1024;
    if (kb <= 500) {
        return true;
    }
    else {
        return false;
    }
}


jQuery(function ($) {
    var $sidebar = $('.sidebar').eq(0);
    if (!$sidebar.hasClass('h-sidebar')) return;

    $(document).on('settings.ace.top_menu', function (ev, event_name, fixed) {
        if (event_name !== 'sidebar_fixed') return;

        var sidebar = $sidebar.get(0);
        var $window = $(window);

        //return if sidebar is not fixed or in mobile view mode
        var sidebar_vars = $sidebar.ace_sidebar('vars');
        if (!fixed || (sidebar_vars['mobile_view'] || sidebar_vars['collapsible'])) {
            $sidebar.removeClass('lower-highlight');
            //restore original, default marginTop
            sidebar.style.marginTop = '';

            $window.off('scroll.ace.top_menu')
            return;
        }


        var done = false;
        $window.on('scroll.ace.top_menu', function (e) {

            var scroll = $window.scrollTop();
            scroll = parseInt(scroll / 4);//move the menu up 1px for every 4px of document scrolling
            if (scroll > 17) scroll = 17;


            if (scroll > 16) {
                if (!done) {
                    $sidebar.addClass('lower-highlight');
                    done = true;
                }
            }
            else {
                if (done) {
                    $sidebar.removeClass('lower-highlight');
                    done = false;
                }
            }

            sidebar.style['marginTop'] = (17 - scroll) + 'px';
        }).triggerHandler('scroll.ace.top_menu');

    }).triggerHandler('settings.ace.top_menu', ['sidebar_fixed', $sidebar.hasClass('sidebar-fixed')]);

    $(window).on('resize.ace.top_menu', function () {
        $(document).triggerHandler('settings.ace.top_menu', ['sidebar_fixed', $sidebar.hasClass('sidebar-fixed')]);
    });


});

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}



$("#selectLang li a").click(function () {
    var language = $(this).attr('name');
    if (getCookie("languageAloCar") == language) {
        return false;
    }

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


$(document).on('click', '.clickable', function (e) {
    var $this = $(this);
    if (!$this.hasClass('panel-collapsed')) {
        $this.parents('.panel').find('.panel-body').slideUp();
        $this.addClass('panel-collapsed');
        $this.find('i').removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
    } else {
        $this.parents('.panel').find('.panel-body').slideDown();
        $this.removeClass('panel-collapsed');
        $this.find('i').removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
    }
});

$(document).on('click', '.panel-title', function (e) {
    var $this = $(this);
    if (!$this.hasClass('panel-collapsed')) {
        $this.parents('.panel').find('.panel-body').slideUp();
        $this.addClass('panel-collapsed');
        $this.find('i').removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
    } else {
        $this.parents('.panel').find('.panel-body').slideDown();
        $this.removeClass('panel-collapsed');
        $this.find('i').removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
    }
});

$('.selectMania').selectMania({
    //size: 'small',
    themes: 'red',
    //placeholder: 'Please select me!',
    removable: false,
    search: true,
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


function getDate(date) {
    if (date != "" && date != null && date != undefined) {
        var d = new Date(date);
        var day = d.getDay() < 10 ? "0" + String(d.getDay()) : String(d.getDay());
        var month = d.getMonth() < 10 ? "0" + String(d.getMonth()) : String(d.getMonth());
        return day + "-" + month + "-" + d.getFullYear();
    }
    else {
        return "";
    }
}


$(function () {
    //$('.dataTable').DataTable({
    //    'paging': true,
    //    'lengthChange': false,
    //    'searching': false,
    //    'ordering': true,
    //    'info': true,
    //    'autoWidth': false
    //});

    var language = $("#hddLanguage").val();

    $('.dataTable').DataTable({
        dom: 'Bfrtip',
        buttons: [
            'copy', 'excel', 'pdf', 'print'
        ],
        oLanguage: {
            "sSearch": language == "ar" ? "بحث" : "Search",
            "lengthMenu": "dd _MENU_ records per page",
            "sZeroRecords": language == "ar" ? "لم يتم العثور على شيء" : "Nothing found",
            "sInfoEmpty": language == "ar" ? "لا توجد سجلات متاحة" : "No records available",
            "sInfo": language == "ar" ? "عرض _START_ الى _END_ من _TOTAL_ مدخلات" : "Showing _START_ to _END_ of _TOTAL_ entries",
            "oPaginate": {
                "sPrevious": language == "ar" ? "السابق" : "السابق",
                "sNext": language == "ar" ? "التالى" : "Next",
            }
        },
    });



    $('.summernote').summernote({
        tabsize: 2,
        height: 200,
        lang: language == "ar" ? 'ar-AR' : 'en-US',
        toolbar: [
            ["style", ["style"]],
            ["font", ["bold", "underline", "clear"]],
            ["fontname", ["fontname"]],
            ["color", ["color"]],
            ["para", ["ul", "ol", "paragraph"]],
            //["table", ["table"]],
            ["insert", ["link"]],
            ["view", ["fullscreen", "codeview", "help"]]
        ],
    });

    $(".yearpicker").yearpicker();

})


//$(function () {
//    $('.dateTimePicker').datetimepicker();
//    $('.yearPicker').datetimepicker({
//        viewMode: 'years',
//        format: 'YYYY'
//    });
//});


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


//$('.selectImage').ddslick({
//    //width: 300,
//    imagePosition: getLanguage() == "ar" ? "right" : "left",
//    selectText: "",
//    onSelected: function (data) {
//        //console.log(data);
//    }
//});



//function getLanguage() {
//    var language = getCookie("languageAloCar");
//    language = language == null || language == undefined || language == "" ? "ar" : language;
//    return language;
//}