'use strict';

(function($, angular){
  // Define the `header` module
  angular.module('mobiledropdown', [
    'core.json',
    'core.util'
  ]);

  angular
    .module('mobiledropdown')
    .component('mobileDropdown', {
      templateUrl: template,
      controller: ['$scope', 'Util', 'Json', controller]
    });

    function template() {
      return 'scripts/header/mobileDropDown/mobiledropdown.template.html';
    }

    function controller($scope, util, json) {
      var self = this;

      self.jsons = json;

      self.registerHover = {};
      self.aboutHover = {};
      self.categoryHover = {};
      self.folderIcon = {};
      self.folderIconStyle = {};
      self.subjectHover = {};

      self.getUrl = function(url) {
        return util.getUrl(url);
      };

      self.registerMouseEnter = function() {
        self.registerHover.textDecoration = "underline";
      };

      self.registerMouseLeave = function() {
        self.registerHover.textDecoration = "none";
      };

      self.aboutMouseEnter = function() {
        self.aboutHover.textDecoration = "underline";
      };

      self.aboutMouseLeave = function() {
        self.aboutHover.textDecoration = "none";
      };

      self.categoryMouseEnter = function(id) {
        self.categoryHover[id].textDecoration = "underline";
      };

      self.categoryMouseLeave = function(id) {
        self.categoryHover[id].textDecoration = "none";
      };

      self.categoryClick = function(event, id) {
        var target = $(event.currentTarget).next();

        if(self.folderIcon[id] == "fa-angle-down") {
          util.slideDownUp(target, true);
          self.folderIcon[id] = "fa-angle-up";
          if(!self.folderIconStyle[id]){
            self.folderIconStyle[id] = {};
          }
          self.folderIconStyle[id].color = json.categories[id].color;
        } else {
          util.slideDownUp(target, false);
          self.folderIcon[id] = "fa-angle-down";
          self.folderIconStyle[id].color = "";
        }
      };

      self.subjectMouseEnter = function(cid, sid) {
        if(!self.subjectHover[cid]){
          self.subjectHover[cid] = {};
        }
        if(!self.subjectHover[cid][sid]){
          self.subjectHover[cid][sid] = {};
        }
        self.subjectHover[cid][sid].color = json.categories[cid].color;
      };

      self.subjectMouseLeave = function(cid, sid) {
        self.subjectHover[cid][sid].color = "";
      };

      var init = function(nval, oval) {
        $.each(nval.categories, function(i, val) {
          if(!self.categoryHover[val.id]){
            self.categoryHover[val.id] = {};
            self.categoryHover[val.id].color = val.color;
          }

          if(!self.folderIcon[val.id]){
            self.folderIcon[val.id] = "fa-angle-down";
          }
        });
      };

      $scope.$watch(function(){return self.jsons;}, init, true);
    }

})(jQuery, window.angular);
