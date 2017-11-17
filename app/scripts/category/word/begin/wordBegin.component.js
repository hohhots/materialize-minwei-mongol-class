'use strict';

(function () {
  // Define the `header` module
  var app = angular.module('app.category');

  // Register `headerList` component, along with its associated controller and template
  app.component('appWordbegin', {
    template: '<div ng-include="$ctrl.templateUrl"></div>',
    bindings: {
      jsonData: '<',
      subData: '<'
    },
    controller: ['$scope', '$element', 'Config', 'Util', 'Json', controller]
  });

  function controller($scope, $element, config, util, json) {
    var self = this;

    // variable for outside access 
    self.templateUrl = config.templateUrl.wordBegin;
    self.introduction = config.alphaLangs.introduction;
    self.translate = config.alphaLangs.translate;
    self.practice = config.alphaLangs.practice;

    self.translateClick = function () {
      console.log('ho');
    };
    
  };

})();
