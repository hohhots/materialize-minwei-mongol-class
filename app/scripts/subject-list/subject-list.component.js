'use strict';

// Register `phoneDetail` component, along with its associated controller and template
angular.
  module('subjectList').
  component('subjectList', {
    templateUrl: 'scripts/subject-list/subject-list.template.html',
    controller: ['Subject', function subjectListController(Subject)   {
      this.subjects = Subject.query();
      this.orderProp = 'id';
        }
      ]
  });
