'use strict';

(function($, angular) {
  // Define the `core.util` module
  angular.module('core.util', [
    'core.config'
  ]);

  angular.
    module('core.util').
    service('Util', ['$location', 'Config', function($location, config) {
        var isTouchScreen = 'init';

        var utils = {
          scrollToTop: function() {
            $('html, body').animate({ scrollTop: 0 }, 'fast');
          },

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

          getUrlPath: function() {
            return $location.path();
          },

          upperFirstLetter: function(str) {
            var f = str.substring(0,1);
            return str.replace(f,f.toUpperCase());
          },

          convertUrl: function(url) {
            url = url ? url : '';

            return config.app.urlPrefix + "/" + url;
          },

          setAudio: function(path, audiosConfig) {
            var audios = {};

            $.each(audiosConfig.genderProfix, function(i, val) {
              if(!audios[val]){
                audios[val] = {};
              }
              $.each(audiosConfig.audioProfix, function(j, v1) {
                audios[val][v1] = path + val + "." + v1;
              });
            });

            return audios;
          }

        };

        return utils;
      }
    ]);
})(jQuery, window.angular);
