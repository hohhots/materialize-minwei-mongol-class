'use strict';

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

  var toggleSubjectsIconClass = function () {
    if(self.subjectsDownIconClass) {
      self.subjectsDownIconClass = false;
      self.subjectsUpIconClass = true;
    } else {
      self.subjectsDownIconClass = true;
      self.subjectsUpIconClass = false;
    }
  };

  var toggleSubjectsClicked = function() {
    if(!self.subjects.clicked) {
      self.subjects.clicked = true;
    } else {
      self.subjects.clicked = false;
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

  var windowClick = function(e) {
    if(self.subjects.clicked){
      self.subjectsClicked();
      self.navMouseLeave();
    }
  };

  // data for header nav
  self.subjectsDownIconClass = true;
  self.subjectsUpIconClass = false;
  self.navWrapperDiv = {};
  self.nav = {};
  self.subjects = {};
  self.logo = {};
  self.phoneMenu = {};

  self.subjectsClicked = function (e) {
    e = e || self.subjects.triggerEvent;

    e.stopPropagation();
    self.subjects.triggerEvent = e;
    self.subjects.dropDownElem = $(e.currentTarget).next();

    toggleSubjectsIconClass();

    toggleSubjectsClicked();

    // Hide document body overflow scroller
    $scope.$parent.ctrl.toggleBodyStyle(e);

    util.slideDownUp(self.subjects.dropDownElem, self.subjects.clicked);
  };

  // Act for mouse over event on navbar
  self.navMouseEnter = function(e) {
    if(util.isTouchScreen()){
      return;
    }

    if(!self.subjects.clicked) {
      changeOverState(self.navWrapperDiv, true);
      changeSubjectsOverState(true);
      changeLogoOverState(true);
      changePhoneMenuOverState(true);
    }
  };

  self.navMouseLeave = function(e) {
    if(util.isTouchScreen()){
      return;
    }

    //changeOverState(self.nav, false);
    if(!self.subjects.clicked) {
      changeOverState(self.navWrapperDiv, false);
      changeSubjectsOverState(false);
      changeLogoOverState(false);
      changePhoneMenuOverState(false);
    }
  };

  self.navBarsIconClick = function(e) {
    e.stopPropagation();

    var t = $(e.target);

    if(t.is("a")){
      t = t.find("i");
    }

    t.toggleClass("fa-bars").toggleClass("fa-times");

    if(!mobileDropDownClicked) {
      changeOverState(true);
      mobileDropDownClicked = true;
    } else {
      mobileDropDownClicked = false;
      changeOverState(false);
    }

    // Hide document body overflow scroller
    $scope.$parent.ctrl.toggleBodyStyle(e);

    util.slideDownUp(mobileDropDown, mobileDropDownClicked);
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
