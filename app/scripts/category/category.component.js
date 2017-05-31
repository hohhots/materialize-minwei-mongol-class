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

  var displayHeaderSticky = function() {

    var st = self.headerSticky.style = self.headerSticky.style ? self.headerSticky.style : {};

    st.display = "block";
    st.position = "fixed";
    st.top = "0px";
    st.overflowY = "auto";
    st.overflowX = "visible";
    st.maxHeight = "285px";
  };

  var windowScroll = function(e) {
    if($(window).scrollTop() > elem.offset().top){
      displayHeaderSticky();
    } else {
      self.headerSticky.style = {};
    }
  };

  $(window).scroll(function(e){
    $scope.$apply(function(){
      windowScroll(e);
    });
  });

  var init = function() {
    self.category = json.getCategory(path);

    $.each(json.subjects[self.category.id], function(i, val) {
        self.subjects[val.id] = val;

        //self.classes[val.id] = json.getClasses(self.category.dirName, val.dirName);
      }
    );
  };

  self.jsons = json;
  self.category = {};
  self.subjects = {};
  self.classes = {};
  self.headerSticky = {};

  $scope.$watch(function(){return self.jsons;}, init, true);
}
