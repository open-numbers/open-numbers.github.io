VIZABI_MODEL = {
  "state": {
    "time": {
      "startOrigin": "1993",
      "endOrigin": "2015",
      "value": "2000",
      "dim": "year",
      "delay": 700
    },
    "entities": {
      "dim": "basomrade",
      "show": {"size": "big"}
    },
    "entities_colorlegend": {
      "dim": "municipality"
    },
    "entities_tags": {
      "dim": "tag"
    },
    "marker": {
      "opacityRegular": 0.6,
      "space": ["entities", "time"],
      "label": {
        "use": "property",
        "which": "name"
      },
      "axis_y": {
        "which": "post_secondary_education_min_3_years_aged_25_64",
        "use": "indicator"
      },
      "axis_x": {
        "which": "mean_income_aged_gt_20",
        "use": "indicator",
        "scaleType": "linear"
      },
      "size": {
        "which": "population_aged_gt_20",
        "use": "indicator",
        "scaleType": "linear",
        "extent": [0, 1],
        "domainMin": 150,
        "domainMax": 900000,
        "allow": {
          "scales": ["linear"]
        }
      },
      "color": {
        "use": "property",
        "which": "municipality",
        "scaleType": "ordinal",
        "syncModels": ["marker_colorlegend"]
      }
    },
    "marker_colorlegend":{
      "space": ["entities_colorlegend"],
      "opacityRegular": 0.8,
      "opacityHighlightDim": 0.3,
      "label": {
        "use": "property",
        "which": "name"
      },
      "hook_rank": {
        "use": "property",
        "which": "rank"
      },
      "hook_geoshape": {
        "use": "property",
        "which": "shape_lores_svg"
      }
    },
    "marker_tags": {
      "space": ["entities_tags"],
      "label": {
        "use": "property",
        "which": "name"
      },
      "hook_parent": {
        "use": "property",
        "which": "parent"
      }
    },
    "marker_allpossible": {
      "space": ["entities"],
      "label": {
        "use": "property",
        "which": "name"
      },
      "skipFilter": true
    }
  },
  "ui": {
    datawarning: {
      doubtDomain: [2000, 2014],
      doubtRange: [0, 0]
    },
    "chart": {
      "maxRadiusEm": 0.15, 
      "labels": {"removeLabelBox": true},
      "trails": false
    },
    "splash": true,
    "dialogs": {
      "popup": ["colors", "show", "find", "size", "zoom", "moreoptions"],
      "dialog": {
        "show": {
          enablePicker: true
        },
        "find": {
          enablePicker: true
        }
      }
    },
    "buttons": ["colors", "show", "find", "trails", "lock", "moreoptions", "fullscreen", "presentation"]
  }
};
