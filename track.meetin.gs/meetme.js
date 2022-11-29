// Find all buttons & replace with iframe
var elems = document.getElementsByClassName('meetme-button');
for(var i = 0; i < elems.length ; i++) {
    ifrm = document.createElement("IFRAME");
    ifrm.setAttribute("src", "//track.meetin.gs/button.html");
    ifrm.style.width = 140+"px";
    ifrm.style.height = 30+"px";
    elems[i].parentNode.replaceChild(ifrm,elems[i]);
}
