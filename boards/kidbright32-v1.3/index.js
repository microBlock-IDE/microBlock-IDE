addBoard({
    id: "kidbright32-v1.3",
    name: "KidBright32 V1.3 & V1.4",
    description: "",
    image: "images/cover.jpg",
    script: [ 
        "js/field_dotmatrix.js",
        "js/field_note.js",
        "js/sound.js",
    ],
    css: [
        "css/field_dotmatrix.css",
        "css/field_note.css",
    ],
    blocks: [
        "blocks/blocks_display.js",
        "blocks/blocks_imu.js",
        "blocks/blocks_rtc.js",
        "blocks/blocks_sensor.js",
        "blocks/blocks_servo.js",
        "blocks/blocks_switch.js",
        "blocks/blocks_usb.js",
        "blocks/blocks_pin.js",
        "blocks/blocks_buzzer.js",
        "blocks/generators_display.js",
        "blocks/generators_imu.js",
        "blocks/generators_rtc.js",
        "blocks/generators_sensor.js",
        "blocks/generators_servo.js",
        "blocks/generators_switch.js",
        "blocks/generators_usb.js",
        "blocks/generators_pin.js",
        "blocks/generators_buzzer.js",
    ],
    modules: [ ],
    firmware: [
        {
            name: "MicroPython for KidBright32 V1.1.0",
            path: "firmware/MicroPython.for.KidBright32.V1.1.0.bin"
        }
    ],
    usb: [
        {
            vendorId: "0403",
            productId: "6015"
        }
    ],
    level: [
        {
            name: "Beginner",
            description: "",
            icon: "images/puzzle.png",
            blocks: [
                {
                    name: "Display",
                    icon: `images/matrix.png`,
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
                        "display_clear",
                    ]
                },
                {
                    name: "Input",
                    icon: `images/filter.png`,
                    color: "#fbbd5e",
                    blocks: [
                        {
                            xml: '<label text="Switch"></label>',
                        },
                        "switch_on_press",
                        "switch_on_release",
                        "switch_is_press",
                        "switch_is_release",
                        "switch_get_value",
                        {
                            xml: '<label text="Senser"></label>',
                        },
                        "sensor_light",
                        "sensor_temp",
                        {
                            xml: '<label text="IMU"></label>',
                        },
                        "imu_update",
                        "imu_is_gesture",
                        "imu_acceleration",
                        "imu_rotation",
                        "imu_compass_heading",
                        "imu_magnetic_force",
                        "imu_calibrate_compass",
                        {
                            xml: '<label text="External Input"></label>',
                        },
                        "pin_digital_read",
                        "pin_analog_read"
                    ]
                },
                {
                    name: "Output",
                    icon: `images/usb.png`,
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
                                            <field name="notes">C4</field>
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
                    icon: `images/clock.png`,
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
                        }
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
                        {
                            xml: `
                                <block type="dht_read">
                                    <value name="pin">
                                        <shadow type="math_number">
                                            <field name="NUM">2</field>
                                        </shadow>
                                    </value>
                                </block>
                            `
                        },
                        {
                            xml: `
                                <block type="ds18x20_read">
                                    <value name="pin">
                                        <shadow type="math_number">
                                            <field name="NUM">2</field>
                                        </shadow>
                                    </value>
                                </block>
                            `
                        },
                        {
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
                        "rtc_sync_ntp",
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
                        "is_woke_from_deep_sleep"
                    ]
                }
            ]
        }
    ]
});
