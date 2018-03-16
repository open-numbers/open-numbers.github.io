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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export scrollTo */
/* harmony export (immutable) */ __webpack_exports__["a"] = translateNode;
function scrollTo({ durationLeft = 200, element, complete }) {
  const positionFrom = element.scrollTop;
  const positionTo = 0 - positionFrom;

  if (positionTo < 0) {
    const positionDiff = positionTo / durationLeft * 10;
    element.scrollTop += positionDiff;
    setTimeout(() => {
      scrollTo({ durationLeft: durationLeft - 25, element, complete });
    }, 25);
  } else {
    complete();
  }
}

function translateNode(translator) {
  return function() {
    const el = d3.select(this);
    const text = el.attr("data-text");
    if (!text) return;
    const textChildNode = Array.from(el.node().childNodes)
      .filter(({ nodeName }) => nodeName === "#text")[0];
    if (textChildNode) {
      textChildNode.textContent = translator(text);
    } else {
      el.text(translator(text));
    }
  }
}



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_app_header_chart_switcher_chart_switcher__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_header_language_switcher_language_switcher__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_header_social_buttons_social_buttons__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_header_menu_menu__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_app_see_also_see_also__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_app_core_menu_items__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_app_core_related_items__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_core_bitly_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__app_related_items_related_items__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__app_footer_footer__ = __webpack_require__(17);












const dispatch = d3.dispatch("translate", "toolChanged");

const DEFAULT_LANGUAGE = { key: 'en', text: 'English' };
const AVAILABLE_LANGUAGES = [
  DEFAULT_LANGUAGE,
  { key: 'ar-SA', text: 'العربية', isRtl: true }
];

const TRANSLATION_DICTIONARY = {};

function loadTranslation(language, callback) {
  d3.json("assets/i18n/" + language + ".json", (error, translation) => {
    if (error) return;
    callback(translation);
  })
}

function changeLanguage(language) {
  if (TRANSLATION_DICTIONARY[language]) {
    translateNow();
  } else {
    loadTranslation(language, translation => {
      TRANSLATION_DICTIONARY[language] = translation;
      translateNow();
    });
  }
}

function translateNow() {
  const languageConfig = AVAILABLE_LANGUAGES.filter(({ key }) => key === appState.language)[0];
  d3.select(".wrapper").classed("page-lang-rtl", languageConfig.isRtl);
  dispatch.call("translate");
}

function translator(key) {
  return TRANSLATION_DICTIONARY[appState.language]
    && TRANSLATION_DICTIONARY[appState.language][key] ? TRANSLATION_DICTIONARY[appState.language][key] : key;
}

function setLanguage(language) {
  setLocale(language);
  changeLanguage(appState.language);
}

const languageSwitcher = new __WEBPACK_IMPORTED_MODULE_1_app_header_language_switcher_language_switcher__["a" /* default */](
  d3.select(".header .app-language-switcher"),
  translator,
  {
    languages: AVAILABLE_LANGUAGES,
    selectedLanguage: appState.language,
    onClick: d => setLanguage(d.key)
  });

const chartSwitcher = new __WEBPACK_IMPORTED_MODULE_0_app_header_chart_switcher_chart_switcher__["a" /* default */](
  d3.select(".header .app-chart-switcher"),
  translator,
  dispatch,
  {
    tools: toolsPage.toolset,
    selectedTool: appState.tool,
    onClick: d => {
      dispatch.call("toolChanged", null, d)
      setTool(d.id)
    }
  });

const menu = new __WEBPACK_IMPORTED_MODULE_3_app_header_menu_menu__["a" /* default */](
  d3.select(".header .app-menu"),
  translator,
  dispatch,
  {
    menuItems: __WEBPACK_IMPORTED_MODULE_5_app_core_menu_items__["a" /* default */].children
  });

// const mobileMenu = new Menu(
//   d3.select(".mobile .app-menu"),
//   text => text,
//   {
//     menuItems: menuItems.children
//   });

const seeAlso = new __WEBPACK_IMPORTED_MODULE_4_app_see_also_see_also__["a" /* default */](
  d3.select(".app-see-also"),
  translator,
  dispatch,
  {
    tools: toolsPage.toolset,
    selectedTool: appState.tool,
    onClick: d => {
      dispatch.call("toolChanged", null, d);
      setTool(d.id)
    }
  });

