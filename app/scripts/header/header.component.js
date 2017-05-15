'use strict';

// Register `headerList` component, along with its associated controller and template
angular
  .module('header')
  .component('appHeader', {
    templateUrl: 'scripts/header/header.template.html',
    controller: ['Util', '$scope', '$compile', appHeaderController]
  });

function appHeaderController(util, $scope, $compile) {
  var self = this,

      subjectsDownIconClass = true,
      subjectsUpIconClass = false,

      id = "#appHeader",
      subjectsClicked = false,
      mainNavOvered = false,
      mobileDropDownClicked = false,
      // Store text color for mouse oner/out
      originTextColor;

  // capture all relative elements
  var navWrapperElem = $(".navWrapper"),
      navElem = $(".mainNav"),
      subjectsDropDownElem = $(".subjectsDropDown"),
      subjectsI = subjectsDropDownElem.find("i"),
      mainDropDownDivElem = $(".mainDropDownDiv"),
      appLogoElem = $(".appLogo"),
      registerElem = $(".register"),
      mobileDropDown = $(".mobileDropDown");

  var changeOverState = function(over) {
    if(subjectsClicked || mobileDropDownClicked || mainNavOvered){
      return;
    }

    if(over) {
      self.wraperBackColor = "whiteBackColor";
      self.elemTextColor = "blackTextColor";
    } else {
      self.wraperBackColor = "transparent";
      self.elemTextColor = "";
    }
  };

  var toggleSubjectsIconClass = function () {
    if(subjectsDownIconClass) {
      subjectsDownIconClass = false;
      subjectsUpIconClass = true;
    } else {
      subjectsDownIconClass = true;
      subjectsUpIconClass = false;
    }
  };

  var init = function() {
    mainDropDownDivElem.hide();
    mobileDropDown.hide();

    $(window).click(function(e){
      $scope.$apply(function(){
        self.windowClick(e);
      });
    });
  };

  init();

  // For reference from html.
  self.wraperBackColor = "transparent";
  self.elemTextColor = "";


  self.windowClick = function(e) {
    if(subjectsClicked == true){
      self.subjectsDropDownClick(e);
    }

    self.navMouseOutEvent();
  };

  self.getSubjectsDownIconClass = function() {
    return subjectsDownIconClass;
  };

  self.getSubjectsUpIconClass = function() {
    return subjectsUpIconClass;
  };

  self.subjectsDropDownClick = function (e) {
    e.stopPropagation();

    toggleSubjectsIconClass();

    if(!subjectsClicked) {
      changeOverState(true);
      subjectsClicked = true;
    } else {
      subjectsClicked = false;
      changeOverState(false);
    }

    util.slideDownUp(mainDropDownDivElem, subjectsClicked);
  };

  // Act for mouse over event on navbar
  self.navMouseOverEvent = function() {
    if(util.isTouchScreen()){
      return;
    }

    changeOverState(true);

    mainNavOvered = true;
  };

  self.navMouseOutEvent = function() {
    if(util.isTouchScreen()){
      return;
    }

    mainNavOvered = false;

    changeOverState(false);
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
    $scope.$parent.ctrl.toggleBodyStyle();

    util.slideDownUp(mobileDropDown, mobileDropDownClicked);
  }
}
