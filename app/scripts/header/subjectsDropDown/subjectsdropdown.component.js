'use strict';

(function($, angular){
  // Define the `header` module
  var app = angular.module('app.subjectsDropdown', [
    'core.json',
    'core.util'
  ]);

  app.component('subjectsDropdown', {
      templateUrl: template,
      controller: ['$scope', 'Util', 'Json', controller]
    });

    function template() {
      return 'scripts/header/subjectsDropDown/subjectsdropdown.template.html';
    }

    function controller($scope, util, json) {
      var self = this;

      self.jsons = json;

      self.categoryHover = {};
      self.subjectHover = {};

      self.convertUrl = function(url) {
        return util.convertUrl(url);
      };

      self.categoryMouseEnter = function(id) {
        self.categoryHover[id] = {};
        self.categoryHover[id].color = json.categories[id].color;
      };

      self.categoryMouseLeave = function(id) {
        self.categoryHover[id] = {};
      };

      self.liMouseEnter = function(cid, sid) {
        self.subjectHover[cid][sid].color = json.categories[cid].color;
        self.subjectHover[cid][sid].textDecoration = "underline";
      };

      self.liMouseLeave = function(cid, sid) {
        self.subjectHover[cid][sid].textDecoration = "none";
      };

      var init = function(nval, oval) {
        $.each(nval.categories, function(i, val) {
          $.each(nval.subjects[val.id], function(j, val1) {
            if(!self.subjectHover[val.id]){
              self.subjectHover[val.id] = {};
            }
            if(!self.subjectHover[val.id][val1.id]){
              self.subjectHover[val.id][val1.id] = {};
              self.subjectHover[val.id][val1.id].color = json.categories[val.id].color;
            }
          });
        });
      };

      $scope.$watch(function(){return self.jsons;}, init, true);
    }

})(jQuery, window.angular);
