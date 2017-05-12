'use strict';

// Register `headerList` component, along with its associated controller and template
angular
  .module('home')
  .component('appHome', {
    templateUrl: 'scripts/home/home.template.html',
    controller: ['Json', '$scope', appHomeController]
  });

function appHomeController(json, scope) {
  var self = this;

  self.jsons = json;

  self.navText = {};
  self.categories = {};
  self.subjects = {};
  self.folderIcon = {};

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

  self.categoryClick = function(id) {
    if(self.categories[id].displaySubjects.display == "none") {
      self.categories[id].displaySubjects.display = "block";
      self.folderIcon[id].class = "fa-angle-up";
      if(!self.folderIcon[id].style){
        self.folderIcon[id].style = {};
      }
      self.folderIcon[id].style.color = json.categories[id].color;
    } else {
      self.categories[id].displaySubjects.display = "none";
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
    });
  };

  scope.$watch(function(){return self.jsons;}, init, true);
}
