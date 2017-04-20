'use strict';

// Register `headerList` component, along with its associated controller and template
angular
  .module('footer')
  .component('appFooter', {
    templateUrl: 'scripts/footer/footer.template.html',
    controller: function appFooterController() {}
  });
