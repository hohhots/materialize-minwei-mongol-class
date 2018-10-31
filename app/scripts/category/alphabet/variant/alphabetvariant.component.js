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
    self.alphaPositions = 0;
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

    // a50 -> a40
    self.getAlphaText = function (vowelName) {
      return util.getAlphaMapName(vowelName);
    };

    // return ''
    self.getVariantText = function (name, position) {
      name = name.substring(0, 2) + position;
      return util.getAlphaMapName(name);
    };

    self.alphaClass = function (alphaName, position) {
      position = parseInt(position, 10);
      alphaName = alphaName.substring(0, 2) + position;
      var cssClass = 'alphabetvariant-fonts-none';

      if (util.alphaExist(alphaName)) {
        var id = '';
        if ((position > 3) && (position < 7)) {
          id = '2';
        }
        cssClass = 'alphabetvariant-fonts' + id;
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
      self.alphaPositions = util.getAlphaPositions();
    };

    self.twoAlphasStyle = function () {
      if (self.data[0].vowel.length === 2) {
        return 'alphabetvariant-two';
      }
    };
  };
})();
