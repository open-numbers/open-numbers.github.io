/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

__webpack_require__(2);

var _component = __webpack_require__(1);

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var VERSION_INFO = { version: "2.0.0", build: 1520374668322 };

//BAR CHART TOOL
var BarChartDS = Vizabi.Tool.extend("BarChartDS", {

  /**
   * Initializes the tool (Bar Chart Tool).
   * Executed once before any template is rendered.
   * @param {Object} placeholder Placeholder element for the tool
   * @param {Object} external_model Model as given by the external page
   */
  init: function init(placeholder, external_model) {

    this.name = "barchartds";

    //specifying components
    this.components = [{
      component: _component2.default,
      placeholder: ".vzb-tool-viz",
      model: ["state.time", "state.marker", "state.marker_order", "state.entities", "state.entities_side", "state.entities_allpossible", "state.entities_geodomain", "locale", "ui"] //pass models to component
    }, {
      component: Vizabi.Component.get("timeslider"),
      placeholder: ".vzb-tool-timeslider",
      model: ["state.time", "state.marker", "ui"]
    }, {
      component: Vizabi.Component.get("dialogs"),
      placeholder: ".vzb-tool-dialogs",
      model: ["state", "ui", "locale"]
    }, {
      component: Vizabi.Component.get("buttonlist"),
      placeholder: ".vzb-tool-buttonlist",
      model: ["state", "ui", "locale"]
    }, {
      component: Vizabi.Component.get("treemenu"),
      placeholder: ".vzb-tool-treemenu",
      model: ["state.marker", "state.marker_tags", "state.time", "locale"]
    }, {
      component: Vizabi.Component.get("datanotes"),
      placeholder: ".vzb-tool-datanotes",
      model: ["state.marker", "locale"]
    }, {
      component: Vizabi.Component.get("steppedspeedslider"),
      placeholder: ".vzb-tool-stepped-speed-slider",
      model: ["state.time", "locale"]
    }];

    //constructor is the same as any tool
    this._super(placeholder, external_model);
  },
  validate: function validate(model) {
    model = this.model || model;

    this._super(model);

    //validate on first model set only
    if (!this.model) {
      var entities = model.state.entities;
      if (Object.keys(entities.show).length > 0) {
        var show = {};
        if (entities.show[entities.dim] && Object.keys(entities.show).length !== 1) {
          show[entities.dim] = entities.show[entities.dim];
        }
        if (!entities.show[entities.dim] || !(Object.keys(entities.show).length == 1)) {
          entities.show = show;
        }
      }

      var entities_geodomain = model.state.entities_geodomain;
      entities_geodomain.skipFilter = model.state.entities.dim === entities_geodomain.dim || model.state.entities_side.dim === entities_geodomain.dim;
    }
  },


  default_model: {
    state: {
      marker_tags: {}
    },
    ui: {
      chart: {
        stacked: true,
        inpercent: false,
        flipSides: true
      },
      "buttons": ["colors", "inpercent", "find", "side", "moreoptions", "fullscreen"],
      "dialogs": {
        "popup": ["timedisplay", "colors", "find", "side", "moreoptions"],
        "sidebar": ["timedisplay", "colors", "find"],
        "moreoptions": ["opacity", "speed", "colors", "side", "presentation", "about"]
      },
      presentation: false
    },
    locale: {}
  },

  versionInfo: VERSION_INFO
});

exports.default = BarChartDS;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var _Vizabi = Vizabi,
    utils = _Vizabi.utils,
    Component = _Vizabi.Component,
    axisSmart = _Vizabi.helpers["d3.axisWithLabelPicker"],
    iconQuestion = _Vizabi.iconset.question;

// BARCHARTDS  CHART COMPONENT

