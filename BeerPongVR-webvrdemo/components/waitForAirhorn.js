AFRAME.registerComponent('waitforairhorn', {
  schema: {},
  init: function () {
    this.toggle = true;
  },
  tock: function (time, timeDelta) {
    if (time > 7500 && this.toggle) {
      var airhorn = document.getElementById('airhorn');
      airhorn.setAttribute('autoplay', 'true');
      console.log('bam');
      this.toggle = false;
    }
  },
});
