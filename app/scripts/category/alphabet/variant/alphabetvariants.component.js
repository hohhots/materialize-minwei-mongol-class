'use strict';

(function () {
  // Define the `header` module
  var app = angular.module('app.category');

  // Register `headerList` component, along with its associated controller and template
  app.component('alphaVariant', {
    template: '<div ng-include="$ctrl.templateUrl"></div>',
    bindings: {
      levelid: '<',
      pagenum: '<',
      subData: '<'
    },
    controller: ['$scope', '$element', 'Config', 'Util', 'Json', controller]
  });

  function controller($scope, $element, config, util, json) {
    var self = this;

    // variable for outside access
    self.data = [];
    self.langs = {};
    self.langs.practice = config.alphaLangs.practice;
    self.langs.introduction = config.alphaLangs.introduction;
    self.langs.alphaFilter = config.alphaLangs.filter;
    self.templateUrl = config.templateUrl.alphabetvariant;

    self.$onInit = function () {
      self.data = self.subData;
    };

    self.alphaFilterClick = function () {
      $scope.$broadcast(config.events.displayAlphaFilter);
    };

    self.introductionClicked = function () {
      var names = {};
      var url = config.mediaUrl.alphaOrigin;
      names.videos = {
        ogv: url + config.data.videos + '/variant' + config.dataTypes.videos[0],
        webm: url + config.data.videos + '/variant' + config.dataTypes.videos[1]
      };
      names.name = self.jsonData[0].name;
      $scope.$broadcast(config.events.playIntroductionVideo, names);
    };

    self.practiceClick = function () {
      util.changePath(config.pagesUrl.variantPractice);
    };

    // 'vowelName' format is like 'a' 'e' 'ji' 'go'
    // return 'a10' 'e10' 'j10' 'g40'
    self.getAlphaText = function (vowelName) {
      return util.convertAlphaNameToCode(vowelName);
    };

    // vowelName is like 'a' 'u2' 'ta' 'ji'
    // return ''
    self.getVariantText = function (vowelName, position) {
      return util.convertVariantNameToCode(vowelName, position);
    };

    self.fourthClass = function (vowelName) {
      var cssClass = 'alphabetvariant-fonts-none';

      var alpha = vowelName.substr(0, 1);
      if (fourthClasses[alpha]) {
        return 'alphabetvariant-fonts-end';
      }
      
      if (util.alphaExist(vowelName)) {
        cssClass = 'alphabetvariant-fonts-end';
        if (!fourthClasses[alpha]) {
          fourthClasses[alpha] = true;
        }
      }
      return cssClass;
    };

    var fourthClasses = {};

    var filtAlphaVariants = function (event, alphaIds) {
      if (alphaIds.length == 0) {
        self.$onInit();
        return;
      }
      var td = angular.copy(self.subData);
      td = td.filter(function (alpha) {
        return alphaIds.indexOf(alpha.id) > -1;
      });
      self.data = td;
    };

    // add listener and hold on to deregister function
    var deregister = [];
    deregister.push($scope.$on(config.events.filtAlphaVariants, filtAlphaVariants));

    //deregister.push(videoElem.on('ended', videoEnded));
    // clean up listener when directive's scope is destroyed
    $.each(deregister, function (i, val) {
      $scope.$on('$destroy', val);
    });
  };

})();
