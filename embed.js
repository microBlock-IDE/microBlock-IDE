(function() {
    let cssScript = document.createElement("style");
    cssScript.innerHTML = `
.microBlock-embed {
    display: inline-block;
    border: #D0D3D4 1px solid;
}

.microBlock-embed > iframe {
    border: none;
    width: 100%;
    height: 100%;
}
    `;
    document.querySelector("head").appendChild(cssScript);
})();

window.microBlock = {};
window.microBlock.nextId = 1;
window.microBlock.reload = () => {
    for (let box of document.querySelectorAll(".microBlock-embed")) {
        box.setAttribute("data-id", window.microBlock.nextId);

        let optionURL = `&id=${window.microBlock.nextId}`;
        for (let attr of box.attributes) {
            let name = attr.name;
            let value = attr.nodeValue;
            if (name === "class") continue;
            if (name === "blockonly") name = "blockOnly";
            optionURL += `&${name}=${encodeURIComponent(value)}`;
            if (name === "width" && value !== "0") box.style.width = value.endsWith("%") ? value : `${value}px`;
            if (name === "width" && value === "0") box.style.width = "200px";
            if (name === "height" && value !== "0") box.style.height = value.endsWith("%") ? value : `${value}px`;
            if (name === "height" && value === "0") box.style.height = "200px";
        }

        let iframe = document.createElement("iframe");
        iframe.setAttribute("src", `https://ide.microblock.app/?embed${optionURL}`);
        box.appendChild(iframe);

        window.microBlock.nextId++;
    }
};

window.microBlock.updateFrameSize = (id, width, height) => {
    let iframe = document.querySelector(`.microBlock-embed[data-id='${id}']`);
    iframe.style.width = width;
    iframe.style.height = height;
};

window.microBlock.reload();




