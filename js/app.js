
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
            "logic_compare",
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

];

// Block Tree to Category
for (let category of blocksTree) {
    $("#blockCategoryList").append(`
        <li data-name="${category.name}">
            <div class="icon"><img src="${category.icon}" alt=""></div>
            <div class="label">${category.name}</div>
        </li>
    `);
}

let changeToolbox = (categoryName) => {
    let category = blocksTree.find(obj => obj.name == categoryName);
    let toolboxTextXML = `<xml xmlns="https://developers.google.com/blockly/xml" id="toolbox" style="display: none">`;
    for (let block of category.blocks) {
        if (typeof block === "object") {
            toolboxTextXML += block.xml;
        } else {
            if (typeof Blockly.Blocks[block].xml !== "undefined") {
                toolboxTextXML += Blockly.Blocks[block].xml;
            } else {
                toolboxTextXML += `<block type="${block}"></block>`;
            }
        }
    }
    toolboxTextXML += `</xml>`;
    let toolboxXML = Blockly.Xml.textToDom(toolboxTextXML);
    console.log(toolboxXML);
    blocklyWorkspace.updateToolbox(toolboxXML);

    $("#blockCategoryList > li").removeClass("active").css({ color: "" });
    $(`#blockCategoryList > li[data-name='${categoryName}']`).addClass("active").css({ 
        color: category.color
    });
}

$("#blockCategoryList > li").click(function() {
    changeToolbox($(this).attr("data-name"));
});

var blocklyArea = document.getElementById('blocklyArea');
var blocklyDiv = document.getElementById('blocklyDiv');

var blocklyWorkspace = Blockly.inject(blocklyDiv, {
    media: 'blockly/media/',
    toolbox: document.getElementById('toolbox'),
    grid : {
		spacing : 20, 
		length : 1, 
		colour : '#888', 
		snap : true
    },
    trashcan : true,
    zoom: {
        controls: true,
        wheel: true,
        startScale: 1,
        maxScale: 2,
        minScale: 0.3,
        scaleSpeed: 1.2
    },
    scrollbars : true, 
});

var onresize = function(e) {
    // Compute the absolute coordinates and dimensions of blocklyArea.
    var element = blocklyArea;
    var x = 0;
    var y = 0;
    do {
        x += element.offsetLeft;
        y += element.offsetTop;
        element = element.offsetParent;
    } while (element);
    // Position blocklyDiv over blocklyArea.
    blocklyDiv.style.left = x + 'px';
    blocklyDiv.style.top = y + 'px';
    blocklyDiv.style.width = blocklyArea.offsetWidth + 'px';
    blocklyDiv.style.height = blocklyArea.offsetHeight + 'px';
    Blockly.svgResize(blocklyWorkspace);
};

window.addEventListener('resize', onresize, false);
onresize();

changeToolbox(blocksTree[0].name);
