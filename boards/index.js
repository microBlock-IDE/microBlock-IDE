let loadScript = (f) => {
    /*let script = document.createElement("script");
    script.setAttribute("src", f);
    document.body.appendChild(script);*/
    document.write(`<script src="${f}"></script>`);
};

loadScript(`${rootPath}/boards/kidbright32/index.js`); // Add KidBright32 common config
loadScript(`${rootPath}/boards/kidbright32-v1.3/index.js`);  // Add KidBright32 V1.3 & V1.4
loadScript(`${rootPath}/boards/kidbright32i/index.js`); // Add KidBright32i by INEX
loadScript(`${rootPath}/boards/kidbright32iP/index.js`); // Add KidBright32iP by INEX
loadScript(`${rootPath}/boards/kidbright32iA/index.js`); // Add KidBright32iA by INEX
loadScript(`${rootPath}/boards/kidbright32-v1.6/index.js`);  // Add KidBright32 V1.6 by Gravitech
loadScript(`${rootPath}/boards/ipst-wifi/index.js`);  // Add IPST-WiFi
loadScript(`${rootPath}/boards/openkb/index.js`);  // Add OpenKB
loadScript(`${rootPath}/boards/kidbright32-v1.5/index.js`);  // Add KidBright32 V1.5
loadScript(`${rootPath}/boards/ttgo-t-display/index.js`);  // Add TTGO T-Display
loadScript(`${rootPath}/boards/rapbit32/index.js`);  // Add Rapbit32(XA)
loadScript(`${rootPath}/boards/esp32-dev-board/index.js`);  // Add ESP32 Dev Board
loadScript(`${rootPath}/boards/raspberry-pi-pico/index.js`);  // Add Raspberry Pi Pico
loadScript(`${rootPath}/boards/raspberry-pi-pico-w/index.js`);  // Add Raspberry Pi Pico W
loadScript(`${rootPath}/boards/mbits/index.js`);  // Add Mbits
loadScript(`${rootPath}/boards/openbit/index.js`);  // Add OpenBit
loadScript(`${rootPath}/boards/kidmotor-v4/index.js`);  // Add KidMotor V4.0
loadScript(`${rootPath}/boards/puppy-bot/index.js`);  // Add PuppyBot
// loadScript(`${rootPath}/boards/bilimbi/index.js`);  // Add BILIMBI
