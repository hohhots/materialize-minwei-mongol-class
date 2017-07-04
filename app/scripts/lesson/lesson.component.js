'use strict';

// Define the `header` module
var app = angular.module('app.lesson', []);

// Register `headerList` component, along with its associated controller and template
app.component('appLesson', {
    templateUrl: 'scripts/lesson/lesson.template.html',
    controller: function appLessonController() {}
  });
