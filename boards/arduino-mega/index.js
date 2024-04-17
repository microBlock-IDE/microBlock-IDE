Blockly.Events.disableOrphansCustom = function (event) {
    if (event.type == Blockly.Events.MOVE ||
        event.type == Blockly.Events.CREATE) {
        if (!event.workspaceId) {
            return;
        }
        var workspace = Blockly.Workspace.getById(event.workspaceId);
        var block = workspace.getBlockById(event.blockId);
        if (block) {
            if (!workspace.isDragging()) {
                let block_is_valid = false;

                const valid_top_block = [ 
                    "controls_on_start", 
                    "controls_forever_no_connect", 
                    "procedures_defnoreturn",
                    "procedures_defreturn",
                    "procedures_mutatorcontainer",
                    "procedures_mutatorarg",
                ];

                if (valid_top_block.indexOf(block.type) >= 0) {
                    block_is_valid = true;
                } else {
                    // Find parent block
                    let parent = block.getParent();
                    // console.log("first parent", block.type, parent);
                    while (parent) {
                        // console.log("loop parent", block.type, parent.type);
                        if (valid_top_block.indexOf(parent.type) >= 0) {
                            block_is_valid = true;
                            break;
                        }
                        parent = parent.getParent();
                    }
                }

                // Enable / Disable block
                block.setEnabled(block_is_valid);
                var children = block.getDescendants(false);
                for (var i = 0, child; (child = children[i]); i++) {
                    child.setEnabled(block_is_valid);
                }
            }
        }
    }
};  

