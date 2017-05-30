'use strict';

// Define the `header` module
angular.module('home', [
  'core.config',
  'core.json',
  'core.util',
  'core.anchorScroll'
]);

// Register `headerList` component, along with its associated controller and template
angular
  .module('home')
  .component('appHome', {
    templateUrl: 'scripts/home/home.template.html',
    controller: [
      '$scope',
      '$sce',
      'Config',
      'Util',
      'Json',
      'anchorSmoothScroll',
      appHomeController]
  });

function appHomeController( $scope, $sce, config, util, json, anchorScroll) {
  var self = this;

  json.getHome(config.json.contact, config.json.about);

  self.jsons = json;

  self.navText = {};
  self.categories = {};
  self.subjects = {};
  self.folderIcon = {};
  self.webCategories = {};
  self.webSubjects = {};

  self.getText = function(name) {
    return $sce.trustAsHtml(config.home[name]);
  };

  self.getUrl = function(url) {
    return util.getUrl(url);
  };

  self.navMouseEnter = function(id) {
    if(!self.navText[id]) {
      self.navText[id] = {};
    }
    if(!self.navText[id].style) {
      self.navText[id].style = {};
    }
    self.navText[id].style.color = json.categories[id].color;
    self.navText[id].style.textDecoration = "underline";
  };

  self.navMouseLeave = function(id) {
    self.navText[id].style = 0;
  };

  self.categoryMouseEnter = function(id) {
    self.categories[id].style.textDecoration = "underline";
  };

  self.categoryMouseLeave = function(id) {
    self.categories[id].style.textDecoration = "none";
  };

  self.categoryClick = function(event, id) {
    var target = $(event.currentTarget).next();

    if(self.folderIcon[id].class == "fa-angle-down") {
      util.slideDownUp(target, true);
      self.folderIcon[id].class = "fa-angle-up";
      if(!self.folderIcon[id].style){
        self.folderIcon[id].style = {};
      }
      self.folderIcon[id].style.color = json.categories[id].color;
    } else {
      util.slideDownUp(target, false);
      self.folderIcon[id].class = "fa-angle-down";
      self.folderIcon[id].style.color = "";
    }
  };

  self.subjectMouseEnter = function(cid, sid) {
    if(!self.subjects[cid]){
      self.subjects[cid] = {};
    }
    if(!self.subjects[cid][sid]){
      self.subjects[cid][sid] = {};
      self.subjects[cid][sid].style = {};
    }
    self.subjects[cid][sid].style.color = json.categories[cid].color;
  };

  self.subjectMouseLeave = function(cid, sid) {
    self.subjects[cid][sid].style.color = "";
  };

  self.getSubjectsStyle = function(last, cid, sid) {
    if(!self.subjects[cid]){
      self.subjects[cid] = {};
    }
    if(!self.subjects[cid][sid]){
      self.subjects[cid][sid] = {};
      self.subjects[cid][sid].style = {};
    }
    if(last){
      self.subjects[cid][sid].style.borderBottom = "none";
    }
    return self.subjects[cid][sid].style;
  };

  self.webCategoryMouseEnter = function(id) {
    if(!self.webCategories[id]){
      self.webCategories[id] = {};
    }
    if(!self.webCategories[id].style){
      self.webCategories[id].style = {};
    }
    self.webCategories[id].style.color = json.categories[id].color;
    self.webCategories[id].style.textDecoration = "underline";
  };

  self.webCategoryMouseLeave = function(id) {
    self.webCategories[id].style.color =  "";
    self.webCategories[id].style.textDecoration = "none";
  };

  self.webSubjectMouseEnter = function(cid, sid) {
    self.webSubjects[cid][sid].style.textDecoration = "underline";
  };

  self.webSubjectMouseLeave = function(cid, sid) {
      self.webSubjects[cid][sid].style.textDecoration = "none";
  };

  self.gotoElement = function (eID){
    // set the location.hash to the id of
    // the element you wish to scroll to.
    //$location.hash('bottom');

    // call $anchorScroll()
    anchorScroll.scrollTo(eID);
  };

  var init = function(nval, oval) {
    $.each(nval.categories, function(i, val) {
      if(!self.categories[val.id]){
        self.categories[val.id] = {};
      }
      if(!self.categories[val.id].image){
        self.categories[val.id].image = {};
      }
      if(!self.categories[val.id].image.src){
        self.categories[val.id].image.src = "data/" + json.categories[val.id].dirName + "/" + json.categories[val.id].imageName;
      }

      if(!self.categories[val.id].style){
        self.categories[val.id].style = {};
        self.categories[val.id].style.color = json.categories[val.id].color;
      }

      if(!self.categories[val.id].displaySubjects){
        self.categories[val.id].displaySubjects = {};
        self.categories[val.id].displaySubjects.display = "none";
      }

      if(!self.folderIcon[val.id]){
        self.folderIcon[val.id] = {};
        self.folderIcon[val.id].class = "fa-angle-down";
      }

      $.each(nval.subjects[val.id], function(j, val1) {
        if(!self.webSubjects[val.id]){
          self.webSubjects[val.id] = {};
        }
        if(!self.webSubjects[val.id][val1.id]){
          self.webSubjects[val.id][val1.id] = {};
        }
        if(!self.webSubjects[val.id][val1.id].style){
          self.webSubjects[val.id][val1.id].style = {};
          self.webSubjects[val.id][val1.id].style.color = json.categories[val.id].color;
        }
      });
    });
  };

  $scope.$watch(function(){return self.jsons;}, init, true);
}
