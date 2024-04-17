for (const id of [
    "kidbright32", // Add KidBright32 common config
    "kidbright32-v1.3", // Add KidBright32 V1.3 & V1.4
    "kidbright32i", // Add KidBright32i by INEX
    "kidbright32iP", // Add KidBright32iP by INEX
    "kidbright32iA", // Add KidBright32iA by INEX
    "kidbright32-v1.6",  // Add KidBright32 V1.6 by Gravitech
    "ipst-wifi", // Add IPST-WiFi
    "openkb", // Add OpenKB
    "rapbit32", // Add Rapbit32
    "rapbit32xa", // Add Rapbit32(XA)
    "esp32-dev-board", // Add ESP32 Dev Board
    "raspberry-pi-pico", // Add Raspberry Pi Pico
    "raspberry-pi-pico-w", // Add Raspberry Pi Pico W
    "mbits", // Add Mbits
    "openbit", // Add OpenBit
    "kidmotor-v4", // Add KidMotor V4.0
    "puppy-bot", // Add PuppyBot
    "easy-kids-robot-kit", // Add EasyKids Robot Kit
    "rp2-nano", // Add ArtronShop RP2 Nano
    "puppy-bot-4wd", // Add PuppyBot(4WD)
    "ttgo-t-display", // Add TTGO T-Display
    "kidbright32-v1.5", // Add KidBright32 V1.5

    // Arduino platform
    "arduino-uno",
    "arduino-nano",
    "arduino-mega",
    "arduino-pro-mini",
    "arduino-uno-r4-wifi",
    "pop-32",
    "hanuman",
]) {
    document.write(`<script src="${rootPath}/boards/${id}/index.js"></script>`);
    // import(`${rootPath}/boards/${id}/index.js`);
}
