!function(t){function e(a){if(i[a])return i[a].exports;var s=i[a]={i:a,l:!1,exports:{}};return t[a].call(s.exports,s,s.exports,e),s.l=!0,s.exports}var i={};e.m=t,e.c=i,e.i=function(t){return t},e.d=function(t,i,a){e.o(t,i)||Object.defineProperty(t,i,{configurable:!1,enumerable:!0,get:a})},e.n=function(t){var i=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(i,"a",i),i},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=4)}([function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),i(2);var a=i(1),s=function(t){return t&&t.__esModule?t:{default:t}}(a),l={version:"1.0.16",build:1503504728117},n=Vizabi.Tool.extend("LineChart",{init:function(t,e){this.name="linechart",this.components=[{component:s.default,placeholder:".vzb-tool-viz",model:["state.time","state.entities","state.marker","locale","ui"]},{component:Vizabi.Component.get("timeslider"),placeholder:".vzb-tool-timeslider",model:["state.time","state.entities","state.marker","ui"],ui:{show_value_when_drag_play:!1,axis_aligned:!0}},{component:Vizabi.Component.get("dialogs"),placeholder:".vzb-tool-dialogs",model:["state","ui","locale"]},{component:Vizabi.Component.get("buttonlist"),placeholder:".vzb-tool-buttonlist",model:["state","ui","locale"]},{component:Vizabi.Component.get("treemenu"),placeholder:".vzb-tool-treemenu",model:["state.marker","state.marker_tags","state.time","locale"]},{component:Vizabi.Component.get("datawarning"),placeholder:".vzb-tool-datawarning",model:["locale"]},{component:Vizabi.Component.get("datanotes"),placeholder:".vzb-tool-datanotes",model:["state.marker","locale"]},{component:Vizabi.Component.get("steppedspeedslider"),placeholder:".vzb-tool-stepped-speed-slider",model:["state.time","locale"]}],this._super(t,e)},default_model:{state:{time:{autogenerate:{data:"data",conceptIndex:0,conceptType:"time"}},entities:{autogenerate:{data:"data",conceptIndex:0}},entities_colorlegend:{autogenerate:{data:"data",conceptIndex:0}},entities_tags:{},marker_tags:{space:["entities_tags"],label:{},hook_parent:{}},entities_allpossible:{autogenerate:{data:"data",conceptIndex:0}},marker_allpossible:{space:["entities_allpossible"],label:{use:"property",autogenerate:{conceptIndex:0}}},marker:{space:["entities","time"],axis_x:{use:"indicator",allow:{scales:["time"]},autogenerate:{conceptIndex:0,conceptType:"time"}},axis_y:{use:"indicator",allow:{scales:["linear","log"]},autogenerate:{conceptIndex:0,conceptType:"measure"}},label:{use:"property",autogenerate:{conceptIndex:0}},color:{syncModels:["marker_colorlegend"],autogenerate:{conceptIndex:0,conceptType:"entity_set"}}},marker_colorlegend:{space:["entities_colorlegend"],label:{use:"property",which:"name"},hook_rank:{use:"property",which:"rank"},hook_geoshape:{use:"property",which:"shape_lores_svg"}}},locale:{},ui:{chart:{labels:{min_number_of_entities_when_values_hide:2},whenHovering:{hideVerticalNow:!1,showProjectionLineX:!0,showProjectionLineY:!0,higlightValueX:!0,higlightValueY:!0,showTooltip:!1}},datawarning:{doubtDomain:[],doubtRange:[]},buttons:["colors","find","show","moreoptions","fullscreen","presentation"],dialogs:{popup:["colors","find","show","moreoptions"],sidebar:["colors","show"],moreoptions:["opacity","speed","axes","colors","presentation","about"]},presentation:!1}},versionInfo:l});e.default=n},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=Vizabi,s=a.utils,l=a.Component,n=a.helpers,o=n["d3.axisWithLabelPicker"],r=n["d3.collisionResolver"],h=a.iconset,c=h.warn,d=h.question,m=l.extend("linechart",{init:function(t,e){var a=this;this.name="linechart",this.template=i(3),this.model_expects=[{name:"time",type:"time"},{name:"entities",type:"entities"},{name:"marker",type:"model"},{name:"locale",type:"locale"},{name:"ui",type:"ui"}],this.model_binds={"change:time.value":function(){a._readyOnce&&a.model.marker.getFrame(a.model.time.value,function(t,e){if(!a._frameIsValid(t))return s.warn("change:time.value: empty data received from marker.getFrame(). doing nothing");a.frameChanged(t,e)})},"change:time.playing":function(){a.model.time.playing&&s.isTouchDevice()&&!a.tooltip.classed("vzb-hidden")&&a.tooltip.classed("vzb-hidden",!0)},"change:time.start":function(){a._readyOnce&&a.updateShow()},"change:time.end":function(){a._readyOnce&&a.updateShow()},"change:marker":function(t,e){if(a._readyOnce){if(e.indexOf("domainMin")>-1||e.indexOf("domainMax")>-1||e.indexOf("zoomedMin")>-1||e.indexOf("zoomedMax")>-1){if(!a.yScale||!a.xScale)return;return a.updateShow(),a.zoomToMaxMin(),a.updateSize(),a.updateTime(),void a.redrawDataPoints()}e.indexOf("scaleType")>-1&&(a.updateShow(),a.zoomToMaxMin(),a.updateSize(),a.redrawDataPoints())}},"change:marker.highlight":function(){a._readyOnce&&a.highlightLines()},"change:marker.select":function(){a._readyOnce&&(a.updateDoubtOpacity(),a.highlightLines())},"change:marker.opacitySelectDim":function(){a._readyOnce&&a.highlightLines()},"change:marker.opacityRegular":function(){a._readyOnce&&a.highlightLines()},"change:entities.show":function(){a.values=null},"change:marker.color.palette":function(){a._readyOnce&&a.updateColors()}},this._super(t,e),this.xScale=null,this.yScale=null,this.rangeXRatio=1,this.rangeXShift=0,this.rangeYRatio=1,this.rangeYShift=0,this.lineWidthScale=d3.scaleLinear().domain([0,20]).range([7,1]).clamp(!0),this.xAxis=o("bottom"),this.yAxis=o("left"),this.COLOR_BLACKISH="#333",this.COLOR_WHITEISH="#fdfdfd",this.COLOR_WHITEISH_SHADE=d3.rgb(this.COLOR_WHITEISH).darker(.5).toString(),this.isDataPreprocessed=!1,this.timeUpdatedOnce=!1,this.sizeUpdatedOnce=!1,this.getNearestKey=s.memoize(this.getNearestKey)},readyOnce:function(){var t=this,e=this;this.element=d3.select(this.element),this.graph=this.element.select(".vzb-lc-graph"),this.yAxisElContainer=this.graph.select(".vzb-lc-axis-y"),this.yAxisEl=this.yAxisElContainer.select("g"),this.xAxisElContainer=this.graph.select(".vzb-lc-axis-x"),this.xAxisEl=this.xAxisElContainer.select("g"),this.xTitleEl=this.graph.select(".vzb-lc-axis-x-title"),this.yTitleEl=this.graph.select(".vzb-lc-axis-y-title"),this.yInfoEl=this.graph.select(".vzb-lc-axis-y-info"),this.linesContainerCrop=this.graph.select(".vzb-lc-lines-crop"),this.linesContainer=this.graph.select(".vzb-lc-lines"),this.labelsContainerCrop=this.graph.select(".vzb-lc-labels-crop"),this.labelsContainer=this.graph.select(".vzb-lc-labels"),this.dataWarningEl=this.graph.select(".vzb-data-warning"),this.verticalNow=this.labelsContainer.select(".vzb-lc-vertical-now"),this.tooltip=this.element.select(".vzb-tooltip"),this.projectionX=this.graph.select(".vzb-lc-projection-x"),this.projectionY=this.graph.select(".vzb-lc-projection-y"),this.entityLines=null,this.entityLabels=null,this.totalLength_1={},this.KEY=this.model.entities.getDimension(),this.collisionResolver=r().selector(".vzb-lc-label").value("valueY").filter(function(t,e){return t.valueX-e===0&&!t.hidden});var i=this.model.marker.axis_y.getConceptprops();s.setIcon(this.yInfoEl,d).select("svg").attr("width","0px").attr("height","0px").style("opacity",Number(Boolean(i.description||i.sourceLink))),this.yInfoEl.on("click",function(){e.parent.findChildByName("gapminder-datanotes").pin()}),this.yInfoEl.on("mouseover",function(){var t=this.getBBox(),i=s.makeAbsoluteContext(this,this.farthestViewportElement)(t.x-10,t.y+t.height+10);e.parent.findChildByName("gapminder-datanotes").setHook("axis_y").show().setPos(i.x,i.y)}),this.yInfoEl.on("mouseout",function(){e.parent.findChildByName("gapminder-datanotes").hide()}),this.wScale=d3.scaleLinear().domain(this.model.ui.datawarning.doubtDomain).range(this.model.ui.datawarning.doubtRange),this.on("resize",function(){e.updateSize()||(e.updateTime(),e.redrawDataPoints())}),this.graph.on("click",function(){1==t.model.marker.highlight.length&&e.model.marker.selectMarker(t.model.marker.highlight[0])})},ready:function(){this.all_steps=this.model.time.getAllSteps(),this.all_values=this.values=null,this.updateTime(),this.updateUIStrings(),this.updateShow();var t=this;this.model.marker.getFrame(null,function(e){t.all_values=e,t.model.marker.getFrame(t.model.time.value,function(e){t._frameIsValid(e)&&(t.values=e,t.updateShow(),t.updateSize()||(t.updateDoubtOpacity(),t.zoomToMaxMin(),t.redrawDataPoints(),t.linesContainerCrop.on("mousemove",t.entityMousemove.bind(t,null,null,t)).on("mouseleave",t.entityMouseout.bind(t,null,null,t))))})})},_frameIsValid:function(t){return!(!t||0===Object.keys(t.axis_y).length||0===Object.keys(t.axis_x).length||0===Object.keys(t.color).length)},frameChanged:function(t,e){this.frame=t,this.updateTime(),this.all_values&&this.redrawDataPoints()},updateUIStrings:function(){var t=this,e=t.model.marker.axis_y.getConceptprops(),i=t.model.marker.axis_x.getConceptprops(),a=t.model.marker.color.getConceptprops();this.translator=this.model.locale.getTFunction(),this.strings={title:{Y:e.name,X:i.name,C:a.name},unit:{Y:e.unit||"",X:i.unit||"",C:a.unit||""}},this.strings.unit.Y==="unit/"+this.model.marker.axis_y.which&&(this.strings.unit.Y=""),this.strings.unit.X==="unit/"+this.model.marker.axis_x.which&&(this.strings.unit.X=""),this.strings.unit.C==="unit/"+this.model.marker.color.which&&(this.strings.unit.C=""),this.strings.unit.Y&&(this.strings.unit.Y=", "+this.strings.unit.Y),this.strings.unit.X&&(this.strings.unit.X=", "+this.strings.unit.X),this.strings.unit.C&&(this.strings.unit.C=", "+this.strings.unit.C),s.setIcon(this.dataWarningEl,c).select("svg").attr("width","0px").attr("height","0px"),this.dataWarningEl.append("text").attr("text-anchor","end").text(this.translator("hints/dataWarning")),this.dataWarningEl.on("click",function(){t.parent.findChildByName("gapminder-datawarning").toggle()}).on("mouseover",function(){t.updateDoubtOpacity(1)}).on("mouseout",function(){t.updateDoubtOpacity()});var l=this.xTitleEl.selectAll("text").data([0]);l=l.enter().append("text").merge(l);var n=this.yTitleEl.selectAll("text").data([0]);n=n.enter().append("text").merge(n),n.on("click",function(){t.parent.findChildByName("gapminder-treemenu").markerID("axis_y").alignX("left").alignY("top").updateView().toggle()})},updateDoubtOpacity:function(t){null==t&&(t=this.wScale(+this.time.getUTCFullYear().toString())),this.someSelected&&(t=1),this.dataWarningEl.style("opacity",t)},updateShow:function(){var t=this,e=this.KEY;if(this.cached={},this.yScale=this.model.marker.axis_y.getScale(),!this.splash){var i=this.model.marker.axis_y.getLimits(this.model.marker.axis_y.which);this.yScale.domain([i.min,i.max])}this.xScale=this.model.marker.axis_x.getScale(),this.cScale=this.model.marker.color.getScale(),this.yAxis.tickFormat(this.model.marker.axis_y.getTickFormatter()),this.xAxis.tickFormat(this.model.marker.axis_x.getTickFormatter()),this.collisionResolver.scale(this.yScale).KEY(e),this.data=this.model.marker.getKeys(),this.linesContainer.selectAll(".vzb-lc-entity").remove(),this.entityLines=this.linesContainer.selectAll(".vzb-lc-entity").data(this.data),this.lineWidth=this.lineWidthScale(this.data.length),this.lineWidth>=2?this.shadowWidth=1.3*this.lineWidth:this.shadowWidth=null,this.labelsContainer.classed("small",!this.shadowWidth),this.entityLines=this.entityLines.enter().append("g").attr("class","vzb-lc-entity").each(function(e,i){var a=d3.select(this);t.shadowWidth&&a.append("path").attr("class","vzb-lc-line-shadow"),a.append("path").attr("class","vzb-lc-line")}).merge(this.entityLines),this.labelsContainer.selectAll(".vzb-lc-entity").remove(),this.entityLabels=this.labelsContainer.selectAll(".vzb-lc-entity").data(this.data),this.entityLabels=this.entityLabels.enter().append("g").attr("class","vzb-lc-entity").on("mouseover",function(e){t.model.marker.highlightMarker(e)}).on("mouseout",function(e){t.model.marker.clearHighlighted()}).each(function(t,e){var i=d3.select(this);i.append("circle").attr("class","vzb-lc-circle").attr("cx",0);var a=i.append("g").attr("class","vzb-lc-label");a.append("text").attr("class","vzb-lc-labelname vzb-lc-labelstroke").attr("dy",".35em"),a.append("text").attr("class","vzb-lc-labelname vzb-lc-labelfill").attr("dy",".35em"),a.append("text").attr("class","vzb-lc-label-value").attr("dy","1.6em")}).merge(this.entityLabels),this.all_values&&this.values&&this.entityLabels.each(function(i,a){var s=d3.select(this),l=t.getColorsByValue(t.values.color[i[e]]),n=l.color,o=l.colorShadow,r=t.values.label[i[e]],h=t.yAxis.tickFormat()(t.values.axis_y[i[e]]),c=r.length<13?r:r.substring(0,10)+"...",d=t.ui.chart.labels.min_number_of_entities_when_values_hide;s.select("circle").style("fill",n),s.selectAll(".vzb-lc-labelname").text(c+" "+(t.data.length<d?h:"")),s.select(".vzb-lc-labelfill").style("fill",o),s.select(".vzb-lc-label-value").style("fill",o)}),this.line=d3.line().curve(d3.curveMonotoneX).x(function(e){return t.xScale(e[0])}).y(function(e){return t.yScale(e[1])})},getColorsByValue:function(t){return{color:""!=t?this.cScale(t):this.COLOR_WHITEISH,colorShadow:""!=t?this.model.marker.color.getColorShade({colorID:t,shadeID:"shade"}):this.COLOR_WHITEISH_SHADE}},updateColors:function(){var t=this,e=this.KEY,i=this.values.color;this.cScale=this.model.marker.color.getScale(),this.entityLabels.each(function(a,s){var l=d3.select(this),n=t.getColorsByValue(i[a[e]]),o=n.color,r=n.colorShadow;l.select("circle").style("fill",o),l.select(".vzb-lc-labelfill").style("fill",r),l.select(".vzb-lc-label-value").style("fill",r)}),this.entityLines.each(function(a,s){var l=d3.select(this),n=t.getColorsByValue(i[a[e]]),o=n.color,r=n.colorShadow;l.select(".vzb-lc-line").style("stroke",o),l.select(".vzb-lc-line-shadow").style("stroke",r)})},updateTime:function(){var t=this,e=(this.KEY,null===this.time?this.model.time.value:this.time);this.time=this.model.time.value,this.duration=this.model.time.playing&&this.time-e>0?this.model.time.delayAnimations:0,{}[this.model.time.getDimension()]=this.time,this.prev_steps=this.all_steps.filter(function(e){return e<t.time}),this.timeUpdatedOnce=!0},profiles:{small:{margin:{top:30,right:20,left:40,bottom:20},infoElHeight:16,yAxisTitleBottomMargin:6,tick_spacing:60,text_padding:12,lollipopRadius:6,limitMaxTickNumberX:5},medium:{margin:{top:40,right:60,left:60,bottom:25},infoElHeight:20,yAxisTitleBottomMargin:6,tick_spacing:80,text_padding:15,lollipopRadius:7,limitMaxTickNumberX:10},large:{margin:{top:50,right:60,left:60,bottom:30},infoElHeight:22,yAxisTitleBottomMargin:6,tick_spacing:100,text_padding:20,lollipopRadius:9,limitMaxTickNumberX:0}},presentationProfileChanges:{medium:{margin:{top:70,bottom:40,left:70},yAxisTitleBottomMargin:20,xAxisTitleBottomMargin:20,infoElHeight:26,text_padding:30},large:{margin:{top:70,bottom:50,left:70},yAxisTitleBottomMargin:20,xAxisTitleBottomMargin:20,infoElHeight:32,text_padding:36,hideSTitle:!0}},timeSliderProfiles:{small:{margin:{top:9,right:15,bottom:10,left:10}},medium:{margin:{top:9,right:15,bottom:10,left:20}},large:{margin:{top:9,right:15,bottom:10,left:25}}},updateSize:function(){var t=this;this.values,this.KEY;this.activeProfile=this.getActiveProfile(this.profiles,this.presentationProfileChanges),this.margin=this.activeProfile.margin,this.tick_spacing=this.activeProfile.tick_spacing;var e=this.activeProfile.infoElHeight,i=0;this.entityLabels.selectAll(".vzb-lc-labelname").attr("dx",t.activeProfile.text_padding).each(function(t,e){var a=this.getComputedTextLength();a>i&&(i=a)}),this.entityLabels.selectAll(".vzb-lc-circle").attr("r",this.shadowWidth?t.activeProfile.lollipopRadius:.8*t.activeProfile.lollipopRadius);if(this.margin.right=Math.max(this.margin.right,i+this.activeProfile.text_padding+20),this.height=parseInt(this.element.style("height"),10)-this.margin.top-this.margin.bottom||0,this.width=parseInt(this.element.style("width"),10)-this.margin.left-this.margin.right||0,this.height<=0||this.width<=0)return s.warn("Line chart updateSize() abort: vizabi container is too little or has display:none");this.linesContainerCrop.attr("width",this.width).attr("height",Math.max(0,this.height)),this.labelsContainerCrop.attr("width",this.width+this.margin.right).attr("height",Math.max(0,this.height)),this.collisionResolver.height(this.height),this.graph.attr("transform","translate("+this.margin.left+","+this.margin.top+")"),this.yScale.range([this.height-this.activeProfile.lollipopRadius,this.activeProfile.lollipopRadius]),this.xScale.range([this.rangeXShift,this.width*this.rangeXRatio+this.rangeXShift]),this.yAxis.scale(this.yScale).tickSizeInner(-this.width).tickSizeOuter(0).tickPadding(6).tickSizeMinor(-this.width,0).labelerOptions({scaleType:this.model.marker.axis_y.scaleType,toolMargin:this.margin,limitMaxTickNumber:6,viewportLength:this.height,formatter:this.model.marker.axis_y.getTickFormatter()}),this.xAxis.scale(this.xScale).tickSizeInner(-this.height).tickSizeOuter(0).tickSizeMinor(-this.height,0).tickPadding(6).labelerOptions({scaleType:this.model.marker.axis_x.scaleType,limitMaxTickNumber:this.activeProfile.limitMaxTickNumberX,toolMargin:this.margin,bump:2*this.activeProfile.text_padding,formatter:this.model.marker.axis_x.getTickFormatter()}),this.xAxisElContainer.attr("width",this.width+2*this.activeProfile.text_padding).attr("height",this.activeProfile.margin.bottom+this.height).attr("y",-1).attr("x",-this.activeProfile.text_padding),this.xAxisEl.attr("transform","translate("+(this.activeProfile.text_padding-1)+","+(this.height+1)+")"),this.yAxisElContainer.attr("width",this.activeProfile.margin.left+this.width).attr("height",Math.max(0,this.height)).attr("x",-this.activeProfile.margin.left),this.yAxisEl.attr("transform","translate("+(this.activeProfile.margin.left-1)+",0)"),this.yAxisEl.call(this.yAxis),this.xAxisEl.call(this.xAxis),this.yTitleEl.style("font-size",e+"px").attr("transform","translate("+(10-this.activeProfile.margin.left)+", -"+this.activeProfile.yAxisTitleBottomMargin+")");var a=this.yTitleEl.select("text").text(this.strings.title.Y+this.strings.unit.Y);if(a.node().getBBox().width>this.width&&a.text(this.strings.title.Y),this.yInfoEl.select("svg").node()){var l=this.yTitleEl.node().getBBox(),n=s.transform(this.yTitleEl.node());this.yInfoEl.select("svg").attr("width",e+"px").attr("height",e+"px"),this.yInfoEl.attr("transform","translate("+(l.x+n.translateX+l.width+.4*e)+","+(n.translateY-.8*e)+")")}var o=this.dataWarningEl.select("text").node().getBBox();this.dataWarningEl.select("svg").attr("width",.75*o.height).attr("height",.75*o.height).attr("x",-o.width-1.2*o.height).attr("y",.65*-o.height),this.dataWarningEl.attr("transform","translate("+(this.width+o.width+2*o.height)+",-"+this.activeProfile.yAxisTitleBottomMargin+")").select("text");var r=this.xTitleEl.select("text").text(this.strings.title.X+this.strings.unit.X);this.xTitleEl.style("font-size",e+"px").attr("transform","translate("+(this.width+this.activeProfile.text_padding+this.activeProfile.yAxisTitleBottomMargin)+","+(this.height+.72*r.node().getBBox().height)+")"),r.node().getBBox().width>this.width-100&&r.text(this.strings.title.X),this.verticalNow.attr("y1",this.yScale.range()[0]).attr("y2",this.yScale.range()[1]).attr("x1",0).attr("x2",0),this.projectionX.attr("y1",t.yScale.range()[0]),this.projectionY.attr("x2",t.xScale.range()[0]),s.isTouchDevice()&&(t.tooltip.classed("vzb-hidden",!0),t.verticalNow.style("opacity",1),t.projectionX.style("opacity",0),t.projectionY.style("opacity",0),t.xAxisEl.call(t.xAxis.highlightValue(t.time)),t.yAxisEl.call(t.yAxis.highlightValue("none")),t.graph.selectAll(".vzb-lc-entity").each(function(){d3.select(this).classed("vzb-dimmed",!1).classed("vzb-hovered",!1)}),t.hoveringNow=null);var h={rangeMax:this.xScale.range()[1],mRight:i-20,profile:this.timeSliderProfiles[this.getLayoutProfile()]};this.parent.trigger("myEvent",h),this.sizeUpdatedOnce=!0},redrawDataPoints:function(){var t=this,e=this.KEY;t.all_values&&this.model.marker.getFrame(this.time,function(i,a){t._frameIsValid(i)&&(t.values=i,t.timeUpdatedOnce||t.updateTime(),t.sizeUpdatedOnce||t.updateSize(),t.updateDoubtOpacity(),t.entityLines.each(function(a,s){var l=d3.select(this),n=(i.label[a[e]],t.getColorsByValue(i.color[a[e]])),o=n.color,r=n.colorShadow,h=t.prev_steps.map(function(i,s){return[i,t.all_values[i]?t.all_values[i].axis_y[a[e]]:null]}).filter(function(t){return t[1]||0===t[1]});i.axis_y[a[e]]&&h.push([i.axis_x[a[e]],i.axis_y[a[e]]]),h.length>0?t.cached[a[e]]={valueX:h[h.length-1][0],valueY:h[h.length-1][1]}:delete t.cached[a[e]];var c=l.select(".vzb-lc-line");t.model.time.playing&&null===t.totalLength_1[a[e]]&&(t.totalLength_1[a[e]]=c.node().getTotalLength());var d=t.line(h)||"",m=l.select(".vzb-lc-line-shadow").style("stroke",r).style("stroke-width",t.shadowWidth+"px").attr("transform","translate(0, "+(t.shadowWidth-t.lineWidth)+")").attr("d",d);c.style("stroke",o).style("stroke-width",t.lineWidth+"px").attr("d",d);var g=c.node().getTotalLength();t.model.time.playing?(m.interrupt().attr("stroke-dasharray",g).attr("stroke-dashoffset",g-t.totalLength_1[a[e]]).transition().delay(0).duration(t.duration).ease(d3.easeLinear).attr("stroke-dashoffset",0),c.interrupt().attr("stroke-dasharray",g).attr("stroke-dashoffset",g-t.totalLength_1[a[e]]).transition().delay(0).duration(t.duration).ease(d3.easeLinear).attr("stroke-dashoffset",0),t.totalLength_1[a[e]]=g):(t.totalLength_1[a[e]]=null,m.attr("stroke-dasharray","none").attr("stroke-dashoffset","none"),c.attr("stroke-dasharray","none").attr("stroke-dashoffset","none"))}),t.entityLabels.each(function(i,a){var s=d3.select(this);if(t.cached[i[e]]){if(i.valueX=t.xScale(t.cached[i[e]].valueX),i.valueY=t.yScale(t.cached[i[e]].valueY),s.classed("vzb-hidden",!1).transition().duration(t.duration).ease(d3.easeLinear).attr("transform","translate("+i.valueX+",0)"),s.select(".vzb-lc-circle").transition().duration(t.duration).ease(d3.easeLinear).attr("cy",i.valueY+1),t.data.length<t.ui.chart.labels.min_number_of_entities_when_values_hide){var l=t.values.label[i[e]],n=t.yAxis.tickFormat()(t.cached[i[e]].valueY),o=l.length<13?l:l.substring(0,10)+"...";s.selectAll(".vzb-lc-labelname").text(o+" "+n)}s.select(".vzb-lc-label").transition().duration(t.duration).ease(d3.easeLinear).attr("transform","translate(0,"+i.valueY+")")}else s.classed("vzb-hidden",!0)}),t.verticalNow.transition().duration(t.duration).ease(d3.easeLinear).attr("transform","translate("+t.xScale(d3.min([t.model.marker.axis_x.getZoomedMax(),t.time]))+",0)"),t.hoveringNow||t.time-t.model.time.start===0?t.verticalNow.style("opacity",0):(t.ui.chart.hideXAxisValue||t.xAxisEl.call(t.xAxis.highlightTransDuration(t.duration).highlightValue(t.time)),t.verticalNow.style("opacity",1)),0==t.duration&&d3.timerFlush(),clearTimeout(t.collisionTimeout),t.collisionTimeout=setTimeout(function(){t.entityLabels.call(t.collisionResolver.time(t.xScale(t.time)))},1.5*t.model.time.delayAnimations))})},entityMousemove:function(t,e,i,a){var l=i,n=l.KEY,o=(l.values,d3.mouse(l.element.node()).map(function(t){return parseInt(t)})),r=l.xScale.invert(o[0]-l.margin.left);l.time-r<0?r=l.time:r<this.model.time.start&&(r=this.model.time.start);var h=void 0,c=o[1]-l.margin.top;s.isDate(r)||(r=this.model.time.parse(r)),this.model.marker.getFrame(r,function(e){if(l._frameIsValid(e)){var i=l.getNearestKey(c,e.axis_y,l.yScale.bind(l));if(h=e.axis_y[i],t||(t={}),t[n]=i,l.model.marker.isHighlighted(t)||(l.model.marker.clearHighlighted(),l.model.marker.highlightMarker(t)),l.hoveringNow=t,!s.isNaN(h)){var a=l.xScale(r),o=l.yScale(h);l.ui.chart.whenHovering.showTooltip&&l.tooltip.style("left",a+l.margin.left+"px").style("bottom",l.height-o+l.margin.bottom+"px").text(l.yAxis.tickFormat()(h)).classed("vzb-hidden",!1),l.ui.chart.whenHovering.hideVerticalNow&&l.verticalNow.style("opacity",0),l.ui.chart.whenHovering.showProjectionLineX&&l.projectionX.style("opacity",1).attr("y2",o).attr("x1",a).attr("x2",a),l.ui.chart.whenHovering.showProjectionLineY&&l.projectionY.style("opacity",1).attr("y1",o).attr("y2",o).attr("x1",a),l.ui.chart.whenHovering.higlightValueX&&l.xAxisEl.call(l.xAxis.highlightValue(r).highlightTransDuration(0)),l.ui.chart.whenHovering.higlightValueY&&l.yAxisEl.call(l.yAxis.highlightValue(h).highlightTransDuration(0)),clearTimeout(l.unhoverTimeout)}}})},entityMouseout:function(t,e,i){var a=i;d3.event.relatedTarget&&d3.select(d3.event.relatedTarget).classed("vzb-tooltip")||(a.unhoverTimeout=setTimeout(function(){a.tooltip.classed("vzb-hidden",!0),a.verticalNow.style("opacity",1),a.projectionX.style("opacity",0),a.projectionY.style("opacity",0),a.xAxisEl.call(a.xAxis.highlightValue(a.time)),a.yAxisEl.call(a.yAxis.highlightValue("none")),a.model.marker.clearHighlighted(),a.hoveringNow=null},300))},highlightLines:function(){var t=this,e=this.KEY,i=this.model.marker.opacityRegular,a=this.model.marker.opacityRegular,s=this.model.marker.opacitySelectDim,l=this.model.marker.highlight.length>0;this.someSelected=this.model.marker.select.length>0,this.nonSelectedOpacityZero=t.model.marker.opacitySelectDim<.01;var n={};t.model.marker.getSelected().map(function(t){n[t[e]]=!0}),this.entityLines.style("opacity",function(o){return t.model.marker.isHighlighted(o)?1:t.someSelected?n[o[e]]?i:s:l?.3:a}),this.entityLabels.style("opacity",function(o){return t.model.marker.isHighlighted(o)?(o.sortValue=1,1):(o.sortValue=0,t.someSelected?n[o[e]]?i:s:l?.3:a)}).attr("pointer-events",function(i){return t.someSelected&&t.nonSelectedOpacityZero&&!n[i[e]]?(i.hidden=!0,"none"):(i.hidden=!1,"visible")}).sort(function(t,e){return d3.ascending(t.sortValue,e.sortValue)})},zoomToMaxMin:function(){null!=this.model.marker.axis_x.getZoomedMin()&&null!=this.model.marker.axis_x.getZoomedMax()&&(this.xScale.domain([this.model.marker.axis_x.getZoomedMin(),this.model.marker.axis_x.getZoomedMax()]),this.xAxisEl.call(this.xAxis)),null!=this.model.marker.axis_y.getZoomedMin()&&null!=this.model.marker.axis_y.getZoomedMax()&&((this.model.marker.axis_y.getZoomedMin()<=0||this.model.marker.axis_y.getZoomedMax()<=0)&&"log"==this.model.marker.axis_y.scaleType?(this.yScale=d3.scaleGenericlog().domain([this.model.marker.axis_y.getZoomedMin(),this.model.marker.axis_y.getZoomedMax()]).range(this.yScale.range()),this.model.marker.axis_y.scale=d3.scaleGenericlog().domain([this.model.marker.axis_y.getZoomedMin(),this.model.marker.axis_y.getZoomedMax()]).range(this.yScale.range()),this.yScale=this.model.marker.axis_y.scale):this.yScale.domain([this.model.marker.axis_y.getZoomedMin(),this.model.marker.axis_y.getZoomedMax()]),this.yAxisEl.call(this.yAxis))},getNearestKey:function(t,e,i){var a=this.KEY,s=Object.keys(e);this.someSelected&&this.nonSelectedOpacityZero&&(s=this.model.marker.select.map(function(t){return t[a]}));for(var l=s[0],n=1;n<s.length;n++){var o=s[n];Math.abs((i?i(e[o]):e[o])-t)<Math.abs((i?i(e[l]):e[l])-t)&&(l=o)}return l}});e.default=m},function(t,e){},function(t,e){t.exports='\x3c!-- LineChart Component --\x3e\n<div class="vzb-linechart">\n    <svg class="vzb-linechart-svg">\n        <g class="vzb-lc-graph">\n\n            <svg class="vzb-lc-axis-x"><g></g></svg>\n            <svg class="vzb-lc-axis-y"><g></g></svg>\n            <text class="vzb-lc-axis-x-value"></text>\n            <text class="vzb-lc-axis-y-value"></text>\n            <svg class="vzb-lc-lines-crop">\n                <svg class="vzb-lc-lines"></svg>\n                <line class="vzb-lc-projection-x"></line>\n                <line class="vzb-lc-projection-y"></line>\n            </svg>\n            <svg class="vzb-lc-labels-crop">\n                <g class="vzb-lc-labels">\n                    <line class="vzb-lc-vertical-now"></line>\n                </g>\n            </svg>\n\n            <g class="vzb-lc-axis-y-title"></g>\n            <g class="vzb-lc-axis-x-title"></g>\n            <g class="vzb-lc-axis-y-info"></g>\n\n            <g class="vzb-data-warning vzb-noexport">\n                <svg></svg>\n                <text></text>\n            </g>\n\n\n            \x3c!--filter id="vzb-lc-filter-dropshadow"> \n              <feOffset result="offOut" in="SourceGraphic" dx="0" dy="2" />\n              <feColorMatrix result = "matrixOut" in = "offOut" type = "matrix"\n                             values = "0.3 .0 .0 .0 .0\n                                       .0 .3 .0 .0 .0\n                                       .0 .0 .3 .0 .0\n                                       1.0 1.0 1.0 1.0 .0"/>\n              <feGaussianBlur result="blurOut" in="matrixOut" stdDeviation="0.8" />\n              <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />\n            </filter--\x3e\n\n        </g>\n    </svg>\n    <div class="vzb-tooltip vzb-hidden"></div>\n</div>\n'},function(t,e,i){t.exports=i(0)}]);
//# sourceMappingURL=linechart.js.map