'use strict';

// Define the `learnMongolApp` module
angular.module('learnMongolApp', [
  'ui.router',
  'header',
  'home',
  'category',
  'subject',
  'class',
  'lesson',
  'footer'
]);

// For materialize
(function($){
  $(window).on('load', function() {

    //$('.parallax').parallax();
    //$('.dropdown-button').dropdown();

  }); // end of document ready
})(jQuery); // end of jQuery name space
