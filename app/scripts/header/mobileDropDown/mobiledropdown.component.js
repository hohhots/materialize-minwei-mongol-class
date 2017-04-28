angular
  .module('header')
  .component('mobileDropdown', {
    templateUrl: 'scripts/header/mobileDropDown/mobiledropdown.template.html',
    controller: function mobileDropdownController() {
      var self = this;

      var id = 0,
          target,
          folderIcon,
          subjectId = "subjectId",
          span = "<span></span>",
          upIconColorOrigin,
          upIconColor = "#007d96";

      var toggleSubjectList = function() {
        var s = target.siblings("span");
        if(s.length) {
          s.remove();
        } else {
          var spanE = $(span);
          spanE.html("<ul><li class=\"mobileSubjectList\"><a class=\"mobileSubjectListA1 mobileSubjectListA\">早期人类</a></li><li class=\"mobileSubjectList\"><a class=\"mobileSubjectListA\">中期人类</a></li></ul>");

          target.after(spanE);
        }
      }

      var toggleFolderIcon = function() {
        var tColor;

        if(folderIcon.hasClass("fa-angle-down")) {
          upIconColorOrigin = folderIcon.css("color");
        }

        folderIcon.toggleClass("fa-angle-down").toggleClass("fa-angle-up");

        if(folderIcon.hasClass("fa-angle-up")) {
          tColor = upIconColor;
        } else {
          tColor = upIconColorOrigin;
        }

        folderIcon.css("color", tColor);
      }

      var setTarget = function(e) {
        target = $(e.target);

        if(target.is("li")){
          target = target.find("a");
        }

        id = target.attr(subjectId);

        folderIcon = target.find("i");
      }

      self.liItemClicked = function(e) {
        setTarget(e);

        if(folderIcon.length) {
          toggleSubjectList();

          toggleFolderIcon();
        }
      }
    }
  });
