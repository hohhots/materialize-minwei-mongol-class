'use strict';

// Define the `header` module
angular.module('header', [
  'core.util',
  'subjectsdropdown',
  'mobiledropdown'
]);

// Register `headerList` component, along with its associated controller and template
angular
  .module('header')
  .component('appHeader', {
    templateUrl: 'scripts/header/header.template.html',
    controller: ['Util', '$scope', '$compile', appHeaderController]
  });

function appHeaderController(util, $scope, $compile) {
  var self = this;

  var changeOverState = function(elem, over) {
    //if(subjectsClicked || mobileDropDownClicked || mainNavOvered){
    //  return;
    //}
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
      if(self.phoneMenu.clicked){
        changeAllOverState(true);
      } else {
        changeAllOverState(false);
      }
    }

    util.slideDownUp(self.phoneMenu.dropDownElem, self.phoneMenu.clicked);
  }

  var init = function() {
    $(window).click(function(e){
      $scope.$apply(function(){
        windowClick(e);
      });
    });
  };

  init();
}
