'use strict';

(function ($) {
  // Define the `header` module
  var app = angular.module('app.home');

  // Register `headerList` component, along with its associated controller and template
  app.component('appLevels', {
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

    self.templateUrl = config.templateUrl.appLevels;
    self.langs = {};
    self.levelid = 0;
    self.classId = 1;
    self.classes = [];
    self.classesShow = false;
    self.firstClass = true;
    self.endClass = false;

    self.headerStyle = {backgroundColor: '#336699'};

    self.$onInit = function () {console.log($location.path());
      if (redirect()) {
        return;
      };

      self.langs.previousClass = config.levelsLangs.previousClass;
      self.langs.nextClass = config.levelsLangs.nextClass;
      
      var json = getLevelsJson();
      $http.get(json.json, { cache: true }).then(setIntroduction);
      $http.get(json.data, { cache: true }).then(setClasses);

      util.setCurrentBackgroundColor();
      $('body').css('background', '#3f3f3f');
      
      util.scrollToTop();
    };

    self.showClasses = function() {
      self.classesShow = !self.classesShow;
    };

    self.previousClass = function() {
      // console.log('ddd');
    };

    self.nextClass = function() {
      // console.log('dddg');
    };

    var redirect = function() {
      var url = $location.path();

      if(!self.levelid){
        url += 'a/1';
      } else {
        if(!/[a|b|c]/g.test(self.levelid)) {
          $location.path('/root');
          return false;
        }
        var count = (url.match(/\//g) || []).length;
        if(count == 3) {
          url += '/1';
          // run two times will change the child state
          // this is first time.
          $location.path(url);
        }
      }

      if(url != $location.path()) {
        $location.path(url);
        return true;
      }
      return false;
    };

    var isFirstClass = function() {
      self.firstClass = (self.classId === 1);
      self.endClass = (self.classId === self.classes.length);
    };

    var setIntroduction = function(resp) {
      // console.log(resp.data);
      setLevelIntroduction(resp.data);
    };

    var getLevelsJson = function() {
      var json = angular.copy(config.dataPath['appLevels']);

      json.data = json.data + self.levelid + '/' + self.levelid + '.json';
      // console.log(json);
      return json;
    };

    var setClasses = function(resp) {
      console.log((resp.data)[0].classesDir);
      self.classes = (resp.data)[0].classesDir;

      isFirstClass();
    };

    var setLevelIntroduction = function(data) {
      var introduction = '';
      $.each(data, function(index, val) {
        // console.log(val);
        if(val.id == self.levelid) {
          self.langs.introduction = val;
          setHeaderStyle(val);
          return false;
        }
      });
    };

    var setHeaderStyle = function(val) {
      var styles = self.headerStyle;
      styles.backgroundColor = val.backcolor;
      styles.color = val.color;
    };

    $scope.$on('$destroy', util.restoreBackgroundColor);
  }

})(jQuery);
