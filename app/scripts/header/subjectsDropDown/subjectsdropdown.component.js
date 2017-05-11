angular
  .module('subjectsdropdown')
  .component('subjectsDropdown', {
    templateUrl: 'scripts/header/subjectsDropDown/subjectsdropdown.template.html',
    controller: ['Json', '$scope', subjectsDropdownController]
  });

  function subjectsDropdownController(json, scope) {
    var self = this;

    self.jsons = json;

    self.categoryHover = {};
    self.subjectHover = {};

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

    scope.$watch(function(){return self.jsons;}, init, true);
  }
