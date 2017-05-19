'use strict';

// Define the `header` module
angular.module('subject', []);

// Register `headerList` component, along with its associated controller and template
angular
  .module('subject')
  .component('appSubject', {
    templateUrl: 'scripts/subject/subject.template.html',
    controller: function appSubjectController() {}
  });
