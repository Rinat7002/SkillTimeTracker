var main_id = document.querySelector("main").id;
var navmenu = document.getElementsByClassName("menu")[0];
var navlist = navmenu.getElementsByTagName("li");
var headtext = document.getElementById("headname");
var menuelem;
var alerttext = "";

//Смена наименования раздела в заголовке H1
switch(main_id) {
	case 'general':
		menuelem = navlist[0];
		break;
	case 'account':
		menuelem = navlist[1];
		break;
	case 'my-skills':
		menuelem = navlist[2];
		break;
	case 'statistics':
		menuelem = navlist[3];
		break;
	case 'about-us':
		menuelem = navlist[4];
		break;
	default:
		menuelem = navlist[0];
}

// alert(main_id);
// alert(menuelem.textContent);
// alert(navlist[2].textContent);
// alert(menuelem.firstChild.innerHTML);/

//Смена наименования раздела в заголовке H1
headtext.innerHTML = menuelem.textContent;
// menuelem.classList.add("active");
// alert(headtext.innerHTML);

//Анимацию главного навигационного меню
$(document).ready(function() {
    $(".menu li").mouseenter(function () {
        $(this).addClass("active");
        $(this).find('a').addClass("active");
    }).mouseleave(function () {
        var pageTitle = menuelem.textContent.replace(/^\s+|\s+$/g, ''); // Получаем название текущей страницы
        var menuItemName = $(this).find('a').text(); // Получаем название элемента меню, соответствующего текущему
		// alert(pageTitle);
		// console.log(pageTitle);
		// console.log(menuItemName);
		// console.log(menuItemName == pageTitle);

        if (menuItemName !== pageTitle) {
            $(this).removeClass("active");
            $(this).find('a').removeClass("active");
        }
    });
});

$(document).ready(function() {
	$(".hidebox p").hide();
	// $(".hidebox h3").css("background-color", "#29c5e6");
});
$(".hidebox h3").click(function () {
	$(this).next("p").hide("slow");
	$(this).css("background-color", "#008000");
	$(this).css("color", "#fff");

});
$(".hidebox h3").dblclick(function () {
	$(this).next("p").show("slow");
	$(this).css("background-color", "#E4DC23");
	$(this).css("color", "#000000");

});

// Изменение размеров изображений при наведении на них
$("figure img").hover(
    function() {
        var currentWidth = $(this).width();
        var currentHeight = $(this).height();
        
        var newWidth = currentWidth + currentWidth * 0.03;
        var newHeight = currentHeight + currentHeight * 0.03;

        $(this).stop().animate({
            width: newWidth,
            height: newHeight
        }, "slow");

    }, function() {
        var currentWidth = $(this).width();
        var currentHeight = $(this).height();
        
        var newWidth = currentWidth - currentWidth * 0.03;
        var newHeight = currentHeight - currentHeight * 0.03;

        $(this).stop().animate({
            width: newWidth,
            height: newHeight
        }, "slow");
    });