const socialButtons = new __WEBPACK_IMPORTED_MODULE_2_app_header_social_buttons_social_buttons__["a" /* default */](
  d3.select(".social-list.desktop .app-social-buttons"),
  translator,
  dispatch,
  {
    bitlyService: Object(__WEBPACK_IMPORTED_MODULE_7__app_core_bitly_service__["a" /* default */])(),
    locationService: () => { },
  });

const related = new __WEBPACK_IMPORTED_MODULE_8__app_related_items_related_items__["a" /* default */](
  d3.select(".app-related-items"),
  translator,
  dispatch,
  {
    relatedItems: __WEBPACK_IMPORTED_MODULE_6_app_core_related_items__["a" /* default */]
  });

const footer = new __WEBPACK_IMPORTED_MODULE_9__app_footer_footer__["a" /* default */](
  d3.select(".app-footer"),
  translator,
  dispatch);

setLanguage(appState.language);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const ChartSwitcher = function (placeHolder, translator, dispatch, { tools, selectedTool, onClick }) {
  const templateHtml = __webpack_require__(3);

  const template = d3.create("div")
  template.html(templateHtml);

  const itemTemplate = template.select(".chart-switcher-options div");
  const onlyChartTools = tools.filter(({tool}) => tool);
  for (let tool of onlyChartTools) {
    itemTemplate.clone(true)
      .datum(tool)
      .attr("hidden", tool.id === selectedTool ? true : null)
      .raise()
      .call(fillToolItem, this);
  }
  itemTemplate.remove();

  this.areToolsOpen = false;
  const switcher = template.select(".chart-switcher-button");
  switcher.on("click", () => switchTools.call(this));

  for (const elem of Array.from(template.node().children)) {
    placeHolder.append(function() { return elem;});
  }

  translate();
  dispatch.on("translate.chartSwitcher", () => {
    translate();
  });

  dispatch.on("toolChanged.chartSwitcher", d => {
    toolChanged(d);
  })

  function translate() {
    const selectedToolConfig = tools.filter(({id}) => id === selectedTool)[0];
    placeHolder.select(".chart-switcher-button")
      .text(translator(selectedToolConfig.title || selectedToolConfig.id));
    placeHolder.selectAll(".chart-switcher-options div")
      .select("a").text(d => translator(d.title || d.id));
  }

  function toolChanged(tool) {
    placeHolder.select(".chart-switcher-button")
    .text(translator(tool.title || tool.id));
    placeHolder.selectAll(".chart-switcher-options div")
    .attr("hidden", _d => _d.id === tool.id ? true : null)
  }

  function switchTools() {
    this.areToolsOpen = !this.areToolsOpen;
    placeHolder.select(".chart-switcher-options").attr("hidden", this.areToolsOpen ? null : true);
  }

  function fillToolItem(item, _this) {
    const tool = item.datum();
    const a = item.select("a");
    a.on("click", d => {
      switchTools.call(_this);
      onClick(d);
    });
  }

}

/* harmony default export */ __webpack_exports__["a"] = (ChartSwitcher);

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = "<div class=\"navigation\">\n  <div class=\"flow-container\">\n    <a href=\"//gapminder.org\"><img src=\"assets/images/logo-small.png\" height=\"30\"></a>\n    <div class=\"chart-switcher\">\n      <a class=\"chart-switcher-button\"></a>\n    </div>\n  </div>\n</div>\n<div class=\"chart-switcher-options\" hidden>\n    <div><a rel=\"noopener\"></a></div>\n</div>";

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const LanguageSwitcher = function (placeHolder, translator, { languages, selectedLanguage, onClick }) {
  const templateHtml = __webpack_require__(5);

  const template = d3.create("div")
  template.html(templateHtml);

  const itemTemplate = template.select("ul li");
  for (let language of languages) {
    itemTemplate.clone(true)
      .datum(language)
      .raise()
      .on("click", (d) => {
        switcher.text(d.text);
        switchLanguage.call(this);
        onClick(d);
      })
      .text((d) => d.text);
  }
  itemTemplate.remove();

  this.isLanguageSwitcherVisible = false;
  const selectedLanguageConfig = languages.filter(({key}) => key === selectedLanguage)[0];
  const switcher = template.select(".lang-current");
  switcher.on("click", () => switchLanguage.call(this));
  switcher.text(selectedLanguageConfig.text);

  for (const elem of Array.from(template.node().children)) {
    placeHolder.append(function() { return elem;});
  }

  function switchLanguage() {
    this.isLanguageSwitcherVisible = !this.isLanguageSwitcherVisible;
    placeHolder.select("ul").attr("class", this.isLanguageSwitcherVisible ? "selected" : null);
  }

}

