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
      'Config',
      'Util',
      'Json',
      controller]
  });

  function controller($scope, $element, config, util, json) {
    var self = this;
    
    //define self variables
    self.templateUrl = config.templateUrl.originpractice;
    self.name = '';

    self.$onInit = function () {
      self.name = self.jsonData[0].name + config.alphaLangs.practice;
    };
  };

})();