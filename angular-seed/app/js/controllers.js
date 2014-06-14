'use strict';

/* Controllers */

var mealMeControllers = angular.module('mealMeControllers', []);

mealMeControllers.controller('recipeSelectorCtrl', ['$scope', '$http',
  function($scope, $http) {
    $http.get('json/recipes.json').success(function(data) {
      $scope.recipes = data;
    });

    //$scope.orderProp = 'age';
  }]);

mealMeControllers.controller('shoppingListCtrl', ['$scope', '$routeParams', '$http',
  function($scope, $routeParams, $http) {
    $http.get('json/' + $routeParams.recipeId + '.json').success(function(data) {
    //$http.get('json/recipes.json').success(function(data) {
      $scope.recipes = data;
    });
  }]);