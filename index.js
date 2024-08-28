const blogVersion = 1;

function start() {
    if (!localStorage.getItem("blogversion")) {
        localStorage.setItem("blogversion", 0);
    }

    if (localStorage.getItem("blogversion") < blogVersion) {
        document.getElementById("notif").style.display = "block";
    }
}

function refreshNotif() {
    if (!localStorage.getItem("blogversion")) {
        localStorage.setItem("blogversion", blogVersion);
    } else {
        localStorage.setItem("blogversion", blogVersion);
    }
}