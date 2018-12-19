(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';var versionColor = d3.scaleOrdinal([
    '#1b9e77',
    '#7570b3'
]);
var formatSample = d3.format('.3r');
var Axis = require('./lib/axis');
var ref = require('./lib/statistics');
var summaryStatistics = ref.summaryStatistics;
var regression = ref.regression;
var kde = ref.kde;
var probabilitiesOfSuperiority = ref.probabilitiesOfSuperiority;
var StatisticsPlot = function (superclass) {
    function StatisticsPlot(props) {
        superclass.call(this, props);
        this.state = { width: 100 };
    }
    if (superclass)
        StatisticsPlot.__proto__ = superclass;
    StatisticsPlot.prototype = Object.create(superclass && superclass.prototype);
    StatisticsPlot.prototype.constructor = StatisticsPlot;
    StatisticsPlot.prototype.render = function render() {
        var this$1 = this;
        var margin = {
            top: 0,
            right: 20,
            bottom: 20,
            left: 0
        };
        var width = this.state.width - margin.left - margin.right;
        var height = 400 - margin.top - margin.bottom;
        var kdeWidth = 100;
        var summaries = this.props.versions.filter(function (v) {
            return v.status === 'ended';
        }).map(function (v) {
            return v.summary;
        });
        var t = d3.scaleLinear().domain([
            d3.min(summaries.map(function (s) {
                return s.min;
            })),
            d3.max(summaries.map(function (s) {
                return Math.min(s.max, s.q2 + 3 * s.iqr);
            }))
        ]).range([
            height,
            0
        ]).clamp(true).nice();
        var b = d3.scaleBand().domain(this.props.versions.map(function (v) {
            return v.name;
        })).range([
            kdeWidth + 20,
            width
        ]).paddingOuter(0.15).paddingInner(0.3);
        var versions = this.props.versions.map(function (v) {
            return {
                name: v.name,
                samples: v.samples,
                summary: v.summary,
                density: kde(v.samples, v.summary, t.ticks(50))
            };
        });
        var p = d3.scaleLinear().domain([
            0,
            d3.max(versions.map(function (v) {
                return d3.max(v.density, function (d) {
                    return d[1];
                });
            }))
        ]).range([
            0,
            kdeWidth
        ]);
        var line = d3.line().curve(d3.curveBasis).y(function (d) {
            return t(d[0]);
        }).x(function (d) {
            return p(d[1]);
        });
        return React.createElement('svg', {
            width: '100%',
            height: height + margin.top + margin.bottom,
            style: { overflow: 'visible' },
            ref: function (ref) {
                this$1.ref = ref;
            }
        }, React.createElement('defs', null, React.createElement('g', { id: 'up-arrow' }, React.createElement('path', {
            transform: 'translate(-6, -2)',
            style: {
                stroke: 'inherit',
                fill: 'inherit'
            },
            d: 'M2,10 L6,2 L10,10'
        }))), React.createElement('g', { transform: 'translate(' + margin.left + ',' + margin.top + ')' }, React.createElement(Axis, {
            orientation: 'bottom',
            scale: p,
            ticks: [
                2,
                '%'
            ],
            transform: 'translate(0,' + height + ')'
        }), React.createElement(Axis, {
            orientation: 'left',
            scale: t,
            tickFormat: formatSample
        }, React.createElement('text', {
            fill: '#000',
            textAnchor: 'end',
            y: 6,
            transform: 'rotate(-90)',
            dy: '.71em'
        }, 'Time (ms)')), versions.map(function (v, i) {
            if (v.samples.length === 0) {
                return null;
            }
            var bandwidth = b.bandwidth();
            var color = versionColor(v.name);
            var scale = d3.scaleLinear().domain([
                0,
                v.samples.length
            ]).range([
                0,
                bandwidth
            ]);
            var ref = v.summary;
            var mean = ref.mean;
            var trimmedMean = ref.trimmedMean;
            var q1 = ref.q1;
            var q2 = ref.q2;
            var q3 = ref.q3;
            var min = ref.min;
            var max = ref.max;
            var argmin = ref.argmin;
            var argmax = ref.argmax;
            var tMax = t.domain()[1];
            return React.createElement('g', { key: i }, React.createElement('path', {
                fill: 'none',
                stroke: color,
                strokeWidth: 2,
                strokeOpacity: 0.7,
                d: line(v.density)
            }), React.createElement('g', { transform: 'translate(' + b(v.name) + ',0)' }, v.samples.map(function (d, i) {
                return React.createElement('circle', {
                    key: i,
                    fill: color,
                    cx: scale(i),
                    cy: t(d),
                    r: i === argmin || i === argmax ? 2 : 1,
                    style: { fillOpacity: d < tMax ? 1 : 0 }
                });
            }), v.samples.filter(function (d) {
                return d >= tMax;
            }).map(function (d, i) {
                return React.createElement('use', {
                    href: '#up-arrow',
                    x: scale(i),
                    y: t(d),
                    style: {
                        stroke: color,
                        strokeWidth: i === argmin || i === argmax ? 2 : 1,
                        fill: 'rgba(200, 0, 0, 0.5)'
                    }
                });
            }), React.createElement('line', {
                x1: bandwidth / 2,
                x2: bandwidth / 2,
                y1: t(q1),
                y2: t(q3),
                stroke: color,
                strokeWidth: bandwidth,
                strokeOpacity: 0.5
            }), React.createElement('line', {
                x1: bandwidth / 2,
                x2: bandwidth / 2,
                y1: t(q2) - 0.5,
                y2: t(q2) + 0.5,
                stroke: color,
                strokeWidth: bandwidth,
                strokeOpacity: 1
            }), React.createElement('use', {
                href: '#up-arrow',
                style: {
                    stroke: color,
                    fill: color,
                    fillOpacity: 0.4
                },
                transform: mean >= tMax ? 'translate(-10, 0)' : 'translate(-5, ' + t(mean) + ') rotate(90)',
                x: 0,
                y: 0
            }), React.createElement('use', {
                href: '#up-arrow',
                style: {
                    stroke: color,
                    fill: color
                },
                transform: 'translate(-5, ' + t(trimmedMean) + ') rotate(90)',
                x: 0,
                y: 0
            }), [
                mean,
                trimmedMean
            ].map(function (d) {
                return React.createElement('text', {
                    key: i,
                    dx: -16,
                    dy: '.3em',
                    x: 0,
                    y: t(d),
                    textAnchor: 'end',
                    fontSize: 10,
                    fontFamily: 'sans-serif'
                }, formatSample(d));
            }), [
                [
                    argmin,
                    min
                ],
                [
                    argmax,
                    max
                ]
            ].map(function (d, i) {
                return React.createElement('text', {
                    key: i,
                    dx: 0,
                    dy: i === 0 ? '1.3em' : '-0.7em',
                    x: scale(d[0]),
                    y: t(d[1]),
                    textAnchor: 'middle',
                    fontSize: 10,
                    fontFamily: 'sans-serif'
                }, formatSample(d[1]));
            }), [
                q1,
                q2,
                q3
            ].map(function (d, i) {
                return React.createElement('text', {
                    key: i,
                    dx: 6,
                    dy: '.3em',
                    x: bandwidth,
                    y: t(d),
                    textAnchor: 'start',
                    fontSize: 10,
                    fontFamily: 'sans-serif'
                }, formatSample(d));
            })));
        })));
    };
    StatisticsPlot.prototype.componentDidMount = function componentDidMount() {
        this.setState({ width: this.ref.clientWidth });
    };
    return StatisticsPlot;
}(React.Component);
var RegressionPlot = function (superclass) {
    function RegressionPlot(props) {
        superclass.call(this, props);
        this.state = { width: 100 };
    }
    if (superclass)
        RegressionPlot.__proto__ = superclass;
    RegressionPlot.prototype = Object.create(superclass && superclass.prototype);
    RegressionPlot.prototype.constructor = RegressionPlot;
    RegressionPlot.prototype.render = function render() {
        var this$1 = this;
        var margin = {
            top: 10,
            right: 20,
            bottom: 30,
            left: 0
        };
        var width = this.state.width - margin.left - margin.right;
        var height = 200 - margin.top - margin.bottom;
        var versions = this.props.versions.filter(function (version) {
            return version.regression;
        });
        var x = d3.scaleLinear().domain([
            0,
            d3.max(versions.map(function (version) {
                return d3.max(version.regression.data, function (d) {
                    return d[0];
                });
            }))
        ]).range([
            0,
            width
        ]).nice();
        var y = d3.scaleLinear().domain([
            0,
            d3.max(versions.map(function (version) {
                return d3.max(version.regression.data, function (d) {
                    return d[1];
                });
            }))
        ]).range([
            height,
            0
        ]).nice();
        var line = d3.line().x(function (d) {
            return x(d[0]);
        }).y(function (d) {
            return y(d[1]);
        });
        return React.createElement('svg', {
            width: '100%',
            height: height + margin.top + margin.bottom,
            style: { overflow: 'visible' },
            ref: function (ref) {
                this$1.ref = ref;
            }
        }, React.createElement('g', { transform: 'translate(' + margin.left + ',' + margin.top + ')' }, React.createElement(Axis, {
            orientation: 'bottom',
            scale: x,
            transform: 'translate(0,' + height + ')'
        }, React.createElement('text', {
            fill: '#000',
            textAnchor: 'end',
            y: -6,
            x: width
        }, 'Iterations')), React.createElement(Axis, {
            orientation: 'left',
            scale: y,
            ticks: 4,
            tickFormat: formatSample
        }, React.createElement('text', {
            fill: '#000',
            textAnchor: 'end',
            y: 6,
            transform: 'rotate(-90)',
            dy: '.71em'
        }, 'Time (ms)')), versions.map(function (v, i) {
            return React.createElement('g', {
                key: i,
                fill: versionColor(v.name),
                'fill-opacity': '0.7'
            }, v.regression.data.map(function (ref, i) {
                var a = ref[0];
                var b = ref[1];
                return React.createElement('circle', {
                    key: i,
                    r: '2',
                    cx: x(a),
                    cy: y(b)
                });
            }), React.createElement('path', {
                stroke: versionColor(v.name),
                strokeWidth: 1,
                strokeOpacity: 0.5,
                d: line(v.regression.data.map(function (d) {
                    return [
                        d[0],
                        d[0] * v.regression.slope + v.regression.intercept
                    ];
                }))
            }));
        })));
    };
    RegressionPlot.prototype.componentDidMount = function componentDidMount() {
        this.setState({ width: this.ref.clientWidth });
    };
    return RegressionPlot;
}(React.Component);
var BenchmarkStatistic = function (superclass) {
    function BenchmarkStatistic() {
        superclass.apply(this, arguments);
    }
    if (superclass)
        BenchmarkStatistic.__proto__ = superclass;
    BenchmarkStatistic.prototype = Object.create(superclass && superclass.prototype);
    BenchmarkStatistic.prototype.constructor = BenchmarkStatistic;
    BenchmarkStatistic.prototype.render = function render() {
        switch (this.props.status) {
        case 'waiting':
            return React.createElement('p', { className: 'quiet' });
        case 'running':
            return React.createElement('p', null, 'Running...');
        case 'error':
            return React.createElement('p', null, this.props.error.message);
        default:
            return this.props.statistic(this.props);
        }
    };
    return BenchmarkStatistic;
}(React.Component);
var BenchmarkRow = function (superclass) {
    function BenchmarkRow() {
        superclass.apply(this, arguments);
    }
    if (superclass)
        BenchmarkRow.__proto__ = superclass;
    BenchmarkRow.prototype = Object.create(superclass && superclass.prototype);
    BenchmarkRow.prototype.constructor = BenchmarkRow;
    BenchmarkRow.prototype.render = function render() {
        var endedCount = this.props.versions.filter(function (version) {
            return version.status === 'ended';
        }).length;
        var master;
        var current;
        if (/master/.test(this.props.versions[0].name)) {
            var assign;
            assign = this.props.versions, master = assign[0], current = assign[1];
        } else {
            var assign$1;
            assign$1 = this.props.versions, current = assign$1[0], master = assign$1[1];
        }
        var change = '';
        var pInferiority = '';
        if (endedCount === 2) {
            var delta = current.summary.trimmedMean - master.summary.trimmedMean;
            var pooledDeviation = Math.sqrt(((master.samples.length - 1) * Math.pow(master.summary.windsorizedDeviation, 2) + (current.samples.length - 1) * Math.pow(current.summary.windsorizedDeviation, 2)) / (master.samples.length + current.samples.length - 2));
            var d = delta / pooledDeviation;
            var ref = probabilitiesOfSuperiority(master.samples, current.samples);
            var superior = ref.superior;
            var inferior = ref.inferior;
            change = React.createElement('span', { className: d < 0.2 ? 'quiet' : d < 1.5 ? '' : 'strong' }, '( ', delta > 0 ? '+' : '', formatSample(delta), ' ms / ', d.toFixed(1), ' std devs )');
            var comparison = inferior > superior ? 'SLOWER' : 'faster';
            var probability = Math.max(inferior, superior);
            pInferiority = React.createElement('p', { className: 'center ' + (probability > 0.9 ? 'strong' : 'quiet') }, (probability * 100).toFixed(0), '% chance that a random ', React.createElement('svg', {
                width: 8,
                height: 8
            }, React.createElement('circle', {
                fill: versionColor(current.name),
                cx: 4,
                cy: 4,
                r: 4
            })), ' sample is ', comparison, ' than a random ', React.createElement('svg', {
                width: 8,
                height: 8
            }, React.createElement('circle', {
                fill: versionColor(master.name),
                cx: 4,
                cy: 4,
                r: 4
            })), ' sample.');
        }
        return React.createElement('div', { className: 'col12 clearfix space-bottom' }, React.createElement('table', { className: 'fixed space-bottom' }, React.createElement('tr', null, React.createElement('th', null, React.createElement('h2', { className: 'col4' }, React.createElement('a', {
            href: '#' + this.props.name,
            onClick: this.reload
        }, this.props.name))), this.props.versions.map(function (version) {
            return React.createElement('th', {
                style: { color: versionColor(version.name) },
                key: version.name
            }, version.name);
        })), this.renderStatistic('(20% trimmed) Mean', function (version) {
            return React.createElement('p', null, formatSample(version.summary.trimmedMean), ' ms ', current && version.name === current.name && change);
        }), this.renderStatistic('(Windsorized) Deviation', function (version) {
            return React.createElement('p', null, formatSample(version.summary.windsorizedDeviation), ' ms');
        }), this.renderStatistic('R\xB2 Slope / Correlation', function (version) {
            return React.createElement('p', null, formatSample(version.regression.slope), ' ms / ', version.regression.correlation.toFixed(3), ' ', version.regression.correlation < 0.9 ? '\u2620️' : version.regression.correlation < 0.99 ? '\u26A0️' : '');
        }), this.renderStatistic('Minimum', function (version) {
            return React.createElement('p', null, formatSample(version.summary.min), ' ms');
        }), pInferiority && React.createElement('tr', null, React.createElement('td', { colspan: 3 }, pInferiority))), endedCount > 0 && React.createElement(StatisticsPlot, { versions: this.props.versions }), endedCount > 0 && React.createElement(RegressionPlot, { versions: this.props.versions }));
    };
    BenchmarkRow.prototype.renderStatistic = function renderStatistic(title, statistic) {
        return React.createElement('tr', null, React.createElement('th', null, title), this.props.versions.map(function (version) {
            return React.createElement('td', { key: version.name }, React.createElement(BenchmarkStatistic, Object.assign({}, { statistic: statistic }, version)));
        }));
    };
    BenchmarkRow.prototype.reload = function reload() {
        location.reload();
    };
    return BenchmarkRow;
}(React.Component);
var BenchmarksTable = function (superclass) {
    function BenchmarksTable(props) {
        superclass.call(this, props);
        this.state = { sharing: false };
        this.share = this.share.bind(this);
    }
    if (superclass)
        BenchmarksTable.__proto__ = superclass;
    BenchmarksTable.prototype = Object.create(superclass && superclass.prototype);
    BenchmarksTable.prototype.constructor = BenchmarksTable;
    BenchmarksTable.prototype.render = function render() {
        return React.createElement('div', {
            style: {
                width: 960,
                margin: '2em auto'
            }
        }, this.state.sharing && React.createElement('span', { className: 'loading' }), React.createElement('h1', { className: 'space-bottom1' }, 'Mapbox GL JS Benchmarks \u2013 ', this.props.finished ? React.createElement('span', null, 'Finished ', React.createElement('button', {
            className: 'button fr icon share',
            onClick: this.share
        }, 'Share')) : React.createElement('span', null, 'Running')), this.props.benchmarks.map(function (benchmark) {
            return React.createElement(BenchmarkRow, Object.assign({}, { key: benchmark.name }, benchmark));
        }));
    };
    BenchmarksTable.prototype.share = function share() {
        document.querySelectorAll('script').forEach(function (e) {
            return e.remove();
        });
        var share = document.querySelector('.share');
        share.style.display = 'none';
        var body = JSON.stringify({
            'public': true,
            'files': { 'index.html': { 'content': document.body.parentElement.outerHTML } }
        });
        this.setState({ sharing: true });
        fetch('https://api.github.com/gists', {
            method: 'POST',
            body: body
        }).then(function (response) {
            return response.json();
        }).then(function (json) {
            window.location = 'https://bl.ocks.org/anonymous/raw/' + json.id + '/';
        });
    };
    return BenchmarksTable;
}(React.Component);
var versions = window.mapboxglVersions;
var benchmarks = [];
var filter = window.location.hash.substr(1);
var finished = false;
var promise = Promise.resolve();
var loop = function (name) {
    if (filter && name !== filter) {
        return;
    }
    var benchmark = {
        name: name,
        versions: []
    };
    benchmarks.push(benchmark);
    var loop$1 = function (ver) {
        var version = {
            name: ver,
            status: 'waiting',
            logs: [],
            samples: [],
            summary: {}
        };
        benchmark.versions.push(version);
        promise = promise.then(function () {
            version.status = 'running';
            update();
            return window.mapboxglBenchmarks[name][ver].run().then(function (measurements) {
                var samples = measurements.map(function (ref) {
                    var time = ref.time;
                    var iterations = ref.iterations;
                    return time / iterations;
                });
                version.status = 'ended';
                version.samples = samples;
                version.summary = summaryStatistics(samples);
                version.regression = regression(measurements);
                update();
            }).catch(function (error) {
                version.status = 'errored';
                version.error = error;
                update();
            });
        });
    };
    for (var ver in window.mapboxglBenchmarks[name])
        loop$1(ver);
};
for (var name in window.mapboxglBenchmarks)
    loop(name);
