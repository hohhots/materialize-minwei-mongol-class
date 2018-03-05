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
      '$http',
      'Config',
      'Util',
      Controller]
  });

  function Controller($location, $scope, $sce, $http, config, util) {
    var self = this;

    self.templateUrl = config.templateUrl.appLevels;
    self.langs = {};
    self.id = 0;

    self.$onInit = function () {console.log($location.search());
      var json = getLevelsJson();
      $http.get(json.json, { cache: true }).then(setIntroduction);
      $http.get(json.data, { cache: true }).then(setClasses);

      util.setCurrentBackgroundColor();
      $('body').css('background', '#3f3f3f');
    };

    var setIntroduction = function(resp) {
      // console.log(resp.data);
      setLevelIntroduction(resp.data);
    };

    var setClasses = function(resp) {
      // console.log(resp.data);
      self.langs.classes = resp.data;
    };

    var getLevelsJson = function() {
      var json = angular.copy(config.dataPath['appLevels']);
      self.id = config.getParameterByName('id');
      json.data = json.data + self.id + '/' + self.id + '.json';
      // console.log(json);
      return json;
    };

    var setLevelIntroduction = function(data) {
      var introduction = '';
      $.each(data, function(index, val) {
        // console.log(val);
        if(val.id == self.id) {
          self.langs.introduction = val;
          return false;
        }
      });
    };

    $scope.$on('$destroy', util.restoreBackgroundColor);
  }

})(jQuery);
