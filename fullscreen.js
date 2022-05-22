var ids = ["adboxverticalCurse", "adboxverticalleftCurse", "bonkioheader", "descriptioncontainer"];

for (var i = 0; i < ids.length; i++) {
    try {
        document.getElementById(ids[i]).style.display = "none";
    } catch {
        console.log("Error while removing " + ids[i]);
    }
}

setTimeout(() => {
    window.cont = document.querySelector("#bonkiocontainer");
}, 1000);

var resz = () => {
    console.log("resz");
    try {
        document.getElementById("maingameframe").style.marginTop = "";
    } catch {
        console.log("Error while removing margin Top");
    }

    try {
        window.cont.style.width = "100%";
        window.cont.style.height = "100%";

        window.cont = document.querySelector("#bonkiocontainer");
    } catch (e) {
        console.log("Error while making fullscreen");
        console.error(e);
    }
};

window.addEventListener('resize', function (event) {
    resz();
    setTimeout(resz, 300);
}, true);

setTimeout(resz, 2000);