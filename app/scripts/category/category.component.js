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
      'Config',
      'Util',
      'Json',
      appCategoryController]
  });

function appCategoryController($scope, config, util, json) {
  var self = this,

  elem = $(document.getElementById("categoryBeginSticky")),

  path = util.getUrlPath().substring(1),

  rootPath = config.json.rootPath;

  var windowScroll = function(e) {
    if($(window).scrollTop() > elem.offset().top){
      self.headerStickyHide = false;
    } else {
      self.headerStickyHide = true;
    }
  };

  var setSubjectsStyle = function() {
    $.each(self.subjects, function(i, val) {
        if(!self.subjectsStyle[val.id]){
          self.subjectsStyle[val.id] = {};
        }
        var url = rootPath + "/" + self.category.dirName + "/" + val.dirName + "/" + val.imageUrl
        self.subjectsStyle[val.id].backgroundImage = "url(" + url + ")";
      }
    )
  };

  $(window).scroll(function(e){
    $scope.$apply(function(){
      windowScroll(e);
    });
  });

  var init = function() {
    self.category = json.getCategory(path);

    self.subjects = self.jsons.subjects[self.category.id];

    setSubjectsStyle();

    self.classes = self.jsons.classes[self.category.id];
  };

  self.jsons = json;
  self.category = {};
  self.subjects = {};
  self.subjectsStyle = {};
  self.classes = {};
  self.headerStickyHide = true;

  $scope.$watch(function(){return self.jsons;}, init, true);
}
