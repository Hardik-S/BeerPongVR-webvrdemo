AFRAME.registerComponent('waitforairhorn', {
  schema: {},
  init: function () {
    this.toggle = true;
  },
  tock: function (time, timeDelta) {
    if (time > 7500 && this.toggle) {
      var airhorn = document.getElementById('airhorn');
      if (!airhorn) {
        this.toggle = false;
        return;
      }
      airhorn.setAttribute('autoplay', 'true');
      this.toggle = false;
    }
  },
});
