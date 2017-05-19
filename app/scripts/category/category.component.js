'use strict';

// Define the `header` module
angular.module('category', []);

// Register `headerList` component, along with its associated controller and template
angular
  .module('category')
  .component('appCategory', {
    templateUrl: 'scripts/category/category.template.html',
    controller: function appCategoryController() {}
  });
