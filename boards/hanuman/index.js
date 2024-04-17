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
    id: "hanuman",
    name: "Hanuman",
    description: "",
    image: "images/cover.jpg",
    tags: [
        "RP2040",
        "Robot"
    ],
    chip: "RP2040",
    // skipSerialPortSelect: true,
    isArduinoPlatform: true,
    fqbn: "rp2040:rp2040:artronshop_rp2_nano",
    platform: {
        id: "rp2040:rp2040",
        version: "3.3.1",
        package_index: "https://github.com/earlephilhower/arduino-pico/releases/download/global/package_rp2040_index.json", // package_xxx_index.json
    },
    depends: [ // Arduino libraries that are needed to build the current board
        "Hanuman@1.0.0"
    ],
    script: [ 

    ],
    css: [

    ],
    blocks: [
        "blocks/blocks_motor.js",
        "blocks/blocks_servo.js",
        "blocks/blocks_switch.js",
        "blocks/blocks_pin.js",

        "blocks/generators_motor.js",
        "blocks/generators_display.js",
        "blocks/generators_servo.js",
        "blocks/generators_switch.js",
        "blocks/generators_pin.js",
    ],
    modules: [ ],
    usb: [
        {
            vendorId: "2E8A",
            productId: "000A"
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
                    name: "Moving",
                    icon: `../kidmotor-v4/images/tire.png`,
                    color: "#28B463",
                    blocks: [
                        {
                            xml: `
                                <block type="motor1">
                                    <value name="speed">
                                        <shadow type="math_number">
                                            <field name="NUM">50</field>
                                        </shadow>
                                    </value>
                                </block>
                            `
                        },
                        {
                            xml: `
                                <block type="motor2">
                                    <value name="speed1">
                                        <shadow type="math_number">
                                            <field name="NUM">50</field>
                                        </shadow>
                                    </value>
                                    <value name="speed2">
                                        <shadow type="math_number">
                                            <field name="NUM">50</field>
                                        </shadow>
                                    </value>
                                    <value name="speed3">
                                        <shadow type="math_number">
                                            <field name="NUM">50</field>
                                        </shadow>
                                    </value>
                                    <value name="speed4">
                                        <shadow type="math_number">
                                            <field name="NUM">50</field>
                                        </shadow>
                                    </value>
                                </block>
                            `
                        },
                        {
                            xml: `
                                <block type="motor_move">
                                    <value name="speed">
                                        <shadow type="math_number">
                                            <field name="NUM">50</field>
                                        </shadow>
                                    </value>
                                </block>
                            `
                        },
                        {
                            xml: `
                                <block type="motor_move2">
                                    <value name="speed1">
                                        <shadow type="math_number">
                                            <field name="NUM">50</field>
                                        </shadow>
                                    </value>
                                    <value name="speed2">
                                        <shadow type="math_number">
                                            <field name="NUM">50</field>
                                        </shadow>
                                    </value>
                                </block>
                            `
                        },
                        {
                            xml: `
                                <block type="motor_move_4wd">
                                    <value name="speed">
                                        <shadow type="math_number">
                                            <field name="NUM">50</field>
                                        </shadow>
                                    </value>
                                </block>
                            `
                        },
                        {
                            xml: `
                                <block type="motor_move2_4wd">
                                    <value name="speed1">
                                        <shadow type="math_number">
                                            <field name="NUM">50</field>
                                        </shadow>
                                    </value>
                                    <value name="speed2">
                                        <shadow type="math_number">
                                            <field name="NUM">50</field>
                                        </shadow>
                                    </value>
                                </block>
                            `
                        },
                        "motor_stop",
                        {
                            xml: '<label text="Servo"></label>',
                        },
                        {
                            xml: `
                                <block type="external_servo">
                                    <value name="angle">
                                        <shadow type="math_number">
                                            <field name="NUM">90</field>
                                        </shadow>
                                    </value>
                                </block>
                            `
                        },
                    ]
                },
                {
                    name: "Input",
                    icon: `../kidbright32/images/filter.png`,
                    color: "#fbbd5e",
                    blocks: [
                        {
                            xml: '<label text="Switch"></label>',
                        },
                        /*"switch_on_pressed",
                        "switch_on_press",
                        "switch_on_release",*/
                        "switch_is_press",
                        "switch_is_release",
                        "switch_get_value",
                        {
                            xml: '<label text="External Input"></label>',
                        },
                        "pin_digital_read",
                        {
                            xml: `
                                <block type="pin_analog_read">
                                    <field name="pin">0</field>
                                </block>
                            `
                        },
                        "pin_touch_read"
                    ]
                },
                {
                    name: "Output",
                    icon: `../kidbright32/images/usb.png`,
                    color: "#fbbd5e",
                    blocks: [
                        {
                            xml: '<label text="External Output"></label>',
                        },
                        {
                            xml: `
                                <block type="pin_digital_write">
                                    <value name="value">
                                        <shadow type="math_number">
                                            <field name="NUM">1</field>
                                        </shadow>
                                    </value>
                                </block>
                            `
                        },
                        {
                            xml: `
                                <block type="pin_analog_write">
                                    <value name="value">
                                        <shadow type="math_number">
                                            <field name="NUM">1023</field>
                                        </shadow>
                                    </value>
                                </block>
                            `
                        },
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
