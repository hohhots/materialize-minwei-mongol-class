angular
  .module('subjectsdropdown')
  .component('subjectsDropdown', {
    templateUrl: 'scripts/header/subjectsDropDown/subjectsdropdown.template.html',
    controller: ['Json', subjectsDropdownController]
  });

  function subjectsDropdownController(json) {
    var self = this;

    var originTextColor;

    self.categories = [];
    self.subjects = {};

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
