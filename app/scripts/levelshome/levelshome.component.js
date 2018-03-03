'use strict';

(function($) {
  // Define the `header` module
  var app = angular.module('app.home');

  // Register `headerList` component, along with its associated controller and template
  app.component('levelsHome', {
    template: '<div ng-include="$ctrl.templateUrl"></div>',
    controller: [
      '$scope',
      '$sce',
      'Config',
      'Util',
      'Json',
      Controller]
  });

  function Controller($scope, $sce, config, util, json) {
    var self = this;

    self.templateUrl = config.templateUrl.levelshome;

    self.jsons = json;

    self.appDetailShow = false;
    self.monDetailShow = false;

    self.showAppDetail = function() {
      self.appDetailShow = !self.appDetailShow;
    };

    self.showMonDetail = function() {
      self.monDetailShow = !self.monDetailShow;
    };

    var background = $('body').css('background');
    $('body').css('background', '#3f3f3f');

    var restoreBackground = function() {
      $('body').css('background', background);
    };

    $scope.$on('$destroy', restoreBackground);
  }

})(jQuery);
