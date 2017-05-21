'use strict';

// Define the `core.util` module
angular.module('core.util', []);

angular.
  module('core.util').
  factory('Util', function() {
      var isTouchScreen = 'init';

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
          if(isTouchScreen != 'init'){
            return isTouchScreen;
          }

          try{
            document.createEvent("TouchEvent");
            isTouchScreen = true;
            return true;
          }
          catch(e){
            isTouchScreen = false;
            return false;
          }
        }
      };

      return utils;
    }
  );
