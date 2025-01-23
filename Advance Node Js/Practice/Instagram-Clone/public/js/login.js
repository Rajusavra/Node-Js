function form_display_hour() {
    if (document.getElementById("fallday").checked) {
        document.getElementById("fhourdiv").style.display = "none";
    } else {
        document.getElementById("fhourdiv").style.display = "flex";
    }
}

function form_init() {
    const today = new Date().toISOString();
    const date = today.split("T")[0];
    document.getElementById("fdate").min = date;
    document.getElementById("fstart").step = 900;
    document.getElementById("fend").step = 900;
}

function time_step_str(date, step) {
    var minutes = date.getMinutes() + step;
    var hours = date.getHours() + Math.floor(minutes / 60);
    minutes %= 60;
    hour = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    return `${hours}:${minutes}`;
}

function form_validate_hour() {
    const start = document.getElementById("fstart");
    const end = document.getElementById("fend");

    var startDate = new Date();
    var endDate = new Date();

    startDate.setHours(...start.value.split(":").map(Number));

    if (end.value === "") {
        end.value = time_step_str(startDate, Number(end.step) / 60);
    }

    endDate.setHours(...end.value.split(":").map(Number));

    if (startDate > endDate) {
        end.value = time_step_str(startDate, Number(end.step) / 60);
    }
}

form_init();
