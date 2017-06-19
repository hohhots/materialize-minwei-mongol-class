'use strict';

(function($, angular) {
  // Define the `core` module
  angular.module('core', [
    'core.config',
    'core.json',
    'core.util'
  ]);
})(jQuery, window.angular);
