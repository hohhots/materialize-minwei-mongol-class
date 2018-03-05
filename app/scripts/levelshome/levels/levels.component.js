'use strict';

(function ($) {
  // Define the `header` module
  var app = angular.module('app.home');

  // Register `headerList` component, along with its associated controller and template
  app.component('appLevels', {
    template: '<div ng-include="$ctrl.templateUrl"></div>',
    bindings: {
      jsonData: '<',
      subData: '<'
    },
    controller: [
      '$location',
      '$scope',
      '$sce',
      'Config',
      'Util',
      Controller]
  });

  function Controller($location, $scope, $sce, config, util) {
    var self = this;

    self.templateUrl = config.templateUrl.appLevels;

    self.$onInit = function () {console.log($location.search());
      util.setCurrentBackgroundColor();
      $('body').css('background', '#3f3f3f');
    };

    $scope.$on('$destroy', util.restoreBackgroundColor);
  }

})(jQuery);
