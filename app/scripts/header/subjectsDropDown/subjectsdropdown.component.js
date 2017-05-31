'use strict';

// Define the `header` module
angular.module('subjectsdropdown', ['core.json', 'core.util']);

angular
  .module('subjectsdropdown')
  .component('subjectsDropdown', {
    templateUrl: 'scripts/header/subjectsDropDown/subjectsdropdown.template.html',
    controller: ['$scope', 'Util', 'Json', subjectsDropdownController]
  });

  function subjectsDropdownController($scope, util, json) {
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
