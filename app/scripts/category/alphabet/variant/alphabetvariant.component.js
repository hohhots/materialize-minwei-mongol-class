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
      subData: '<',
      jsonData: '<'
    },
    controller: ['$state', '$scope', '$element', 'Config', 'Util', 'Json', controller]
  });

  function controller($state, $scope, $element, config, util, json) {
    var self = this;

    // variable for outside access
    self.bookJson = [];
    self.data = [];
    self.langs = {};
    self.langs.practice = config.alphaLangs.practice;
    self.langs.introduction = config.alphaLangs.introduction;
    self.langs.back = config.alphaLangs.back;
    self.templateUrl = config.templateUrl.alphabetvariant;

    self.$onInit = function () {
      util.setBook(self);
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
      //util.changePath(config.pagesUrl.variantPractice);
      $state.go(config.uiState.variantPractice.name, {levelid: self.levelid, pagenum: self.pagenum});
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
      
      if (util.fourthAlphaExist(vowelName)) {
        cssClass = 'alphabetvariant-fonts-end';
        if (!fourthClasses[alpha]) {
          fourthClasses[alpha] = true;
        }
      }
      return cssClass;
    };

    self.backClick = function () {
      $state.go(config.uiState.books.name, {levelid: self.levelid, pagenum: self.pagenum});
    };

    self.setModels = function (book, json) {
      self.bookJson = json;

      var order = self.bookJson.orderInList;
      self.data = self.subData.slice(order - 1, order);
    };

    self.twoAlphasStyle = function () {
      if (self.data[0].vowel.length === 2) {
        return 'alphabetvariant-two';
      }
    };

    var fourthClasses = {};
  };

})();
