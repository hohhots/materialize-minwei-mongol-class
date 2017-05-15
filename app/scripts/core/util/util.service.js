'use strict';

angular.
  module('core.util').
  factory('Util', function() {

      var utils = {
        //for slide down and up animation,
        //elem is jquery element.
        //down, if down or up
        slideDownUp: function(elem, down) {
          if(down) {
            elem.slideDown();
          } else {
            elem.slideUp();
          }
        },

        // Determine if browse form touchable screen
        isTouchScreen: function() {
          try{
            document.createEvent("TouchEvent");
            return true;
          }
          catch(e){ return false; }
        }
      };

      return utils;
    }
  );
