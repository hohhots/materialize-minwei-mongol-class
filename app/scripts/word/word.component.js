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

      setMonText(self.orgintext);
    };

    self.containerStyle = {};
    self.monText = '';

    var parentElemClass = ".wordbegin-word";
    var parentElem = $element.parents(parentElemClass);
    var mongolTagPrefix = '<span class="';
    var mongolTagSuffix = '"></span>';
    
    var tagsToReplace = {
      n31: mongolTagPrefix + 'hawang-ni1' + mongolTagSuffix,
      g23: mongolTagPrefix + 'hawang-he3' + mongolTagSuffix,
      m41: mongolTagPrefix + 'hawang-mo1' + mongolTagSuffix,
      d43: mongolTagPrefix + 'hawang-to3' + mongolTagSuffix,
      a21: mongolTagPrefix + 'hawang-e1' + mongolTagSuffix,
      b22: mongolTagPrefix + 'hawang-ba2' + mongolTagSuffix,
      s43: mongolTagPrefix + 'hawang-so3' + mongolTagSuffix,
    };

    var setMonText = function (str) {
      str = str.replace(/n31/g, replaceTag);
      str = str.replace(/g23/g, replaceTag);
      str = str.replace(/m41/g, replaceTag);
      str = str.replace(/d43/g, replaceTag);
      str = str.replace(/a21/g, replaceTag);
      str = str.replace(/b22/g, replaceTag);
      str = str.replace(/s43/g, replaceTag);
      self.monText = $sce.trustAsHtml(str);
    };

    function replaceTag(tag) {
      return tagsToReplace[tag] || tag;
    }

  };
})();