'use strict';

(function () {
  // Define the `header` module
  var app = angular.module('app.word');

  // Register `headerList` component, along with its associated controller and template
  app.component('monWord', {
    template: '<div ng-include="$ctrl.templateUrl"></div>',
    bindings: {
      orgintext: '@'
    },
    controller: [
      '$scope',
      '$sce',
      '$element',
      '$interval',
      'wordConfig',
      'Util',
      'Json',
      controller]
  });

  function controller($scope, $sce, $element, $interval, config, util, json) {
    var self = this;

    //define self variables
    self.templateUrl = config.template;

    self.$postLink = function () {
      self.containerStyle.position = "absolute";
      self.containerStyle.width = parentElem.height();
      self.containerStyle.height = parentElem.width();

      self.monText = $sce.trustAsHtml(config.setMonWord(self.orgintext));
      //setMonText(self.orgintext);
    };

    self.containerStyle = {};
    self.monText = '';

    var parentElemClass = ".wordbegin-word";
    var parentElem = $element.parents(parentElemClass);

  };
})();