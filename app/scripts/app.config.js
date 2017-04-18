'use strict';

angular.
  module('learnMongolApp').
  config(['$stateProvider','$urlRouterProvider',
    function config($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('/subjects');

      var subjectState = {
        name: 'subjects',
        url: '/subjects',
        template: '<subject-list></subject-list>'
      };

      var missionState = {
        name: 'mission',
        url: '/{subjectId}/mission',
        template: '<mission-list></mission-list>'
      };

      $stateProvider.state(subjectState);
      $stateProvider.state(missionState);
    }
  ]);
