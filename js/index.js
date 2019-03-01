/*jshint esversion: */

window.onload = function () {
    "use strict";

    document.getElementById("selector_join").addEventListener('click', function(e) {
        document.getElementById("join_options").style.display = "flex";
        document.getElementById("host_options").style.display = "none";
    })

    document.getElementById("selector_host").addEventListener('click', function(e) {
        document.getElementById("host_options").style.display = "flex";
        document.getElementById("join_options").style.display = "none";
        document.getElementById("host_lobby_name").required = true;
    })

}