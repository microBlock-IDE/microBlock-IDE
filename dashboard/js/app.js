let offsetX = 0, offsetY = 0, movingDiv = null;
let loadingForContent = false;

function divMove(e) {
    movingDiv.style.top = `${Math.max(e.clientY - offsetY, 0)}px`;
    movingDiv.style.left = `${Math.max(e.clientX - offsetX, 0)}px`;
} 

document.addEventListener("mouseup", function(e) {
    if (movingDiv) {
        movingDiv.classList.remove("moving");
        movingDiv = null;
        onBoardUpdate();
    }
    document.removeEventListener("mousemove", divMove, true);
}, false);

function divResize(e) {
    movingDiv.style.width = `${startW + (e.clientX - startX)}px`;
    movingDiv.style.height = `${startH + (e.clientY - startY)}px`;
} 

document.addEventListener("mouseup", function(e) {
    if (movingDiv) {
        movingDiv = null;
        onBoardUpdate();
    }
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

let onBoardUpdate = () => {
    // console.log("Update");

    if (!loadingForContent) {
        // Auto save
        let boardContent = getContentBoardForSave();
        localStorage.setItem("saveBoard", boardContent);

        console.log("Auto Save");
    }
};

let allWidget = [ ];

let createWidget = (id, addToToolbox) => {
    if (typeof addToToolbox === "undefined") {
        addToToolbox = false;
    }

    let _widget = widgets.find(w => w.id === id);
    let widget = _.cloneDeep(_widget);

    delete widget.create;
    delete widget.render;
    delete widget.toolbox;

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
        </header>
        <article>
            ${_widget.create.bind(widget)()}
        </article>
        <span class="resize-btn">
            <span class="icon"></span>
        </span>
        <span class="setting-btn"><i class="fas fa-cog"></i></span>
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

    _widget.render.bind(widget)();

    if (addToToolbox) {
        return widget; // Skip can move and edit property
    }

    allWidget.push(widget);

    onBoardUpdate();

    div.querySelector("header").addEventListener('mousedown', function(e) {
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

    div.querySelector(".setting-btn").addEventListener("click", function(e) {
        if (this.querySelector(".widget-popup")) return;
        
        let _widget = widgets.find(w => w.id === widget.id);

        let popup = document.createElement("div");
        popup.classList.add("widget-popup");
        let html = "";
        html += `
            <div class="property">
                <div class="label">Name</div>
                <div class="input"><input type="text" name="name" value="${widget.name}" autocomplete="off"></div>
            </div>
        `;
        let sourceProperty = Object.keys(_widget.property).filter(propertyName => _widget.property[propertyName].type === "source");
        if (sourceProperty.length <= 0) {
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
        } else {
            html += sourceProperty.map(propertyName => `
                <div class="property">
                    <div class="label">${propertyName}</div>
                    <div class="input">
                        <select name="${propertyName}">
                            <option value=""${widget.property[propertyName] === null ? " selected" : ""}></option>
                            ${
                            getAllDataSourceName().map(n => `
                                <option value="${n}"${widget.property[propertyName] === n ? " selected" : ""}>${n}</option>
                            `).join("")}
                        </select>
                    </div>
                </div>
            `).join("");
        }
        html += Object.keys(_widget.property).filter(propertyName => _widget.property[propertyName].type.indexOf("number") >= 0 || _widget.property[propertyName].type.indexOf("text") >= 0).map(propertyName => `
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
        popup.innerHTML = html;
        
        this.appendChild(popup);

        for (let inp of popup.querySelectorAll("input, select")) {
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
                        _widget.render.bind(widget)();
                    } else {
                        console.warn("not found property", name);
                    }
                }
                onBoardUpdate();
            };
            inp.addEventListener("change", fn);
            inp.addEventListener("keyup", fn);
        }

        popup.querySelector("button.delete").addEventListener("click", function(e) {
            let index = allWidget.findIndex(w => w === widget);
            widget.element.remove();
            allWidget.splice(index, 1);
            onBoardUpdate();
        });
    });

    return widget;
}

let logSourceName = [];

let onDataIn = (source, value) => {
    if (logSourceName.indexOf(source) < 0) {
        logSourceName.push(source);
    }

    for (let widget of allWidget) {
        let _widget = widgets.find(w => w.id === widget.id);
        let sourceProperty = Object.keys(_widget.property).filter(propertyName => _widget.property[propertyName].type === "source");
        let updateWidgetFlag = false;
        if (sourceProperty.length <= 0) {
            if (widget.source === source) {
                widget.value = value;
                updateWidgetFlag = true;
            }
        } else {
            for (let propertyName of sourceProperty) {
                if (widget.property[propertyName] === source) {
                    if (!widget.value) {
                        widget.value = { };
                    }
                    widget.value[propertyName] = value;
                    updateWidgetFlag = true;
                }
            }
        }
        if (updateWidgetFlag) {
            _widget.render.bind(widget)();
        }
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
    _widget.toolbox.bind(widget)();
    _widget.render.bind(widget)();
}

document.querySelector("#toolbox-open-close").addEventListener("click", function(e) {
    let isShow = document.querySelector(".toolbox-box").classList.toggle("active");
});

let dataInputBuffer = "";
function streamDataIn(msg) {
    for (let c of msg) {
        dataInputBuffer += typeof c === "number" ? String.fromCharCode(c) : c;
        if (dataInputBuffer.endsWith("\r\n")) {
            let line = dataInputBuffer.substring(0, dataInputBuffer.length - 2);

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
}

function serialStatusUpdate(msg) {
    document.querySelector(".serial-status").innerText = msg;
    document.querySelector(".serial-status").setAttribute("data-value", msg);
}

if (isElectron) {
    ipcRenderer.on("serial-status", (evt, msg) => {
        serialStatusUpdate(msg);
    });

    sharedObj.mainWin.webContents.send("get-serial-status", "");

    ipcRenderer.on("serial-data-in", (evt, msg) => {
        streamDataIn(msg);
    });
} else {
    if (typeof window.opener !== "undefined") {
        serialStatusUpdate(window.opener.getSerialStatus());
    }
}

let getContentBoardForSave = () => {
    let newAllWidget = _.cloneDeep(allWidget);
    newAllWidget = newAllWidget.map(widget => { 
        widget.style = widget.element.getAttribute("style");
        for (let n of [ "element", "chart", "gauge" ]) {
            if (typeof widget[n] !== "undefined") {
                delete widget[n];
            }
        }
        return widget; 
    });

    return JSON.stringify(newAllWidget);
};

let loadBoardContentForOpen = (content) => {
    loadingForContent = true;
    let newAllWidget = JSON.parse(content) || [ ];
    for (let objWidget of newAllWidget) {
        let widget = createWidget(objWidget.id);
        widget.element.setAttribute("style", objWidget.style);
        delete objWidget.style;
        Object.assign(widget.property, objWidget.property);
        widget.source = objWidget.source;
        
        let _widget = widgets.find(w => w.id === widget.id);
        _widget.render.bind(widget)();
    }
    loadingForContent = false;
};

// Load board from local storage (load from autosave)
(() => {
    let boardContent = localStorage.getItem("saveBoard");
    loadBoardContentForOpen(boardContent);
})();

if (allWidget.length === 0) {
    document.querySelector(".toolbox-box").classList.add("active");
}

if (!isElectron) {
    if (typeof window.opener !== "undefined") {
        window.opener.trigDashboardIsReady();
    }
}
