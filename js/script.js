var main_id = document.querySelector("main").id;
var navmenu = document.getElementsByClassName("menu")[0];
var navlist = navmenu.getElementsByTagName("li");
var headtext = document.getElementById("headname");
var menuelem;
var alerttext = "";

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

headtext.innerHTML = menuelem.textContent;
// menuelem.classList.add("active");
// alert(headtext.innerHTML);

for (i = 0; i < navlist.length; i++) {
	if (navlist[i].innerHTML) alerttext += navlist[i].innerHTML + "\n";
}
