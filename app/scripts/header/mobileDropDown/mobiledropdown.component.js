angular
  .module('mobiledropdown')
  .component('mobileDropdown', {
    templateUrl: 'scripts/header/mobileDropDown/mobiledropdown.template.html',
    controller: ['Json',mobileDropdownController]
  });

  function mobileDropdownController(json) {
    var self = this;

    var id = 0,
        target,
        folderIcon,
        subjectId = "subjectId",
        span,
        upIconColorOrigin,
        upIconColor = "#007d96";

    self.categories = [];
    self.subjects = {};

    var toggleSubjectList = function() {
      span.toggleClass("ng-show").toggleClass("ng-hide");
    }

    var toggleFolderIcon = function() {
      if(folderIcon.hasClass("fa-angle-down")){
        upIconColorOrigin = folderIcon.css("color");
      }
      
      folderIcon.toggleClass("fa-angle-down").toggleClass("fa-angle-up");

      var tColor;

      if(folderIcon.hasClass("fa-angle-up")) {
        tColor = upIconColor;
      } else {
        tColor = upIconColorOrigin;
      }

      folderIcon.css("color", tColor);
    }

    var setTarget = function(t) {
      target = $(t);

      if(target.is("li")){
        target = target.find("a");
      }
      if(target.is("i")){
        target = target.parents("a");
      }

      if(target.is("a")){
        id = target.attr(subjectId);
        span = target.siblings("span");
        folderIcon = target.find("i");
      } else {
        console.error("In mobile menu list don't exist a link for click event.");
      }
    }

    var init = function() {
      json.query({}, function(data) {
        self.categories = data;

        $.each(data, function(i, val) {
          json.query({path: val.dirName}, function(data1) {
            self.subjects[val.id] = data1;
          });
        });
      });
    }

    init();

    self.liItemClicked = function(e) {
      setTarget(e.target);

      if(folderIcon.length) {
        toggleSubjectList();

        toggleFolderIcon();
      }
    }
  }
