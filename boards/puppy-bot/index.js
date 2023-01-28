addBoard({
    id: "puppy-bot",
    name: "PuppyBot",
    description: "",
    image: "images/cover.jpg",
    uploadMode: "MSC",
    mscSize: 1417216,
    chip: "RP2",
    script: [ 
        "../kidbright32/js/field_note.js",
        "../kidbright32/js/sound.js",
        "js/field_bitmap_rgb.js",
    ],
    css: [
        "../kidbright32/css/field_note.css",
        "css/field_bitmap_rgb.css",
    ],
    blocks: [
        "blocks/blocks_display.js",
        "blocks/blocks_motor.js",
        "blocks/blocks_servo.js",
        "blocks/blocks_switch.js",
        "../kidbright32/blocks/blocks_buzzer.js",
        "blocks/blocks_pin.js",
        "blocks/blocks_advanced.js",

        "blocks/generators_display.js",
        "blocks/generators_motor.js",
        "../kidbright32/blocks/generators_servo.js",
        "../kidbright32/blocks/generators_switch.js",
        "../kidbright32/blocks/generators_buzzer.js",
        "blocks/generators_pin.js",
        "../kidbright32/blocks/generators_avanced.js",
    ],
    modules: [ ],
    firmware: [
        {
            name: "MicroPython for PupyBot v1.19.1-796-gf4811b0b4-dirty",
            path: "firmware/MicroPython.for.PuppyBot.v1.19.1-796-gf4811b0b4-dirty.uf2",
            version: "v1.19.1-796-gf4811b0b4-dirty",
            date: "2023-01-28",
            board: "Raspberry Pi Pico",
            cpu: "RP2040"
        },
        {
            name: "MicroPython for PupyBot v1.19.1-560-g68f166dae-dirty",
            path: "firmware/MicroPython.for.PuppyBot.v1.19.1-560-g68f166dae-dirty.uf2",
            version: "v1.19.1-560-g68f166dae-dirty",
            date: "2022-11-21",
            board: "Raspberry Pi Pico",
            cpu: "RP2040"
        }
    ],
    usb: [
        {
            vendorId: "2E8A",
            productId: "0005"
        }
    ],
    autoCompletion: { },
    level: [
        {
            name: "Beginner",
            description: "",
            icon: "../kidbright32/images/puzzle.png",
            blocks: [
                {
                    name: "Display",
                    icon: `../ttgo-t-display/images/display.png`,
                    color: "#e64c3c",
                    blocks: [
                        {
                            xml: `
                                <block type="display_draw_text">
                                    <value name="text">
                                        <shadow type="text">
                                            <field name="TEXT">Hello!</field>
                                        </shadow>
                                    </value>
                                    <value name="x">
                                        <shadow type="math_number">
                                            <field name="NUM">60</field>
                                        </shadow>
                                    </value>
                                    <value name="y">
                                        <shadow type="math_number">
                                            <field name="NUM">60</field>
                                        </shadow>
                                    </value>
                                    <value name="color">
                                        <shadow type="colour_picker">
                                            <field name="COLOUR">#FFFFFF</field>
                                        </shadow>
                                    </value>
                                    <value name="size">
                                        <shadow type="math_number">
                                            <field name="NUM">1</field>
                                        </shadow>
                                    </value>
                                </block>
                            `
                        },
                        {
                            xml: `
                                <block type="display_draw_bitmap">
                                    <value name="x">
                                        <shadow type="math_number">
                                            <field name="NUM">0</field>
                                        </shadow>
                                    </value>
                                    <value name="y">
                                        <shadow type="math_number">
                                            <field name="NUM">0</field>
                                        </shadow>
                                    </value>
                                </block>
                            `
                        },
                        {
                            xml: `
                                <block type="display_draw_line">
                                    <value name="x1">
                                        <shadow type="math_number">
                                            <field name="NUM">0</field>
                                        </shadow>
                                    </value>
                                    <value name="y1">
                                        <shadow type="math_number">
                                            <field name="NUM">0</field>
                                        </shadow>
                                    </value>
                                    <value name="x2">
                                        <shadow type="math_number">
                                            <field name="NUM">60</field>
                                        </shadow>
                                    </value>
                                    <value name="y2">
                                        <shadow type="math_number">
                                            <field name="NUM">60</field>
                                        </shadow>
                                    </value>
                                    <value name="color">
                                        <shadow type="colour_picker">
                                            <field name="COLOUR">#FFFFFF</field>
                                        </shadow>
                                    </value>
                                </block>
                            `
                        },
                        {
                            xml: `
                                <block type="display_draw_rect">
                                    <value name="x">
                                        <shadow type="math_number">
                                            <field name="NUM">0</field>
                                        </shadow>
                                    </value>
                                    <value name="y">
                                        <shadow type="math_number">
                                            <field name="NUM">0</field>
                                        </shadow>
                                    </value>
                                    <value name="width">
                                        <shadow type="math_number">
                                            <field name="NUM">60</field>
                                        </shadow>
                                    </value>
                                    <value name="height">
                                        <shadow type="math_number">
                                            <field name="NUM">60</field>
                                        </shadow>
                                    </value>
                                    <value name="color">
                                        <shadow type="colour_picker">
                                            <field name="COLOUR">#FFFFFF</field>
                                        </shadow>
                                    </value>
                                </block>
                            `
                        },
                        {
                            xml: `
                                <block type="display_draw_circle">
                                    <value name="x">
                                        <shadow type="math_number">
                                            <field name="NUM">100</field>
                                        </shadow>
                                    </value>
                                    <value name="y">
                                        <shadow type="math_number">
                                            <field name="NUM">100</field>
                                        </shadow>
                                    </value>
                                    <value name="r">
                                        <shadow type="math_number">
                                            <field name="NUM">30</field>
                                        </shadow>
                                    </value>
                                    <value name="color">
                                        <shadow type="colour_picker">
                                            <field name="COLOUR">#FFFFFF</field>
                                        </shadow>
                                    </value>
                                </block>
                            `
                        },
                        {
                            xml: `
                                <block type="display_fill">
                                    <value name="color">
                                        <shadow type="colour_picker">
                                            <field name="COLOUR">#FFFFFF</field>
                                        </shadow>
                                    </value>
                                </block>
                            `
                        },
                        {
                            xml: `
                                <block type="colour_rgb">
                                    <value name="RED">
                                    <shadow type="math_number">
                                        <field name="NUM">100</field>
                                    </shadow>
                                    </value>
                                    <value name="GREEN">
                                    <shadow type="math_number">
                                        <field name="NUM">50</field>
                                    </shadow>
                                    </value>
                                    <value name="BLUE">
                                    <shadow type="math_number">
                                        <field name="NUM">0</field>
                                    </shadow>
                                    </value>
                                </block>
                            `
                        },
                        "colour_random",
                    ]
                },
                {
                    name: "Moving",
                    icon: `images/tire.png`,
                    color: "#28B463",
                    blocks: [
                        {
                            xml: `
                                <block type="motor_forward">
                                    <value name="speed">
                                        <shadow type="math_number">
                                            <field name="NUM">50</field>
                                        </shadow>
                                    </value>
                                    <value name="time">
                                        <shadow type="math_number">
                                            <field name="NUM">1</field>
                                        </shadow>
                                    </value>
                                </block>
                            `
                        },
                        {
                            xml: `
                                <block type="motor_backward">
                                    <value name="speed">
                                        <shadow type="math_number">
                                            <field name="NUM">50</field>
                                        </shadow>
                                    </value>
                                    <value name="time">
                                        <shadow type="math_number">
                                            <field name="NUM">1</field>
                                        </shadow>
                                    </value>
                                </block>
                            `
                        },
                        {
                            xml: `
                                <block type="motor_turn_left">
                                    <value name="speed">
                                        <shadow type="math_number">
                                            <field name="NUM">50</field>
                                        </shadow>
                                    </value>
                                    <value name="time">
                                        <shadow type="math_number">
                                            <field name="NUM">1</field>
                                        </shadow>
                                    </value>
                                </block>
                            `
                        },
                        {
                            xml: `
                                <block type="motor_turn_right">
                                    <value name="speed">
                                        <shadow type="math_number">
                                            <field name="NUM">50</field>
                                        </shadow>
                                    </value>
                                    <value name="time">
                                        <shadow type="math_number">
                                            <field name="NUM">1</field>
                                        </shadow>
                                    </value>
                                </block>
                            `
                        },
                        {
                            xml: `
                                <block type="motor_spin_left">
                                    <value name="speed">
                                        <shadow type="math_number">
                                            <field name="NUM">50</field>
                                        </shadow>
                                    </value>
                                    <value name="time">
                                        <shadow type="math_number">
                                            <field name="NUM">1</field>
                                        </shadow>
                                    </value>
                                </block>
                            `
                        },
                        {
                            xml: `
                                <block type="motor_spin_right">
                                    <value name="speed">
                                        <shadow type="math_number">
                                            <field name="NUM">50</field>
                                        </shadow>
                                    </value>
                                    <value name="time">
                                        <shadow type="math_number">
                                            <field name="NUM">1</field>
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
                                <block type="motor_wheel">
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
                    name: "I/O",
                    icon: "/images/icon/led.png",
                    color: "#e64c3c",
                    blocks: [
                        {
                            xml: `
                                <block type="pin_digital_write">
                                    <value name="value">
                                        <shadow type="math_number">
                                            <field name="NUM">1</field>
                                        </shadow>
                                    </value>
                                    <value name="pin">
                                        <shadow type="math_number">
                                            <field name="NUM">25</field>
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
                                    <value name="pin">
                                        <shadow type="math_number">
                                            <field name="NUM">25</field>
                                        </shadow>
                                    </value>
                                </block>
                            `
                        },
                        {
                            xml: `
                                <block type="pin_digital_read">
                                    <value name="pin">
                                        <shadow type="math_number">
                                            <field name="NUM">25</field>
                                        </shadow>
                                    </value>
                                </block>
                            `
                        },
                        {
                            xml: `
                                <block type="pin_analog_read">
                                    <value name="pin">
                                        <shadow type="math_number">
                                            <field name="NUM">A0</field>
                                        </shadow>
                                    </value>
                                </block>
                            `
                        },
                        {
                            xml: `
                                <block type="pin_analog_read_calibrated">
                                    <value name="pin">
                                        <shadow type="math_number">
                                            <field name="NUM">A0</field>
                                        </shadow>
                                    </value>
                                </block>
                            `
                        },
                        {
                            xml: '<label text="Switch"></label>',
                        },
                        "switch_on_pressed",
                        /*"switch_on_press",
                        "switch_on_release",*/
                        "switch_is_press",
                        "switch_is_release",
                        "switch_get_value",
                        {
                            xml: '<label text="Buzzer"></label>',
                        },
                        {
                            xml: `
                                <block type="buzzer_tone">
                                    <value name="freq">
                                        <shadow type="math_number">
                                            <field name="NUM">2000</field>
                                        </shadow>
                                    </value>
                                    <value name="duration">
                                        <shadow type="math_number">
                                            <field name="NUM">1</field>
                                        </shadow>
                                    </value>
                                </block>
                            `
                        },
                        {
                            xml: `
                                <block type="buzzer_notes">
                                    <value name="notes">
                                        <block type="make_note">
                                            <field name="notes">C5</field>
                                        </block>
                                    </value>
                                    <field name="duration">1 / 2</field>
                                </block>
                            `
                        },
                        {
                            xml: `
                                <block type="buzzer_volume">
                                    <value name="level">
                                        <shadow type="math_number">
                                            <field name="NUM">50</field>
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
                            xml: '<label text="Logic"></label>',
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
                            xml: '<label text="Debug"></label>',
                        },
                        {
                            xml: `
                                <block type="print">
                                    <value name="value">
                                        <shadow type="text">
                                            <field name="TEXT">Hello, world!</field>
                                        </shadow>
                                    </value>
                                </block>
                            `
                        },
                        {
                            xml: '<label text="Sensor"></label>',
                        },
                        "dht_read",
                        "ds18x20_read",
                        {
                            xml: '<label text="Task"></label>',
                        },
                        "run_in_background",
                        {
                            xml: '<label text="Low Power Mode"></label>',
                        },
                        {
                            xml: `
                                <block type="light_sleep">
                                    <value name="time">
                                        <shadow type="math_number">
                                            <field name="NUM">10</field>
                                        </shadow>
                                    </value>
                                </block>
                            `
                        },
                        {
                            xml: `
                                <block type="deep_sleep">
                                    <value name="time">
                                        <shadow type="math_number">
                                            <field name="NUM">10</field>
                                        </shadow>
                                    </value>
                                </block>
                            `
                        },
                        // "is_woke_from_deep_sleep",
                        "board_reset"
                    ]
                }
            ]
        }
    ]
});
