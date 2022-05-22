const { ipcRenderer } = require('electron');

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

let a = document.createElement("a");
a.onclick = () => {
    ipcRenderer.send("openDiscord" , {});
}
let imgX = document.createElement("img")
imgX.src = "data:image/png;base64,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";
imgX.style.width = "10%";
imgX.style.maxWidth = "100px";
imgX.style.position = "fixed";
imgX.style.right = "0px";
imgX.style.bottom = "0px";
a.appendChild(imgX)
a.style.position = "fixed";
a.style.right = "0px";
a.style.bottom = "0px";
a.style.cursor = "pointer";
document.body.appendChild(a)

document.head.innerHTML += `
<style>
body{
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none;
}

body::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
}

</style>
`