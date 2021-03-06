'use strict';

(function(){
  // Define the `header` module
  var app = angular.module('app.header', [
    'core.config',
    'core.util'
  ]);

  // Register `headerList` component, along with its associated controller and template
  app.component('appHeader', {
      template: '<div ng-include="$ctrl.templateUrl"></div>',
      //'scripts/header/header.template.html',
      controller: ['$scope', 'Config', 'Util', controller]
    });

  function controller($scope, config, util) {
    var self = this;

    var changeOverState = function(elem, over) {
      if(!elem.style){
        elem.style = {};
      }

      if(over) {
        elem.style.color = "#21242c";
        elem.style.backgroundColor = "#FFFFFF";
      } else {
        elem.style.color = "";
        elem.style.backgroundColor = "transparent";
      }

    };

    var changeSubjectsOverState = function(over) {
      if(!self.subjects.style){
        self.subjects.style = {};
      }

      if(over) {
        self.subjects.style.color = "#21242c";
      } else {
        self.subjects.style.color = "";
      }
    };

    var changeLogoOverState = function(over) {
      if(!self.logo.style){
        self.logo.style = {};
      }

      if(over) {
        self.logo.style.color = "#21242c";
      } else {
        self.logo.style.color = "";
      }
    };

    var changePhoneMenuOverState = function(over) {
      if(!self.phoneMenu.style){
        self.phoneMenu.style = {};
      }

      if(over) {
        self.phoneMenu.style.color = "#21242c";
      } else {
        self.phoneMenu.style.color = "";
      }
    };

    var changeAllOverState = function(over) {
      changeOverState(self.navWrapperDiv, over);
      changeSubjectsOverState(over);
      changeLogoOverState(over);
      changePhoneMenuOverState(over);
    };

    var windowClick = function(e) {
      if(self.subjects.clicked){
        self.subjectsClicked();
        self.navMouseLeave();
      }
    };

    $(window).click(function(e){
      $scope.$apply(function(){
        windowClick(e);
      });
    });

    self.templateUrl = config.templateUrl.header;

    // data for header nav
    self.navWrapperDiv = {};
    self.nav = {};

    self.subjectsIconClass = true;
    self.subjects = {};
    self.subjects.clicked = false;

    self.logo = {};

    self.phoneIconClass = true;
    self.phoneMenu = {};
    self.phoneMenu.clicked = false;

    self.getUrl = function(url) {
      return util.convertUrl(url);
    };

    self.subjectsClicked = function (e) {
      e = e || self.subjects.triggerEvent;

      e.stopPropagation();
      self.subjects.triggerEvent = e;
      self.subjects.dropDownElem = $(e.currentTarget).next();

      self.subjectsIconClass = !self.subjectsIconClass;
      self.subjects.clicked = !self.subjects.clicked;

      // Hide document body overflow scroller
      $scope.$parent.ctrl.toggleBodyStyle(e);

      util.slideDownUp(self.subjects.dropDownElem, self.subjects.clicked);
    };

    // Act for mouse over event on navbar
    self.navMouseEnter = function(e) {
      if(util.isTouchScreen()){
        return;
      }

      if(!self.subjects.clicked &&
         !self.phoneMenu.clicked) {
        changeAllOverState(true);
      }
    };

    self.navMouseLeave = function(e) {
      if(util.isTouchScreen()){
        return;
      }

      //changeOverState(self.nav, false);
      if(!self.subjects.clicked &&
         !self.phoneMenu.clicked) {
        changeAllOverState(false);
      }
    };

    self.navBarsIconClick = function(e) {
      e = e || self.phoneMenu.triggerEvent;

      e.stopPropagation();
      self.phoneMenu.triggerEvent = e;
      self.phoneMenu.dropDownElem = $(e.currentTarget).parents("nav").next();

      self.phoneIconClass = !self.phoneIconClass;
      self.phoneMenu.clicked = !self.phoneMenu.clicked;

      // Hide document body overflow scroller
      $scope.$parent.ctrl.toggleBodyStyle(e);

      if(util.isTouchScreen()){
        changeAllOverState(self.phoneMenu.clicked);
      }

      util.slideDownUp(self.phoneMenu.dropDownElem, self.phoneMenu.clicked);
    }
  }

})();
