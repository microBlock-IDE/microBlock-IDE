KidBright32_config = {
    id: "",
    name: "",
    description: "",
    image: "images/cover.jpg",
    script: [ 
        "../kidbright32/js/field_dotmatrix.js",
        "../kidbright32/js/field_note.js",
        "../kidbright32/js/sound.js",
    ],
    css: [
        "../kidbright32/css/field_dotmatrix.css",
        "../kidbright32/css/field_note.css",
    ],
    blocks: [
        "../kidbright32/blocks/blocks_display.js",
        
        "../kidbright32/blocks/blocks_rtc.js",
        "../kidbright32/blocks/blocks_sensor.js",
        "../kidbright32/blocks/blocks_servo.js",
        "../kidbright32/blocks/blocks_switch.js",
        "../kidbright32/blocks/blocks_usb.js",
        "../kidbright32/blocks/blocks_pin.js",
        "../kidbright32/blocks/blocks_buzzer.js",
        "../kidbright32/blocks/blocks_advanced.js",
        "../kidbright32/blocks/generators_display.js",
        "../kidbright32/blocks/generators_rtc.js",
        "../kidbright32/blocks/generators_sensor.js",
        "../kidbright32/blocks/generators_servo.js",
        "../kidbright32/blocks/generators_switch.js",
        "../kidbright32/blocks/generators_usb.js",
        "../kidbright32/blocks/generators_pin.js",
        "../kidbright32/blocks/generators_buzzer.js",
        "../kidbright32/blocks/generators_avanced.js",
    ],
    modules: [ ],
    firmware: [
        {
            name: "MicroPython for KidBright32 V1.6.0",
            path: "../kidbright32/firmware/MicroPython.for.KidBright32.V1.6.0.bin",
            version: "V1.6.0",
            date: "2021-1-30",
            board: "KidBright32",
            cpu: "ESP32"
        },
        {
            name: "MicroPython for KidBright32 V1.5.1",
            path: "../kidbright32/firmware/MicroPython.for.KidBright32.V1.5.1.bin",
            version: "V1.5.1",
            date: "2020-12-30",
            board: "KidBright32",
            cpu: "ESP32"
        },
        /* {
            name: "MicroPython for KidBright32 V1.5.0",
            path: "../kidbright32/firmware/MicroPython.for.KidBright32.V1.5.0.bin",
            version: "V1.5.0",
            date: "2020-12-28",
            board: "KidBright32",
            cpu: "ESP32"
        },
        {
            name: "MicroPython for KidBright32 V1.4.0-12-gfc02e2b25",
            path: "../kidbright32/firmware/MicroPython.for.KidBright32.V1.4.0-12-gfc02e2b25.bin",
            version: "V1.4.0-12-gfc02e2b25",
            date: "2020-12-25",
            board: "KidBright32",
            cpu: "ESP32"
        }, */
        {
            name: "MicroPython for KidBright32 V1.4.0",
            path: "../kidbright32/firmware/MicroPython.for.KidBright32.V1.4.0.bin",
            version: "V1.4.0",
            date: "2020-11-30",
            board: "KidBright32",
            cpu: "ESP32"
        },
        {
            name: "MicroPython for KidBright32 V1.3.0-beta-2",
            path: "../kidbright32/firmware/MicroPython.for.KidBright32.V1.3.0-beta-2.bin",
            version: "V1.3.0-beta-2",
            date: "2020-10-23",
            board: "KidBright32",
            cpu: "ESP32"
        },
        {
            name: "MicroPython for KidBright32 V1.3.0-beta-dirty",
            path: "../kidbright32/firmware/MicroPython.for.KidBright32.V1.3.0-beta-dirty.bin",
            version: "V1.3.0-beta-dirty",
            date: "2020-09-28",
            board: "KidBright32",
            cpu: "ESP32"
        },
        {
            name: "MicroPython for KidBright32 V1.1.0",
            path: "../kidbright32/firmware/MicroPython.for.KidBright32.V1.1.0.bin",
            version: "v1.13-62-g14d85aa6c-dirty",
            date: "2020-09-19",
            board: "KidBright32",
            cpu: "ESP32"
        }
    ],
    usb: [
        {
            vendorId: "0403",
            productId: "6015"
        }
    ],
    autoCompletion: { 
        display: { 
          show: __Function,
          show4x8: __Function,
          left: __Function,
          right: __Function,
          plot: __Function,
          scroll: __Function,
          clear: __Function
        },
        sensor: {
            light: __Function,
            temperature: __Function
        },
        buzzer: {
            tone: __Function,
            on: __Function,
            off: __Function,
            note: __Function
        },
        rtc: {
            datetime: __Function
        },
        usb: {
            value: __Function,
            on: __Function,
            off: __Function,
            toggle: __Function
        },
        switch: {
            S1: __Number,
            S2: __Number,
            value: __Function,
            press: __Function,
            release: __Function
        },
        servo: {
            SV1: __Number,
            SV2: __Number,
            angle: __Function
        },
        imu: {
            update: __Function,
            acc: __Array,
            gyro: __Array,
            mag: __Array,
            rotation: __Function,
            heading: __Function,
            EVENT_SHAKE: __Number,
            EVENT_BOARD_DOWN: __Number,
            EVENT_SCREEN_UP: __Number,
            EVENT_SCREEN_DOWN: __Number,
            EVENT_TILT_LEFT: __Number,
            EVENT_TILT_RIGHT: __Number,
            EVENT_FREE_FALL: __Number,
            is_gesture: __Function
        }
    },
    level: [
        {
            name: "Beginner",
            description: "",
            icon: "../kidbright32/images/puzzle.png",
            blocks: [
                {
                    name: "Display",
                    icon: `../kidbright32/images/matrix.png`,
                    color: "#e64c3c",
                    blocks: [
                        "display_custom",
                        {
                            xml: `
                                <block type="display_show">
                                    <value name="value">
                                        <shadow type="text">
                                            <field name="TEXT">12</field>
                                        </shadow>
                                    </value>
                                </block>
                            `
                        },
                        {
                            xml: `
                                <block type="display_scroll">
                                    <value name="value">
                                        <shadow type="text">
                                            <field name="TEXT">Hello!</field>
                                        </shadow>
                                    </value>
                                </block>
                            `
                        },
                        {
                            xml: `
                                <block type="display_show4x8">
                                    <value name="value">
                                        <shadow type="math_number">
                                            <field name="NUM">1234</field>
                                        </shadow>
                                    </value>
                                </block>
                            `
                        },
                        {
                            xml: `
                                <block type="display_left_show">
                                    <value name="value">
                                        <shadow type="math_number">
                                            <field name="NUM">12</field>
                                        </shadow>
                                    </value>
                                </block>
                            `
                        },
                        {
                            xml: `
                                <block type="display_right_show">
                                    <value name="value">
                                        <shadow type="math_number">
                                            <field name="NUM">12</field>
                                        </shadow>
                                    </value>
                                </block>
                            `
                        },
                        {
                            xml: `
                                <block type="display_plot">
                                    <value name="value">
                                        <shadow type="math_number">
                                            <field name="NUM">0</field>
                                        </shadow>
                                    </value>
                                </block>
                            `
                        },
                        {
                            xml: `
                                <block type="display_dot_show">
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
                                <block type="display_dot_hide">
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
                        "display_clear",
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
                        "switch_on_pressed",
                        "switch_on_press",
                        "switch_on_release",
                        "switch_is_press",
                        "switch_is_release",
                        "switch_get_value",
                        {
                            xml: '<label text="Sensor"></label>',
                        },
                        "sensor_light",
                        "sensor_temp",
                        {
                            xml: '<label text="External Input"></label>',
                        },
                        "pin_digital_read",
                        "pin_analog_read",
                        "pin_touch_read"
                    ]
                },
                {
                    name: "Output",
                    icon: `../kidbright32/images/usb.png`,
                    color: "#fbbd5e",
                    blocks: [
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
                        {
                            xml: '<label text="USB"></label>',
                        },
                        "usb_on",
                        "usb_off",
                        "usb_toggle",
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
                    name: "RTC",
                    icon: `../kidbright32/images/clock.png`,
                    color: "#fbbd5e",
                    blocks: [
                        {
                            xml: `
                                <block type="external_rtc_set_time">
                                    <value name="hour">
                                        <shadow type="math_number">
                                            <field name="NUM">16</field>
                                        </shadow>
                                    </value>
                                    <value name="min">
                                        <shadow type="math_number">
                                            <field name="NUM">50</field>
                                        </shadow>
                                    </value>
                                    <value name="sec">
                                        <shadow type="math_number">
                                            <field name="NUM">0</field>
                                        </shadow>
                                    </value>
                                    <value name="day">
                                        <shadow type="math_number">
                                            <field name="NUM">22</field>
                                        </shadow>
                                    </value>
                                    <value name="month">
                                        <shadow type="math_number">
                                            <field name="NUM">8</field>
                                        </shadow>
                                    </value>
                                    <value name="year">
                                        <shadow type="math_number">
                                            <field name="NUM">2020</field>
                                        </shadow>
                                    </value>
                                </block>
                            `
                        },
                        "external_rtc_get_hour",
                        "external_rtc_get_min",
                        "external_rtc_get_sec",
                        "external_rtc_get_microsecond",
                        "external_rtc_get_day",
                        "external_rtc_get_month",
                        "external_rtc_get_year"
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
                        "text_join"
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
                        /*{
                            xml: '<label text="Internal RTC"></label>',
                        },
                        {
                            xml: `
                                <block type="rtc_set_time">
                                    <value name="hour">
                                        <shadow type="math_number">
                                            <field name="NUM">16</field>
                                        </shadow>
                                    </value>
                                    <value name="min">
                                        <shadow type="math_number">
                                            <field name="NUM">50</field>
                                        </shadow>
                                    </value>
                                    <value name="sec">
                                        <shadow type="math_number">
                                            <field name="NUM">0</field>
                                        </shadow>
                                    </value>
                                    <value name="day">
                                        <shadow type="math_number">
                                            <field name="NUM">22</field>
                                        </shadow>
                                    </value>
                                    <value name="month">
                                        <shadow type="math_number">
                                            <field name="NUM">8</field>
                                        </shadow>
                                    </value>
                                    <value name="year">
                                        <shadow type="math_number">
                                            <field name="NUM">2020</field>
                                        </shadow>
                                    </value>
                                </block>
                            `
                        },
                        "rtc_get_hour",
                        "rtc_get_min",
                        "rtc_get_sec",
                        "rtc_get_microsecond",
                        "rtc_get_day",
                        "rtc_get_month",
                        "rtc_get_year",
                        "rtc_sync_ntp",*/
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
                        "is_woke_from_deep_sleep",
                        "board_reset"
                    ]
                }
            ]
        }
    ]
};