var BarChartDS = Component.extend("barchartds", {

  /**
   * Initializes the component (Bar Chart).
   * Executed once before any template is rendered.
   * @param {Object} config The config passed to the component
   * @param {Object} context The component's parent
   */
  init: function init(config, context) {
    this.name = "barchartds";
    this.template = __webpack_require__(3);

    //define expected models for this component
    this.model_expects = [{
      name: "time",
      type: "time"
    }, {
      name: "marker",
      type: "marker"
    }, {
      name: "marker_order",
      type: "marker"
    }, {
      name: "entities",
      type: "entities"
    }, {
      name: "entities_side",
      type: "entities"
    }, {
      name: "entities_allpossible",
      type: "entities"
    }, {
      name: "entities_geodomain",
      type: "entities"
    }, {
      name: "locale",
      type: "locale"
    }, {
      name: "ui",
      type: "ui"
    }];

    var _this = this;
    this.model_binds = {
      "change:time.value": function changeTimeValue(evt) {
        if (!_this._readyOnce) return;
        if (_this.model.time.step != 1 && !_this.snapped && !_this.model.time.playing && !_this.model.time.dragging) {
          var next = d3.bisectLeft(_this.timeSteps, _this.model.time.value);
          if (next != 0 && _this.timeSteps[next] - _this.model.time.value) {
            _this.snapped = true;
            var time = _this.model.time.value;
            var prev = _this.timeSteps[next - 1];
            next = _this.timeSteps[next];
            var snapTime = time - prev < next - time ? prev : next;
            _this.model.time.value = new Date(snapTime);
          }
        }
        if (!_this.snapped) {
          //          if (_this.timeSteps.filter(t => (t - _this.model.time.value) == 0).length) {
          _this.model.marker.getFrame(_this.model.time.value, function (frame) {
            _this.frame = frame;
            _this.frameAxisX = frame.axis_x;
            _this.model.marker_order.getFrame(_this.model.time.value, function (frameOrder) {
              _this.frameOrder = frameOrder.hook_order;

              _this._reorderBars();
              _this._updateEntities(true);
              _this.updateBarsOpacity();
            });
          });
        }
        _this.snapped = false;
      },
      "change:marker": function changeMarker(evt, path) {
        if (!_this._readyOnce) return;
        if (path.indexOf("scaleType") > -1) {
          _this.ready();
          return;
        }
      },
      "change:marker.select": function changeMarkerSelect(evt) {
        _this.someSelected = _this.model.marker.select.length > 0;
        _this.nonSelectedOpacityZero = false;
        _this.updateBarsOpacity();
      },
      "change:marker.highlight": function changeMarkerHighlight(evt, path) {
        if (!_this._readyOnce) return;
        _this._highlightBars();
      },
      "change:marker.opacitySelectDim": function changeMarkerOpacitySelectDim() {
        _this.updateBarsOpacity();
      },
      "change:marker.opacityRegular": function changeMarkerOpacityRegular() {
        _this.updateBarsOpacity();
      },
      "change:marker.color.palette": function changeMarkerColorPalette(evt) {
        if (!_this._readyOnce) return;
        _this._updateEntities();
      },
      "change:marker.color.scaleType": function changeMarkerColorScaleType(evt) {
        if (!_this._readyOnce) return;
        _this._updateEntities();
      },
      "change:marker.color.which": function changeMarkerColorWhich(evt) {
        if (!_this._readyOnce) return;
        _this.model.marker_order.hook_order.which = _this.model.marker.color.which;
      },
      "change:marker.side.which": function changeMarkerSideWhich(evt) {
        if (!_this._readyOnce) return;
        var sideDim = void 0;
        var show = {};
        var entitiesSideProps = {};
        if (_this.model.marker.side.use == "constant") {
          sideDim = null;
        } else {
          var sideConcept = _this.model.marker.side.getConceptprops();
          if (sideConcept.concept_type == "entity_set") {
            sideDim = sideConcept.domain;
          } else {
            sideDim = _this.model.marker.side.which;
          }
        }
        //        const sideDim = _this.model.marker.side.use == "constant" ? null : _this.model.marker.side.which;
        _this.model.marker.side.clearSideState();
        var skipFilterSide = sideDim !== _this.geoDomainDimension;
        if (!skipFilterSide) {
          show["is--" + _this.model.marker.side.which] = true;
        }
        _this.model.entities_side.skipFilter = skipFilterSide;
        entitiesSideProps["show"] = show;
        entitiesSideProps["dim"] = sideDim;
        _this.model.entities_side.set(entitiesSideProps);
        _this.model.entities_geodomain.skipFilter = (sideDim === _this.geoDomainDimension || _this.STACKDIM === _this.geoDomainDimension) && (Boolean(_this.model.entities.getFilteredEntities().length) || !_this.model.entities_side.skipFilter);
      },
      "change:entities.show": function changeEntitiesShow(evt) {
        if (!_this._readyOnce) return;
        if (_this.model.entities.dim === _this.model.entities_side.dim && !utils.isEmpty(_this.model.entities_side.show)) {
          var showEntities = _this.model.entities_side.getFilteredEntities().filter(function (s) {
            return !_this.model.entities.isShown(s);
          });
          if (showEntities.length) {
            _this.model.marker.side.clearSideState();
            _this.model.entities_side.showEntity(showEntities);
          }
        }
        _this.model.entities_geodomain.skipFilter = (_this.SIDEDIM === _this.geoDomainDimension || _this.STACKDIM === _this.geoDomainDimension) && (Boolean(_this.model.entities.getFilteredEntities().length) || !_this.model.entities_side.skipFilter);
      },
      "change:entities_side.show": function changeEntities_sideShow(evt) {
        if (!_this._readyOnce) return;
        var doReturn = false;
        var _entitiesSameDimWithSide = null;
        utils.forEach(_this.model.marker.side._space, function (h) {
          if (h.dim === _this.model.entities_side.dim && h._name !== _this.model.entities_side._name && h._name !== _this.model.entities_geodomain._name) {
            _entitiesSameDimWithSide = h;
          }
        });
        if (_entitiesSameDimWithSide) {
          _this.model.entities.getFilteredEntities();
          var showEntities = _this.model.entities_side.getFilteredEntities().filter(function (s) {
            return !_entitiesSameDimWithSide.isShown(s);
          });
          if (showEntities.length) {
            _entitiesSameDimWithSide.showEntity(showEntities);
            doReturn = true;
          }
        }
        if (_this.SIDEDIM !== _this.model.entities_side.dim) {
          doReturn = true;
        }
        if (doReturn) return;

        _this._updateIndicators();
        if (!_this.model.ready || !_this.frame) return;
        _this._updateLimits();
        _this.resize();
        _this._updateEntities(true);
      },
      "change:ui.chart.inpercent": function changeUiChartInpercent(evt) {
        if (!_this._readyOnce) return;
        _this._updateLimits();
        _this.resize();
        _this._updateEntities();
      },
      "change:ui.chart.flipSides": function changeUiChartFlipSides(evt) {
        if (!_this._readyOnce) return;
        _this.model.marker.side.switchSideState();
        _this._updateIndicators();
        _this.resize();
        _this._updateEntities(true);
      }
    };

    //contructor is the same as any component
    this._super(config, context);

    this.xScale = null;
    this.yScale = null;
    this.cScale = null;

    this.xAxis = axisSmart("bottom");
    this.xAxisLeft = axisSmart("bottom");
    this.yAxis = axisSmart("left");
    this.xScales = [];

    this.totalFieldName = "Total";
  },
  checkDimensions: function checkDimensions() {
    var stackDim = this.model.entities.dim;
    var sideDim = this.model.entities_side.dim;

    this.colorUseNotProperty = this.model.marker.color.use == "constant" || this.model.marker.color.which == this.TIME;
    this.stackSkip = stackDim == sideDim;
    this.geoLess = stackDim !== this.geoDomainDimension && sideDim !== this.geoDomainDimension;
    this.sideSkip = this.model.marker.side.use == "constant";
  },


  /**
   * DOM is ready
   */
  readyOnce: function readyOnce() {
    var _this = this;
    this.el = this.el ? this.el : d3.select(this.element);
    this.element = this.el;

    this.interaction = this._interaction();

    this.graph = this.element.select(".vzb-bc-graph");
    this.yAxisEl = this.graph.select(".vzb-bc-axis-y");
    this.xAxisEl = this.graph.select(".vzb-bc-axis-x");
    this.xAxisLeftEl = this.graph.select(".vzb-bc-axis-x-left");
    this.xTitleEl = this.element.select(".vzb-bc-axis-x-title");
    this.xInfoEl = this.element.select(".vzb-bc-axis-x-info");
    this.yTitleEl = this.graph.select(".vzb-bc-axis-y-title");
    this.barsCrop = this.graph.select(".vzb-bc-bars-crop");
    this.labelsCrop = this.graph.select(".vzb-bc-labels-crop");
    this.bars = this.graph.select(".vzb-bc-bars");
    this.labels = this.graph.select(".vzb-bc-labels");
    this.labels.select(".vzb-bc-stack").attr("y", -10);

    this.title = this.element.select(".vzb-bc-title");
    this.titleRight = this.element.select(".vzb-bc-title-right");
    this.year = this.element.select(".vzb-bc-year");

    this.geoDomainDimension = this.model.entities_geodomain.getDimension();
    this.geoDomainDefaultValue = ((this.model.entities_geodomain.show[this.geoDomainDimension] || {})["$in"] || {})[0];

    _this.someSelected = _this.model.marker.select.length > 0;
    _this.nonSelectedOpacityZero = false;

    this.on("resize", function () {
      _this._updateEntities();
    });

    this._attributeUpdaters = {
      _newWidth: function _newWidth(d, i) {
        d["x_"] = 0;
        var width = _this.frameAxisX[utils.getKey(d, _this.KEYS)];
        // let width;
        // if (_this.geoLess && _this.stackSkip && _this.sideSkip) {
        //   width = (_this.frameAxisX[d[_this.AGEDIM]] || {})[_this.geoDomainDefaultValue];
        // } else if (_this.geoLess && _this.stackSkip) {
        //   width = _this.colorUseNotProperty || d[_this.PREFIXEDSIDEDIM] == d[_this.PREFIXEDSTACKDIM] ? (_this.frameAxisX[d[_this.PREFIXEDSIDEDIM]][d[_this.AGEDIM]] || {})[_this.geoDomainDefaultValue] : 0;
        // } else if (_this.geoLess && _this.sideSkip) {
        //   width = (_this.frameAxisX[d[_this.PREFIXEDSTACKDIM]][d[_this.AGEDIM]] || {})[_this.geoDomainDefaultValue];
        // } else if (_this.stackSkip) {
        //   width = _this.colorUseNotProperty || d[_this.PREFIXEDSIDEDIM] == d[_this.PREFIXEDSTACKDIM] ? _this.frameAxisX[d[_this.PREFIXEDSIDEDIM]][d[_this.AGEDIM]] : 0;
        // } else if (_this.sideSkip) {
        //   width = _this.frameAxisX[d[_this.PREFIXEDSTACKDIM]][d[_this.AGEDIM]];
        // } else {
        //   width = _this.frameAxisX[d[_this.PREFIXEDSTACKDIM]][d[_this.PREFIXEDSIDEDIM]][d[_this.AGEDIM]];
        // }

        d["width_"] = width ? _this.xScale(width) : 0;
        if (_this.ui.chart.inpercent) {
          d["width_"] /= _this.total[d[_this.PREFIXEDSIDEDIM]];
        }
        return d.width_;
      },
      _newX: function _newX(d, i) {
        var prevSbl = this.previousSibling;
        if (prevSbl) {
          var prevSblDatum = d3.select(prevSbl).datum();
          d["x_"] = prevSblDatum.x_ + prevSblDatum.width_;
        } else {
          d["x_"] = 0;
        }
        return d.x_;
      },
      _newColor: function _newColor(d, i) {
        return _this.cScale(!_this.colorUseNotProperty ? _this.frame.color[utils.getKey(d, _this.COLORKEYS)] : _this.frame.color[d[_this.STACKDIM]]);
      }
    };
  },


  /*
   * Both model and DOM are ready
   */
  ready: function ready() {
    var _this2 = this;

    //TODO: get component ready if some submodel doesn't ready ??????
    if (!this.model.marker._ready) return;

    var _this = this;

    this.timeSteps = this.model.time.getAllSteps();

    this.TIME = this.model.marker._getFirstDimension({ type: "time" });
    this.KEYS = utils.unique(this.model.marker._getAllDimensions({ exceptType: "time" }));
    this.side = this.model.marker.label_side.getEntity();
    this.SIDEDIM = this.side.getDimension();
    this.PREFIXEDSIDEDIM = "side_" + this.SIDEDIM;
    this.stack = this.model.marker.axis_y.getEntity();
    this.STACKDIM = this.stack.getDimension();
    this.PREFIXEDSTACKDIM = "stack_" + this.STACKDIM;
    this.TIMEDIM = this.model.time.getDimension();
    this.COLORKEYS = [this.STACKDIM, this.PREFIXEDSIDEDIM];
    this.checkDimensions();
    this.updateUIStrings();
    this._updateIndicators();

    this.frame = null;
    this.model.marker.getFrame(_this.model.time.value, function (frame) {
      _this.frame = frame;
      _this.frameAxisX = frame.axis_x;
      _this.model.marker_order.getFrame(_this.model.time.value, function (frameOrder) {
        _this.frameOrder = frameOrder.hook_order;
        _this.items = _this.model.marker.getKeys();
        _this._createLimits();
        _this._updateLimits();

        _this._reorderBars();
        _this.markers = _this2.model.marker.getKeys(_this.STACKDIM);

        _this.resize();
        _this._updateEntities(true);
        _this.updateBarsOpacity();
      });
    });
  },
  updateUIStrings: function updateUIStrings() {
    var _this = this;
    this.translator = this.model.locale.getTFunction();

    var xTitle = this.xTitleEl.selectAll("text").data([0]);
    xTitle.enter().append("text");
    xTitle.on("click", function () {
      _this.parent.findChildByName("gapminder-treemenu").markerID("axis_x").alignX(_this.model.locale.isRTL() ? "right" : "left").alignY("top").updateView().toggle();
    });

    var conceptPropsX = this.model.marker.axis_x.getConceptprops();
    utils.setIcon(this.xInfoEl, iconQuestion).select("svg").attr("width", "0px").attr("height", "0px").style('opacity', Number(Boolean(conceptPropsX.description || conceptPropsX.sourceLink)));

    this.xInfoEl.on("click", function () {
      _this.parent.findChildByName("gapminder-datanotes").pin();
    });
    this.xInfoEl.on("mouseover", function () {
      if (_this.model.time.dragging) return;
      var rect = this.getBBox();
      var coord = utils.makeAbsoluteContext(this, this.farthestViewportElement)(rect.x - 10, rect.y + rect.height + 10);
      var toolRect = _this.root.element.getBoundingClientRect();
      var chartRect = _this.element.node().getBoundingClientRect();
      _this.parent.findChildByName("gapminder-datanotes").setHook("axis_x").show().setPos(coord.x + chartRect.left - toolRect.left, coord.y);
    });
    this.xInfoEl.on("mouseout", function () {
      if (_this.model.time.dragging) return;
      _this.parent.findChildByName("gapminder-datanotes").hide();
    });

    // var titleStringY = this.model.marker.axis_y.getConceptprops().name;

    // var yTitle = this.yTitleEl.selectAll("text").data([0]);
    // yTitle.enter().append("text");
    // yTitle
    //   .attr("y", "-6px")
    //   .attr("x", "-9px")
    //   .attr("dx", "-0.72em")
    //   .text(titleStringY);
  },


  /**
   * Changes labels for indicators
   */
  _updateIndicators: function _updateIndicators() {
    var _this3 = this;

    var _this = this;
    this.duration = this.model.time.delayAnimations;
    this.yScale = this.model.marker.axis_y.getScale();
    this.xScale = this.model.marker.axis_x.getScale();
    this.yAxis.tickFormat(_this.model.marker.axis_y.getTickFormatter());
    this.xAxis.tickFormat(_this.model.marker.axis_x.getTickFormatter());
    this.xAxisLeft.tickFormat(_this.model.marker.axis_x.getTickFormatter());

    var sideDim = this.SIDEDIM;
    var stackDim = this.STACKDIM;

    var stacks = this.model.marker.getKeys(stackDim);
    var stackKeys = [];
    stackKeys = stacks.map(function (m) {
      return m[stackDim];
    });
    this.stackKeys = stackKeys;

    var sideItems = this.model.marker.label_side.getItems();
    //var sideKeys = Object.keys(sideItems);
    var sideKeys = [];
    if (!utils.isEmpty(sideItems)) {
      var sideFiltered = !!this.model.marker.side.getEntity().show[sideDim];
      var sides = this.model.marker.getKeys(sideDim).filter(function (f) {
        return !sideFiltered || _this3.model.marker.side.getEntity().isShown(f);
      });
      sideKeys = sides.map(function (m) {
        return m[sideDim];
      });

      if (sideKeys.length > 2) sideKeys.length = 2;
      if (sideKeys.length > 1) {
        var sortFunc = this.ui.chart.flipSides ? d3.ascending : d3.descending;
        sideKeys.sort(sortFunc);
      }
    }
    if (!sideKeys.length) sideKeys.push("undefined");
    this.sideKeys = sideKeys;

    this.twoSided = this.sideKeys.length > 1;
    this.titleRight.classed("vzb-hidden", !this.twoSided);
    if (this.twoSided) {
      this.xScaleLeft = this.xScale.copy();
      this.title.text(sideItems[this.sideKeys[1]]);
      this.titleRight.text(sideItems[this.sideKeys[0]]);
    } else {
      var title = this.sideKeys.length && sideItems[this.sideKeys[0]] ? sideItems[this.sideKeys[0]] : "";
      this.title.text(title);
    }

    this.cScale = this.model.marker.color.getScale();
  },
  _reorderBars: function _reorderBars() {
    var _this = this;
    var domain = this.yScale.domain();
    var sideKeys = this.sideKeys;
    domain.sort(function (a, b) {
      var result = d3.ascending(_this.frameOrder[a] || 0, _this.frameOrder[b] || 0);
      return result !== 0 ? result : d3.ascending((_this.frameAxisX[a] || {})[sideKeys[0]] || 0, (_this.frameAxisX[b] || {})[sideKeys[0]] || 0);
    });
    this.yScale.domain(domain);
  },
  _createLimits: function _createLimits() {
    var _this = this;
    var axisX = this.model.marker.axis_x;

    //const sideKeysNF = Object.keys(this.model.marker.side.getItems());
    var sideKeysNF = Object.keys(this.model.marker.side.getNestedItems([this.SIDEDIM]));
    if (!sideKeysNF.length) sideKeysNF.push("undefined");

    var keys = this.sideSkip ? [] : [this.SIDEDIM];
    var limits = axisX.getLimitsByDimensions(keys.concat([this.STACKDIM, this.TIMEDIM]));
    var timeKeys = axisX.getUnique();
    var totals = {};
    var inpercentMaxLimits = {};
    var maxLimits = {};
    var key = void 0;
    sideKeysNF.forEach(function (s) {
      maxLimits[s] = [];
      inpercentMaxLimits[s] = [];
    });

    if (_this.sideSkip) {
      utils.forEach(timeKeys, function (time) {
        totals[time] = {};
        var stackSum = 0;
        var sideMaxLimits = [];
        utils.forEach(_this.stackKeys, function (stack) {
          if (limits[stack] && limits[stack][time]) {
            var val = limits[stack][time].max;
            stackSum += val;
            sideMaxLimits.push(val);
          }
        });
        totals[time][sideKeysNF[0]] = stackSum;
        var maxSideLimit = Math.max.apply(Math, sideMaxLimits);
        inpercentMaxLimits[sideKeysNF[0]].push(maxSideLimit / stackSum);
        maxLimits[sideKeysNF[0]].push(maxSideLimit);
      });
    } else {
      utils.forEach(timeKeys, function (time) {
        totals[time] = {};
        utils.forEach(sideKeysNF, function (side) {
          var stackSum = 0;
          var sideMaxLimits = [];
          utils.forEach(_this.stackKeys, function (stack) {
            key = side + "," + stack;
            if (limits[key] && limits[key][time]) {
              var val = limits[key][time].max;
              stackSum += val;
              sideMaxLimits.push(val);
            }
          });
          totals[time][side] = stackSum;
          var maxSideLimit = Math.max.apply(Math, sideMaxLimits);
          inpercentMaxLimits[side].push(maxSideLimit / stackSum);
          maxLimits[side].push(maxSideLimit);
        });
      });
    }

    this.maxLimits = {};
    this.inpercentMaxLimits = {};
    sideKeysNF.forEach(function (s) {
      _this.maxLimits[s] = Math.max.apply(Math, _toConsumableArray(maxLimits[s]));
      _this.inpercentMaxLimits[s] = Math.max.apply(Math, _toConsumableArray(inpercentMaxLimits[s]));
    });
    this.totals = totals;
  },
  _updateLimits: function _updateLimits() {
    var _this = this;
    var axisX = this.model.marker.axis_x;
    var zero = axisX.scaleType == "log" ? 0.01 : 0;
    var domain = void 0;
    if (this.ui.chart.inpercent) {
      domain = [zero * 0.01, Math.max.apply(Math, _toConsumableArray(this.sideKeys.map(function (s) {
        return _this.inpercentMaxLimits[s];
      })))];
    } else {
      domain = axisX.domainMin != null && axisX.domainMax != null ? [+axisX.domainMin, +axisX.domainMax] : [zero, Math.max.apply(Math, _toConsumableArray(this.sideKeys.map(function (s) {
        return _this.maxLimits[s];
      })))];
    }
    this.xScale.domain(domain);
    if (this.xScaleLeft) this.xScaleLeft.domain(this.xScale.domain());
  },
  _interpolateBetweenTotals: function _interpolateBetweenTotals(timeSteps, totals, time) {
    var nextStep = d3.bisectLeft(timeSteps, time);
    var fraction = (time - timeSteps[nextStep - 1]) / (timeSteps[nextStep] - timeSteps[nextStep - 1]);
    var total = {};
    utils.forEach(this.sideKeys, function (side) {
      total[side] = totals[timeSteps[nextStep]][side] * fraction + totals[timeSteps[nextStep - 1]][side] * (1 - fraction);
    });
    return total;
  },


  /**
   * Updates entities
   */
  _updateEntities: function _updateEntities(reorder) {
    var _this = this;
    var time = this.model.time;
    var sideDim = this.SIDEDIM;
    var prefixedSideDim = this.PREFIXEDSIDEDIM;
    var stackDim = this.STACKDIM;
    var prefixedStackDim = this.PREFIXEDSTACKDIM;
    var timeDim = this.TIMEDIM;
    var duration = time.playing ? time.delayAnimations : 0;
    var total = void 0;

    if (this.ui.chart.inpercent) {
      this.total = this.totals[time.value] ? this.totals[time.value] : this._interpolateBetweenTotals(this.timeSteps, this.totals, time.value);
    }

    var domain = this.yScale.domain();

    var stackBars = this.markers.slice(0);

    this.entityBars = this.bars.selectAll(".vzb-bc-bar").data(stackBars, function (d) {
      return d[stackDim];
    });
    //exit selection
    this.entityBars.exit().remove();

    var barHeight = this.barHeight;
    var firstBarOffsetY = this.firstBarOffsetY;

    //enter selection -- init bars
    this.entityBars = this.entityBars.enter().append("g").attr("class", function (d) {
      return "vzb-bc-bar " + "vzb-bc-bar-" + d[stackDim];
    }).attr("transform", function (d, i) {
      return "translate(0," + (firstBarOffsetY - _this.yScale(d[stackDim])) + ")";
    }).merge(this.entityBars);

    var _attributeUpdaters = this._attributeUpdaters;

    this.sideBars = this.entityBars.selectAll(".vzb-bc-side").data(function (d) {
      return _this.sideKeys.map(function (m) {
        var r = {};
        r[stackDim] = d[stackDim];
        r[prefixedSideDim] = m;
        r[sideDim] = m;
        return r;
      });
    }, function (d) {
      return d[prefixedSideDim];
    });

    this.sideBars.exit().remove();
    this.sideBars = this.sideBars.enter().append("g").attr("class", function (d, i) {
      return "vzb-bc-side " + "vzb-bc-side-" + (!i != !_this.twoSided ? "right" : "left");
    }).call(function (sideSel) {
      sideSel.append("rect").attr("class", function (d, i) {
        return "vzb-bc-stack " + "vzb-bc-stack-" + i + (_this.highlighted ? " vzb-dimmed" : "");
      }).attr("y", 0).attr("height", barHeight).attr("fill", _attributeUpdaters._newColor).attr("width", _attributeUpdaters._newWidth).attr("x", _attributeUpdaters._newX).on("mouseover", _this.interaction.mouseover).on("mouseout", _this.interaction.mouseout).on("click", _this.interaction.click).onTap(_this.interaction.tap);
    }).merge(this.sideBars);

    if (reorder) {
      this.sideBars.attr("transform", function (d, i) {
        return i ? "scale(-1,1) translate(" + _this.activeProfile.centerWidth + ",0)" : "";
      });
    }

    this.stackBars = this.sideBars.selectAll(".vzb-bc-stack");

    if (reorder) this.stackBars.attr("fill", _attributeUpdaters._newColor);

    if (duration) {
      var transition = d3.transition().duration(duration).ease(d3.easeLinear);

      this.entityBars
      //.transition(transition)
      .attr("transform", function (d, i) {
        return "translate(0," + (firstBarOffsetY - _this.yScale(d[stackDim])) + ")";
      });
      this.stackBars.transition(transition).attr("width", _attributeUpdaters._newWidth).attr("x", _attributeUpdaters._newX);
    } else {
      this.entityBars.interrupt().attr("transform", function (d, i) {
        return "translate(0," + (firstBarOffsetY - _this.yScale(d[stackDim])) + ")";
      });
      this.stackBars.interrupt().attr("width", _attributeUpdaters._newWidth).attr("x", _attributeUpdaters._newX);
    }

    if (duration) {
      this.year.transition().duration(duration).ease(d3.easeLinear).on("end", this._setYear(time.value));
    } else {
      this.year.interrupt().text(time.formatDate(time.value)).transition();
    }
  },
  _setYear: function _setYear(timeValue) {
    var formattedTime = this.model.time.formatDate(timeValue);
    return function () {
      d3.select(this).text(formattedTime);
    };
  },
  _interaction: function _interaction() {
    var _this = this;
    return {
      mouseover: function mouseover(d, i) {
        if (utils.isTouchDevice()) return;
        _this.model.marker.highlightMarker(d);
        //_this._showLabel(d);
      },
      mouseout: function mouseout(d, i) {
        if (utils.isTouchDevice()) return;
        _this.model.marker.clearHighlighted();
      },
      click: function click(d, i) {
        if (utils.isTouchDevice()) return;
        _this.model.marker.selectMarker(d);
      },
      tap: function tap(d) {
        d3.event.stopPropagation();
        _this.model.marker.selectMarker(d);
      }
    };
  },
  _highlightBars: function _highlightBars(d) {
    var _this = this;

    _this.someHighlighted = _this.model.marker.highlight.length > 0;

    _this.updateBarsOpacity();

    if (!_this.someHighlighted) {
      //hide labels
      _this.labels.selectAll(".vzb-hovered").classed("vzb-hovered", false);
    } else {
      _this._showLabel(_this.model.marker.highlight[0]);
    }
  },
  _showLabel: function _showLabel(d) {
    if (!this.frame) return;

    var _this = this;
    var formatter = _this.ui.chart.inpercent ? d3.format(".2%") : _this.model.marker.axis_x.getTickFormatter();
    var sideDim = _this.SIDEDIM;
    var stackDim = _this.STACKDIM;
    var KEYS = this.KEYS;

    var left = _this.sideKeys.indexOf(d[sideDim]);
    var label = _this.labels.select(".vzb-bc-label");
    var bar = _this.bars.select(".vzb-bc-bar-" + d[stackDim]);
    label.attr("transform", bar.attr("transform")).select(".vzb-bc-stack").text(function (textData) {
      var text = _this.frame.label_stack[d[stackDim]];
      text = _this.twoSided ? text : text + " " + _this.stackItems[d[stackDim]];
      var total = _this.ui.chart.inpercent ? _this.total[d[sideDim]] : 1;
      var value = _this.frameAxisX[utils.getKey(d, KEYS)] / total;
      return text + ": " + formatter(value);
    }).attr("x", (left ? -1 : 1) * (_this.activeProfile.centerWidth * 0.5 + 7)).classed("vzb-text-left", left);

    label.classed("vzb-hovered", true);
  },


  /**
   * Executes everytime the container or vizabi is resized
   * Ideally,it contains only operations related to size
   */

  presentationProfileChanges: {
    medium: {
      margin: { right: 80, bottom: 80 },
      infoElHeight: 32
    },
    large: {
      margin: { top: 100, right: 100, left: 100, bottom: 80 },
      infoElHeight: 32
    }
  },

  profiles: {
    "small": {
      margin: {
        top: 70,
        right: 20,
        left: 40,
        bottom: 40
      },
      infoElHeight: 16,
      centerWidth: 2,
      titlesSpacing: 5
    },
    "medium": {
      margin: {
        top: 80,
        right: 60,
        left: 60,
        bottom: 40
      },
      infoElHeight: 20,
      centerWidth: 2,
      titlesSpacing: 10
    },
    "large": {
      margin: {
        top: 100,
        right: 60,
        left: 60,
        bottom: 40
      },
      infoElHeight: 22,
      centerWidth: 2,
      titlesSpacing: 20
    }
  },

  resize: function resize() {

    var _this = this;

    this.activeProfile = this.getActiveProfile(this.profiles, this.presentationProfileChanges);

    var margin = this.activeProfile.margin;
    var infoElHeight = this.activeProfile.infoElHeight;

    //stage
    this.height = parseInt(this.element.style("height"), 10) - margin.top - margin.bottom || 0;
    this.width = parseInt(this.element.style("width"), 10) - margin.left - margin.right || 0;

    if (this.height <= 0 || this.width <= 0) return utils.warn("BarchartDS resize() abort: vizabi container is too little or has display:none");

    this.graph.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    this.barsCrop.attr("width", this.width).attr("height", Math.max(0, this.height));

    this.labelsCrop.attr("width", this.width).attr("height", Math.max(0, this.height));

    var domain = this.yScale.domain();
    // height per bar is total domain height divided by the number of possible markers in the domain
    var barHeight = this.barHeight = this.model.marker.axis_y.scaleType == "ordinal" ? this.height / domain.length : this.height / Math.abs(domain[1] - domain[0]);
    this.firstBarOffsetY = this.height - this.barHeight;

    if (this.stackBars) this.stackBars.attr("height", barHeight);

    if (this.sideBars) this.sideBars.attr("transform", function (d, i) {
      return i ? "scale(-1,1) translate(" + _this.activeProfile.centerWidth + ",0)" : "";
    });

    //update scales to the new range
    this.yScale.range([this.height, 0]);

    var maxRange = this.twoSided ? (this.width - this.activeProfile.centerWidth) * 0.5 : this.width;

    this.xScale.range([0, maxRange]);

    //apply scales to axes and redraw
    this.yAxis.scale(this.yScale).tickValues([]).tickSizeInner(-this.width).tickSizeOuter(0).tickPadding(6).tickSizeMinor(-this.width, 0).labelerOptions({
      scaleType: this.model.marker.axis_y.scaleType,
      toolMargin: margin,
      limitMaxTickNumber: 1
    });

    var format = this.ui.chart.inpercent ? d3.format(".1%") : this.model.marker.axis_x.getTickFormatter();

    this.xAxis.scale(this.xScale).tickFormat(format).tickSizeInner(-this.height).tickSizeOuter(0).tickPadding(6).tickSizeMinor(-this.height, 0).labelerOptions({
      scaleType: this.model.marker.axis_x.scaleType,
      toolMargin: margin,
      limitMaxTickNumber: 6
    });

    var translateX = this.twoSided ? (this.width + _this.activeProfile.centerWidth) * 0.5 : 0;

    this.xAxisEl.attr("transform", "translate(" + translateX + "," + this.height + ")").call(this.xAxis);

    this.yAxisEl.attr("transform", "translate(" + 0 + ",0)").call(this.yAxis);
    //this.xAxisEl.call(this.xAxis);
    this.xAxisLeftEl.classed("vzb-hidden", !this.twoSided);
    if (this.twoSided) {
      if (this.model.marker.axis_x.scaleType !== "ordinal") {
        this.xScaleLeft.range([(this.width - this.activeProfile.centerWidth) * 0.5, 0]);
      } else {
        this.xScaleLeft.rangePoints([(this.width - this.activeProfile.centerWidth) * 0.5, 0]).range();
      }

      this.xAxisLeft.scale(this.xScaleLeft).tickFormat(format).tickSizeInner(-this.height).tickSizeOuter(0).tickPadding(6).tickSizeMinor(-this.height, 0).labelerOptions({
        scaleType: this.model.marker.axis_x.scaleType,
        toolMargin: margin,
        limitMaxTickNumber: 6
      });

      this.xAxisLeftEl.attr("transform", "translate(0," + this.height + ")").call(this.xAxisLeft);
      var zeroTickEl = this.xAxisEl.select(".tick text");
      if (!zeroTickEl.empty()) {
        var zeroTickWidth = zeroTickEl.node().getBBox().width;
        zeroTickEl.attr("dx", -(this.activeProfile.centerWidth + zeroTickWidth) * 0.5);
      }
      this.xAxisEl.select(".tick line").classed("vzb-hidden", true);

      //hide left axis zero tick
      var tickNodes = this.xAxisLeftEl.selectAll(".tick").nodes();
      d3.select(tickNodes[tickNodes.length - 1]).classed("vzb-hidden", true);
    }

    var isRTL = this.model.locale.isRTL();

    this.bars.attr("transform", "translate(" + translateX + ",0)");
    this.labels.attr("transform", "translate(" + translateX + ",0)");

    this.title.attr("x", margin.left + (this.twoSided ? translateX - this.activeProfile.titlesSpacing : 0)).style("text-anchor", this.twoSided ? "end" : "").attr("y", margin.top * 0.7);
    this.titleRight.attr("x", margin.left + translateX + this.activeProfile.titlesSpacing).attr("y", margin.top * 0.7);

    this.xTitleEl.style("font-size", infoElHeight + "px").attr("transform", "translate(" + (isRTL ? this.width : margin.left * 0.4) + "," + margin.top * 0.4 + ")");
    this.xTitleEl.select("text").text(this.model.marker.axis_x.getConceptprops().name);

    if (this.xInfoEl.select("svg").node()) {
      var titleBBox = this.xTitleEl.node().getBBox();
      var t = utils.transform(this.xTitleEl.node());
      var hTranslate = isRTL ? titleBBox.x + t.translateX - infoElHeight * 1.4 : titleBBox.x + t.translateX + titleBBox.width + infoElHeight * 0.4;

      this.xInfoEl.select("svg").attr("width", infoElHeight + "px").attr("height", infoElHeight + "px");
      this.xInfoEl.attr("transform", "translate(" + hTranslate + "," + (t.translateY - infoElHeight * 0.8) + ")");
    }

    this.year.attr("x", this.width + margin.left).attr("y", margin.top * 0.4);
  },
  updateBarsOpacity: function updateBarsOpacity(duration) {
    var _this = this;
    //if(!duration)duration = 0;

    var OPACITY_HIGHLT = 1.0;
    var OPACITY_HIGHLT_DIM = this.model.marker.opacityHighlightDim;
    var OPACITY_SELECT = 1.0;
    var OPACITY_REGULAR = this.model.marker.opacityRegular;
    var OPACITY_SELECT_DIM = this.model.marker.opacitySelectDim;

    this.stackBars
    //.transition().duration(duration)
    .style("opacity", function (d) {

      if (_this.someHighlighted) {
        //highlight or non-highlight
        if (_this.model.marker.isHighlighted(d)) return OPACITY_HIGHLT;
      }

      if (_this.someSelected) {
        //selected or non-selected
        return _this.model.marker.isSelected(d) ? OPACITY_SELECT : OPACITY_SELECT_DIM;
      }

      if (_this.someHighlighted) return OPACITY_HIGHLT_DIM;

      return OPACITY_REGULAR;
    });

    this.stackBars.style("stroke", function (d) {
      return _this.model.marker.isSelected(d) ? "#333" : null;
    });

    var nonSelectedOpacityZero = _this.model.marker.opacitySelectDim < 0.01;

    // when pointer events need update...
    if (nonSelectedOpacityZero != this.nonSelectedOpacityZero) {
      this.stackBars.style("pointer-events", function (d) {
        return !_this.someSelected || !nonSelectedOpacityZero || _this.model.marker.isSelected(d) ? "visible" : "none";
      });
    }

    this.nonSelectedOpacityZero = _this.model.marker.opacitySelectDim < 0.01;
  }
});

