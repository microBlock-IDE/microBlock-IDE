let offsetX = 0, offsetY = 0, movingDiv;

function divMove(e) {
    movingDiv.style.top = `${Math.max(e.clientY - offsetY, 0)}px`;
    movingDiv.style.left = `${Math.max(e.clientX - offsetX, 0)}px`;
} 

document.addEventListener("mouseup", function(e) {
    document.removeEventListener("mousemove", divMove, true);
}, false);

function divResize(e) {
    movingDiv.style.width = `${startW + (e.clientX - startX)}px`;
    movingDiv.style.height = `${startH + (e.clientY - startY)}px`;
} 

document.addEventListener("mouseup", function(e) {
    document.removeEventListener("mousemove", divResize, true);
}, false);

let reloadWidgetDrawAndResize = () => {
    for (let boxx of document.querySelectorAll(".widget-box")) {
        boxx.querySelector("header").addEventListener('mousedown', function(e) {
            offsetX = e.clientX - boxx.offsetLeft;
            offsetY = e.clientY - boxx.offsetTop;
            div = boxx;
            document.addEventListener("mousemove", divMove, true);
        }, false);
        
        boxx.querySelector(".resize-btn").addEventListener('mousedown', function(e) {
            startX = e.clientX;
            startY = e.clientY;
            startW = boxx.clientWidth;
            startH = boxx.clientHeight;
            div = boxx;
            document.addEventListener("mousemove", divResize, true);
        }, false);
    }
}

OverlayScrollbars(document.querySelectorAll("section.board"), { });

let allWidget = [ ];

let createWidget = (id, addToToolbox) => {
    if (typeof addToToolbox === "undefined") {
        addToToolbox = false;
    }

    let _widget = widgets.find(w => w.id === id);
    let widget = _.cloneDeep(_widget);

    for (let propertyName of Object.keys(_widget.property)) {
        let _property = _widget.property[propertyName];
        if (typeof _property.default !== "undefined") {
            widget.property[propertyName] = _property.default;
        } else {
            if (_property.type === "text") {
                widget.property[propertyName] = "";
            } else if (_property.type === "number") {
                widget.property[propertyName] = 0;
            } 
        }
    }

    widget.source = null;
    widget.value = null;

    let div = document.createElement("div");
    div.classList.add("widget-box");
    div.classList.add(`${id}-widget`);
    div.innerHTML = `
        <header>${widget.name}</header>
        <article>
            ${widget.create.bind(widget)()}
        </article>
        <span class="resize-btn">
            <span class="icon"></span>
        </span>
    `;
    div.style.width = "300px";
    div.style.height = "200px";
    div.style.top = "20px";
    div.style.left = "20px";

    document.querySelector(!addToToolbox ? "body > article > section.board" : "body > article > section.toolbox").appendChild(div);
    widget.element = div;

    widget.render.bind(widget)();

    allWidget.push(widget);

    if (!addToToolbox) {
        return; // Skip can move
    }

    div.querySelector("header").addEventListener('mousedown', function(e) {
        offsetX = e.clientX - div.offsetLeft;
        offsetY = e.clientY - div.offsetTop;
        movingDiv = div;
        document.addEventListener("mousemove", divMove, true);
    }, false);
    
    div.querySelector(".resize-btn").addEventListener('mousedown', function(e) {
        startX = e.clientX;
        startY = e.clientY;
        startW = div.clientWidth;
        startH = div.clientHeight;
        movingDiv = div;
        document.addEventListener("mousemove", divResize, true);
    }, false);
}

let onDataIn = (source, value) => {
    for (let widget of allWidget.filter(w => w.source === source)) {
        widget.value = value;
        widget.render.bind(widget)();
    }
}





// OverlayScrollbars(document.querySelectorAll(".widget-box.log-widget > article > ul.log-list"), { });

/*
var myGauge = Gauge(document.querySelector("#gauge-demo"), {
    max: 100,
    value: 50
});

var myChart = new Chart(document.querySelector("#myChart").getContext('2d'), {
    type: 'line',
    data: {
        labels: [ "1", "2", "3", "4" ],
        datasets: [{
            backgroundColor: "#ff57221f",
            borderColor: "#FF5722",
            borderWidth: 1,
            data: [ 10, 20, 5, 2 ],
            fill: "start"
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                },
                gridLines: {
                    color: "#424242"
                },
            }],
            xAxes: [{
                gridLines: {
                    color: "#424242"
                },
            }]
        },
        responsive: true,
        maintainAspectRatio: false,
        legend: {
            display: false
        },
        elements: {
            line: {
                tension: 0.000001
            }
        },
    }
});
*/