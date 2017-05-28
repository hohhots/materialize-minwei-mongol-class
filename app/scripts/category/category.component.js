'use strict';

// Define the `header` module
angular.module('category', []);

// Register `headerList` component, along with its associated controller and template
angular
  .module('category')
  .component('appCategory', {
    templateUrl: 'scripts/category/category.template.html',
    controller: ['$scope', '$element', appCategoryController]
  });

function appCategoryController($scope, $element) {
  var self = this,

  elem = $(document.getElementById("categoryBeginSticky"));

  var windowScroll = function(e) {
    //var position = $(beginStickyId).position();
    if($(window).scrollTop() > elem.offset().top){
      if(!self.headerSticky.style) {
        self.headerSticky.style = {};
      }
      self.headerSticky.style.display = "block";
      self.headerSticky.style.position = "fixed";
      self.headerSticky.style.top = "0px";
      self.headerSticky.style.overflowY = "auto";
      self.headerSticky.style.overflowX = "visible";
      self.headerSticky.style.maxHeight = "285px";
    } else {
      self.headerSticky.style = {};
    }
  };

  var init = function() {
    $(window).scroll(function(e){
      $scope.$apply(function(){
        windowScroll(e);
      });
    });
  };

  self.headerSticky = {};

  init();
}