exports.default = BarChartDS;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = "<!-- BarChartDS Component -->\n<svg class=\"vzb-barchartds\">\n    <g class=\"vzb-bc-header\">\n        <g class=\"vzb-bc-axis-x-title\"></g>\n        <g class=\"vzb-bc-axis-x-info vzb-noexport\"></g>\n        <text class=\"vzb-bc-title\"></text>\n        <text class=\"vzb-bc-title vzb-bc-title-right\"></text>\n        <text class=\"vzb-bc-year\"></text>\n    </g>\n    <g class=\"vzb-bc-graph\">\n\n        <g class=\"vzb-bc-axis-y-title\"></g>\n\n        <g class=\"vzb-bc-axis-y\"></g>\n\n        <svg class=\"vzb-bc-bars-crop\">\n            <g class=\"vzb-bc-bars\"></g>\n        </svg>\n\n        <g class=\"vzb-bc-axis-x\"></g>\n        <g class=\"vzb-bc-axis-x vzb-bc-axis-x-left\"></g>\n\n        <svg class=\"vzb-bc-labels-crop\">\n            <g class=\"vzb-bc-labels\">\n                <g class=\"vzb-bc-label\"><text class=\"vzb-bc-stack\"></text></g>\n            </g>\n        </svg>\n\n        <g class=\"vzb-bc-axis-labels\">\n            <!-- <text class=\"vzb-x_label\">Lifespan</text>\n                  <text class=\"vzb-y_label\">Lifespan</text> -->\n        </g>\n    </g>\n</svg>\n";

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0);


/***/ })
/******/ ]);
//# sourceMappingURL=barchart-ds.js.map