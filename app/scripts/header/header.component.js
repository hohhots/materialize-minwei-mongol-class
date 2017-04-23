'use strict';

// Register `headerList` component, along with its associated controller and template
angular
  .module('header')
  .component('appHeader', {
    templateUrl: 'scripts/header/header.template.html',
    controller: function appHeaderController() {
      var self = this;

      self.id = "#appHeader";

      // capture all relative elements
      self.navWrapperElem = $(".navWrapper");
      self.navElem = $(".mainNav");
      self.subjectsDropDownElem = $(".subjectsDropDown");
      self.mainDropDownDivElem = $(".mainDropDownDiv");
      self.appLogoElem = $(".appLogo");
      self.registerElem = $(".register");

      // For reference from html.
      self.subjectsClicked = 0;
      self.wraperBackColor = "transparent";
      self.elemTextColor = "";
      self.displayBlock = "";

      self.subjectsDropDownClick = function () {
        self.subjectsClicked = self.subjectsClicked == 0 ? 1 : 0;

        self.dropDownEvent(self.subjectsClicked);
        //self.changeState(self.subjectsClicked);
     };

      // Act for mouse over event on navbar
      self.navMouseOverEvent = function(e) {
        if(self.subjectsClicked){
          return;
        }

        self.changeState(true);
      };

      self.navMouseLeaveEvent = function(e) {
        if(self.subjectsClicked){
          return;
        }

        self.changeState(false);
      };

      self.changeState = function(over) {
        if(over) {
          self.wraperBackColor = "whiteBackColor";
          self.elemTextColor = "blackTextColor";
        } else {
          self.wraperBackColor = "transparent";
          self.elemTextColor = "";
        }
      };

      self.dropDownEvent = function (change) {
        if(change) {
          //self.displayBlock = "displayBlock";
          self.mainDropDownDivElem.slideDown();
        } else {
          //self.displayBlock = "";
          self.mainDropDownDivElem.slideUp();
        }
      };
    }
  });
