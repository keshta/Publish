
var url = window.location.pathname;

$(".navbar-nav li").find("a").removeClass("active");

if (String(url.toLocaleLowerCase()).includes('aboutus') == true) {
    $("#lnkAboutUs").addClass("active");
}

else if (String(url.toLocaleLowerCase()).includes('blog') == true) {
    $("#lnkBlog").addClass("active");
}

else if (String(url.toLocaleLowerCase()).includes('contactus') == true) {
    $("#lnkContactUs").addClass("active");
}

else if (String(url.toLocaleLowerCase()).includes('website') == true || String(url.toLocaleLowerCase()).includes('service') == true) {
    $("#lnkService").addClass("active");
}

else {
    $("#lnkHome").addClass("active");
}

