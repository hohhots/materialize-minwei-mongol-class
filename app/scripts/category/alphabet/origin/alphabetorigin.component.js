'use strict';

(function () {
  // Define the `header` module
  var app = angular.module('app.category');

  // Register `headerList` component, along with its associated controller and template
  app.component('appAlphaorigin', {
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
    self.templateUrl = config.templateUrl.alphabetorigin;

    // ser value for self variables
    self.alphaClicked = function(name) {console.log(name);
      
      $scope.$broadcast(config.events.playAlphaVideo, name);
    };

  };

})();
