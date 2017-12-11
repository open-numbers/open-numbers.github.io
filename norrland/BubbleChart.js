VIZABI_MODEL = {
  "state": {
    "time": {
      "dim": "YEAR"
    },
    "entities": {
      "dim": "HASC_2"
    },
    "entities_colorlegend": {
      "dim": "HASC_2"
    },
    "entities_tags": {
      "dim": null
    },
    "marker": {
      "axis_x": {
        which: "Smoking"
      },
      "axis_y": {
        which: "Stress"
      },
      "label": {
        which: "NAME_2"
      },
      "color": {
        use: "property",
        which: "NAME_1",
        scaleType: "ordinal"
      },
      "size": {
        use: "indicator",
        which: "Population",
        scaleType: "linear"
      }
    }
  
  }
};
