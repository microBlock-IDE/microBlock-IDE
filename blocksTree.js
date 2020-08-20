let blocksTree = [
    {
        name: "Pin",
        icon: "images/icon/led.png",
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
        icon: "images/icon/process.png",
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
        icon: "images/icon/maths.png",
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
        icon: "images/icon/relativity.png",
        color: "#ac5e2e",
        blocks: "VARIABLE"
    },
    {
        name: "Function",
        icon: "images/icon/jigsaw.png",
        color: "#17A589",
        blocks: "PROCEDURE"
    }
];
