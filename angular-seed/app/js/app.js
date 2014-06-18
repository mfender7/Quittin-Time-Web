'use strict';


// Declare app level module which depends on filters, and services

var mealMeApp = angular.module('mealMeApp', [
  'ngRoute',
  'mealMeControllers',
  'mobile-angular-ui'
  //,
  //'myApp.filters',
  //'myApp.services',
  //'myApp.directives'
]);

mealMeApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/recipeSelector', {
        templateUrl: 'partials/recipeSelector.html',
        controller: 'recipeSelectorCtrl'
      }).
      when('/recipes/:recipeId', {
        templateUrl: 'partials/shoppingList.html',
        controller: 'shoppingListCtrl'
      }).
      //when('/shoppingList/:ingredientId', {
      //  templateUrl: 'partials/ingredientId.html',
      //  controller: 'PhoneDetailCtrl'
      //}).
      otherwise({
        redirectTo: '/recipeSelector'
      });
  }]);