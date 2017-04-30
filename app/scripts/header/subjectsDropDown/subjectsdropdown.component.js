angular
  .module('header')
  .component('subjectsDropdown', {
    templateUrl: 'scripts/header/subjectsDropDown/subjectsdropdown.template.html',
    controller: subjectsDropdownController
  });

  function subjectsDropdownController() {
    var self = this;

    var originTextColor;

    self.mainDropDownUlMouseOver = function(e) {
      var stylesA = {
        "text-decoration": "underline"
      };
      var stylesAH = {
        "color": "#007d96"
      };

      var target = $(e.target);
      if(target.is("a")){
        // If is header element, just change text color.
        if(target.hasClass("mainDropDownHeaderA")) {
          originTextColor = target.css("color");
          target.css(stylesAH);
        } else {
          target.css(stylesA);
        }
      }
    }

    self.mainDropDownUlMouseOut = function(e) {
      var stylesA = {
        "text-decoration": "none"
      };
      var stylesAH = {
        "color": originTextColor
      };

      var target = $(e.target);
      if(target.is("a")){
        if(target.hasClass("mainDropDownHeaderA")) {
          target.css(stylesAH);
        } else {
          target.css(stylesA);
        }
      }
    }
  }
