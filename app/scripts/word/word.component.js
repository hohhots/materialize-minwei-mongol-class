'use strict';

(function () {
  // Define the `header` module
  var app = angular.module('app.word');

  // Register `headerList` component, along with its associated controller and template
  app.component('monWord', {
    template: '<div ng-include="$ctrl.templateUrl" class="word-outerContainer"></div>',
    bindings: {
      origintext: '@'
    },
    controller: [
      '$scope',
      '$sce',
      '$element',
      '$interval',
      'Config',
      'wordConfig',
      'Util',
      'Json',
      controller]
  });

  function controller($scope, $sce, $element, $interval, config, wordConfig, util, json) {
    var self = this;

    //define self variables
    self.templateUrl = wordConfig.template;
    self.monText = '';
    self.containerStyle = {};

    self.$onChanges = function (changes) {
      if (changes['origintext']) {
        setDimension();
      }
    };

    var parentElem;

    var setDimension = function () {
      var dd = $interval(function () {
        if (!parentElem) {
          parentElem = $element.parent();
        }

        var ow = parentElem[0].offsetWidth;
        var oh = parentElem[0].offsetHeight;

        self.containerStyle.position = "absolute";
        self.containerStyle.width = oh + 'px';
        self.containerStyle.height = ow + 'px';

        //if (oh != 0) {
        $interval.cancel(dd);
        //}

        self.monText = $sce.trustAsHtml(wordConfig.setMonWord(self.origintext));
      }, 20);
    };

    //must called after rendering, so use $interval for call this function.
    var getWordSpans = function () {
      var a = $element.find(wordConfig.wordContainerCellClass).children();
    };

    // add listener and hold on to deregister function
    var deregister = [];
    deregister.push($scope.$on(config.events.wordGetWordSpans, getWordSpans));
    //deregister.push($scope.$on(config.events.playIntroductionVideo, playIntroductionVideo));

    // clean up listener when directive's scope is destroyed
    $.each(deregister, function (i, val) {
      $scope.$on('$destroy', val);
    });
  };
})();