const app = angular.module('mushroomApp', ['ngRoute'])

app.config(($routeProvider, $locationProvider) => {
  $locationProvider.hashPrefix('')
  $routeProvider
  .when('/', {
    controller: 'DoctorsCtrl',
    templateUrl: 'partials/doctors.html'
  })
  .when('/', {
    controller: 'DoctorsCtrl',
    templateUrl: 'partials/patients.html'
  })
  .otherwise({
    redirectTo: '/'
  })
})

app.controller('DoctorsCtrl', function($scope, mainFactory) {
  mainFactory.getList()
  .then((val) => {
    console.log('val from mainctrl', val)
    $scope.mushrooms = val.mushrooms
  })
})

app.controller('DetailCtrl', function($scope, $routeParams, $http) {
  $scope.thatNumber = $routeParams.someVariable
  $http.get(`list.json`)
  .then(function(val) {
    $scope.selectedItem = val.data.list[$scope.thatNumber]
    // $scope.selectedItem = list[$scope.thatNumber]
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
