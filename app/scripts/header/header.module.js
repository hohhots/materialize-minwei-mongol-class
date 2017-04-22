'use strict';

// Define the `header` module
angular.module('header', []);

// For header functions
(function($){
  $(window).on('load', function() {

    $("nav #mainDropDown").on( "click", function( event ) {
      event.preventDefault();
      console.log( $( this ).text() );
    });

  }); // end of document ready
})(jQuery); // end of jQuery name space
