boardConfig = _.cloneDeep(KidBright32_config);

Object.assign(boardConfig, { 
    id: "kidbright32-v1.3",
    name: "KidBright32 V1.3 & V1.4",
    description: "",
    image: "images/cover.jpg",
    simulator: {
        index: "simulator/index.html",
        script: [ ]
    }
});

addBoard(_.cloneDeep(boardConfig));
