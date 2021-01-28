simSystem = {
    display: {
        setData: (data) => {
            // console.log("in setData", data, data.length);
            let boxLeft = svgDocument.querySelectorAll("#g7005 > .st10");
            let boxRight = svgDocument.querySelectorAll("#g7141 > .st10");
            // console.log(boxLeft, boxRight);
            let dataLen = data.length;
            for (let i=0;i<(16 - dataLen);i++) {
                data.push(0x00);
            }
            for(let x=0;x<8;x++) {
                let c = data[x];
                for (let y=0;y<8;y++) {
                    boxLeft[(y * 8) + x].style.fill = ((c >> (7 - y)) & 0x01) != 0 ? "#FF0000" : "#e6e7e8";
                }
            }
            for(let x=0;x<8;x++) {
                let c = data[x + 8];
                for (let y=0;y<8;y++) {
                    boxRight[(y * 8) + x].style.fill = ((c >> (7 - y)) & 0x01) != 0 ? "#FF0000" : "#e6e7e8";
                }
            }
        }
    },
    switch: [
        {
            value: 1
        },
        {
            value: 1
        }
    ],
    buzzer: {
        setStatus: (status) => {
            /* console.log("buzzer", status); */
            let ellipseBuzzer = svgDocument.querySelector("#ellipse8315");
            if (status) {
                ellipseBuzzer.classList.add("active");
            } else {
                ellipseBuzzer.classList.remove("active");
            }
        }
    },
    ldr: {
        getValue: _ => simSystem.ldr.value,
        setValue: value => {
            simSystem.ldr.value = value;
        },
        value: 0
    },
    lm75: {
        getValue: _ => simSystem.lm75.value,
        setValue: value => {
            simSystem.lm75.value = value;
        },
        value: 0
    },
    servo: {
        getAngle: pin => simSystem.servo.angle[pin],
        setAngle: (pin, angle) => {
            simSystem.servo.angle[pin] = angle;
        },
        angle: [ 0, 0 ]
    },
    usb: {
        getValue: _ => simSystem.usb.value,
        setValue: value => {
            simSystem.usb.value = value;
        },
        value: 0
    },
    rtc: {
        offset: 0,
        setOn: 0,
    },
    pin: {
        digitalRead: (pin) => {
            console.warn("PIN Read", pin);
            return 0;
        },
        digitalWrite: (pin, value) => {
            // console.log("PIN Write", pin, value);
            if (pin === 2) { // WiFi LED
                svgDocument.querySelector("#path8759").style.opacity = !value ? 0.9 : 0;
            }

            if (pin === 12) { // IoT LED
                svgDocument.querySelector("#path8911").style.opacity = !value ? 0.9 : 0;
            }
        },
        touchRead: (pin) => 0,
        analogRead: (pin) => 0,
        analogWrite: (pin, value) => {
            // console.log("Analog Write", pin, value);
            if (pin === 2) { // WiFi LED
                svgDocument.querySelector("#path8759").style.opacity = (1023 - value) / 1023 * 0.9;
            }

            if (pin === 12) { // IoT LED
                svgDocument.querySelector("#path8911").style.opacity = (1023 - value) / 1023 * 0.9;
            }
        },
    },
    isCodeRunning: false,
    runCode: (code) => {
        processCode = code;
        runCodeAndProcess();
    },
    getCharsWaitProcass: _ => MicroPython.charWaitProcess,
    getCharsLenWaitProcass: _ => MicroPython.charWaitProcess.length,
    getAndPopFirstCharsWaitProcass: _ => {
        let c = MicroPython.charWaitProcess.charCodeAt(0);
        MicroPython.charWaitProcess = MicroPython.charWaitProcess.substring(1);
        return c;
    },
    isCharsWaitProcassHasInterruptChar: c => MicroPython.charWaitProcess.includes(String.fromCharCode(c)) ? 1 : 0,
    onREPLDataOut: _ => 0,
};

