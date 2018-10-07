'use strict';

(function ($) {
  // Define the `header` module
  var app = angular.module('app.home');

  // Register `headerList` component, along with its associated controller and template
  app.component('appLevels', {
    template: '<div ng-include="$ctrl.templateUrl"></div>',
    bindings: {
      levelid: '<'
    },
    controller: [
      '$location',
      '$scope',
      '$http',
      'Config',
      'Util',
      Controller]
  });

  function Controller($location, $scope, $http, config, util) {
    var self = this;

    self.templateUrl = config.templateUrl.appLevels;
    self.langs = {};
    self.levelid = 0;
    self.bookPath = util.getBookPath(self.levelid);
    self.pageNum = 1;
    self.selectPages = false;
    // alpha list data directory hash names array
    self.pagesName = util.getBookPagesName(self.levelid);
    self.firstPage = true;
    self.endPage = false;

    self.headerStyle = {backgroundColor: '#336699'};

    self.$onInit = function () {
      if (redirect()) {
        return;
      };

      self.langs.previousPage = config.levelsLangs.previousPage;
      self.langs.nextPage = config.levelsLangs.nextPage;
      self.langs.selectPage = config.levelsLangs.selectPage;
      
      
      var json = util.getLevelsJson(self.levelid);
      $http.get(json.json, { cache: true }).then(setIntroduction);

      if(!self.bookPath){
        $http.get(json.data, { cache: true }).then(setBook);
      }
      
      util.setCurrentBackgroundColor();
      $('body').css('background', '#3f3f3f');
      
      //util.scrollToTop();
    };

    self.showSelectPages = function() {
      self.selectPages = !self.selectPages;
    };

    self.showSelectedPage = function() {
      self.showSelectPages();
      var page = self.getSeletedPageNum();
      if (page && (page !== self.pageNum)) {
        var path = $location.path();
        path = path.substr(0, path.lastIndexOf('/') + 1);
        $location.path(path + page);
      }
      self.seletedPageNum = '';
    };

    self.getFileName = function(order) {
      return self.pagesName[--order];
    };

    self.setPageNum = function(pagenum) {
      self.pageNum = pagenum;
      isFirstPage();
    };

    self.getBookPath = function() {
      return self.bookPath;
    };

    self.validPageNum = function(pageNum) {
      var path = $location.path();
      path = path.substr(0, path.lastIndexOf('/') + 1);
      var length = this.pagesName.length;
      if (pageNum < 1 || pageNum > length) {
        $location.path(path + 1);
        return false;
      }
      return true;
    };

    self.getSeletedPageNum = function() {
      if (self.seletedPageNum && (self.seletedPageNum > 0 && self.seletedPageNum <= this.pagesName.length)) {
        return parseInt(self.seletedPageNum, 10);
      }
      return self.pageNum;
    };

    self.displayPageOnkey = function(event) {
      if (event.keyCode === 13) {
        self.showSelectedPage();
      }
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

    var isFirstPage = function() {
      self.firstPage = (self.pageNum === 1);
      self.endPage = (self.pageNum === self.pagesName.length);
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

    var setBook = function(resp) {
      self.pagesName = (resp.data)[0].pages;
      self.bookPath = (resp.data)[0].bookPath;

      util.setBookPath(self.levelid, self.bookPath);
      util.setBookPagesName(self.levelid, self.pagesName);
      
      isFirstPage();
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
