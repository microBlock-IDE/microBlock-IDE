
widgets = [
    {
        id: "text",
        name: "Text",
        property: {
            unit: {
                type: "text",
                default: ""
            }
        },
        create: function() {
            return `<div class="data"><div><span class="value"></span><span class="unit"></span></div>`;
        },
        render: function() {
            this.element.querySelector(".value").innerText = this.value !== null ? this.value : "-";
            this.element.querySelector(".unit").innerText = this.property.unit;
        },
        toolbox: function() {
            this.value = "12.87";
            this.property.unit = "%";
        }
    },
    {
        id: "lamp",
        name: "Lamp",
        property: {

        },
        create: function() {
            return `
                <div class="image">
                    <img src="" alt="">
                </div>
                <div class="label"></div>
            `;
        },
        render: function() {
            this.element.querySelector(".image > img").setAttribute("src", +this.value ? "images/light-bulb.on.svg" : "images/light-bulb.off.svg");
            this.element.querySelector("article > .label").innerText = +this.value ? "ON" : "OFF";
        },
        toolbox: function() {
            this.value = 1;
        }
    },
    {
        id: "gauge",
        name: "Gauge",
        property: {
            min: {
                type: "number",
                default: 0
            },
            max: {
                type: "number",
                default: 100
            }
        },
        create: function() {
            return `<div class="gauge-container"></div>`;
        },
        render: function() {
            if (typeof this.gauge === "undefined") {
                this.gauge = Gauge(this.element.querySelector(".gauge-container"), {
                    min: +this.property.min,
                    max: +this.property.max,
                    value: this.value
                });
            }
            this.gauge.setMinValue(+this.property.min);
            this.gauge.setMaxValue(+this.property.max);
            this.gauge.setValueAnimated(+this.value, 0.3);
        },
        toolbox: function() {
            this.value = 60;
        }
    },
    {
        id: "chart",
        name: "Chart",
        property: {
            min: {
                type: "number",
                default: 0
            },
            max: {
                type: "number",
                default: 100
            },
            limit: {
                type: "number",
                default: 20
            },
        },
        create: function() {
            return `<canvas class="widget-chart" width="100%" height="100%"></canvas>`;
        },
        render: function() {
            if (typeof this.chart === "undefined") {
                this.chart = new Chart(this.element.querySelector(".widget-chart").getContext('2d'), {
                    type: 'line',
                    data: {
                        labels: [ ],
                        datasets: [{
                            backgroundColor: "#ff57221f",
                            borderColor: "#FF5722",
                            borderWidth: 1,
                            data: [ ],
                            fill: "start",
                            pointRadius: 0,
					        lineTension: 0,
                        }]
                    },
                    options: {
                        scales: {
                            xAxes: [{
                                type: 'time',
                                distribution: 'series',
                                offset: true,
                                ticks: {
                                    major: {
                                        enabled: true,
                                        fontStyle: 'bold'
                                    },
                                    source: 'data',
                                    autoSkip: true,
                                    autoSkipPadding: 75,
                                    maxRotation: 0,
                                    sampleSize: 100
                                },
                                afterBuildTicks: function(scale, ticks) {
                                    if (!ticks) return;

                                    var majorUnit = scale._majorUnit;
                                    var firstTick = ticks[0];
                                    var i, ilen, val, tick, currMajor, lastMajor;
        
                                    val = moment(ticks[0].value).locale("th");
                                    if ((majorUnit === 'minute' && val.second() === 0)
                                            || (majorUnit === 'hour' && val.minute() === 0)
                                            || (majorUnit === 'day' && val.hour() === 9)
                                            || (majorUnit === 'month' && val.date() <= 3 && val.isoWeekday() === 1)
                                            || (majorUnit === 'year' && val.month() === 0)) {
                                        firstTick.major = true;
                                    } else {
                                        firstTick.major = false;
                                    }
                                    lastMajor = val.get(majorUnit);
        
                                    for (i = 1, ilen = ticks.length; i < ilen; i++) {
                                        tick = ticks[i];
                                        val = moment(tick.value).locale("th");
                                        currMajor = val.get(majorUnit);
                                        tick.major = currMajor !== lastMajor;
                                        lastMajor = currMajor;
                                    }
                                    return ticks;
                                },
                                gridLines: {
                                    color: "#424242"
                                },
                            }],
                            yAxes: [{
                                gridLines: {
                                    drawBorder: false,
                                    color: "#424242"
                                },
                                ticks: {
                                    maxTicksLimit: 8
                                }
                            }]
                        },
                        legend: {
                            display: false
                        },
                        responsive: true,
                        maintainAspectRatio: false,
                        animation: {
                            duration: 0
                        },
                        hover: {
                            animationDuration: 0
                        },
                        responsiveAnimationDuration: 0
                    }
                });
                
            }
            if (this.value !== null) {
                this.chart.data.datasets[0].data.push({
                    t: (new Date()).getTime(),
                    y: +this.value
                });
                if (this.chart.data.datasets[0].data.length > this.property.limit) {
                    this.chart.data.datasets[0].data = this.chart.data.datasets[0].data.slice(-this.property.limit);
                }
            }
            this.chart.options.scales.yAxes[0].ticks.suggestedMin = +this.property.min;
            this.chart.options.scales.yAxes[0].ticks.suggestedMax = +this.property.max;
            this.chart.update();
        },
        toolbox: function() {
            for (let i=0;i<50;i++) {
                this.chart.data.datasets[0].data.push({
                    t: (new Date()).getTime() - (i * 60 * 100),
                    y: Math.floor(Math.random() * 101)
                });
            }
        }
    },
    {
        id: "log",
        name: "Log",
        property: {
            limit: {
                type: "number",
                default: 20
            },
        },
        create: function() {
            return `<ul class="log-list"></ul>`;
        },
        render: function() {
            if (this.value === null) {
                return;
            }

            let li = document.createElement("li");
            li.innerHTML = `
                <div class="data">
                    <div class="value">${this.value}</div>
                    <div class="time">${moment().locale("th").format('LTS')}</div>
                </div>
                <div class="icon"></div>
            `;

            let list = this.element.querySelector(".log-list");
            if (list.childElementCount > 0) {
                list.insertBefore(li, list.firstChild);
            } else {
                list.appendChild(li);
            }
            if (list.childElementCount > this.property.limit) {
                let lis = list.querySelectorAll("li");
                for (let i=(this.property.limit - 1);i<list.childElementCount;i++) {
                    lis[i].remove();
                }
            }
        },
        toolbox: function() {
            this.value = "Hello, this dummy data !";
        }
    },
    {
        id: "aircraft",
        name: "Aircraft",
        property: {
            pitch: {
                type: "source",
            },
            roll: {
                type: "source"
            },
            heading: {
                type: "source"
            },
        },
        create: function() {
            return ``;
        },
        render: function() {
            /* if (this.value === null) {
                return;
            } */

            if (!this.threeObj) {
                this.threeObj = {};

                this.threeObj.mainBox = this.element.querySelector("article");
                let boxWidth = this.threeObj.mainBox.clientWidth - 20;
                let boxHeight = this.threeObj.mainBox.clientHeight - 20;

                this.threeObj.scene = new THREE.Scene();
                this.threeObj.scene.background = new THREE.Color(0xdddddd);

                this.threeObj.camera = new THREE.PerspectiveCamera(26, boxWidth / boxHeight, 1, 5000);
                this.threeObj.camera.position.x = 0;
                this.threeObj.camera.position.y = 0;
                this.threeObj.camera.position.z = 0;
                
                this.threeObj.hemiLight = new THREE.HemisphereLight(0xffeeb1, 0x080820, 4);
                this.threeObj.scene.add(this.threeObj.hemiLight);

                this.threeObj.camera_pivot = new THREE.Object3D()
                this.threeObj.Y_AXIS = new THREE.Vector3(0, 1, 0);

                this.threeObj.scene.add(this.threeObj.camera_pivot);
                this.threeObj.camera_pivot.add(this.threeObj.camera);
                this.threeObj.camera.position.set(200, 200, 0);
                this.threeObj.camera.lookAt(this.threeObj.camera_pivot.position);

                this.threeObj.camera_pivot.rotateOnAxis(this.threeObj.Y_AXIS, 0);

                this.threeObj.scene.add(new THREE.AxesHelper(500));
                
                this.threeObj.renderer = new THREE.WebGLRenderer();
                // this.threeObj.renderer.setSize(boxWidth, boxHeight);
                this.threeObj.mainBox.appendChild(this.threeObj.renderer.domElement);

                this.threeObj.controls = new THREE.OrbitControls(this.threeObj.camera, this.threeObj.renderer.domElement);

                this.threeObj.animate = () => {
                    let boxWidth = this.threeObj.mainBox.clientWidth - 20;
                    let boxHeight = this.threeObj.mainBox.clientHeight - 20;

                    this.threeObj.camera.aspect = boxWidth / boxHeight;
                    this.threeObj.camera.updateProjectionMatrix();
                    this.threeObj.renderer.setSize(boxWidth, boxHeight);

                    this.threeObj.renderer.render(this.threeObj.scene, this.threeObj.camera);
                    requestAnimationFrame(this.threeObj.animate);
                };

                new THREE.GLTFLoader().load('3D-model/sample-airplane.glb', result => { 
                    this.threeObj.model = result.scene.children[0]; 
                    this.threeObj.scene.add(this.threeObj.model);
                    this.threeObj.animate();
                });
            }

            if (!this.threeObj.model) {
                return;
            }

            let pitch = 0;
            let roll = 0;
            let heading = 0;

            if (this.value) {
                pitch = +this.value.pitch || 0;
                roll = +this.value.roll || 0;
                heading = +this.value.heading || 0;
                console.log(pitch, roll, heading)
            }

            let xAngle = -90 - roll;
            this.threeObj.model.rotation.x = xAngle * Math.PI / 180;
    
            let yAngle = pitch;
            this.threeObj.model.rotation.y = yAngle * Math.PI / 180;
    
            let zAngle = -heading;
            this.threeObj.model.rotation.z = zAngle * Math.PI / 180;
        },
        toolbox: function() {
            
        }
    },
    {
        id: "game",
        name: "Game",
        property: {

        },
        create: function() {
            return `<div class="game-box"></div>`;
        },
        render: function() {
            if (!this.gameObj) {
                this.gameObj = new Game(this.element.querySelector("article .game-box"));
            }

            this.gameObj.extennalControl = +this.value;
        },
        toolbox: function() {
            
        }
    },
    {
        id: "compass",
        name: "Compass",
        property: {

        },
        create: function() {
            return `
            <div class="box">
                <div class="compass-box">
                    <div class="bezel"></div>
                    <div class="NWSE quad"></div>
                    <div class="NESW quad"></div>
                    <div class="NS quad"></div>
                    <div class="WE quad"></div>
                    <span class="N dir">N</span>
                    <span class="E dir">E</span>
                    <span class="S dir">S</span>
                    <span class="W dir">W</span>
                    <div class="needle"></div>
                    <div class="axis"></div>
                </div>
            </div>
            `;
        },
        render: function() {
            let box = this.element.querySelector(".box");
            if (!this.onResize) {
                this.onResize = (function() {
                    this.element.querySelector(".compass-box").style.zoom = Math.min(box.clientWidth, box.clientHeight) / 100;
                }).bind(this);

                this.ro = new ResizeObserver(this.onResize);
                this.ro.observe(box);
            }
            this.element.querySelector(".compass-box > .needle").style.transform = `rotate(${+this.value}deg)`;
        },
        toolbox: function() {
            
        }
    },
];
