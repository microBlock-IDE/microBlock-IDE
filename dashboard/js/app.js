let offsetX = 0, offsetY = 0, movingDiv = null;

function divMove(e) {
    movingDiv.style.top = `${Math.max(e.clientY - offsetY, 0)}px`;
    movingDiv.style.left = `${Math.max(e.clientX - offsetX, 0)}px`;
} 

document.addEventListener("mouseup", function(e) {
    if (movingDiv) {
        movingDiv.classList.remove("moving");
        movingDiv = null;
    }
    document.removeEventListener("mousemove", divMove, true);
}, false);

function divResize(e) {
    movingDiv.style.width = `${startW + (e.clientX - startX)}px`;
    movingDiv.style.height = `${startH + (e.clientY - startY)}px`;
} 

document.addEventListener("mouseup", function(e) {
    document.removeEventListener("mousemove", divResize, true);
}, false);

document.querySelector("body > article > section.board").addEventListener("click", function(e) {
    if (this !== e.target) {
        return;
    }

    let div = document.querySelector(".setting-btn .widget-popup");
    if (div) {
        div.remove();
    }
});

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
        <header>
            <span class="label">${widget.name}</span>
            <span class="setting-btn"><i class="fas fa-cog"></i></span>
        </header>
        <article>
            ${widget.create.bind(widget)()}
        </article>
        <span class="resize-btn">
            <span class="icon"></span>
        </span>
    `;
    if (!addToToolbox) {
        div.style.width = "300px";
        div.style.height = "200px";
        div.style.top = "20px";
        div.style.left = "20px";
    } else {
        div.style.width = "200px";
        div.style.height = "100%";
    }

    document.querySelector(!addToToolbox ? "body > article > section.board" : "section.toolbox").appendChild(div);
    widget.element = div;

    widget.render.bind(widget)();

    if (addToToolbox) {
        return widget; // Skip can move
    }

    allWidget.push(widget);

    div.querySelector("header").addEventListener('mousedown', function(e) {
        if (this !== e.target) return;

        offsetX = e.clientX - div.offsetLeft;
        offsetY = e.clientY - div.offsetTop;
        movingDiv = div;
        div.classList.add("moving");
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

    widget.popup = null;
    div.querySelector(".setting-btn").addEventListener("click", function(e) {
        if (this.querySelector(".widget-popup")) return;
        
        let _widget = widgets.find(w => w.id === widget.id);

        widget.popup = document.createElement("div");
        widget.popup.classList.add("widget-popup");
        let html = "";
        html += `
            <div class="property">
                <div class="label">Name</div>
                <div class="input"><input type="text" name="name" value="${widget.name}" autocomplete="off"></div>
            </div>
        `;
        html += `
            <div class="property">
                <div class="label">Source</div>
                <div class="input">
                    <select name="source">
                        <option value=""${widget.source === null ? " selected" : ""}></option>
                        ${
                        getAllDataSourceName().map(n => `
                            <option value="${n}"${widget.source === n ? " selected" : ""}>${n}</option>
                        `).join("")}
                    </select>
                </div>
            </div>
        `;
        html += Object.keys(_widget.property).map(propertyName => `
            <div class="property">
                <div class="label">${propertyName}</div>
                <div class="input"><input name="${propertyName}" type="${_widget.property[propertyName].type}" value="${widget.property[propertyName]}" autocomplete="off"></div>
            </div>
        `).join("");
        html += `
            <div class="btn-group">
                <button class="delete">Delete</button>
            </div>
        `;
        widget.popup.innerHTML = html;
        
        this.appendChild(widget.popup);

        for (let inp of widget.popup.querySelectorAll("input, select")) {
            let fn = function(e) {
                let name = this.getAttribute("name");
                let value = this.value;
                if (name === "name") {
                    widget.name = value;
                    widget.element.querySelector("header .label").innerText = value;
                } else if (name === "source") {
                    widget.source = value;
                } else {
                    if (Object.keys(widget.property).indexOf(name) >= 0) {
                        widget.property[name] = value;
                        widget.render.bind(widget)();
                    } else {
                        console.warn("not found property", name);
                    }
                }
            };
            inp.addEventListener("change", fn);
            inp.addEventListener("keyup", fn);
        }

        widget.popup.querySelector("button.delete").addEventListener("click", function(e) {
            let index = allWidget.findIndex(w => w === widget);
            widget.element.remove();
            allWidget.splice(index, 1);
        });
    });

    return widget;
}

let logSourceName = [];

let onDataIn = (source, value) => {
    if (logSourceName.indexOf(source) < 0) {
        logSourceName.push(source);
    }

    for (let widget of allWidget.filter(w => w.source === source)) {
        widget.value = value;
        widget.render.bind(widget)();
    }
}

let getAllDataSourceName = () => {
    return logSourceName;
};

for (let _widget of widgets) {
    let widget = createWidget(_widget.id, true);
    widget.element.addEventListener("click", () => {
        createWidget(_widget.id);
    });
    widget.toolbox.bind(widget)();
    widget.render.bind(widget)();
}

document.querySelector("#toolbox-open-close").addEventListener("click", function(e) {
    let isShow = document.querySelector("section.toolbox").classList.toggle("active");
});

let dataInputBuffer = "";

if (isElectron) {
    ipcRenderer.on("serial-data-in", (evt, msg) => {
        for (let c of msg) {
            dataInputBuffer += String.fromCharCode(c);
            if (dataInputBuffer.endsWith("\r\n")) {
                let line = dataInputBuffer.substring(0, dataInputBuffer.length - 1);

                const regex = /[?&]?([^=]+)\=([^&]+)/gm;
                let m;
                while ((m = regex.exec(line)) !== null) {
                    if (m.index === regex.lastIndex) {
                        regex.lastIndex++;
                    }
                    onDataIn(m[1], m[2]);
                }

                dataInputBuffer = "";
            }
        }
        
    });
}

if (allWidget.length === 0) {
    document.querySelector("section.toolbox").classList.add("active");
}