promise = promise.then(function () {
    finished = true;
    update();
});
function update() {
    ReactDOM.render(React.createElement(BenchmarksTable, {
        versions: versions,
        benchmarks: benchmarks,
        finished: finished
    }), document.getElementById('benchmarks'));
}


},{"./lib/axis":2,"./lib/statistics":3}],2:[function(require,module,exports){
'use strict';function identity(x) {
    return x;
}
function translateX(x) {
    return 'translate(' + (x + 0.5) + ',0)';
}
function translateY(y) {
    return 'translate(0,' + (y + 0.5) + ')';
}
function number(scale) {
    return function (d) {
        return +scale(d);
    };
}
function center(scale) {
    var offset = Math.max(0, scale.bandwidth() - 1) / 2;
    if (scale.round()) {
        offset = Math.round(offset);
    }
    return function (d) {
        return +scale(d) + offset;
    };
}
var Axis = function (superclass) {
    function Axis() {
        superclass.apply(this, arguments);
    }
    if (superclass)
        Axis.__proto__ = superclass;
    Axis.prototype = Object.create(superclass && superclass.prototype);
    Axis.prototype.constructor = Axis;
    Axis.prototype.render = function render() {
        var scale = this.props.scale;
        var orient = this.props.orientation || 'left';
        var tickArguments = this.props.ticks ? [].concat(this.props.ticks) : [];
        var tickValues = this.props.tickValues || null;
        var tickFormat = this.props.tickFormat || null;
        var tickSizeInner = this.props.tickSize || this.props.tickSizeInner || 6;
        var tickSizeOuter = this.props.tickSize || this.props.tickSizeOuter || 6;
        var tickPadding = this.props.tickPadding || 3;
        var k = orient === 'top' || orient === 'left' ? -1 : 1;
        var x = orient === 'left' || orient === 'right' ? 'x' : 'y';
        var transform = orient === 'top' || orient === 'bottom' ? translateX : translateY;
        var values = tickValues == null ? scale.ticks ? scale.ticks.apply(scale, tickArguments) : scale.domain() : tickValues;
        var format = tickFormat == null ? scale.tickFormat ? scale.tickFormat.apply(scale, tickArguments) : identity : tickFormat;
        var spacing = Math.max(tickSizeInner, 0) + tickPadding;
        var range = scale.range();
        var range0 = +range[0] + 0.5;
        var range1 = +range[range.length - 1] + 0.5;
        var position = (scale.bandwidth ? center : number)(scale.copy());
        return React.createElement('g', {
            fill: 'none',
            fontSize: 10,
            fontFamily: 'sans-serif',
            textAnchor: orient === 'right' ? 'start' : orient === 'left' ? 'end' : 'middle',
            transform: this.props.transform
        }, React.createElement('path', {
            className: 'domain',
            stroke: '#000',
            d: orient === 'left' || orient === 'right' ? 'M' + k * tickSizeOuter + ',' + range0 + 'H0.5V' + range1 + 'H' + k * tickSizeOuter : 'M' + range0 + ',' + k * tickSizeOuter + 'V0.5H' + range1 + 'V' + k * tickSizeOuter
        }), values.map(function (d, i) {
            return React.createElement('g', {
                key: i,
                className: 'tick',
                transform: transform(position(d))
            }, React.createElement('line', Object.assign({}, { stroke: '#000' }, (obj = {}, obj[x + '2'] = k * tickSizeInner, obj))), React.createElement('text', Object.assign({}, {
                fill: '#000',
                dy: orient === 'top' ? '0em' : orient === 'bottom' ? '0.71em' : '0.32em'
            }, (obj$1 = {}, obj$1[x] = k * spacing, obj$1)), format(d)));
            var obj;
            var obj$1;
            ;
        }), this.props.children);
    };
    return Axis;
}(React.Component);
module.exports = Axis;


},{}],3:[function(require,module,exports){
'use strict';module.exports = {
    summaryStatistics: summaryStatistics,
    regression: regression,
    kde: kde,
    probabilitiesOfSuperiority: probabilitiesOfSuperiority
};
function probabilitiesOfSuperiority(before, after) {
    var timerPrecision = 0.005;
    var superiorCount = 0;
    var inferiorCount = 0;
    var equalCount = 0;
    var N = 0;
    for (var i = 0, list = before; i < list.length; i += 1) {
        var b = list[i];
        for (var i$1 = 0, list$1 = after; i$1 < list$1.length; i$1 += 1) {
            var a = list$1[i$1];
            N++;
            if (b - a > timerPrecision) {
                superiorCount++;
            } else if (a - b > timerPrecision) {
                inferiorCount++;
            } else {
                equalCount++;
            }
        }
    }
    return {
        superior: (superiorCount + equalCount) / N,
        inferior: (inferiorCount + equalCount) / N
    };
}
function summaryStatistics(data) {
    var variance = d3.variance(data);
    var sorted = data.slice().sort(d3.ascending);
    var ref = [
        0.25,
        0.5,
        0.75
    ].map(function (d) {
        return d3.quantile(sorted, d);
    });
    var q1 = ref[0];
    var q2 = ref[1];
    var q3 = ref[2];
    var mean = d3.mean(sorted);
    var min = [
        NaN,
        Infinity
    ];
    var max = [
        NaN,
        -Infinity
    ];
    for (var i = 0; i < data.length; i++) {
        var s = data[i];
        if (s < min[1]) {
            min = [
                i,
                s
            ];
        }
        if (s > max[1]) {
            max = [
                i,
                s
            ];
        }
    }
    var ref$1 = [
        0.2,
        0.8
    ].map(function (d) {
        return d3.quantile(sorted, d);
    });
    var lowerQuintile = ref$1[0];
    var upperQuintile = ref$1[1];
    var trimmedMean = d3.mean(data.filter(function (d) {
        return d >= lowerQuintile && d <= upperQuintile;
    }));
    var windsorizedDeviation = d3.deviation(data.map(function (d) {
        return d < lowerQuintile ? lowerQuintile : d > upperQuintile ? upperQuintile : d;
    }));
    return {
        mean: mean,
        trimmedMean: trimmedMean,
        variance: variance,
        deviation: Math.sqrt(variance),
        windsorizedDeviation: windsorizedDeviation,
        q1: q1,
        q2: q2,
        q3: q3,
        iqr: q3 - q1,
        argmin: min[0],
        min: min[1],
        argmax: max[0],
        max: max[1]
    };
}
function regression(measurements) {
    var result = [];
    for (var i = 0, n = 1; i + n < measurements.length; i += n, n++) {
        var subset = measurements.slice(i, i + n);
        result.push([
            subset.reduce(function (sum, measurement) {
                return sum + measurement.iterations;
            }, 0),
            subset.reduce(function (sum, measurement) {
                return sum + measurement.time;
            }, 0)
        ]);
    }
    return leastSquaresRegression(result);
}
function leastSquaresRegression(data) {
    var meanX = d3.sum(data, function (d) {
        return d[0];
    }) / data.length;
    var meanY = d3.sum(data, function (d) {
        return d[1];
    }) / data.length;
    var varianceX = d3.variance(data, function (d) {
        return d[0];
    });
    var sdX = Math.sqrt(varianceX);
    var sdY = d3.deviation(data, function (d) {
        return d[1];
    });
    var covariance = d3.sum(data, function (ref) {
        var x = ref[0];
        var y = ref[1];
        return (x - meanX) * (y - meanY);
    }) / (data.length - 1);
    var correlation = covariance / sdX / sdY;
    var slope = covariance / varianceX;
    var intercept = meanY - slope * meanX;
    return {
        correlation: correlation,
        slope: slope,
        intercept: intercept,
        data: data
    };
}
function kde(samples, summary, ticks) {
    var kernel = kernelEpanechnikov;
    if (samples.length === 0) {
        return [];
    }
    var bandwidth = 1.06 * summary.windsorizedDeviation * Math.pow(samples.length, -0.2);
    return ticks.map(function (x) {
        return [
            x,
            d3.mean(samples, function (v) {
                return kernel((x - v) / bandwidth);
            }) / bandwidth
        ];
    });
}
function kernelEpanechnikov(v) {
    return Math.abs(v) <= 1 ? 0.75 * (1 - v * v) : 0;
}


},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvYmFueWF3YXRrYWV3c2FtZXIvU291cmNlVHJlZVByb2plY3RzL21hcGJveC1nbC1qcy9iZW5jaC9iZW5jaG1hcmtzX3ZpZXcuanMiLCIvVXNlcnMvYmFueWF3YXRrYWV3c2FtZXIvU291cmNlVHJlZVByb2plY3RzL21hcGJveC1nbC1qcy9iZW5jaC9saWIvYXhpcy5qcyIsIi9Vc2Vycy9iYW55YXdhdGthZXdzYW1lci9Tb3VyY2VUcmVlUHJvamVjdHMvbWFwYm94LWdsLWpzL2JlbmNoL2xpYi9zdGF0aXN0aWNzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDRUEsSUFBTSxZQUFBLEdBQWUsRUFBQSxDQUFHLFlBQUgsQ0FBZ0I7QUFBQSxJQUFDLFNBQUQ7QUFBQSxJQUFZLFNBQVo7QUFBQSxDQUFoQixDQUFyQixDQUZBO0FBSUEsSUFBTSxZQUFBLEdBQWUsRUFBQSxDQUFHLE1BQUgsQ0FBVSxLQUFWLENBQXJCLENBSkE7QUFLQSxJQUFNLElBQUEsR0FBTyxPQUFBLENBQVEsWUFBUixDQUFiLENBTEE7QUFNSyxJQUtKLEdBQUEsR0FBRyxPQUFBLENBQVEsa0JBQVIsQ0FMQyxDQU5MO0FBT0ksSUFBQSxpQkFBQSxHQUFpQixHQUFBLENBQUEsaUJBQWpCLENBUEo7QUFRSSxJQUFBLFVBQUEsR0FBVSxHQUFBLENBQUEsVUFBVixDQVJKO0FBU0ksSUFBQSxHQUFBLEdBQUcsR0FBQSxDQUFBLEdBQUgsQ0FUSjtBQVVJLElBQUEsMEJBQUEsR0FBMEIsR0FBQSxDQUFBLDBCQUExQixDQVZKO0FBYUEsSUFBTSxjQUFBLEdBQXNDLFVBQUEsVUFBQSxFQUFBO0FBQUEsSUFDeEMsU0FBQSxjQUFBLENBQVksS0FBWixFQUFtQjtBQUFBLFFBQ2YsVUFBQSxDQUFLLElBQUwsQ0FBTSxJQUFOLEVBQU0sS0FBTixFQURlO0FBQUEsUUFFZixLQUFLLEtBQUwsR0FBYSxFQUFDLEtB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QUEsQ0FBQSxHQUFJLENBQUosQ0FBRCxHQUFVLFNBQWpCLENBQUEsQ0FBQTtBQUFBLGFBQXhCLElBQXVELFNBQTNEO0FBQUEsU0FBUCxDQURpQjtBQUFBLEtBQWQsQ0FBUCxDQVJrQztBQUFBLENBckd0QztBQWtIQSxTQUFTLGtCQUFULENBQTRCLENBQTVCLEVBQStCO0FBQUEsSUFDM0IsT0FBTyxJQUFBLENBQUssR0FBTCxDQUFTLENBQVQsS0FBZSxDQUFmLEdBQW1CLE9BQVEsS0FBSSxDQUFBLEdBQUksQ0FBUixDQUEzQixHQUF3QyxDQUEvQyxDQUQyQjtBQUFBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qIGdsb2JhbCBkMyAqL1xuXG5jb25zdCB2ZXJzaW9uQ29sb3IgPSBkMy5zY2FsZU9yZGluYWwoWycjMWI5ZTc3JywgJyM3NTcwYjMnXSk7XG5cbmNvbnN0IGZvcm1hdFNhbXBsZSA9IGQzLmZvcm1hdChcIi4zclwiKTtcbmNvbnN0IEF4aXMgPSByZXF1aXJlKCcuL2xpYi9heGlzJyk7XG5jb25zdCB7XG4gICAgc3VtbWFyeVN0YXRpc3RpY3MsXG4gICAgcmVncmVzc2lvbixcbiAgICBrZGUsXG4gICAgcHJvYmFiaWxpdGllc09mU3VwZXJpb3JpdHlcbn0gPSByZXF1aXJlKCcuL2xpYi9zdGF0aXN0aWNzJyk7XG5cbmNsYXNzIFN0YXRpc3RpY3NQbG90IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB7d2lkdGg6IDEwMH07XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCBtYXJnaW4gPSB7dG9wOiAwLCByaWdodDogMjAsIGJvdHRvbTogMjAsIGxlZnQ6IDB9O1xuICAgICAgICBjb25zdCB3aWR0aCA9IHRoaXMuc3RhdGUud2lkdGggLSBtYXJnaW4ubGVmdCAtIG1hcmdpbi5yaWdodDtcbiAgICAgICAgY29uc3QgaGVpZ2h0ID0gNDAwIC0gbWFyZ2luLnRvcCAtIG1hcmdpbi5ib3R0b207XG4gICAgICAgIGNvbnN0IGtkZVdpZHRoID0gMTAwO1xuXG4gICAgICAgIGNvbnN0IHN1bW1hcmllcyA9IHRoaXMucHJvcHMudmVyc2lvbnNcbiAgICAgICAgICAgIC5maWx0ZXIodiA9PiB2LnN0YXR1cyA9PT0gJ2VuZGVkJylcbiAgICAgICAgICAgIC5tYXAodiA9PiB2LnN1bW1hcnkpO1xuXG4gICAgICAgIGNvbnN0IHQgPSBkMy5zY2FsZUxpbmVhcigpXG4gICAgICAgICAgICAuZG9tYWluKFtcbiAgICAgICAgICAgICAgICBkMy5taW4oc3VtbWFyaWVzLm1hcChzID0+IHMubWluKSksXG4gICAgICAgICAgICAgICAgZDMubWF4KHN1bW1hcmllcy5tYXAocyA9PiBNYXRoLm1pbihzLm1heCwgcy5xMiArIDMgKiBzLmlxcikpKVxuICAgICAgICAgICAgXSlcbiAgICAgICAgICAgIC5yYW5nZShbaGVpZ2h0LCAwXSlcbiAgICAgICAgICAgIC5jbGFtcCh0cnVlKVxuICAgICAgICAgICAgLm5pY2UoKTtcblxuICAgICAgICBjb25zdCBiID0gZDMuc2NhbGVCYW5kKClcbiAgICAgICAgICAgIC5kb21haW4odGhpcy5wcm9wcy52ZXJzaW9ucy5tYXAodiA9PiB2Lm5hbWUpKVxuICAgICAgICAgICAgLnJhbmdlKFtrZGVXaWR0aCArIDIwLCB3aWR0aF0pXG4gICAgICAgICAgICAucGFkZGluZ091dGVyKDAuMTUpXG4gICAgICAgICAgICAucGFkZGluZ0lubmVyKDAuMyk7XG5cbiAgICAgICAgY29uc3QgdmVyc2lvbnMgPSB0aGlzLnByb3BzLnZlcnNpb25zLm1hcCh2ID0+ICh7XG4gICAgICAgICAgICBuYW1lOiB2Lm5hbWUsXG4gICAgICAgICAgICBzYW1wbGVzOiB2LnNhbXBsZXMsXG4gICAgICAgICAgICBzdW1tYXJ5OiB2LnN1bW1hcnksXG4gICAgICAgICAgICBkZW5zaXR5OiBrZGUodi5zYW1wbGVzLCB2LnN1bW1hcnksIHQudGlja3MoNTApKVxuICAgICAgICB9KSk7XG5cbiAgICAgICAgY29uc3QgcCA9IGQzLnNjYWxlTGluZWFyKClcbiAgICAgICAgICAgIC5kb21haW4oWzAsIGQzLm1heCh2ZXJzaW9ucy5tYXAodiA9PiBkMy5tYXgodi5kZW5zaXR5LCBkID0+IGRbMV0pKSldKVxuICAgICAgICAgICAgLnJhbmdlKFswLCBrZGVXaWR0aF0pO1xuXG4gICAgICAgIGNvbnN0IGxpbmUgPSBkMy5saW5lKClcbiAgICAgICAgICAgIC5jdXJ2ZShkMy5jdXJ2ZUJhc2lzKVxuICAgICAgICAgICAgLnkoZCA9PiB0KGRbMF0pKVxuICAgICAgICAgICAgLngoZCA9PiBwKGRbMV0pKTtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHN2Z1xuICAgICAgICAgICAgICAgIHdpZHRoPVwiMTAwJVwiXG4gICAgICAgICAgICAgICAgaGVpZ2h0PXtoZWlnaHQgKyBtYXJnaW4udG9wICsgbWFyZ2luLmJvdHRvbX1cbiAgICAgICAgICAgICAgICBzdHlsZT17e292ZXJmbG93OiAndmlzaWJsZSd9fVxuICAgICAgICAgICAgICAgIHJlZj17KHJlZikgPT4geyB0aGlzLnJlZiA9IHJlZjsgfX0+XG4gICAgICAgICAgICAgICAgPGRlZnM+XG4gICAgICAgICAgICAgICAgICAgIDxnIGlkPVwidXAtYXJyb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgtNiwgLTIpXCIgc3R5bGU9e3tzdHJva2U6IFwiaW5oZXJpdFwiLCBmaWxsOiBcImluaGVyaXRcIn19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZD1cIk0yLDEwIEw2LDIgTDEwLDEwXCI+PC9wYXRoPlxuICAgICAgICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICAgICAgPC9kZWZzPlxuICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT17YHRyYW5zbGF0ZSgke21hcmdpbi5sZWZ0fSwke21hcmdpbi50b3B9KWB9PlxuICAgICAgICAgICAgICAgICAgICA8QXhpcyBvcmllbnRhdGlvbj1cImJvdHRvbVwiIHNjYWxlPXtwfSB0aWNrcz17WzIsIFwiJVwiXX0gdHJhbnNmb3JtPXtgdHJhbnNsYXRlKDAsJHtoZWlnaHR9KWB9PlxuICAgICAgICAgICAgICAgICAgICA8L0F4aXM+XG4gICAgICAgICAgICAgICAgICAgIDxBeGlzIG9yaWVudGF0aW9uPVwibGVmdFwiIHNjYWxlPXt0fSB0aWNrRm9ybWF0PXtmb3JtYXRTYW1wbGV9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRleHQgZmlsbD0nIzAwMCcgdGV4dEFuY2hvcj1cImVuZFwiICB5PXs2fSB0cmFuc2Zvcm09XCJyb3RhdGUoLTkwKVwiIGR5PVwiLjcxZW1cIj5UaW1lIChtcyk8L3RleHQ+XG4gICAgICAgICAgICAgICAgICAgIDwvQXhpcz5cbiAgICAgICAgICAgICAgICAgICAge3ZlcnNpb25zLm1hcCgodiwgaSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHYuc2FtcGxlcy5sZW5ndGggPT09IDApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGJhbmR3aWR0aCA9IGIuYmFuZHdpZHRoKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjb2xvciA9IHZlcnNpb25Db2xvcih2Lm5hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2NhbGUgPSBkMy5zY2FsZUxpbmVhcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRvbWFpbihbMCwgdi5zYW1wbGVzLmxlbmd0aF0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJhbmdlKFswLCBiYW5kd2lkdGhdKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lYW4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJpbW1lZE1lYW4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcTEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcTIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcTMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWluLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1heCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmdtaW4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJnbWF4XG4gICAgICAgICAgICAgICAgICAgICAgICB9ID0gdi5zdW1tYXJ5O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0TWF4ID0gdC5kb21haW4oKVsxXTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDxnIGtleT17aX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsbD1cIm5vbmVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJva2U9e2NvbG9yfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJva2VXaWR0aD17Mn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3Ryb2tlT3BhY2l0eT17MC43fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkPXtsaW5lKHYuZGVuc2l0eSl9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGcgdHJhbnNmb3JtPXtgdHJhbnNsYXRlKCR7Yih2Lm5hbWUpfSwwKWB9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7di5zYW1wbGVzLm1hcCgoZCwgaSkgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxjaXJjbGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2l9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsbD17Y29sb3J9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3g9e3NjYWxlKGkpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN5PXt0KGQpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHI9e2kgPT09IGFyZ21pbiB8fCBpID09PSBhcmdtYXggPyAyIDogMX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxsT3BhY2l0eTogZCA8IHRNYXggPyAxIDogMFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7di5zYW1wbGVzLmZpbHRlcihkID0+IGQgPj0gdE1heClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXAoKGQsIGkpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVzZSBocmVmPVwiI3VwLWFycm93XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeD17c2NhbGUoaSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHk9e3QoZCl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJva2U6Y29sb3IsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJva2VXaWR0aDogaSA9PT0gYXJnbWluIHx8IGkgPT09IGFyZ21heCA/IDIgOiAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsbDogJ3JnYmEoMjAwLCAwLCAwLCAwLjUpJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpbmUgLy8gcXVhcnRpbGVzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4MT17YmFuZHdpZHRoIC8gMn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHgyPXtiYW5kd2lkdGggLyAyfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeTE9e3QocTEpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeTI9e3QocTMpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3Ryb2tlPXtjb2xvcn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0cm9rZVdpZHRoPXtiYW5kd2lkdGh9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJva2VPcGFjaXR5PXswLjV9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaW5lIC8vIG1lZGlhblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeDE9e2JhbmR3aWR0aCAvIDJ9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4Mj17YmFuZHdpZHRoIC8gMn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHkxPXt0KHEyKSAtIDAuNX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHkyPXt0KHEyKSArIDAuNX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0cm9rZT17Y29sb3J9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJva2VXaWR0aD17YmFuZHdpZHRofVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3Ryb2tlT3BhY2l0eT17MX0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVzZSBocmVmPVwiI3VwLWFycm93XCIgLy8gbWVhblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgc3Ryb2tlOiBjb2xvciwgZmlsbDogY29sb3IsIGZpbGxPcGFjaXR5OiAwLjQgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybT17bWVhbiA+PSB0TWF4ID8gJ3RyYW5zbGF0ZSgtMTAsIDApJyA6IGB0cmFuc2xhdGUoLTUsICR7dChtZWFuKX0pIHJvdGF0ZSg5MClgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeD17MH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHk9ezB9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1c2UgaHJlZj1cIiN1cC1hcnJvd1wiIC8vIHRyaW1tZWQgbWVhblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgc3Ryb2tlOiBjb2xvciwgZmlsbDogY29sb3IgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybT17YHRyYW5zbGF0ZSgtNSwgJHt0KHRyaW1tZWRNZWFuKX0pIHJvdGF0ZSg5MClgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeD17MH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHk9ezB9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtbbWVhbiwgdHJpbW1lZE1lYW5dLm1hcChkID0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGV4dCAvLyBsZWZ0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR4PXstMTZ9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHk9Jy4zZW0nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeD17MH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB5PXt0KGQpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHRBbmNob3I9J2VuZCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb250U2l6ZT17MTB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9udEZhbWlseT0nc2Fucy1zZXJpZic+e2Zvcm1hdFNhbXBsZShkKX08L3RleHQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtbW2FyZ21pbiwgbWluXSwgW2FyZ21heCwgbWF4XV0ubWFwKChkLCBpKSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRleHQgLy8gZXh0ZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR4PXswfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR5PXtpID09PSAwID8gJzEuM2VtJyA6ICctMC43ZW0nfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHg9e3NjYWxlKGRbMF0pfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHk9e3QoZFsxXSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dEFuY2hvcj0nbWlkZGxlJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRTaXplPXsxMH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb250RmFtaWx5PSdzYW5zLXNlcmlmJz57Zm9ybWF0U2FtcGxlKGRbMV0pfTwvdGV4dD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1txMSwgcTIsIHEzXS5tYXAoKGQsIGkpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGV4dCAvLyByaWdodFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17aX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkeD17Nn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkeT0nLjNlbSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4PXtiYW5kd2lkdGh9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeT17dChkKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0QW5jaG9yPSdzdGFydCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb250U2l6ZT17MTB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9udEZhbWlseT0nc2Fucy1zZXJpZic+e2Zvcm1hdFNhbXBsZShkKX08L3RleHQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9nPjtcbiAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyB3aWR0aDogdGhpcy5yZWYuY2xpZW50V2lkdGggfSk7XG4gICAgfVxufVxuXG5jbGFzcyBSZWdyZXNzaW9uUGxvdCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuICAgICAgICB0aGlzLnN0YXRlID0ge3dpZHRoOiAxMDB9O1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3QgbWFyZ2luID0ge3RvcDogMTAsIHJpZ2h0OiAyMCwgYm90dG9tOiAzMCwgbGVmdDogMH07XG4gICAgICAgIGNvbnN0IHdpZHRoID0gdGhpcy5zdGF0ZS53aWR0aCAtIG1hcmdpbi5sZWZ0IC0gbWFyZ2luLnJpZ2h0O1xuICAgICAgICBjb25zdCBoZWlnaHQgPSAyMDAgLSBtYXJnaW4udG9wIC0gbWFyZ2luLmJvdHRvbTtcbiAgICAgICAgY29uc3QgdmVyc2lvbnMgPSB0aGlzLnByb3BzLnZlcnNpb25zLmZpbHRlcih2ZXJzaW9uID0+IHZlcnNpb24ucmVncmVzc2lvbik7XG5cbiAgICAgICAgY29uc3QgeCA9IGQzLnNjYWxlTGluZWFyKClcbiAgICAgICAgICAgIC5kb21haW4oWzAsIGQzLm1heCh2ZXJzaW9ucy5tYXAodmVyc2lvbiA9PiBkMy5tYXgodmVyc2lvbi5yZWdyZXNzaW9uLmRhdGEsIGQgPT4gZFswXSkpKV0pXG4gICAgICAgICAgICAucmFuZ2UoWzAsIHdpZHRoXSlcbiAgICAgICAgICAgIC5uaWNlKCk7XG5cbiAgICAgICAgY29uc3QgeSA9IGQzLnNjYWxlTGluZWFyKClcbiAgICAgICAgICAgIC5kb21haW4oWzAsIGQzLm1heCh2ZXJzaW9ucy5tYXAodmVyc2lvbiA9PiBkMy5tYXgodmVyc2lvbi5yZWdyZXNzaW9uLmRhdGEsIGQgPT4gZFsxXSkpKV0pXG4gICAgICAgICAgICAucmFuZ2UoW2hlaWdodCwgMF0pXG4gICAgICAgICAgICAubmljZSgpO1xuXG4gICAgICAgIGNvbnN0IGxpbmUgPSBkMy5saW5lKClcbiAgICAgICAgICAgIC54KGQgPT4geChkWzBdKSlcbiAgICAgICAgICAgIC55KGQgPT4geShkWzFdKSk7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxzdmdcbiAgICAgICAgICAgICAgICB3aWR0aD1cIjEwMCVcIlxuICAgICAgICAgICAgICAgIGhlaWdodD17aGVpZ2h0ICsgbWFyZ2luLnRvcCArIG1hcmdpbi5ib3R0b219XG4gICAgICAgICAgICAgICAgc3R5bGU9e3tvdmVyZmxvdzogJ3Zpc2libGUnfX1cbiAgICAgICAgICAgICAgICByZWY9eyhyZWYpID0+IHsgdGhpcy5yZWYgPSByZWY7IH19PlxuICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT17YHRyYW5zbGF0ZSgke21hcmdpbi5sZWZ0fSwke21hcmdpbi50b3B9KWB9PlxuICAgICAgICAgICAgICAgICAgICA8QXhpcyBvcmllbnRhdGlvbj1cImJvdHRvbVwiIHNjYWxlPXt4fSB0cmFuc2Zvcm09e2B0cmFuc2xhdGUoMCwke2hlaWdodH0pYH0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGV4dCBmaWxsPScjMDAwJyB0ZXh0QW5jaG9yPVwiZW5kXCIgeT17LTZ9IHg9e3dpZHRofT5JdGVyYXRpb25zPC90ZXh0PlxuICAgICAgICAgICAgICAgICAgICA8L0F4aXM+XG4gICAgICAgICAgICAgICAgICAgIDxBeGlzIG9yaWVudGF0aW9uPVwibGVmdFwiIHNjYWxlPXt5fSB0aWNrcz17NH0gdGlja0Zvcm1hdD17Zm9ybWF0U2FtcGxlfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZXh0IGZpbGw9JyMwMDAnIHRleHRBbmNob3I9XCJlbmRcIiAgeT17Nn0gdHJhbnNmb3JtPVwicm90YXRlKC05MClcIiBkeT1cIi43MWVtXCI+VGltZSAobXMpPC90ZXh0PlxuICAgICAgICAgICAgICAgICAgICA8L0F4aXM+XG4gICAgICAgICAgICAgICAgICAgIHt2ZXJzaW9ucy5tYXAoKHYsIGkpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Z1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17aX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxsPXt2ZXJzaW9uQ29sb3Iodi5uYW1lKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxsLW9wYWNpdHk9XCIwLjdcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7di5yZWdyZXNzaW9uLmRhdGEubWFwKChbYSwgYl0sIGkpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxjaXJjbGUga2V5PXtpfSByPVwiMlwiIGN4PXt4KGEpfSBjeT17eShiKX0vPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3Ryb2tlPXt2ZXJzaW9uQ29sb3Iodi5uYW1lKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3Ryb2tlV2lkdGg9ezF9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0cm9rZU9wYWNpdHk9ezAuNX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZD17bGluZSh2LnJlZ3Jlc3Npb24uZGF0YS5tYXAoZCA9PiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkWzBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZFswXSAqIHYucmVncmVzc2lvbi5zbG9wZSArIHYucmVncmVzc2lvbi5pbnRlcmNlcHRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSkpfSAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICApO1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgd2lkdGg6IHRoaXMucmVmLmNsaWVudFdpZHRoIH0pO1xuICAgIH1cbn1cblxuY2xhc3MgQmVuY2htYXJrU3RhdGlzdGljIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHN3aXRjaCAodGhpcy5wcm9wcy5zdGF0dXMpIHtcbiAgICAgICAgY2FzZSAnd2FpdGluZyc6XG4gICAgICAgICAgICByZXR1cm4gPHAgY2xhc3NOYW1lPVwicXVpZXRcIj48L3A+O1xuICAgICAgICBjYXNlICdydW5uaW5nJzpcbiAgICAgICAgICAgIHJldHVybiA8cD5SdW5uaW5nLi4uPC9wPjtcbiAgICAgICAgY2FzZSAnZXJyb3InOlxuICAgICAgICAgICAgcmV0dXJuIDxwPnt0aGlzLnByb3BzLmVycm9yLm1lc3NhZ2V9PC9wPjtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb3BzLnN0YXRpc3RpYyh0aGlzLnByb3BzKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuY2xhc3MgQmVuY2htYXJrUm93IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IGVuZGVkQ291bnQgPSB0aGlzLnByb3BzLnZlcnNpb25zLmZpbHRlcih2ZXJzaW9uID0+IHZlcnNpb24uc3RhdHVzID09PSAnZW5kZWQnKS5sZW5ndGg7XG5cbiAgICAgICAgbGV0IG1hc3RlcjtcbiAgICAgICAgbGV0IGN1cnJlbnQ7XG4gICAgICAgIGlmICgvbWFzdGVyLy50ZXN0KHRoaXMucHJvcHMudmVyc2lvbnNbMF0ubmFtZSkpIHtcbiAgICAgICAgICAgIFttYXN0ZXIsIGN1cnJlbnRdID0gdGhpcy5wcm9wcy52ZXJzaW9ucztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIFtjdXJyZW50LCBtYXN0ZXJdID0gdGhpcy5wcm9wcy52ZXJzaW9ucztcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBjaGFuZ2UgPSAnJztcbiAgICAgICAgbGV0IHBJbmZlcmlvcml0eSA9ICcnO1xuICAgICAgICBpZiAoZW5kZWRDb3VudCA9PT0gMikge1xuICAgICAgICAgICAgY29uc3QgZGVsdGEgPSBjdXJyZW50LnN1bW1hcnkudHJpbW1lZE1lYW4gLSBtYXN0ZXIuc3VtbWFyeS50cmltbWVkTWVhbjtcbiAgICAgICAgICAgIC8vIFVzZSBcIkNvaGVuJ3MgZFwiIChtb2RpZmllZCB0byB1c2VkIHRoZSB0cmltbWVkIG1lYW4vc2QpIHRvIGRlY2lkZVxuICAgICAgICAgICAgLy8gaG93IG11Y2ggdG8gZW1waGFzaXplIGRpZmZlcmVuY2UgYmV0d2VlbiBtZWFuc1xuICAgICAgICAgICAgLy8gaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvRWZmZWN0X3NpemUjQ29oZW4uMjdzX2RcbiAgICAgICAgICAgIGNvbnN0IHBvb2xlZERldmlhdGlvbiA9IE1hdGguc3FydChcbiAgICAgICAgICAgICAgICAoXG4gICAgICAgICAgICAgICAgICAgIChtYXN0ZXIuc2FtcGxlcy5sZW5ndGggLSAxKSAqIE1hdGgucG93KG1hc3Rlci5zdW1tYXJ5LndpbmRzb3JpemVkRGV2aWF0aW9uLCAyKSArXG4gICAgICAgICAgICAgICAgICAgIChjdXJyZW50LnNhbXBsZXMubGVuZ3RoIC0gMSkgKiBNYXRoLnBvdyhjdXJyZW50LnN1bW1hcnkud2luZHNvcml6ZWREZXZpYXRpb24sIDIpXG4gICAgICAgICAgICAgICAgKSAvXG4gICAgICAgICAgICAgICAgKG1hc3Rlci5zYW1wbGVzLmxlbmd0aCArIGN1cnJlbnQuc2FtcGxlcy5sZW5ndGggLSAyKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGNvbnN0IGQgPSBkZWx0YSAvIHBvb2xlZERldmlhdGlvbjtcblxuICAgICAgICAgICAgY29uc3Qge3N1cGVyaW9yLCBpbmZlcmlvcn0gPSBwcm9iYWJpbGl0aWVzT2ZTdXBlcmlvcml0eShtYXN0ZXIuc2FtcGxlcywgY3VycmVudC5zYW1wbGVzKTtcblxuICAgICAgICAgICAgY2hhbmdlID0gPHNwYW4gY2xhc3NOYW1lPXtkIDwgMC4yID8gJ3F1aWV0JyA6IGQgPCAxLjUgPyAnJyA6ICdzdHJvbmcnfT4oXG4gICAgICAgICAgICAgICAge2RlbHRhID4gMCA/ICcrJyA6ICcnfXtmb3JtYXRTYW1wbGUoZGVsdGEpfSBtcyAvIHtkLnRvRml4ZWQoMSl9IHN0ZCBkZXZzXG4gICAgICAgICAgICApPC9zcGFuPjtcblxuICAgICAgICAgICAgY29uc3QgY29tcGFyaXNvbiA9IGluZmVyaW9yID4gc3VwZXJpb3IgPyAnU0xPV0VSJyA6ICdmYXN0ZXInO1xuICAgICAgICAgICAgY29uc3QgcHJvYmFiaWxpdHkgPSBNYXRoLm1heChpbmZlcmlvciwgc3VwZXJpb3IpO1xuICAgICAgICAgICAgcEluZmVyaW9yaXR5ID0gPHAgY2xhc3NOYW1lPXtgY2VudGVyICR7cHJvYmFiaWxpdHkgPiAwLjkwID8gJ3N0cm9uZycgOiAncXVpZXQnfWB9PlxuICAgICAgICAgICAgICAgIHsocHJvYmFiaWxpdHkgKiAxMDApLnRvRml4ZWQoMCl9JVxuICAgICAgICAgICAgICAgIGNoYW5jZSB0aGF0IGEgcmFuZG9tIDxzdmcgd2lkdGg9ezh9IGhlaWdodD17OH0+PGNpcmNsZSBmaWxsPXt2ZXJzaW9uQ29sb3IoY3VycmVudC5uYW1lKX0gY3g9ezR9IGN5PXs0fSByPXs0fSAvPjwvc3ZnPiBzYW1wbGUgaXNcbiAgICAgICAgICAgICAgICB7Y29tcGFyaXNvbn0gdGhhbiBhIHJhbmRvbSA8c3ZnIHdpZHRoPXs4fSBoZWlnaHQ9ezh9PjxjaXJjbGUgZmlsbD17dmVyc2lvbkNvbG9yKG1hc3Rlci5uYW1lKX0gY3g9ezR9IGN5PXs0fSByPXs0fSAvPjwvc3ZnPiBzYW1wbGUuXG4gICAgICAgICAgICA8L3A+O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sMTIgY2xlYXJmaXggc3BhY2UtYm90dG9tXCI+XG4gICAgICAgICAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT1cImZpeGVkIHNwYWNlLWJvdHRvbVwiPlxuICAgICAgICAgICAgICAgICAgICA8dHI+PHRoPjxoMiBjbGFzc05hbWU9XCJjb2w0XCI+PGEgaHJlZj17YCMke3RoaXMucHJvcHMubmFtZX1gfSBvbkNsaWNrPXt0aGlzLnJlbG9hZH0+e3RoaXMucHJvcHMubmFtZX08L2E+PC9oMj48L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMudmVyc2lvbnMubWFwKHZlcnNpb24gPT4gPHRoIHN0eWxlPXt7Y29sb3I6IHZlcnNpb25Db2xvcih2ZXJzaW9uLm5hbWUpfX0ga2V5PXt2ZXJzaW9uLm5hbWV9Pnt2ZXJzaW9uLm5hbWV9PC90aD4pfTwvdHI+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlclN0YXRpc3RpYygnKDIwJSB0cmltbWVkKSBNZWFuJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICh2ZXJzaW9uKSA9PiA8cD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Zm9ybWF0U2FtcGxlKHZlcnNpb24uc3VtbWFyeS50cmltbWVkTWVhbil9IG1zXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2N1cnJlbnQgJiYgdmVyc2lvbi5uYW1lID09PSBjdXJyZW50Lm5hbWUgJiYgY2hhbmdlfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9wPil9XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlclN0YXRpc3RpYygnKFdpbmRzb3JpemVkKSBEZXZpYXRpb24nLFxuICAgICAgICAgICAgICAgICAgICAgICAgKHZlcnNpb24pID0+IDxwPntmb3JtYXRTYW1wbGUodmVyc2lvbi5zdW1tYXJ5LndpbmRzb3JpemVkRGV2aWF0aW9uKX0gbXM8L3A+KX1cbiAgICAgICAgICAgICAgICAgICAge3RoaXMucmVuZGVyU3RhdGlzdGljKCdSwrIgU2xvcGUgLyBDb3JyZWxhdGlvbicsXG4gICAgICAgICAgICAgICAgICAgICAgICAodmVyc2lvbikgPT4gPHA+e2Zvcm1hdFNhbXBsZSh2ZXJzaW9uLnJlZ3Jlc3Npb24uc2xvcGUpfSBtcyAvIHt2ZXJzaW9uLnJlZ3Jlc3Npb24uY29ycmVsYXRpb24udG9GaXhlZCgzKX0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZlcnNpb24ucmVncmVzc2lvbi5jb3JyZWxhdGlvbiA8IDAuOSA/ICdcXHUyNjIwXFx1RkUwRicgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZlcnNpb24ucmVncmVzc2lvbi5jb3JyZWxhdGlvbiA8IDAuOTkgPyAnXFx1MjZBMFxcdUZFMEYnIDogJyd9PC9wPil9XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlclN0YXRpc3RpYygnTWluaW11bScsXG4gICAgICAgICAgICAgICAgICAgICAgICAodmVyc2lvbikgPT4gPHA+e2Zvcm1hdFNhbXBsZSh2ZXJzaW9uLnN1bW1hcnkubWluKX0gbXM8L3A+KX1cbiAgICAgICAgICAgICAgICAgICAge3BJbmZlcmlvcml0eSAmJiA8dHI+PHRkIGNvbHNwYW49ezN9PntwSW5mZXJpb3JpdHl9PC90ZD48L3RyPn1cbiAgICAgICAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICAgICAgICAgIHtlbmRlZENvdW50ID4gMCAmJiA8U3RhdGlzdGljc1Bsb3QgdmVyc2lvbnM9e3RoaXMucHJvcHMudmVyc2lvbnN9Lz59XG4gICAgICAgICAgICAgICAge2VuZGVkQ291bnQgPiAwICYmIDxSZWdyZXNzaW9uUGxvdCB2ZXJzaW9ucz17dGhpcy5wcm9wcy52ZXJzaW9uc30vPn1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlclN0YXRpc3RpYyh0aXRsZSwgc3RhdGlzdGljKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgPHRoPnt0aXRsZX08L3RoPlxuICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLnZlcnNpb25zLm1hcCh2ZXJzaW9uID0+XG4gICAgICAgICAgICAgICAgICAgIDx0ZCBrZXk9e3ZlcnNpb24ubmFtZX0+PEJlbmNobWFya1N0YXRpc3RpYyBzdGF0aXN0aWM9e3N0YXRpc3RpY30gey4uLnZlcnNpb259Lz48L3RkPlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8L3RyPlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbG9hZCgpIHtcbiAgICAgICAgbG9jYXRpb24ucmVsb2FkKCk7XG4gICAgfVxufVxuXG5jbGFzcyBCZW5jaG1hcmtzVGFibGUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtzaGFyaW5nOiBmYWxzZX07XG4gICAgICAgIHRoaXMuc2hhcmUgPSB0aGlzLnNoYXJlLmJpbmQodGhpcyk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBzdHlsZT17e3dpZHRoOiA5NjAsIG1hcmdpbjogJzJlbSBhdXRvJ319PlxuICAgICAgICAgICAgICAgIHt0aGlzLnN0YXRlLnNoYXJpbmcgJiYgPHNwYW4gY2xhc3NOYW1lPSdsb2FkaW5nJz48L3NwYW4+fVxuICAgICAgICAgICAgICAgIDxoMSBjbGFzc05hbWU9XCJzcGFjZS1ib3R0b20xXCI+TWFwYm94IEdMIEpTIEJlbmNobWFya3Mg4oCTIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5maW5pc2hlZCA/XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5GaW5pc2hlZCA8YnV0dG9uIGNsYXNzTmFtZT0nYnV0dG9uIGZyIGljb24gc2hhcmUnIG9uQ2xpY2s9e3RoaXMuc2hhcmV9PlNoYXJlPC9idXR0b24+PC9zcGFuPiA6XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5SdW5uaW5nPC9zcGFuPn08L2gxPlxuICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmJlbmNobWFya3MubWFwKGJlbmNobWFyayA9PiA8QmVuY2htYXJrUm93IGtleT17YmVuY2htYXJrLm5hbWV9IHsuLi5iZW5jaG1hcmt9Lz4pfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgc2hhcmUoKSB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ3NjcmlwdCcpLmZvckVhY2goZSA9PiBlLnJlbW92ZSgpKTtcbiAgICAgICAgY29uc3Qgc2hhcmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2hhcmUnKTtcbiAgICAgICAgc2hhcmUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcblxuICAgICAgICBjb25zdCBib2R5ID0gSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgXCJwdWJsaWNcIjogdHJ1ZSxcbiAgICAgICAgICAgIFwiZmlsZXNcIjoge1xuICAgICAgICAgICAgICAgIFwiaW5kZXguaHRtbFwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwiY29udGVudFwiOiBkb2N1bWVudC5ib2R5LnBhcmVudEVsZW1lbnQub3V0ZXJIVE1MXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7c2hhcmluZzogdHJ1ZX0pO1xuXG4gICAgICAgIGZldGNoKCdodHRwczovL2FwaS5naXRodWIuY29tL2dpc3RzJywgeyBtZXRob2Q6ICdQT1NUJywgYm9keSB9KVxuICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgICAgICAgICAgLnRoZW4oanNvbiA9PiB7IHdpbmRvdy5sb2NhdGlvbiA9IGBodHRwczovL2JsLm9ja3Mub3JnL2Fub255bW91cy9yYXcvJHtqc29uLmlkfS9gOyB9KTtcbiAgICB9XG59XG5cbmNvbnN0IHZlcnNpb25zID0gd2luZG93Lm1hcGJveGdsVmVyc2lvbnM7XG5jb25zdCBiZW5jaG1hcmtzID0gW107XG5jb25zdCBmaWx0ZXIgPSB3aW5kb3cubG9jYXRpb24uaGFzaC5zdWJzdHIoMSk7XG5cbmxldCBmaW5pc2hlZCA9IGZhbHNlO1xubGV0IHByb21pc2UgPSBQcm9taXNlLnJlc29sdmUoKTtcblxuZm9yIChjb25zdCBuYW1lIGluIHdpbmRvdy5tYXBib3hnbEJlbmNobWFya3MpIHtcbiAgICBpZiAoZmlsdGVyICYmIG5hbWUgIT09IGZpbHRlcilcbiAgICAgICAgY29udGludWU7XG5cbiAgICBjb25zdCBiZW5jaG1hcmsgPSB7IG5hbWUsIHZlcnNpb25zOiBbXSB9O1xuICAgIGJlbmNobWFya3MucHVzaChiZW5jaG1hcmspO1xuXG4gICAgZm9yIChjb25zdCB2ZXIgaW4gd2luZG93Lm1hcGJveGdsQmVuY2htYXJrc1tuYW1lXSkge1xuICAgICAgICBjb25zdCB2ZXJzaW9uID0ge1xuICAgICAgICAgICAgbmFtZTogdmVyLFxuICAgICAgICAgICAgc3RhdHVzOiAnd2FpdGluZycsXG4gICAgICAgICAgICBsb2dzOiBbXSxcbiAgICAgICAgICAgIHNhbXBsZXM6IFtdLFxuICAgICAgICAgICAgc3VtbWFyeToge31cbiAgICAgICAgfTtcblxuICAgICAgICBiZW5jaG1hcmsudmVyc2lvbnMucHVzaCh2ZXJzaW9uKTtcblxuICAgICAgICBwcm9taXNlID0gcHJvbWlzZS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHZlcnNpb24uc3RhdHVzID0gJ3J1bm5pbmcnO1xuICAgICAgICAgICAgdXBkYXRlKCk7XG5cbiAgICAgICAgICAgIHJldHVybiB3aW5kb3cubWFwYm94Z2xCZW5jaG1hcmtzW25hbWVdW3Zlcl0ucnVuKClcbiAgICAgICAgICAgICAgICAudGhlbihtZWFzdXJlbWVudHMgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvLyBzY2FsZSBtZWFzdXJlbWVudHMgZG93biBieSBpdGVyYXRpb24gY291bnQsIHNvIHRoYXRcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhleSByZXByZXNlbnQgKGF2ZXJhZ2UpIHRpbWUgZm9yIGEgc2luZ2xlIGl0ZXJhdGlvblxuICAgICAgICAgICAgICAgICAgICBjb25zdCBzYW1wbGVzID0gbWVhc3VyZW1lbnRzLm1hcCgoe3RpbWUsIGl0ZXJhdGlvbnN9KSA9PiB0aW1lIC8gaXRlcmF0aW9ucyk7XG4gICAgICAgICAgICAgICAgICAgIHZlcnNpb24uc3RhdHVzID0gJ2VuZGVkJztcbiAgICAgICAgICAgICAgICAgICAgdmVyc2lvbi5zYW1wbGVzID0gc2FtcGxlcztcbiAgICAgICAgICAgICAgICAgICAgdmVyc2lvbi5zdW1tYXJ5ID0gc3VtbWFyeVN0YXRpc3RpY3Moc2FtcGxlcyk7XG4gICAgICAgICAgICAgICAgICAgIHZlcnNpb24ucmVncmVzc2lvbiA9IHJlZ3Jlc3Npb24obWVhc3VyZW1lbnRzKTtcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlKCk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgICAgICB2ZXJzaW9uLnN0YXR1cyA9ICdlcnJvcmVkJztcbiAgICAgICAgICAgICAgICAgICAgdmVyc2lvbi5lcnJvciA9IGVycm9yO1xuICAgICAgICAgICAgICAgICAgICB1cGRhdGUoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5wcm9taXNlID0gcHJvbWlzZS50aGVuKCgpID0+IHtcbiAgICBmaW5pc2hlZCA9IHRydWU7XG4gICAgdXBkYXRlKCk7XG59KTtcblxuZnVuY3Rpb24gdXBkYXRlKCkge1xuICAgIFJlYWN0RE9NLnJlbmRlcihcbiAgICAgICAgPEJlbmNobWFya3NUYWJsZSB2ZXJzaW9ucz17dmVyc2lvbnN9IGJlbmNobWFya3M9e2JlbmNobWFya3N9IGZpbmlzaGVkPXtmaW5pc2hlZH0vPixcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JlbmNobWFya3MnKVxuICAgICk7XG59XG5cbiIsIlxuZnVuY3Rpb24gaWRlbnRpdHkoeCkge1xuICAgIHJldHVybiB4O1xufVxuXG5mdW5jdGlvbiB0cmFuc2xhdGVYKHgpIHtcbiAgICByZXR1cm4gYHRyYW5zbGF0ZSgke3ggKyAwLjV9LDApYDtcbn1cblxuZnVuY3Rpb24gdHJhbnNsYXRlWSh5KSB7XG4gICAgcmV0dXJuIGB0cmFuc2xhdGUoMCwke3kgKyAwLjV9KWA7XG59XG5cbmZ1bmN0aW9uIG51bWJlcihzY2FsZSkge1xuICAgIHJldHVybiBmdW5jdGlvbihkKSB7XG4gICAgICAgIHJldHVybiArc2NhbGUoZCk7XG4gICAgfTtcbn1cblxuZnVuY3Rpb24gY2VudGVyKHNjYWxlKSB7XG4gICAgbGV0IG9mZnNldCA9IE1hdGgubWF4KDAsIHNjYWxlLmJhbmR3aWR0aCgpIC0gMSkgLyAyOyAvLyBBZGp1c3QgZm9yIDAuNXB4IG9mZnNldC5cbiAgICBpZiAoc2NhbGUucm91bmQoKSkgb2Zmc2V0ID0gTWF0aC5yb3VuZChvZmZzZXQpO1xuICAgIHJldHVybiBmdW5jdGlvbihkKSB7XG4gICAgICAgIHJldHVybiArc2NhbGUoZCkgKyBvZmZzZXQ7XG4gICAgfTtcbn1cblxuY2xhc3MgQXhpcyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCBzY2FsZSA9IHRoaXMucHJvcHMuc2NhbGU7XG4gICAgICAgIGNvbnN0IG9yaWVudCA9IHRoaXMucHJvcHMub3JpZW50YXRpb24gfHwgJ2xlZnQnO1xuICAgICAgICBjb25zdCB0aWNrQXJndW1lbnRzID0gdGhpcy5wcm9wcy50aWNrcyA/IFtdLmNvbmNhdCh0aGlzLnByb3BzLnRpY2tzKSA6IFtdO1xuICAgICAgICBjb25zdCB0aWNrVmFsdWVzID0gdGhpcy5wcm9wcy50aWNrVmFsdWVzIHx8IG51bGw7XG4gICAgICAgIGNvbnN0IHRpY2tGb3JtYXQgPSB0aGlzLnByb3BzLnRpY2tGb3JtYXQgfHwgbnVsbDtcbiAgICAgICAgY29uc3QgdGlja1NpemVJbm5lciA9IHRoaXMucHJvcHMudGlja1NpemUgfHwgdGhpcy5wcm9wcy50aWNrU2l6ZUlubmVyIHx8IDY7XG4gICAgICAgIGNvbnN0IHRpY2tTaXplT3V0ZXIgPSB0aGlzLnByb3BzLnRpY2tTaXplIHx8IHRoaXMucHJvcHMudGlja1NpemVPdXRlciB8fCA2O1xuICAgICAgICBjb25zdCB0aWNrUGFkZGluZyA9IHRoaXMucHJvcHMudGlja1BhZGRpbmcgfHwgMztcblxuICAgICAgICBjb25zdCBrID0gb3JpZW50ID09PSAndG9wJyB8fCBvcmllbnQgPT09ICdsZWZ0JyA/IC0xIDogMTtcbiAgICAgICAgY29uc3QgeCA9IG9yaWVudCA9PT0gJ2xlZnQnIHx8IG9yaWVudCA9PT0gJ3JpZ2h0JyA/ICd4JyA6ICd5JztcbiAgICAgICAgY29uc3QgdHJhbnNmb3JtID0gb3JpZW50ID09PSAndG9wJyB8fCBvcmllbnQgPT09ICdib3R0b20nID8gdHJhbnNsYXRlWCA6IHRyYW5zbGF0ZVk7XG5cbiAgICAgICAgY29uc3QgdmFsdWVzID0gdGlja1ZhbHVlcyA9PSBudWxsID8gKHNjYWxlLnRpY2tzID8gc2NhbGUudGlja3MuYXBwbHkoc2NhbGUsIHRpY2tBcmd1bWVudHMpIDogc2NhbGUuZG9tYWluKCkpIDogdGlja1ZhbHVlcztcbiAgICAgICAgY29uc3QgZm9ybWF0ID0gdGlja0Zvcm1hdCA9PSBudWxsID8gKHNjYWxlLnRpY2tGb3JtYXQgPyBzY2FsZS50aWNrRm9ybWF0LmFwcGx5KHNjYWxlLCB0aWNrQXJndW1lbnRzKSA6IGlkZW50aXR5KSA6IHRpY2tGb3JtYXQ7XG4gICAgICAgIGNvbnN0IHNwYWNpbmcgPSBNYXRoLm1heCh0aWNrU2l6ZUlubmVyLCAwKSArIHRpY2tQYWRkaW5nO1xuICAgICAgICBjb25zdCByYW5nZSA9IHNjYWxlLnJhbmdlKCk7XG4gICAgICAgIGNvbnN0IHJhbmdlMCA9ICtyYW5nZVswXSArIDAuNTtcbiAgICAgICAgY29uc3QgcmFuZ2UxID0gK3JhbmdlW3JhbmdlLmxlbmd0aCAtIDFdICsgMC41O1xuICAgICAgICBjb25zdCBwb3NpdGlvbiA9IChzY2FsZS5iYW5kd2lkdGggPyBjZW50ZXIgOiBudW1iZXIpKHNjYWxlLmNvcHkoKSk7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxnXG4gICAgICAgICAgICAgICAgZmlsbD0nbm9uZSdcbiAgICAgICAgICAgICAgICBmb250U2l6ZT17MTB9XG4gICAgICAgICAgICAgICAgZm9udEZhbWlseT0nc2Fucy1zZXJpZidcbiAgICAgICAgICAgICAgICB0ZXh0QW5jaG9yPXtvcmllbnQgPT09ICdyaWdodCcgPyAnc3RhcnQnIDogb3JpZW50ID09PSAnbGVmdCcgPyAnZW5kJyA6ICdtaWRkbGUnfVxuICAgICAgICAgICAgICAgIHRyYW5zZm9ybT17dGhpcy5wcm9wcy50cmFuc2Zvcm19PlxuICAgICAgICAgICAgICAgIDxwYXRoXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT0nZG9tYWluJ1xuICAgICAgICAgICAgICAgICAgICBzdHJva2U9JyMwMDAnXG4gICAgICAgICAgICAgICAgICAgIGQ9e29yaWVudCA9PT0gJ2xlZnQnIHx8IG9yaWVudCA9PT0gJ3JpZ2h0JyA/XG4gICAgICAgICAgICAgICAgICAgICAgICBgTSR7ayAqIHRpY2tTaXplT3V0ZXJ9LCR7cmFuZ2UwfUgwLjVWJHtyYW5nZTF9SCR7ayAqIHRpY2tTaXplT3V0ZXJ9YCA6XG4gICAgICAgICAgICAgICAgICAgICAgICBgTSR7cmFuZ2UwfSwke2sgKiB0aWNrU2l6ZU91dGVyfVYwLjVIJHtyYW5nZTF9ViR7ayAqIHRpY2tTaXplT3V0ZXJ9YH0gLz5cbiAgICAgICAgICAgICAgICB7dmFsdWVzLm1hcCgoZCwgaSkgPT5cbiAgICAgICAgICAgICAgICAgICAgPGdcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleT17aX1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT0ndGljaydcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybT17dHJhbnNmb3JtKHBvc2l0aW9uKGQpKX0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bGluZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0cm9rZT0nIzAwMCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Li4ue1tgJHt4fTJgXTogayAqIHRpY2tTaXplSW5uZXJ9fS8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGV4dFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGw9JyMwMDAnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHk9e29yaWVudCA9PT0gJ3RvcCcgPyAnMGVtJyA6IG9yaWVudCA9PT0gJ2JvdHRvbScgPyAnMC43MWVtJyA6ICcwLjMyZW0nfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsuLi57W3hdOiBrICogc3BhY2luZ319Pntmb3JtYXQoZCl9PC90ZXh0PlxuICAgICAgICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cbiAgICAgICAgICAgIDwvZz5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQXhpcztcbiIsIlxuLyogZ2xvYmFsIGQzICovXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHN1bW1hcnlTdGF0aXN0aWNzLFxuICAgIHJlZ3Jlc3Npb24sXG4gICAga2RlLFxuICAgIHByb2JhYmlsaXRpZXNPZlN1cGVyaW9yaXR5XG59O1xuXG5mdW5jdGlvbiBwcm9iYWJpbGl0aWVzT2ZTdXBlcmlvcml0eShiZWZvcmUsIGFmdGVyKSB7XG4gICAgY29uc3QgdGltZXJQcmVjaXNpb24gPSAwLjAwNTtcblxuICAgIGxldCBzdXBlcmlvckNvdW50ID0gMDtcbiAgICBsZXQgaW5mZXJpb3JDb3VudCA9IDA7XG4gICAgbGV0IGVxdWFsQ291bnQgPSAwO1xuICAgIGxldCBOID0gMDtcbiAgICBmb3IgKGNvbnN0IGIgb2YgYmVmb3JlKSB7XG4gICAgICAgIGZvciAoY29uc3QgYSBvZiBhZnRlcikge1xuICAgICAgICAgICAgTisrO1xuICAgICAgICAgICAgaWYgKGIgLSBhID4gdGltZXJQcmVjaXNpb24pIHN1cGVyaW9yQ291bnQrKztcbiAgICAgICAgICAgIGVsc2UgaWYgKGEgLSBiID4gdGltZXJQcmVjaXNpb24pIGluZmVyaW9yQ291bnQrKztcbiAgICAgICAgICAgIGVsc2UgZXF1YWxDb3VudCsrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgc3VwZXJpb3I6IChzdXBlcmlvckNvdW50ICsgZXF1YWxDb3VudCkgLyBOLFxuICAgICAgICBpbmZlcmlvcjogKGluZmVyaW9yQ291bnQgKyBlcXVhbENvdW50KSAvIE5cbiAgICB9O1xufVxuXG5mdW5jdGlvbiBzdW1tYXJ5U3RhdGlzdGljcyhkYXRhKSB7XG4gICAgY29uc3QgdmFyaWFuY2UgPSBkMy52YXJpYW5jZShkYXRhKTtcbiAgICBjb25zdCBzb3J0ZWQgPSBkYXRhLnNsaWNlKCkuc29ydChkMy5hc2NlbmRpbmcpO1xuICAgIGNvbnN0IFtxMSwgcTIsIHEzXSA9IFsuMjUsIC41LCAuNzVdLm1hcCgoZCkgPT4gZDMucXVhbnRpbGUoc29ydGVkLCBkKSk7XG4gICAgY29uc3QgbWVhbiA9IGQzLm1lYW4oc29ydGVkKTtcbiAgICBsZXQgbWluID0gW05hTiwgSW5maW5pdHldO1xuICAgIGxldCBtYXggPSBbTmFOLCAtSW5maW5pdHldO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBzID0gZGF0YVtpXTtcbiAgICAgICAgaWYgKHMgPCBtaW5bMV0pIG1pbiA9IFtpLCBzXTtcbiAgICAgICAgaWYgKHMgPiBtYXhbMV0pIG1heCA9IFtpLCBzXTtcbiAgICB9XG5cbiAgICAvLyAyMCUgdHJpbW1lZCBtZWFuXG4gICAgY29uc3QgW2xvd2VyUXVpbnRpbGUsIHVwcGVyUXVpbnRpbGVdID0gWy4yLCAuOF0ubWFwKGQgPT4gZDMucXVhbnRpbGUoc29ydGVkLCBkKSk7XG4gICAgY29uc3QgdHJpbW1lZE1lYW4gPSBkMy5tZWFuKGRhdGEuZmlsdGVyKGQgPT4gZCA+PSBsb3dlclF1aW50aWxlICYmIGQgPD0gdXBwZXJRdWludGlsZSkpO1xuICAgIGNvbnN0IHdpbmRzb3JpemVkRGV2aWF0aW9uID0gZDMuZGV2aWF0aW9uKFxuICAgICAgICBkYXRhLm1hcChkID0+IGQgPCBsb3dlclF1aW50aWxlID8gbG93ZXJRdWludGlsZSA6XG4gICAgICAgICAgICBkID4gdXBwZXJRdWludGlsZSA/IHVwcGVyUXVpbnRpbGUgOlxuICAgICAgICAgICAgZFxuICAgICAgICApXG4gICAgKTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIG1lYW4sXG4gICAgICAgIHRyaW1tZWRNZWFuLFxuICAgICAgICB2YXJpYW5jZSxcbiAgICAgICAgZGV2aWF0aW9uOiBNYXRoLnNxcnQodmFyaWFuY2UpLFxuICAgICAgICB3aW5kc29yaXplZERldmlhdGlvbixcbiAgICAgICAgcTEsXG4gICAgICAgIHEyLFxuICAgICAgICBxMyxcbiAgICAgICAgaXFyOiBxMyAtIHExLFxuICAgICAgICBhcmdtaW46IG1pblswXSwgLy8gaW5kZXggb2YgbWluaW11bSB2YWx1ZVxuICAgICAgICBtaW46IG1pblsxXSxcbiAgICAgICAgYXJnbWF4OiBtYXhbMF0sIC8vIGluZGV4IG9mIG1heGltdW0gdmFsdWVcbiAgICAgICAgbWF4OiBtYXhbMV1cbiAgICB9O1xufVxuXG5mdW5jdGlvbiByZWdyZXNzaW9uKG1lYXN1cmVtZW50cykge1xuICAgIGNvbnN0IHJlc3VsdCA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwLCBuID0gMTsgaSArIG4gPCBtZWFzdXJlbWVudHMubGVuZ3RoOyBpICs9IG4sIG4rKykge1xuICAgICAgICBjb25zdCBzdWJzZXQgPSBtZWFzdXJlbWVudHMuc2xpY2UoaSwgaSArIG4pO1xuICAgICAgICByZXN1bHQucHVzaChbXG4gICAgICAgICAgICBzdWJzZXQucmVkdWNlKChzdW0sIG1lYXN1cmVtZW50KSA9PiBzdW0gKyBtZWFzdXJlbWVudC5pdGVyYXRpb25zLCAwKSxcbiAgICAgICAgICAgIHN1YnNldC5yZWR1Y2UoKHN1bSwgbWVhc3VyZW1lbnQpID0+IHN1bSArIG1lYXN1cmVtZW50LnRpbWUsIDApXG4gICAgICAgIF0pO1xuICAgIH1cbiAgICByZXR1cm4gbGVhc3RTcXVhcmVzUmVncmVzc2lvbihyZXN1bHQpO1xufVxuXG5mdW5jdGlvbiBsZWFzdFNxdWFyZXNSZWdyZXNzaW9uKGRhdGEpIHtcbiAgICBjb25zdCBtZWFuWCA9IGQzLnN1bShkYXRhLCBkID0+IGRbMF0pIC8gZGF0YS5sZW5ndGg7XG4gICAgY29uc3QgbWVhblkgPSBkMy5zdW0oZGF0YSwgZCA9PiBkWzFdKSAvIGRhdGEubGVuZ3RoO1xuICAgIGNvbnN0IHZhcmlhbmNlWCA9IGQzLnZhcmlhbmNlKGRhdGEsIGQgPT4gZFswXSk7XG4gICAgY29uc3Qgc2RYID0gTWF0aC5zcXJ0KHZhcmlhbmNlWCk7XG4gICAgY29uc3Qgc2RZID0gZDMuZGV2aWF0aW9uKGRhdGEsIGQgPT4gZFsxXSk7XG4gICAgY29uc3QgY292YXJpYW5jZSA9IGQzLnN1bShkYXRhLCAoW3gsIHldKSA9PlxuICAgICAgICAoeCAtIG1lYW5YKSAqICh5IC0gbWVhblkpXG4gICAgKSAvIChkYXRhLmxlbmd0aCAtIDEpO1xuXG4gICAgY29uc3QgY29ycmVsYXRpb24gPSBjb3ZhcmlhbmNlIC8gc2RYIC8gc2RZO1xuICAgIGNvbnN0IHNsb3BlID0gY292YXJpYW5jZSAvIHZhcmlhbmNlWDtcbiAgICBjb25zdCBpbnRlcmNlcHQgPSBtZWFuWSAtIHNsb3BlICogbWVhblg7XG5cbiAgICByZXR1cm4geyBjb3JyZWxhdGlvbiwgc2xvcGUsIGludGVyY2VwdCwgZGF0YSB9O1xufVxuXG5mdW5jdGlvbiBrZGUoc2FtcGxlcywgc3VtbWFyeSwgdGlja3MpIHtcbiAgICBjb25zdCBrZXJuZWwgPSBrZXJuZWxFcGFuZWNobmlrb3Y7XG5cbiAgICBpZiAoc2FtcGxlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgICAvLyBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9LZXJuZWxfZGVuc2l0eV9lc3RpbWF0aW9uI0FfcnVsZS1vZi10aHVtYl9iYW5kd2lkdGhfZXN0aW1hdG9yXG4gICAgY29uc3QgYmFuZHdpZHRoID0gMS4wNiAqIHN1bW1hcnkud2luZHNvcml6ZWREZXZpYXRpb24gKiBNYXRoLnBvdyhzYW1wbGVzLmxlbmd0aCwgLTAuMik7XG4gICAgcmV0dXJuIHRpY2tzLm1hcCgoeCkgPT4ge1xuICAgICAgICByZXR1cm4gW3gsIGQzLm1lYW4oc2FtcGxlcywgKHYpID0+IGtlcm5lbCgoeCAtIHYpIC8gYmFuZHdpZHRoKSkgLyBiYW5kd2lkdGhdO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBrZXJuZWxFcGFuZWNobmlrb3Yodikge1xuICAgIHJldHVybiBNYXRoLmFicyh2KSA8PSAxID8gMC43NSAqICgxIC0gdiAqIHYpIDogMDtcbn1cblxuIl19
