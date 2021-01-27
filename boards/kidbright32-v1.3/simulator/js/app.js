/* Config */
const MICROPYTHON_STACK_SIZE = 512 * 1024; // 512 kBytes (Real of ESP32)

let svgDocument;
let processCode = "";

let MicroPython = { };

// Switch set handle
let setupSwitchHandle = () => {
    // S1
    let S1 = svgDocument.querySelector("#path6845");
    S1.addEventListener("mousedown", () => { // S1 on Press
        /*if (typeof MicroPython.mp_switch_value_change_handle) {
            try {
                MicroPython.mp_switch_value_change_handle(1, 0); // pin=1, value=0 [ref: boards\KidBright32\modswitch.c]
            } catch (err) {
                console.warn(err);
            }
        }*/
        simSystem.switch[0].value = 0;
    });

    S1.addEventListener("mouseup", () => { // S1 on Release
        /*if (typeof MicroPython.mp_switch_value_change_handle) {
            try {
                MicroPython.mp_switch_value_change_handle(1, 1); // pin=1, value=1 [ref: boards\KidBright32\modswitch.c]
            } catch (err) {
                console.warn(err);
            }
        }*/
        simSystem.switch[0].value = 1;
    });

    // S2
    let S2 = svgDocument.querySelector("#path6817");
    S2.addEventListener("mousedown", () => { // S2 on Press
        /*if (typeof MicroPython.mp_switch_value_change_handle) {
            try {
                MicroPython.mp_switch_value_change_handle(2, 0); // pin=1, value=0 [ref: boards\KidBright32\modswitch.c]
            } catch (err) {
                console.warn(err);
            }
        }*/
        simSystem.switch[1].value = 0;
    });

    S2.addEventListener("mouseup", () => { // S2 on Release
        /*if (typeof MicroPython.mp_switch_value_change_handle) {
            try {
                MicroPython.mp_switch_value_change_handle(2, 1); // pin=1, value=1 [ref: boards\KidBright32\modswitch.c]
            } catch (err) {
                console.warn(err);
            }
        }*/
        simSystem.switch[1].value = 1;
    });

    // Reset
    let Reset = svgDocument.querySelector("#path8379");
    Reset.addEventListener("click", () => { // Reset on Click
        
    });
};

let setupLDRHandle = () => {
    let domLDR = svgDocument.querySelector("#g8943");
    domLDR.addEventListener("click", function() {
        createPopover(domLDR, `
        <input type="range" min="0" max="100" value="${simSystem.ldr.getValue()}">
        <div class="label">Light Level: <span class="value">${simSystem.ldr.getValue()}</span>%</div>
        `, domBox => {
            let inputRange = domBox.querySelector("input[type='range']");
            inputRange.addEventListener("input", function(e) {
                domBox.querySelector(".value").innerText = this.value;
                simSystem.ldr.setValue(+this.value);
            });
        });
    });
};

let setupLM75Handle = () => {
    let domLM75 = svgDocument.querySelector("#group-LM75");
    domLM75.addEventListener("click", function() {
        createPopover(domLM75, `
        <input type="range" min="-25" max="100" step="0.25" value="${simSystem.lm75.getValue()}">
        <div class="label">Temperature: <span class="value">${simSystem.lm75.getValue()}</span> &#8451;</div>
        `, domBox => {
            let inputRange = domBox.querySelector("input[type='range']");
            inputRange.addEventListener("input", function(e) {
                domBox.querySelector(".value").innerText = this.value;
                simSystem.lm75.setValue(+this.value);
            });
        });
    });
}

let createPopover = (domOrigin, content, newCb, closeCb) => {
    let originInfo = domOrigin.getBoundingClientRect();
    let domBox = document.createElement("div");
    domBox.id = `PopoverId${+(new Date())}`;
    domBox.classList.add("Popover");
    /* domBox.style.top = (originInfo.y + originInfo.height) + "px";
    domBox.style.left = (originInfo.x - 10) + "px"; */
    domBox.style.top = (originInfo.y - 20) + "px";
    domBox.style.left = (originInfo.x + originInfo.width) + "px";
    domBox.innerHTML = `
        <a href="" class="close"><i class="fas fa-times"></i></a>
        <div class="content">${content}</div>
    `;
    document.querySelector("body").appendChild(domBox);

    domBox.querySelector(".close").addEventListener("click", (e) => {
        e.preventDefault();

        domBox.remove();
        if (closeCb) closeCb();
    });

    if (newCb) {
        newCb(domBox);
    }

    return domBox;
};

// Load SVG
(async () => {
    let svgContent = await fetch("image/KidbrightV1.3.svg");
    svgContent = await svgContent.text();
    // console.log(svgContent);
    document.querySelector(".main-view").innerHTML = svgContent;

    svgDocument = document.querySelector(".main-view svg");

    setupSwitchHandle();
    setupLDRHandle();
    setupLM75Handle();
})();

document.querySelector("#play-stop").addEventListener("click", _ => {
    if (simSystem.isCodeRunning) {
        simSystem.codeStop();
    } else {
        runCodeAndProcess();
    }
});

let updateControlButton = _ => {
    let playStopBtn = document.querySelector("#play-stop");
    if (simSystem.isCodeRunning) {
        playStopBtn.querySelector(".fas").classList.remove("fa-play");
        playStopBtn.querySelector(".fas").classList.add("fa-stop");
    } else {
        playStopBtn.querySelector(".fas").classList.remove("fa-stop");
        playStopBtn.querySelector(".fas").classList.add("fa-play");
    }
};

let pleaseCallWhenProcessCharExit = _ => 0;

