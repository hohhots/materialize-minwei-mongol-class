'use strict';

// Define the `core.util` module
angular.module('core.util', [
  'core.config'
]);

angular.
  module('core.util').
  service('Util', ['$location', 'Config', function($location, config) {
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
          if(isTouchScreen == 'init'){
            try{
              document.createEvent("TouchEvent");
              isTouchScreen = true;
            }
            catch(e){
              isTouchScreen = false;
            }
          }

          return isTouchScreen;
        },

        convertUrl: function(url) {
          url = url ? url : '';

          return config.app.urlPrefix + "/" + url;
        },

        getUrlPath: function() {
          return $location.path();
        }
      };

      return utils;
    }
  ]);
