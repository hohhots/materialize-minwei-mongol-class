'use strict';

angular.
  module('core.subject').
  factory('Subject', ['$resource',
    function($resource) {
      return $resource('data/rootMenu.json');
    }
  ]);
