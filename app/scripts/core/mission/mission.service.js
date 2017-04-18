'use strict';

angular.
  module('core.mission').
  factory('Mission', ['$resource',
    function($resource) {
      return $resource('data/:subjectId/rootMenu.json');
    }
  ]);
