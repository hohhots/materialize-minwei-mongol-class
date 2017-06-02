'use strict';

// Define the `header` module
angular.module('category', []);

// Register `headerList` component, along with its associated controller and template
angular
  .module('category')
  .component('appCategory', {
    templateUrl: 'scripts/category/category.template.html',
    controller: [
      '$scope',
      'Util',
      'Json',
      appCategoryController]
  });

function appCategoryController($scope, util , json) {
  var self = this,

  elem = $(document.getElementById("categoryBeginSticky")),

  path = util.getUrlPath().substring(1);

  var windowScroll = function(e) {
    if($(window).scrollTop() > elem.offset().top){
      self.headerStickyHide = false;
    } else {
      self.headerStickyHide = true;
    }
  };

  $(window).scroll(function(e){
    $scope.$apply(function(){
      windowScroll(e);
    });
  });

  var init = function() {
    self.category = json.getCategory(path);
    self.subjects = self.jsons.subjects[self.category.id];
    self.classes = self.jsons.classes[self.category.id];
  };

  self.jsons = json;
  self.category = {};
  self.subjects = {};
  self.classes = {};
  self.headerStickyHide = true;

  $scope.$watch(function(){return self.jsons;}, init, true);
}
