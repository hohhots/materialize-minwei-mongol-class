angular
  .module('mobiledropdown')
  .component('mobileDropdown', {
    templateUrl: 'scripts/header/mobileDropDown/mobiledropdown.template.html',
    controller: ['Json', '$scope', mobileDropdownController]
  });

  function mobileDropdownController(json, scope) {
    var self = this;

    self.jsons = json;

    self.registerHover = {};
    self.aboutHover = {};
    self.categoryHover = {};
    self.subjectsHover = {};
    self.folderIcon = {};
    self.folderIconStyle = {};
    self.subjectHover = {};

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

    self.categoryClick = function(id) {
      if(self.subjectsHover[id].display == "none") {
        self.subjectsHover[id].display = "block";
        self.folderIcon[id] = "fa-angle-up";
        if(!self.folderIconStyle[id]){
          self.folderIconStyle[id] = {};
        }
        self.folderIconStyle[id].color = json.categories[id].color;
      } else {
        self.subjectsHover[id].display = "none";
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

        if(!self.subjectsHover[val.id]){
          self.subjectsHover[val.id] = {};
          self.subjectsHover[val.id].display = "none";
        }

        if(!self.folderIcon[val.id]){
          self.folderIcon[val.id] = "fa-angle-down";
        }
      });
    };

    scope.$watch(function(){return self.jsons;}, init, true);
  }