/* harmony default export */ __webpack_exports__["a"] = (LanguageSwitcher);

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = "<div class=\"lang-current\"></div>\n\n<ul>\n  <li></li>\n</ul>\n";

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_utils__ = __webpack_require__(0);


const SocialButtons = function (placeHolder, translator, dispatch, { bitlyService, locationService }) {
  const templateHtml = __webpack_require__(7);

  const template = d3.create("div")
  template.html(templateHtml);

  template.select(".share-text-box")
    .on("click", setMainLink());
  template.select(".mail.button")
    .on("click", mail);
  template.select(".twitter.button")
    .on("click", twitter);
  template.select(".facebook.button")
    .on("click", facebook);
  template.select(".ico-plane.button")
    .on("click", shareLink);
  template.select(".ico-code.button")
    .on("click", getEmbeddedUrl);

  for (const elem of Array.from(template.node().children)) {
    placeHolder.append(function() { return elem;});
  }

  translate();
  dispatch.on("translate.socialButtons", () => {
    translate();
  });

  function translate() {
    placeHolder.select(".share-text-box")
      .each(__WEBPACK_IMPORTED_MODULE_0__core_utils__["a" /* translateNode */](translator));
  }

  function twitter() {
    openWindow(`https://twitter.com/intent/tweet?original_referer=#{url}&amp;related=Gapminder&amp;text=Gapminder&amp;tw_p=tweetbutton&amp;url=#{url}`);
  }

  function facebook() {
    openWindow(`http://www.addtoany.com/add_to/facebook?linkurl=#{url}&amp;`);
  }

  function mail() {
    setMainLink();
    placeHolder.select(".mailLink").node().click();
  }

  function setMainLink() {
    const mailUrl = encodeURIComponent(window.location.href);
    placeHolder.select(".mailLink").attr("href", `mailto:?subject=Gapminder&body=${mailUrl}`);
  }

  function openWindow(urlTemplate) {
    const half = 2;
    const windowWidth = 490;
    const left = (window.innerWidth - windowWidth) / half;
    const newWindow = window.open('', '_blank', `width=${windowWidth}, height=368, top=100, left=${left}`);

    bitlyService.shortenUrl(undefined, url => {
      newWindow.location.href = urlTemplate.replace(/#{url}/g, url);
      newWindow.focus();
    });
  }

  function shareLink() {
    const message = 'Copy this fragment and paste it in your website or blog:\n(more instructions on vizabi.org/tutorials)';

    prompt(message, wrapInIFrame(locationService.getUrlReadyForEmbedding()));
  }

  function getEmbeddedUrl() {
    bitlyService.shortenUrl(undefined, shortened => prompt('Copy the following link: ', shortened));
  }

  function wrapInIFrame(content) {
    return `<iframe src="${content}" style="width: 100%; height: 500px; margin: 0 0 0 0; border: 1px solid grey;"></iframe>`;
  }
  
}

/* harmony default export */ __webpack_exports__["a"] = (SocialButtons);

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = "<li>\n  <div class=\"share-text-box\" data-text=\"share\"></div>\n</li>\n<li>\n  <a class=\"mail button\">\n    <i class=\"fa fa-envelope-o\"></i>\n  </a>\n</li>\n<li>\n  <a class=\"twitter button\">\n    <i class=\"fa fa-twitter\"></i>\n  </a>\n</li>\n<li>\n  <a class=\"facebook button\">\n    <i class=\"fa fa-facebook\"></i>\n  </a>\n</li>\n<li>\n  <button class=\"button ico-plane\">\n    <svg width=\"13\" height=\"13\" viewBox=\"0 0 1792 1792\" xmlns=\"http://www.w3.org/2000/svg\">\n      <path\n              d=\"M1764 11q33 24 27 64l-256 1536q-5 29-32 45-14 8-31 8-11 0-24-5l-527-215-298 327q-18 21-47 21-14 0-23-4-19-7-30-23.5t-11-36.5v-452l-472-193q-37-14-40-55-3-39 32-59l1664-960q35-21 68 2zm-342 1499l221-1323-1434 827 336 137 863-639-478 797z\"/>\n    </svg>\n  </button>\n</li>\n<li>\n  <a class=\"button ico-code\">\n    <i class=\"fa fa-code\"></i>\n  </a>\n</li>\n<a class=\"mailLink\" href=\"#\"></a>\n";

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_utils__ = __webpack_require__(0);


const Menu = function (placeHolder, translator, dispatch, { menuItems }) {
  const templateHtml = __webpack_require__(9);
  const path = "./assets";

  const template = d3.create("div")
  template.html(templateHtml);

  const itemTemplate = template.select(".menu-items .nav-expandable-item");
  for (let item of menuItems) {
    itemTemplate.clone(true)
      .datum(item)
      .raise()
      .call(fillMenuItem)
  }
  itemTemplate.remove();

  this.isHowToVisible = false;
  this.howToContent = template.select(".howToContent");
  this.howToMobileContent = template.select(".howToMobileContent");
  template.select(".how-to-button").on("click", () => switchHowTo.call(this));
  template.select(".how-to-modal-close").on("click", () => switchHowTo.call(this));


  for (const elem of Array.from(template.node().children)) {
    placeHolder.append(function () { return elem; });
  }

  translate();
  dispatch.on("translate.menu", () => {
    translate();
  });

  function translate() {
    placeHolder
      .selectAll(".menu-items .nav-expandable-item")
      .call((selection) => selection
        .select("a.menu-item")
        .text((d) => translator(d.menu_label)))
      .selectAll(".expanded-column-item")
      .call((selection) => {
        selection.select(".column-item-heading").text((d) => translator(d.menu_label));
        selection.select(".column-item-description").text((d) => translator(d.caption));
      })

    placeHolder.select(".menu-item.how-to-use-video")
      .each(__WEBPACK_IMPORTED_MODULE_0__core_utils__["a" /* translateNode */](translator));
    placeHolder.selectAll("p.nav-faq-help-links a")
      .each(__WEBPACK_IMPORTED_MODULE_0__core_utils__["a" /* translateNode */](translator));
  }

  function switchHowTo() {
    this.isHowToVisible = !this.isHowToVisible;
    placeHolder.select(".how-to-modal.desktop").attr("hidden", this.isHowToVisible ? null : true);
    placeHolder.select(".how-to-content.mobile").attr("hidden", this.isHowToVisible ? null : true);

    const howToContentEmpty = this.howToContent.node().children.length <= 0;
    const howToMobileContentEmpty = this.howToMobileContent.node().children.length <= 0;

    if (this.isHowToVisible) {
      const content = document.createElement('div');
      const contentMobile = document.createElement('div');
      const vimeoContent = `<iframe src="https://player.vimeo.com/video/231885967"
                                    class="how-to-frame"
                                    webkitallowfullscreen
                                    mozallowfullscreen
                                    allowfullscreen></iframe>`;

      content.innerHTML = vimeoContent;
      contentMobile.innerHTML = vimeoContent;

      if (howToContentEmpty) {
        this.howToContent.node().appendChild(content);
      }

      if (howToMobileContentEmpty) {
        this.howToMobileContent.node().appendChild(contentMobile);
      }
    }
  }

  function fillMenuItem(item) {
    const menuItem = item.datum();
    const itemTemplate = item.select(".expanded-column-item");
    for (let item of menuItem.children) {
      itemTemplate.clone(true)
        .datum(item)
        .raise()
        .call(fillColumnItem)
    }
    itemTemplate.remove();
  }

  function fillColumnItem(item) {
    const columnItem = item.datum();
    const a = item.select("a.menu-item");
    a.attr("href", columnItem.url);
    const img = a.select(".column-item-icon img");
    if (columnItem.icon_url) {
      img.attr("src", path + columnItem.icon_url);
    } else {
      img.remove();
    }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Menu);

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = "<li class=\"nav-expandable menu-items\">\n  <div class=\"nav-expandable-item\">\n\n    <a class=\"menu-item nav-toggle-expanded\"></a>\n\n    <div class=\"nav-expanded\">\n      <div class=\"nav-expanded-columns nav-expanded-columns-2 nav-expanded-columns-icons\">\n        <div class=\"nav-expanded-columns-inner\">\n          <ul>\n            <li class=\"expanded-column-item\">\n              <a class=\"menu-item\" href=\"\">\n                <div class=\"column-item-icon\">\n                  <img>\n                </div>\n                <div class=\"column-item-info\">\n                  <div class=\"column-item-heading\"></div>\n                  <div class=\"column-item-description\"></div>\n                </div>\n              </a>\n            </li>\n          </ul>\n        </div>\n      </div>\n    </div>\n  </div>\n</li>\n\n<li class=\"nav-expandable\">\n  <div class=\"nav-expandable-item\">\n\n    <a class=\"menu-item how-to-button how-to-use-video\" data-text=\"how_to_use\"><span>►</span>_</a>\n\n    <div class=\"nav-expanded how-to-content mobile\">\n      <div class=\"nav-expanded-columns nav-expanded-columns-2 nav-expanded-columns-icons\">\n        <div class=\"nav-expanded-columns-inner expanded-column-item\" style=\"text-align: center; width: 100%\">\n            <div class=\"howToMobileContent\"></div>\n            <p class=\"nav-faq-help-links\">\n              <a target=\"_blank\" href=\"//www.gapminder.org/GapminderMedia/wp-uploads/Gapminder-Tools-Guide.pdf\" data-text=\"pdf_guide\"></a>\n              <a target=\"_blank\" href=\"//www.gapminder.org/tools-offline/\" data-text=\"can_i_download_Gapminder_Tools\"></a>\n              <a target=\"_blank\" href=\"//vizabi.org/tutorials/2017/04/03/show-your-data/\" data-text=\"can_i_show_my_own_data\"></a>\n              <a target=\"_blank\" href=\"//www.gapminder.org/faq_frequently_asked_questions/\" data-text=\"more_help_and_faq\"></a>\n            </p>\n        </div>\n      </div>\n    </div>\n  </div>\n\n</li>\n\n<div class=\"nav-expandable-item mobile-share-menu-item\">\n  <ul class=\"social-list mobile\">\n    <span class=\"app-social-buttons\"></span>\n  </ul>\n</div>\n\n<div class=\"how-to-modal desktop\" hidden>\n  <div class=\"how-to-modal-content\">\n    <span class=\"how-to-modal-close\">&times;</span>\n    <div class=\"howToContent\"></div>\n    <p class=\"nav-faq-help-links\">\n      <a target=\"_blank\" href=\"//www.gapminder.org/GapminderMedia/wp-uploads/Gapminder-Tools-Guide.pdf\" data-text=\"pdf_guide\"></a>\n      <a target=\"_blank\" href=\"//www.gapminder.org/tools-offline/\" data-text=\"can_i_download_Gapminder_Tools\"></a>\n      <a target=\"_blank\" href=\"//vizabi.org/tutorials/2017/04/03/show-your-data/\" data-text=\"can_i_show_my_own_data\"></a>\n      <a target=\"_blank\" href=\"//www.gapminder.org/faq_frequently_asked_questions/\" data-text=\"more_help_and_faq\"></a>\n    </p>\n\n  </div>\n</div>\n";

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_utils__ = __webpack_require__(0);


const SeeAlso = function (placeHolder, translator, dispatch, { tools, selectedTool, onClick }) {
  const templateHtml = __webpack_require__(11);

  const template = d3.create("div")
  template.html(templateHtml);

  const itemTemplate = template.select(".other-tools-item");
  for (let tool of tools) {
    itemTemplate.clone(true)
      .datum(tool)
      .attr("hidden", tool.id === selectedTool ? true : null)
      .raise()
      .call(fillToolItem);
  }
  itemTemplate.remove();

  for (const elem of Array.from(template.node().children)) {
    placeHolder.append(function () { return elem; });
  }

  translate();
  dispatch.on("translate.seeAlso", () => {
    translate();
  });

  dispatch.on("toolChanged.seeAlso", d => {
    toolChanged(d);
  })

  function translate() {
    placeHolder.select(".see-also-heading").each(__WEBPACK_IMPORTED_MODULE_0__core_utils__["a" /* translateNode */](translator));
    placeHolder.selectAll(".other-tools-item").select(".title")
      .text(d => translator(d.title || d.id));
  }

  function toolChanged(tool) {
    placeHolder.selectAll(".other-tools-item")
    .attr("hidden", _d => _d.id === tool.id ? true : null)
  }

  function fillToolItem(item) {
    const tool = item.datum();
    const a = item.select("a");
    if (tool.url) {
      a.attr("href", tool.url)
    } else {
      a.on("click", d => {
        onClick(d);
      });
    }
    a.select(".image").attr("src", "." + tool.image);
  }

}

/* harmony default export */ __webpack_exports__["a"] = (SeeAlso);

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = "<div class=\"see-also-block\">\n  <h2 class=\"heading-2 see-also-heading\" data-text=\"other_tools\"></h2>\n\n  <div class=\"other-tools-container\">\n    <div class=\"other-tools-item\">\n      <a rel=\"noopener\">\n        <img class=\"image\"/>\n        <span class=\"title\"></span>\n      </a>\n    </div>\n  </div>\n</div>\n";

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* tslint:disable */

/* harmony default export */ __webpack_exports__["a"] = ({
  "_id": "56002c460faa9de708f37c33",
  "node_id": null,
  "menu_label": "Home",
  "caption": null,
  "url": null,
  "children": [
    {
      "node_id": null,
      "menu_label": "facts",
      "caption": null,
      "url": null,
      "children": [
        {
          "node_id": null,
          "menu_label": "tools_offline",
          "caption": "download_these_tools",
          "url": "http://www.gapminder.org/tools-offline",
          "icon_url": "/images/icons/menu/bubchart.png",
          "$$hashKey": "object:8"
        },
        {
          "node_id": null,
          "menu_label": "answers",
          "caption": "watch_Hans_Rosling_answer",
          "url": "http://www.gapminder.org/answers/",
          "icon_url": "/images/icons/menu/answers.png",
          "$$hashKey": "object:9"
        },
        {
          "node_id": null,
          "menu_label": "massive_ignorance",
          "caption": "beware_the_shocking_results",
          "url": "http://www.gapminder.org/ignorance",
          "icon_url": "/images/icons/menu/igmo.png",
          "$$hashKey": "object:10"
        },
        {
          "node_id": null,
          "menu_label": "data",
          "caption": "download_tables_with_stats",
          "url": "http://www.gapminder.org/data",
          "icon_url": "/images/icons/menu/data.png",
          "$$hashKey": "object:11"
        }
      ]
    },
    {
      "node_id": null,
      "menu_label": "teach",
      "caption": null,
      "url": null,
      "children": [
        {
          "node_id": null,
          "menu_label": "teachers",
          "caption": "see_how_teachers_use_Gapminder",
          "url": "http://www.gapminder.org/for-teachers",
          "icon_url": "/images/icons/menu/teach.png",
          "$$hashKey": "object:21"
        },
        {
          "node_id": null,
          "menu_label": "slideshows",
          "caption": "download_and_edit_our_modular_slides",
          "url": "http://www.gapminder.org/presentations",
          "icon_url": "/images/icons/menu/slides.png",
          "$$hashKey": "object:22"
        },
        {
          "node_id": null,
          "menu_label": "workshops",
          "caption": "let_your_students_practice_analytical_skills_without_computers",
          "url": "http://www.gapminder.org/workshops",
          "icon_url": "/images/icons/menu/workshops.png",
          "$$hashKey": "object:23"
        },
        {
          "node_id": null,
          "menu_label": "test_questions",
          "caption": "boost_your_students_confidence",
          "url": "http://www.gapminder.org/test-questions",
          "icon_url": "/images/icons/menu/testquestion.png",
          "$$hashKey": "object:24"
        }
      ]
    },
    {
      "node_id": null,
      "menu_label": "about",
      "caption": null,
      "url": null,
      "children": [
        {
          "node_id": null,
          "menu_label": "our_organization",
          "caption": "read_about_the_Gapminder_Foundation",
          "url": "http://www.gapminder.org/about-gapminder",
          "icon_url": "/images/icons/menu/gapminder.png",
          "$$hashKey": "object:34"
        },
        {
          "node_id": null,
          "menu_label": "news",
          "caption": "stay_tuned_with_our_blog",
          "url": "http://www.gapminder.org/news",
          "icon_url": "/images/icons/menu/news.png",
          "$$hashKey": "object:35"
        },
        {
          "node_id": null,
          "menu_label": "faq",
          "caption": "find_answers",
          "url": "http://www.gapminder.org/faq_frequently_asked_questions",
          "icon_url": "/images/icons/menu/faq.png",
          "$$hashKey": "object:36"
        },
        {
          "node_id": null,
          "menu_label": "open_license",
          "caption": "copy_change_spread_material",
          "url": "http://www.gapminder.org/free-material",
          "icon_url": "/images/icons/menu/license.png",
          "$$hashKey": "object:37"
        }
      ]
    }
  ]
});


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ([
  {
    "_id": "5600af4a188967b26265a73f",
    "_relatedTo": [
    ],
    "link": "//www.gapminder.org/answers/how-many-are-rich-and-how-many-are-poor/",
    "image": "assets/images/answers/poor_rich.png",
    "subtitle": "Short answer — Most are in between",
    "title": "How many are rich and how many are poor?",
    "__v": 0
  },
  {
    "_id": "560061d4fc0d7c00002110a4",
    "title": "How Reliable is the World Population Forecast?",
    "subtitle": "Short answer — Very reliable",
    "image": "assets/images/answers/population_forecast.png",
    "link": "//www.gapminder.org/answers/how-reliable-is-the-world-population-forecast/",
    "_relatedTo": [
    ]
  },
  {
    "_id": "5600ad4c188967b26265a73b",
    "_relatedTo": [
    ],
    "link": "//www.gapminder.org/answers/will-saving-poor-children-lead-to-overpopulation/",
    "image": "assets/images/answers/overpopulation.png",
    "subtitle": "Short answer — No. The opposite.",
    "title": "Will saving poor children lead to overpopulation?",
    "__v": 0
  },
  {
    "_id": "5600ae2b188967b26265a73c",
    "_relatedTo": [
    ],
    "link": "//www.gapminder.org/answers/how-does-income-relate-to-life-expectancy/",
    "image": "assets/images/answers/life_expectancy.png",
    "subtitle": "Short answer — Rich people live longer",
    "title": " How Does Income Relate to Life Expectancy?",
    "__v": 0
  },
  {
    "_id": "5600ae64188967b26265a73d",
    "_relatedTo": [
    ],
    "link": "//www.gapminder.org/answers/how-did-babies-per-woman-change-in-the-world/",
    "image": "assets/images/answers/babies_per_woman.png",
    "subtitle": "Short answer — It dropped",
    "title": "How Did Babies per Woman Change in the World?",
    "__v": 0
  },
  {
    "_id": "5600aedc188967b26265a73e",
    "_relatedTo": [
    ],
    "link": "//www.gapminder.org/downloads/updated-gapminder-world-poster-2015/",
    "image": "assets/images/answers/gapminder_world_2013_v5.jpg",
    "subtitle": "This chart compares Life Expectancy & GDP per capita of 182 nations",
    "title": "Gapminder World Poster 2015",
    "__v": 0
  },
  {
    "_id": "5600782dabde580e33c79e24",
    "_relatedTo": [
    ],
    "link": "//www.gapminder.org/answers/how-did-the-world-population-change/",
    "image": "assets/images/answers/world_population.png",
    "subtitle": "First slowly. Then fast.",
    "title": "How Did The World Population Change?",
    "__v": 0
  },
]);


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = BitlyService;
function BitlyService() {

  const bitlyUrl = 'https://api-ssl.bitly.com/v3/shorten';

  return {
    shortenUrl: function(url = document.URL, callback) {
      // if (!url.includes('gapminder')) {
      //   return;
      // }

      const serviceUrl = `${bitlyUrl}?access_token=${'c5c5bdef4905a307a3a64664b1d06add09c48eb8'}&longUrl=${encodeURIComponent(url)}`;

      return d3.json(serviceUrl, (error, response) => {
        const bitlyResponse = response;

        callback(bitlyResponse.status_code === 200 ? bitlyResponse.data.url : window.location);
      });
    }
  }
}


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_utils__ = __webpack_require__(0);


const RelatedItems = function (placeHolder, translator, dispatch, { relatedItems }) {
  const templateHtml = __webpack_require__(16);

  const template = d3.create("div")
  template.html(templateHtml);

  const itemTemplate = template.select(".related-item");
  for (let relatedItem of relatedItems) {
    itemTemplate.clone(true)
      .datum(relatedItem)
      .raise()
      .call(fillRelatedItem);
  }
  itemTemplate.remove();

  for (const elem of Array.from(template.node().children)) {
    placeHolder.append(function () { return elem; });
  }

  translate();
  dispatch.on("translate.relatedItems", () => {
    translate();
  });

  function translate() {
    placeHolder.select(".related-heading").each(__WEBPACK_IMPORTED_MODULE_0__core_utils__["a" /* translateNode */](translator));
    placeHolder.selectAll(".related-item .related-item-info .title").each(__WEBPACK_IMPORTED_MODULE_0__core_utils__["a" /* translateNode */](translator));
    placeHolder.selectAll(".related-item .related-item-info .subtitle").each(__WEBPACK_IMPORTED_MODULE_0__core_utils__["a" /* translateNode */](translator));
  }

  function fillRelatedItem(item) {
    const relatedItem = item.datum();
    const a = item.select("a");
    a.attr("href", relatedItem.link);
    a.select(".related-item-thumbnail img").attr("src", relatedItem.image);
    a.select(".related-item-info .title")
      .attr("data-text", 'related-' + relatedItem._id + '-title');
    a.select(".related-item-info .subtitle")
      .attr("data-text", 'related-' + relatedItem._id + '-subtitle');
  }

}

/* harmony default export */ __webpack_exports__["a"] = (RelatedItems);

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = "<div class=\"related-block\">\n  <h2 class=\"heading-2 related-heading\" data-text=\"popular\"></h2>\n\n  <div class=\"related-container\">\n    <ul class=\"related-items\">\n\n      <li class=\"related-item\">\n        <a rel=\"noopener\">\n          <div class=\"related-item-thumbnail\">\n            <img>\n          </div>\n          <div class=\"related-item-info\">\n            <span class=\"title\"></span>\n            <span class=\"subtitle\"></span>\n          </div>\n        </a>\n      </li>\n\n    </ul>\n  </div>\n</div>\n";

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_utils__ = __webpack_require__(0);


const Footer = function (placeHolder, translator, dispatch) {
  const templateHtml = __webpack_require__(18);

  const template = d3.create("div")
  template.html(templateHtml);

  for (const elem of Array.from(template.node().children)) {
    placeHolder.append(function() { return elem;});
  }

  translate();
  dispatch.on("translate.footer", () => {
    translate();
  });

  function translate() {
    placeHolder.selectAll("ul.nav li a")
      .each(__WEBPACK_IMPORTED_MODULE_0__core_utils__["a" /* translateNode */](translator));
  }

}

/* harmony default export */ __webpack_exports__["a"] = (Footer);

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = "<div class=\"wrapper-error hidden\"></div>\n<div class=\"wrapper-analytics hidden\"></div>\n\n<div class=\"footer-container\">\n    <div class=\"footer-container menu-holder\">\n        <div class=\"logo-gray\">\n            <img src=\"assets/images/logo-gray.png\">\n        </div>\n        <div class=\"general-menu\">\n            <ul class=\"nav\">\n                <li><a href=\"//gapminder.org/world\" data-text=\"old_bubble_chart\"></a></li>\n                <li><a href=\"//gapminder.org/for-teachers/\" data-text=\"for_teachers\"></a></li>\n            </ul>\n        </div>\n        <div class=\"main-menu\">\n            <ul class=\"nav\">\n                <li><a href=\"//gapminder.org/about-gapminder/\" data-text=\"about\"></a></li>\n                <li><a href=\"//gapminder.org/about-gapminder/contact/\" data-text=\"contact\"></a></li>\n                <li><a href=\"//gapminder.org/news/\" data-text=\"blog\"></a></li>\n                <li><a href=\"//gapminder.org/donations/\" data-text=\"donate\"></a></li>\n                <li><a href=\"//docs.google.com/a/gapminder.org/document/pub?id=1POd-pBMc5vDXAmxrpGjPLaCSDSWuxX6FLQgq5DhlUhM\" data-text=\"terms\"></a></li>\n                <li><a href=\"//gapminder.org/about-gapminder/press-and-media/\" data-text=\"media\"></a></li>\n                <li><a href=\"//gapminder.org/faq_frequently_asked_questions/\" data-text=\"help\"></a></li>\n                <li><a href=\"//vizabi.org/tutorials/\" data-text=\"labs\"></a></li>\n                <li><a href=\"//getsatisfaction.com/gapminder/#problem\" data-text=\"report_problem\"></a></li>\n            </ul>\n        </div>\n    </div>\n    <div class=\"footer-container service-container\">\n        <div class=\"service-content\">\n            <a href=\"https://twitter.com/intent/tweet?original_referer=http%3A%2F%2Fwww.gapminder.org&related=Gapminder&text=Gapminder&tw_p=tweetbutton&url=http%3A%2F%2Fwww.gapminder.org%2Ftools%2F\"><img src=\"assets/images/footer/twitter-gray.png\"></a>\n            <a href=\"http://www.addtoany.com/add_to/facebook?linkurl=http%3A%2F%2Fwww.gapminder.org%2Ftools%2F&\"><img src=\"assets/images/footer/facebook-gray.png\"></a>\n        </div>\n    </div>\n</div>\n";

/***/ })
/******/ ]);
//# sourceMappingURL=toolspage.js.map