const app = angular.module('mushroomApp', ['ngRoute'])

app.config(($routeProvider, $locationProvider) => {
  $locationProvider.hashPrefix('')
  $routeProvider
  .when('/', {
    controller: 'MainCtrl',
    templateUrl: 'partials/main.html'
  })
  .otherwise({
    redirectTo: '/'
  })
})

app.controller('MainCtrl', function($scope, mainFactory) {
  mainFactory.getList()
  .then((val) => {
    console.log('val from mainctrl', val)
    $scope.mushrooms = val.mushrooms
  })
})


app.factory('mainFactory', function($http){
  return {
    getList : () => {
      return $http.get('mushroom.json')
      .then((value) => {
        console.log("value from mainFactory", value)
        return value.data
      })
    }
  };
})
