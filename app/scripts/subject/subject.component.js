'use strict';

(function($, angular) {
  // Define the `header` module
  angular.module('subject', []);

  // Register `headerList` component, along with its associated controller and template
  angular
    .module('subject')
    .component('appSubject', {
      templateUrl: 'scripts/subject/subject.template.html',
      controller: controller
    });

  function template() {
    return 'scripts/subject/subject.template.html';
  }

  function controller() {

  }

})(jQuery, window.angular)