document.querySelector("#reload").addEventListener("click", async _ => {
    if (simSystem.isCodeRunning) {
        await simSystem.codeStop();
    }
    runCodeAndProcess(); // Run again
});

simSystem.codeStop = async () => {
    /* MicroPython.mp_js_process_char(3); // Send Ctrl+C
    if (simSystem.isCodeRunning) {
        await (new Promise((resolve, reject) => {
            pleaseCallWhenProcessCharExit = resolve;
        }));
        pleaseCallWhenProcessCharExit = _ => 0;
    }
    */
   simSystem.writeToREPL(3);
}

simSystem.writeToREPL = async (data) => {
    if (typeof data === "number") {
        data = String.fromCharCode(data);
    }

    /* for (const c of data.split("")) {
        // await MicroPython.mp_js_process_char_async(c.charCodeAt(0));
        // MicroPython.mp_js_process_char(c.charCodeAt(0));
    }*/
    charWaitProcess += data;
}

let setStatusCodeRunnig = (x) => {
    simSystem.isCodeRunning = x;
    simSystem.onStatusChange(x);
};

let runCodeAndProcess = async _ => {
    setStatusCodeRunnig(true);
    updateControlButton();

    let codeEncode = JSON.stringify(processCode);
    codeEncode = codeEncode.replace(/[\u007F-\uFFFF]/g, chr => "\\u" + ("0000" + chr.charCodeAt(0).toString(16)).substr(-4));
    // let codeSend = `exec(${codeEncode})\r\n`;
    let codeSend = `\x05${processCode.replace(/\r?\n/g, "\r")}\x04`;
    await simSystem.writeToREPL(codeSend);

    setStatusCodeRunnig(false);
    updateControlButton();

    pleaseCallWhenProcessCharExit();
};

// Setup Terminal
let term, fitAddon;

(() => {
    term = new Terminal();
    if (!fitAddon) {
        fitAddon = new FitAddon.FitAddon();
    }
    term.loadAddon(fitAddon);
    term.open(document.querySelector("#terminal > section"));
    try {
        fitAddon.fit();
    } catch(e) {
            
    }

    window.addEventListener('resize', _ => fitAddon.fit());
})();

// Setup Move bar
let domTerminalTesizeBar = document.querySelector("#terminal-resize-bar");
let moveBarMouseDownFlag = false;
domTerminalTesizeBar.addEventListener("mousedown", function(event){
    domTerminalTesizeBar.classList.add("active");
    moveBarMouseDownFlag = true;
});

document.addEventListener("mousemove", function(event){
    if (moveBarMouseDownFlag) {
        domTerminalTesizeBar.style.top = event.pageY + "px";
        // console.log(event.pageY + "px");
    }
});

document.addEventListener("mouseup", function(event) {
    if (!moveBarMouseDownFlag) return;

    moveBarMouseDownFlag = false;

    domTerminalTesizeBar.classList.remove("active");

    let top = event.pageY;
    domTerminalTesizeBar.style.top = top + "px";
    top += 6;
    document.querySelector("#terminal").style.height = `calc(100% - ${top}px)`;
    document.querySelector(".main-view").style.height = `${top}px`;

    /* localStorage.setItem("terminal_sim_size", $("#terminal").width()); */
    if (fitAddon) {
        setTimeout(() => {
            fitAddon.fit();
            fitAddon.fit();
        }, 10);
    }
});

domTerminalTesizeBar.style.top = (document.querySelector(".main-view").clientHeight - 6) + "px";

let charWaitProcess = "";

var Module = typeof Module !== 'undefined' ? Module : {};

Module["onRuntimeInitialized"] = async () => { // on MicroPython Ready
    MicroPython = {
        mp_js_init: Module.cwrap('mp_js_init', 'null', ['number']),
        mp_js_do_str: Module.cwrap('mp_js_do_str', 'number', ['string'], { async: true }),
        mp_js_init_repl: Module.cwrap('mp_js_init_repl', 'null', ['null']),
        mp_js_process_char: Module.cwrap('mp_js_process_char', 'number', ['number']),
        mp_js_process_char_async: Module.cwrap('mp_js_process_char', 'number', ['number'], { async: true }),
        // mp_js_soft_rtc_tick: Module.cwrap('mp_js_soft_rtc_tick', 'null', ['null']),
        mp_switch_value_change_handle: Module.cwrap('mp_switch_value_change_handle', 'null', ['number', 'number']),
        mp_keyboard_interrupt: (_ => Module.ccall('mp_keyboard_interrupt', 'null', ['null'], ['null'])),
    };
/*
    // Setup Software RTC
    // MicroPython._rtc_timer = setInterval(MicroPython.mp_js_soft_rtc_tick, 1000);
*/
    let mp_js_stdout = document.querySelector("#mp_js_stdout");
    mp_js_stdout.addEventListener("print", (e) => {
        // console.log(e.data);
        term.write(e.data);
    }, false);

    // Setup MicroPython
    MP_JS_EPOCH = (new Date()).getTime();
/*
    MicroPython.mp_js_init(MICROPYTHON_STACK_SIZE);
    MicroPython.mp_js_init_repl();
*//*
    Module.ccall('main', // name of C function
        'number', // return type
        [ 'null' ], // argument types
        [ ],
        { async: true }); // arguments*/

    term.onData(async data => {
        /* if (data.includes("\x03")) { // if has Ctrl+C
            simSystem.codeStop();
            return;
        }
        if (!simSystem.isCodeRunning) {
            await simSystem.writeToREPL(data);
        } */
        await simSystem.writeToREPL(data);
    });
};
