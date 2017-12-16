'use strict';

(function () {
  // Define the `header` module
  var app = angular.module('app.ime');

  // Register `mwordIme` component, along with its associated controller and template
  app.component('mwordIme', {
    template: '<div ng-include="$ctrl.templateUrl"></div>',
    bindings: {
      jsonData: '<',
      subData: '<'
    },
    controller: [
      '$scope',
      '$element',
      '$interval',
      'Config',
      'wordConfig',
      'Util',
      'Json',
      controller]
  });

  function controller($scope, $element, $interval, config, wordConfig, util, json) {
    var self = this;

    //define self variables
    self.templateUrl = config.templateUrl.wordIme;
    self.showWordIme = false;
    self.word = '';

    // ser value for self variables
   
    function startWordIme(event, word) {
      self.showWordIme = true;
      self.word = word;
      $scope.$broadcast(config.events.setDimension);
      console.log(String.fromCharCode(0xe9e5));
    };
    //add listener and hold on to deregister function
    var deregister = [];
    deregister.push($scope.$on(config.events.startWordIme, startWordIme));

    // clean up listener when directive's scope is destroyed
    $.each(deregister, function (i, val) {
      $scope.$on('$destroy', val);
    });
  };
})();
