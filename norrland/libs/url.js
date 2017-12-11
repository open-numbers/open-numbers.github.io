var URLI = {};
//URLON
var urlon = urlonMaker();

function updateURL(event) {
  if (poppedState && Vizabi.utils.comparePlainObjects(viz.getModel(), poppedState)) return;
  
  poppedState = null;

  var model;
  if(typeof viz !== 'undefined') {
    minModel = viz.getPersistentMinimalModel(VIZABI_PAGE_MODEL);
  }

  var url = {
    tool: appState.tool
  };

  if(minModel && Object.keys(minModel).length > 0) {
    url.model = minModel;
  }
  console.log('pushing state', viz.getModel(), event)
  window.history.pushState({ tool: url.tool, model: viz.getModel() }, 'Title', "#" + urlon.stringify(url));
}

function parseURL() {
  var loc = window.location.toString();
  var hash = null;
  URLI = {
  };
  if(loc.indexOf('#') >= 0) {
    hash = loc.substring(loc.indexOf('#') + 1);

    if(hash) {
      parsedUrl = urlon.parse(hash);

      URLI = parsedUrl || {};
      return;
    }
  }
}


window.addEventListener('popstate', function(e) {
  console.log(e, Vizabi.utils.diffObject());
  if (e.state) {

    console.log("model diff", Vizabi.utils.diffObject(e.state.model, viz.getModel()));
    poppedState = e.state.model;
    viz.setModel(e.state.model);

    appState.language = viz.getModel().locale.id;
    updateView();
  } else {
    poppedState = null;
  }
});

function resetURL() {
  window.history.replaceState('Object', 'Title', "#");
}