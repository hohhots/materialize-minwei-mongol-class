'use strict';

// Register `headerList` component, along with its associated controller and template
angular
  .module('header')
  .component('appHeader', {
    templateUrl: 'scripts/header/header.template.html',
    controller: function appHeaderController() {}
  });