addBoard({
    id: "arduino-mega",
    name: "Arduino Mega 2560",
    description: "",
    image: "images/cover.jpg",
    tags: [
        "Arduino"
    ],
    isArduinoPlatform: true,
    fqbn: "arduino:avr:mega",
    platform: {
        id: "arduino:avr",
        version: "1.8.6",
        package_index: "https://downloads.arduino.cc/packages/package_staging_index.json", // package_xxx_index.json
    },
    script: [ 
        
    ],
    css: [
       
    ],
    blocks: [
        "blocks/blocks_pin.js",
        "blocks/blocks_advanced.js",

        "blocks/generators_pin.js",
        "blocks/generators_avanced.js",
    ],
    modules: [ ],
    usb: [
        {
            vendorId: "2341",
            productId: "0043"
        }
    ],
    autoCompletion: { },
    defaultCode: `
        <xml>
            <block type="controls_on_start" x="0" y="0">
                <next>
                    <block type="controls_forever_no_connect"></block>
                </next>
            </block>
        </xml>
    `,
    onLoad: async (workspace, board) => {
        workspace.addChangeListener(Blockly.Events.disableOrphansCustom);
    },
    onDispose: async (workspace, board) => {
        workspace.removeChangeListener(Blockly.Events.disableOrphansCustom);
    },
    level: [
        {
            name: "Beginner",
            description: "",
            icon: "../kidbright32/images/puzzle.png",
            blocks: [
                {
                    name: "Pin",
                    icon: "/images/icon/led.png",
                    color: "#e64c3c",
                    blocks: [
                        {
                            xml: `
                                <block type="pin_mode">
                                    <field name="pin">13</field>
                                </block>
                            `
                        },
                        {
                            xml: `
                                <block type="pin_digital_write">
                                    <value name="value">
                                        <shadow type="math_number">
                                            <field name="NUM">1</field>
                                        </shadow>
                                    </value>
                                    <field name="pin">13</field>
                                </block>
                            `
                        },
                        {
                            xml: `
                                <block type="pin_analog_write">
                                    <value name="value">
                                        <shadow type="math_number">
                                            <field name="NUM">255</field>
                                        </shadow>
                                    </value>
                                    <field name="pin">11</field>
                                </block>
                            `
                        },
                        {
                            xml: `
                                <block type="pin_digital_read">
                                    <field name="pin">2</field>
                                </block>
                            `
                        },
                        {
                            xml: `
                                <block type="pin_analog_read">
                                    <field name="pin">A0</field>
                                </block>
                            `
                        },
                        {
                            xml: '<label text="External Interrupt"></label>',
                        },
                        "pin_attach_interrupt",
                        "pin_detach_interrupt",
                        {
                            xml: '<label text="Advanced I/O"></label>',
                        },
                        {
                            xml: `
                                <block type="pin_pulse_in">
                                    <field name="pin">7</field>
                                    <field name="value">HIGH</field>
                                    <value name="timeout">
                                        <shadow type="math_number">
                                            <field name="NUM">1000000</field>
                                        </shadow>
                                    </value>
                                </block>
                            `
                        },
                        {
                            xml: `
                                <block type="pin_shift_in">
                                    <field name="data_pin">8</field>
                                    <field name="clock_pin">9</field>
                                </block>
                            `
                        },
                        {
                            xml: `
                                <block type="pin_shift_out">
                                    <value name="value">
                                        <shadow type="math_number">
                                            <field name="NUM">255</field>
                                        </shadow>
                                    </value>
                                    <field name="data_pin">8</field>
                                    <field name="clock_pin">9</field>
                                </block>
                            `
                        },
                        /*"pin_shift_out",
                        "pin_tone",
                        "pin_tone_duration",
                        "pin_no_tone",*/
                    ]
                },
                {
                    name: "Control",
                    icon: `/images/icon/process.png`,
                    color: "#fbbd5e",
                    blocks: [
                        {
                            xml: `
                                <block type="controls_wait">
                                    <value name="time">
                                        <shadow type="math_number">
                                            <field name="NUM">1</field>
                                        </shadow>
                                    </value>
                                </block>
                            `
                        },
                        "controls_forever",
                        {
                            xml: `
                                <block type="controls_repeat_ext">
                                    <value name="TIMES">
                                        <shadow type="math_number">
                                            <field name="NUM">10</field>
                                        </shadow>
                                    </value>
                                </block>
                            `
                        },
                        {
                            xml: `
                                <block type="controls_for">
                                    <field name="VAR">i</field>
                                    <value name="FROM">
                                        <shadow type="math_number">
                                            <field name="NUM">1</field>
                                        </shadow>
                                    </value>
                                    <value name="TO">
                                        <shadow type="math_number">
                                            <field name="NUM">10</field>
                                        </shadow>
                                    </value>
                                    <value name="BY">
                                        <shadow type="math_number">
                                            <field name="NUM">1</field>
                                        </shadow>
                                    </value>
                                </block>
                          `
                        },
                        "controls_if",
                        {
                            xml: `
                                <block type="controls_if">
                                    <mutation else="1"></mutation>
                                </block>
                            `
                        },
                        "controls_wait_until",
                        "controls_whileUntil",
                        {
                            xml: `
                                <block type="controls_wait_us">
                                    <value name="time">
                                        <shadow type="math_number">
                                            <field name="NUM">100</field>
                                        </shadow>
                                    </value>
                                </block>
                            `
                        },
                    ]
                },
                {
                    name: "Operators",
                    icon: `/images/icon/maths.png`,
                    color: "#293939",
                    blocks: [
                        {
                            xml: '<label text="Math"></label>',
                        },
                        {
                            xml: `
                                <block type="math_number">
                                    <field name="NUM">0</field>
                                </block>
                            `,
                        },
                        {
                            xml: `
                                <block type="math_arithmetic">
                                    <value name="A">
                                        <shadow type="math_number">
                                            <field name="NUM">1</field>
                                        </shadow>
                                    </value>
                                    <field name="OP">ADD</field>
                                    <value name="B">
                                        <shadow type="math_number">
                                            <field name="NUM">1</field>
                                        </shadow>
                                    </value>
                                </block>
                            `
                        },
                        {
                            xml: `
                                <block type="math_arithmetic">
                                    <value name="A">
                                        <shadow type="math_number">
                                            <field name="NUM">1</field>
                                        </shadow>
                                    </value>
                                    <field name="OP">MINUS</field>
                                    <value name="B">
                                        <shadow type="math_number">
                                            <field name="NUM">1</field>
                                        </shadow>
                                    </value>
                                </block>
                            `
                        },
                        {
                            xml: `
                                <block type="math_arithmetic">
                                    <value name="A">
                                        <shadow type="math_number">
                                            <field name="NUM">1</field>
                                        </shadow>
                                    </value>
                                    <field name="OP">MULTIPLY</field>
                                    <value name="B">
                                        <shadow type="math_number">
                                            <field name="NUM">1</field>
                                        </shadow>
                                    </value>
                                </block>
                            `
                        },
                        {
                            xml: `
                                <block type="math_arithmetic">
                                    <value name="A">
                                        <shadow type="math_number">
                                            <field name="NUM">1</field>
                                        </shadow>
                                    </value>
                                    <field name="OP">DIVIDE</field>
                                    <value name="B">
                                        <shadow type="math_number">
                                            <field name="NUM">1</field>
                                        </shadow>
                                    </value>
                                </block>
                            `
                        },
                        {
                            xml: `
                                <block type="math_modulo">
                                    <value name="DIVIDEND">
                                        <shadow type="math_number">
                                            <field name="NUM">10</field>
                                        </shadow>
                                    </value>
                                    <value name="DIVISOR">
                                        <shadow type="math_number">
                                            <field name="NUM">2</field>
                                        </shadow>
                                    </value>
                                </block>
                            `
                        },
                        "random_seed",
                        {
                            xml: `
                                <block type="math_random_int">
                                    <value name="FROM">
                                        <shadow type="math_number">
                                            <field name="NUM">1</field>
                                        </shadow>
                                    </value>
                                    <value name="TO">
                                        <shadow type="math_number">
                                            <field name="NUM">100</field>
                                        </shadow>
                                    </value>
                                </block>
                            `
                        },
                        {
                            xml: `
                                <block type="math_trig">
                                    <value name="NUM">
                                        <shadow type="math_number">
                                            <field name="NUM">45</field>
                                        </shadow>
                                    </value>
                                </block>
                            `
                        },
                        {
                            xml: `
                                <block type="math_round">
                                    <field name="OP">ROUND</field>
                                    <value name="NUM">
                                    <shadow type="math_number">
                                        <field name="NUM">3.1</field>
                                    </shadow>
                                    </value>
                                </block>
                            `
                        },
                        {
                            xml: `
                                <block type="math_map">
                                    <value name="value">
                                        <shadow type="math_number">
                                            <field name="NUM">100</field>
                                        </shadow>
                                    </value>
                                    <value name="from_min">
                                        <shadow type="math_number">
                                            <field name="NUM">0</field>
                                        </shadow>
                                    </value>
                                    <value name="from_max">
                                        <shadow type="math_number">
                                            <field name="NUM">1023</field>
                                        </shadow>
                                    </value>
                                    <value name="to_min">
                                        <shadow type="math_number">
                                            <field name="NUM">0</field>
                                        </shadow>
                                    </value>
                                    <value name="to_max">
                                        <shadow type="math_number">
                                            <field name="NUM">255</field>
                                        </shadow>
                                    </value>
                                </block>
                            `
                        },
                        {
                            xml: '<label text="Logic"></label>',
                        },
                        {
                            xml: `
                                <block type="logic_boolean">
                                    <field name="BOOL">TRUE</field>
                                </block>
                            `
                        },
                        {
                            xml: `
                                <block type="logic_compare">
                                    <value name="A">
                                        <shadow type="math_number">
                                            <field name="NUM">5</field>
                                        </shadow>
                                    </value>
                                    <field name="OP">GT</field>
                                    <value name="B">
                                        <shadow type="math_number">
                                            <field name="NUM">5</field>
                                        </shadow>
                                    </value>
                                </block>
                            `
                        },
                        {
                            xml: `
                                <block type="logic_compare">
                                    <value name="A">
                                        <shadow type="math_number">
                                            <field name="NUM">5</field>
                                        </shadow>
                                    </value>
                                    <field name="OP">LT</field>
                                    <value name="B">
                                        <shadow type="math_number">
                                            <field name="NUM">5</field>
                                        </shadow>
                                    </value>
                                </block>
                            `
                        },
                        {
                            xml: `
                                <block type="logic_compare">
                                    <value name="A">
                                        <shadow type="math_number">
                                            <field name="NUM">5</field>
                                        </shadow>
                                    </value>
                                    <field name="OP">EQ</field>
                                    <value name="B">
                                        <shadow type="math_number">
                                            <field name="NUM">5</field>
                                        </shadow>
                                    </value>
                                </block>
                            `
                        },
                        "logic_operation",
                        "logic_negate",
                        {
                            xml: '<label text="Text"></label>',
                        },
                        "text",
                        "text_join",
                        {
                            xml: `
                                <block type="logic_compare">
                                    <field name="OP">EQ</field>
                                    <value name="B">
                                        <shadow type="text">
                                            <field name="TEXT">Hello!</field>
                                        </shadow>
                                    </value>
                                </block>
                            `
                        },
                    ]
                },
                {
                    name: "Variables",
                    icon: `/images/icon/relativity.png`,
                    color: "#ac5e2e",
                    blocks: "VARIABLE"
                },
                {
                    name: "Function",
                    icon: `/images/icon/jigsaw.png`,
                    color: "#17A589",
                    blocks: "PROCEDURE"
                },
                {
                    name: "Advanced",
                    icon: `/images/icon/expert.png`,
                    color: "#8E44AD",
                    blocks: [
                        {
                            xml: '<label text="Dashboard"></label>',
                        },
                        {
                            xml: `
                                <block type="send_into_source">
                                    <value name="value">
                                        <shadow type="math_number">
                                            <field name="NUM">33</field>
                                        </shadow>
                                    </value>
                                    <value name="source">
                                        <shadow type="text">
                                            <field name="TEXT">source1</field>
                                        </shadow>
                                    </value>
                                </block>
                            `
                        },
                        {
                            xml: '<label text="Serial"></label>',
                        },
                        {
                            xml: `
                                <block type="serial_begin">
                                    <value name="baud">
                                        <shadow type="math_number">
                                            <field name="NUM">115200</field>
                                        </shadow>
                                    </value>
                                </block>
                            `
                        },
                        {
                            xml: `
                                <block type="serial_print">
                                    <value name="text">
                                        <shadow type="text">
                                            <field name="TEXT">Hello, world!</field>
                                        </shadow>
                                    </value>
                                </block>
                            `
                        },
                        {
                            xml: `
                                <block type="serial_println">
                                    <value name="text">
                                        <shadow type="text">
                                            <field name="TEXT">Hello, world!</field>
                                        </shadow>
                                    </value>
                                </block>
                            `
                        },
                        {
                            xml: `
                                <block type="serial_set_timeout">
                                    <value name="timeout">
                                        <shadow type="math_number">
                                            <field name="NUM">100</field>
                                        </shadow>
                                    </value>
                                </block>
                            `
                        },
                        "serial_available",
                        "serial_read_string",
                        "serial_read_number",
                        {
                            xml: '<label text="Import"></label>',
                        },
                        "import",
                        "call_import",
                    ]
                }
            ]
        }
    ]
});
