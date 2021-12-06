boardConfig = _.cloneDeep(KidBright32_config);

Object.assign(boardConfig, { 
    id: "kidbright32iA",
    name: "KidBright32iA",
    description: "",
    image: "images/cover.jpg"
});

boardConfig.blocks = boardConfig.blocks.concat([
    "../kidbright32/blocks/blocks_imu.js",
    "../kidbright32/blocks/generators_imu.js",
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
];

categoryIndex = boardConfig.level[0].blocks.findIndex(category => category.name === "Input");
inBlockIndex = boardConfig.level[0].blocks[categoryIndex].blocks.findIndex(block => block === "sensor_temp") + 1;
for (let block of imuBlock) {
    boardConfig.level[0].blocks[categoryIndex].blocks.splice(inBlockIndex, 0, block);
    inBlockIndex++;
}

addBoard(_.cloneDeep(boardConfig));
