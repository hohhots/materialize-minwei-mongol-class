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
      dropdownTemp = "<mobile-dropdown></mobile-dropdown>",
      subjectsClicked = false,
      mainNavOvered = false,
      mobileDropDownClicked = false;

  // capture all relative elements
  var navWrapperElem = $(".navWrapper"),
      navElem = $(".mainNav"),
      subjectsDropDownElem = $(".subjectsDropDown"),
      mainDropDownDivElem = $(".mainDropDownDiv"),
      appLogoElem = $(".appLogo"),
      registerElem = $(".register"),
      mobileDropDown = $(".mobileDropDown");

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

  var dropDownEffect = function () {
    if(subjectsClicked) {
      mainDropDownDivElem.slideDown();
    } else {
      mainDropDownDivElem.slideUp();
    }
  };

  // For reference from html.
  self.wraperBackColor = "transparent";
  self.elemTextColor = "";
  self.displayBlock = "";

  self.subjectsDropDownClick = function () {
  subjectsClicked = subjectsClicked == false ? true : false;

    dropDownEffect();
    //self.changeState(self.subjectsClicked);
  };

  // Act for mouse over event on navbar
  self.navMouseOverEvent = function() {
    if(isMobile()){
      return;
    }

    changeOverState(true);

    mainNavOvered = true;
  };

  self.navMouseLeaveEvent = function() {
    if(isMobile()){
      return;
    }

    mainNavOvered = false;

    changeOverState(false);
  };

  self.navBarsIconClick = function(e) {
    var t = $(e.target);

    if(t.is("a")){
      t = t.find("i");
    }

    t.toggleClass("fa-bars").toggleClass("fa-times");

    if(!mobileDropDownClicked) {
      mobileDropDown.html(dropdownTemp);
      $compile(mobileDropDown.children()[0])($scope);
    } else {
      mobileDropDown.html("");
    }

    if(!mobileDropDownClicked) {
      changeOverState(true);
      mobileDropDownClicked = true;
    } else {
      mobileDropDownClicked = false;
      changeOverState(false);
    }

  }
}
