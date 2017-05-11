'use strict';

// Register `headerList` component, along with its associated controller and template
angular
  .module('home')
  .component('appHome', {
    templateUrl: 'scripts/home/home.template.html',
    controller: ['Json', appHomeController]
  });

function appHomeController(json) {
  var self = this;

  self.jsons = json;

  self.navHover = {};

  self.navMouseEnter = function(id) {
    self.navHover[id] = {};
    self.navHover[id].color = json.categories[id].color;
    self.navHover[id].textDecoration = "underline";
  };

  self.navMouseLeave = function(id) {
    self.navHover[id] = 0;
  };

}
