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
      mobileDropDownClicked = false,
      // Store text color for mouse oner/out
      originTextColor;

  // capture all relative elements
  var navWrapperElem = $(".navWrapper"),
      navElem = $(".mainNav"),
      subjectsDropDownElem = $(".subjectsDropDown"),
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
  self.displayBlock = "";

  self.windowClick = function(e) {
    if(subjectsClicked == true){
      self.subjectsDropDownClick(e);
    }
  };

  self.mainDropDownUlMouseOver = function(e) {
    var stylesA = {
      "text-decoration": "underline"
    };
    var stylesAH = {
      "color": "#007d96"
    };

    var target = $(e.target);
    if(target.is("a")){
      // If is header element, just change text color.
      if(target.hasClass("mainDropDownHeaderA")) {
        originTextColor = target.css("color");
        target.css(stylesAH);
      } else {
        target.css(stylesA);
      }
    }
  }

  self.mainDropDownUlMouseOut = function(e) {
    var stylesA = {
      "text-decoration": "none"
    };
    var stylesAH = {
      "color": originTextColor
    };

    var target = $(e.target);
    if(target.is("a")){
      if(target.hasClass("mainDropDownHeaderA")) {
        target.css(stylesAH);
      } else {
        target.css(stylesA);
      }
    }
  }

  self.subjectsDropDownClick = function (e) {
    e.stopPropagation();

    subjectsClicked = subjectsClicked == false ? true : false;

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
