boardConfig = _.cloneDeep(KidBright32_config);

Object.assign(boardConfig, { 
    id: "kidbright32-v1.6",
    name: "KidBright32 V1.6 by Gravitech",
    description: "",
    image: "images/cover.jpg"
});

boardConfig.blocks = boardConfig.blocks.concat([
    "../kidbright32/blocks/blocks_imu.js",
    "../kidbright32/blocks/generators_imu.js",
    "blocks/blocks_gerora.js",
    "blocks/generators_gerora.js"
]);

imuBlock = [
    {
        xml: '<label text="IMU"></label>',
    },
    // "imu_update",
    "imu_on_gesture",
    "imu_is_gesture",
    "imu_acceleration",
    "imu_rotation",
    "imu_raw_gyro"
];

categoryIndex = boardConfig.level[0].blocks.findIndex(category => category.name === "Input");
inBlockIndex = boardConfig.level[0].blocks[categoryIndex].blocks.findIndex(block => block === "sensor_temp") + 1;
for (let block of imuBlock) {
    boardConfig.level[0].blocks[categoryIndex].blocks.splice(inBlockIndex, 0, block);
    inBlockIndex++;
}

rgbledBlock = [
    {
        xml: '<label text="Gerora RGB LED"></label>',
    },
    "gerora_setup",
    {
        xml: `
            <block type="gerora_set_color1">
                <value name="n">
                    <shadow type="math_number">
                        <field name="NUM">0</field>
                    </shadow>
                </value>
            </block>
        `
    },
    {
        xml: `
            <block type="gerora_set_color2">
                <value name="n">
                    <shadow type="math_number">
                        <field name="NUM">0</field>
                    </shadow>
                </value>
                <value name="red">
                    <shadow type="math_number">
                        <field name="NUM">0</field>
                    </shadow>
                </value>
                <value name="green">
                    <shadow type="math_number">
                        <field name="NUM">0</field>
                    </shadow>
                </value>
                <value name="blue">
                    <shadow type="math_number">
                        <field name="NUM">0</field>
                    </shadow>
                </value>
            </block>
        `
    },
    "gerora_fill_color1",
    {
        xml: `
            <block type="gerora_fill_color2">
                <value name="red">
                    <shadow type="math_number">
                        <field name="NUM">0</field>
                    </shadow>
                </value>
                <value name="green">
                    <shadow type="math_number">
                        <field name="NUM">0</field>
                    </shadow>
                </value>
                <value name="blue">
                    <shadow type="math_number">
                        <field name="NUM">0</field>
                    </shadow>
                </value>
            </block>
        `
    },
    "gerora_show",
    "gerora_clear",
    {
        xml: `
            <block type="gerora_rainbow">
                <value name="wait">
                    <shadow type="math_number">
                        <field name="NUM">30</field>
                    </shadow>
                </value>
            </block>
        `
    },
    {
        xml: `
            <block type="gerora_set_brightness">
                <value name="brightness">
                    <shadow type="math_number">
                        <field name="NUM">50</field>
                    </shadow>
                </value>
            </block>
        `
    }
];

categoryIndex = boardConfig.level[0].blocks.findIndex(category => category.name === "Output");
inBlockIndex = boardConfig.level[0].blocks[categoryIndex].blocks.findIndex(block => block === "usb_toggle") + 1;
for (let block of rgbledBlock) {
    boardConfig.level[0].blocks[categoryIndex].blocks.splice(inBlockIndex, 0, block);
    inBlockIndex++;
}

addBoard(_.cloneDeep(boardConfig));
