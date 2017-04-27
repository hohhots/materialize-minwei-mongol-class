angular
  .module('header')
  .component('mobileDropdown', {
    templateUrl: 'scripts/header/mobileDropDown/mobiledropdown.template.html',
    controller: function mobileDropdownController() {
      var self = this;

      self.liItemClicked = function() {
        console.log('fffsff');
      }
    }
  });
