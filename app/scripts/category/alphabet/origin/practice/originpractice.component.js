'use strict';

(function () {
  // Define the `header` module
  var app = angular.module('app.category');

  // Register `headerList` component, along with its associated controller and template
  app.component('originPractice', {
    template: '<div ng-include="$ctrl.templateUrl"></div>',
    bindings: {
      jsonData: '<',
      subData: '<'
    },
    controller: [
      '$scope',
      '$element',
      '$location',
      'Config',
      'Util',
      'Json',
      controller]
  });

  function controller($scope, $element, $location, config, util, json) {
    var self = this;
    
    //define self variables
    self.templateUrl = config.templateUrl.originpractice;
    self.name = '';
    self.testAlphas = [];

    self.$onInit = function () {
      self.name = self.jsonData[0].name + config.alphaLangs.practice;
      setFourAlphas();
    };

    self.exitPractice = function () {
      $location.path("/" + config.app.url + "/" + config.pagesUrl.alphaOrigin);
    };

    var setFourAlphas = function() {
      var position = Math.floor(Math.random()*(self.subData.length - 3));
      self.testAlphas = self.subData.slice(position, position+4);
    };
  };

})();