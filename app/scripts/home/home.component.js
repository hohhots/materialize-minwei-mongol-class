'use strict';

// Register `headerList` component, along with its associated controller and template
angular
  .module('home')
  .component('appHome', {
    templateUrl: 'scripts/home/home.template.html',
    controller: appHomeController
  });

function appHomeController() {

}
