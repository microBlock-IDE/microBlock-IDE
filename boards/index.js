let loadScript = (f) => {
    /*let script = document.createElement("script");
    script.setAttribute("src", f);
    document.body.appendChild(script);*/
    document.write(`<script src="${f}"></script>`);
};

loadScript(`${rootPath}/boards/kidbright32/index.js`); // Add KidBright32 common config
loadScript(`${rootPath}/boards/kidbright32-v1.3/index.js`);  // Add KidBright32 V1.3 & V1.4
loadScript(`${rootPath}/boards/kidbright32i/index.js`); // Add KidBright32i by INEX
loadScript(`${rootPath}/boards/kidbright32-v1.6/index.js`);  // Add KidBright32 V1.6 by Gravitech
loadScript(`${rootPath}/boards/openkb/index.js`);  // Add OpenKB
loadScript(`${rootPath}/boards/ipst-wifi/index.js`);  // Add IPST-WiFi
loadScript(`${rootPath}/boards/kidbright32-v1.5/index.js`);  // Add KidBright32 V1.5
loadScript(`${rootPath}/boards/ttgo-t-display/index.js`);  // Add TTGO T-Display
