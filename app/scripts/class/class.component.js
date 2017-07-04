'use strict';

// Define the `header` module
var app = angular.module('app.class', []);

// Register `headerList` component, along with its associated controller and template
app.component('appClass', {
    templateUrl: 'scripts/class/class.template.html',
    controller: function appClassController() {}
  });
