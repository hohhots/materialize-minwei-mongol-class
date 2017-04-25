'use strict';

// Register `headerList` component, along with its associated controller and template
angular
  .module('header')
  .component('appHeader', {
    templateUrl: 'scripts/header/header.template.html',
    controller: function appHeaderController() {
      var self = this,

          id = "#appHeader",
          subjectsClicked = false,
          mainNavOvered = false;

      // capture all relative elements
      var navWrapperElem = $(".navWrapper"),
          navElem = $(".mainNav"),
          subjectsDropDownElem = $(".subjectsDropDown"),
          mainDropDownDivElem = $(".mainDropDownDiv"),
          appLogoElem = $(".appLogo"),
          registerElem = $(".register");

      var isMobile = function() {
        try{
          document.createEvent("TouchEvent");
          return true;
        }
        catch(e){ return false; }
      }

      var changeOverState = function(over) {
        if(isMobile()) {
          return;
        }

        if(over) {
          mainNavOvered = true;
          self.wraperBackColor = "whiteBackColor";
          self.elemTextColor = "blackTextColor";
        } else {
          mainNavOvered = false;
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
        if(subjectsClicked || mainNavOvered){
          return;
        }

        changeOverState(true);
      };

      self.navMouseLeaveEvent = function() {
        if(subjectsClicked){
          return;
        }

        changeOverState(false);
      };

      self.navBarsIconClick = function(e) {
        var target = $(e.target);

        target.toggleClass("fa-bars");
        target.toggleClass("fa-times");
      }
    }
  });
