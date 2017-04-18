'use strict';

// Register `phoneDetail` component, along with its associated controller and template
angular.
  module('missionList').
  component('missionList', {
    templateUrl: 'scripts/mission-list/mission-list.template.html',
    controller: ['Mission', '$stateParams', function MissionListController(Mission, $stateParams) {
      var self = this;

      self.startTest = true;

      self.subjectId = $stateParams.subjectId;

      self.missions = Mission.query({subjectId: self.subjectId});

      self.orderProp = 'id';

      self.test = function(missionId) {
        self.startTest = false;
      };

    }]
  });
