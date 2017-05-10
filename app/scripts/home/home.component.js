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

  self.textStyle = {};

  self.navMouseEnter = function(id) {
    if(!self.textStyle[id]) {
      self.textStyle[id] = {};
      self.textStyle[id].color = json.getCategoryColor(id);
      self.textStyle[id].textDecoration = "underline";
    }
  };

  self.navMouseLeave = function(id) {
    if(self.textStyle[id]) {
      self.textStyle[id] = 0;
    }
  };

}
