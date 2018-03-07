'use strict';

(function ($) {
  // Define the `header` module
  var app = angular.module('app.home');

  // Register `headerList` component, along with its associated controller and template
  app.component('appClassroom', {
    template: '<div ng-include="$ctrl.templateUrl"></div>',
    bindings: {
      levelid: '<',
      jsonData: '<',
      subData: '<'
    },
    controller: [
      '$location',
      '$scope',
      '$sce',
      '$http',
      'Config',
      'Util',
      Controller]
  });

  function Controller($location, $scope, $sce, $http, config, util) {
    var self = this;

    self.templateUrl = config.templateUrl.appClassroom;
    self.langs = {};
    self.langs.notSupportHtml5Audio = config.alphaLangs.notSupportHtml5Audio;


    self.$onInit = function () {

    };
  }
})(jQuery);
