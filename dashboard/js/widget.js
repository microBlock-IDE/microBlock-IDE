
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
            this.element.querySelector(".image > img").setAttribute("src", this.value ? "images/light-bulb.on.svg" : "images/light-bulb.off.svg");
            this.element.querySelector(".label").innerText = this.value ? "ON" : "OFF";
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
                    min: this.property.min,
                    max: this.property.max,
                    value: this.value
                });
            }
            this.gauge.setValueAnimated(+this.value, 1);
        }
    },
    {
        id: "chars",
        name: "Chars",
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
            this.dataLog = [ ];
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
                    /*options: {
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                },
                                gridLines: {
                                    color: "#424242"
                                },
                            }],
                            xAxes: [{
                                gridLines: {
                                    color: "#424242"
                                },
                            }]
                        },
                        responsive: true,
                        maintainAspectRatio: false,
                        legend: {
                            display: false
                        },
                        elements: {
                            line: {
                                tension: 0.000001
                            }
                        },
                    }*/

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
        
                                    val = moment(ticks[0].value);
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
                                        val = moment(tick.value);
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
                        /* tooltips: {
                            intersect: false,
                            mode: 'index',
                            callbacks: {
                                label: function(tooltipItem, myData) {
                                    return parseFloat(tooltipItem.value).toFixed(2);
                                }
                            }
                        }, */
                        legend: {
                            display: false
                        },
                        responsive: true,
                        maintainAspectRatio: false,
                    }
                });
                
            }
            if (this.value !== null) {
                this.chart.data.datasets[0].data.push({
                    t: (new Date()).getTime(),
                    y: +this.value
                });
            }
            this.chart.options.scales.yAxes[0].ticks.suggestedMin = this.property.min;
            this.chart.options.scales.yAxes[0].ticks.suggestedMax = this.property.max;
            this.chart.update();
        }
    }
];
