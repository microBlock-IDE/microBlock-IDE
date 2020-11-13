boardConfig = _.cloneDeep(KidBright32_config);

Object.assign(boardConfig, { 
    id: "kidbright32-v1.5",
    name: "KidBright32 V1.5",
    description: "",
    image: "images/cover.jpg"
});

addBoard(_.cloneDeep(boardConfig));
