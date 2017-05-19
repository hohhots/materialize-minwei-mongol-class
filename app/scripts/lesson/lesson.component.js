'use strict';

// Define the `header` module
angular.module('lesson', []);

// Register `headerList` component, along with its associated controller and template
angular
  .module('lesson')
  .component('appLesson', {
    templateUrl: 'scripts/lesson/lesson.template.html',
    controller: function appLessonController() {}
  });
