'use strict';

// Register `headerList` component, along with its associated controller and template
angular
  .module('header')
  .component('appHeader', {
    templateUrl: 'scripts/header/header.template.html',
    controller: appHeaderController
  });

function appHeaderController($scope, $compile) {
  var self = this,

      id = "#appHeader",
      sDropdownTemp = "<subjects-dropdown></subjects-dropdown>",
      dropdownTemp = "<mobile-dropdown></mobile-dropdown>",
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

  var init = function() {
    mainDropDownDivElem.hide();
    mobileDropDown.hide();

    $(window).click(function(e){
      self.windowClick(e);
    });
  }

  var isMobile = function() {
    try{
      document.createEvent("TouchEvent");
      return true;
    }
    catch(e){ return false; }
  }

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

  var dropDownEffect = function (elem, down) {
    if(down) {
      elem.slideDown();
    } else {
      elem.slideUp();
    }
  };

  init();

  // For reference from html.
  self.wraperBackColor = "transparent";
  self.elemTextColor = "";

  self.windowClick = function(e) {
    if(subjectsClicked == true){
      self.subjectsDropDownClick(e);
    }
  };

  self.subjectsDropDownClick = function (e) {
    e.stopPropagation();

    var children = mainDropDownDivElem.children();

    subjectsI.toggleClass("fa-caret-down").toggleClass("fa-caret-up");

    if(!subjectsClicked && !children.length) {
      mainDropDownDivElem.html(sDropdownTemp);
      $compile(mainDropDownDivElem.children()[0])($scope);
    }

    if(!subjectsClicked) {
      changeOverState(true);
      subjectsClicked = true;
    } else {
      subjectsClicked = false;
      changeOverState(false);
    }

    dropDownEffect(mainDropDownDivElem, subjectsClicked);
  };

  // Act for mouse over event on navbar
  self.navMouseOverEvent = function() {
    if(isMobile()){
      return;
    }

    changeOverState(true);

    mainNavOvered = true;
  };

  self.navMouseOutEvent = function() {
    if(isMobile()){
      return;
    }

    mainNavOvered = false;

    changeOverState(false);
  };

  self.navBarsIconClick = function(e) {
    e.stopPropagation();

    var children = mobileDropDown.children();

    var t = $(e.target);

    if(t.is("a")){
      t = t.find("i");
    }

    t.toggleClass("fa-bars").toggleClass("fa-times");

    if(!mobileDropDownClicked && !children.length) {
      mobileDropDown.html(dropdownTemp);
      $compile(mobileDropDown.children()[0])($scope);
    }

    if(!mobileDropDownClicked) {
      changeOverState(true);
      mobileDropDownClicked = true;
    } else {
      mobileDropDownClicked = false;
      changeOverState(false);
    }

    dropDownEffect(mobileDropDown, mobileDropDownClicked);
  }
}
