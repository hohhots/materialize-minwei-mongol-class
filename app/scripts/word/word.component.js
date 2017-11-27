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
        setTextArray();
        setDimension();
      }
    };

    var textArray = [],
      textSpansArray = [],
      parentElem;

    var setTextArray = function () {
      textArray = [];
      var len = self.origintext.length / 3;
      if (len == 0) { return; }
      for (var i = 0; i < len; i++) {
        var j = i * 3;
        textArray[i] = self.origintext.substring(j, j + 3);
      }
      //console.log(textArray);
    };

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
        //console.log(textSpansArray);
      }, 20);
    };

    //must called after rendering, so use $interval for call this function.
    var getWordSpan = function () {
      var dd = $interval(function () {
        textSpansArray = $element.find(wordConfig.wordContainerCellClass).children();        
        $scope.$emit(config.events.setWordAnimationElement, [textArray, textSpansArray, parentElem]);
        $interval.cancel(dd);
      }, 30);
    };

    // add listener and hold on to deregister function
    var deregister = [];
    deregister.push($scope.$on(config.events.wordGetWordSpans, getWordSpan));
    //deregister.push($scope.$on(config.events.playIntroductionVideo, playIntroductionVideo));

    // clean up listener when directive's scope is destroyed
    $.each(deregister, function (i, val) {
      $scope.$on('$destroy', val);
    });
  };
})();