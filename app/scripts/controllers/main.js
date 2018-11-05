'use strict';

/**
 * @ngdoc function
 * @name feTaskSApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the feTaskSApp
 */
angular.module('feTaskSApp')
  .controller('MainCtrl', ['$http', function ($http) {
    var main = this;

    var gaugeOpts = {
      angle: 0.25,
      lineWidth: 0.10,
      radiusScale: 1,
      limitMax: true,
      limitMin: true,
      colorStart: '#0D0DA0',
      colorStop: '#864DDB',
      strokeColor: '#EEEEEE',
      generateGradient: true,
      highDpiSupport: true
    };
    var target = document.getElementById('gauge');
    var gauge = new Donut(target).setOptions(gaugeOpts);
    gauge.animationSpeed = 19;


    this.loadData = function () {
      getDataFromServer();
    };

    function getDataFromServer() {
      $http({
        method: 'GET',
        url: 'https://widgister.herokuapp.com/challenge/frontend'
      }).then(function (response) {
        gauge.maxValue = response.data.max;
        gauge.setMinValue(response.data.min);
        gauge.set(response.data.value);
        main.gauge = {
          min: response.data.min,
          max: response.data.max,
          value: response.data.value,
          format: response.data.format || 'currency',
          unit: response.data.unit || 'GBP'
        };
      }, function (error) {
        alert(JSON.stringify(error, null, ' '));
      });
    }
    getDataFromServer();
  }]);
