'use strict';

// Define the `header` module
angular.module('class', []);

// Register `headerList` component, along with its associated controller and template
angular
  .module('class')
  .component('appClass', {
    templateUrl: 'scripts/class/class.template.html',
    controller: function appClassController() {}
  });
