let blocksTree = [
    {
        name: "Pin",
        icon: "/images/icon/led.png",
        color: "#e64c3c",
        blocks: [
            {
                xml: `
                    <block type="pin_digital_write">
                        <value name="pin">
                            <shadow type="math_number">
                                <field name="NUM">5</field>
                            </shadow>
                        </value>
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
                    <block type="pin_digital_read">
                        <value name="pin">
                            <shadow type="math_number">
                                <field name="NUM">32</field>
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
                                <field name="NUM">32</field>
                            </shadow>
                        </value>
                  </block>
                  `
            },
            {
                xml: `
                    <block type="pin_pwm_write">
                        <value name="pin">
                            <shadow type="math_number">
                                <field name="NUM">5</field>
                            </shadow>
                        </value>
                        <value name="value">
                            <shadow type="math_number">
                                <field name="NUM">512</field>
                            </shadow>
                        </value>
                  </block>
                  `
            },
        ]
    },
    {
        name: "Control",
        icon: "/images/icon/process.png",
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
        icon: "/images/icon/maths.png",
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
        icon: "/images/icon/relativity.png",
        color: "#ac5e2e",
        blocks: "VARIABLE"
    },
    {
        name: "Function",
        icon: "/images/icon/jigsaw.png",
        color: "#17A589",
        blocks: "PROCEDURE"
    },
    {
        name: "Advanced",
        icon: "/images/icon/expert.png",
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
                xml: '<label text="RTC"></label>',
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
];
