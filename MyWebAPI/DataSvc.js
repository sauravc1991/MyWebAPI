var myApp = angular.module('myApp', []);
myApp.controller('myCtrl', ['$scope', '$http', function ($scope, $http) {
  console.log("controller hit");

  getStudents();

  //Function to get Students List
  function getStudents() {
    $http({
      method: 'GET',
      url: '/api/data'
    }).
      success(function (data) {
        $scope.students = data;
      });
  };

  //Function to add a new student record
  $scope.addStudent = function() {
    $http({
        method: 'POST',
        url: '/api/data',
        data: JSON.stringify($scope.newStudent),
        headers: { 'Content-Type': 'application/JSON' }
      }).
      success(function(data) {
        window.alert("The Student Saved Successfully!!!");
        getStudents();
      })
      .error(function(error) {
        window.alert('Unable to create a student: ' + error.message);
      });
  };

  //Function to delete a student record
  $scope.delStudent = function(id) {
    console.log(id);
    $http({
        method: 'DELETE',
        url: '/api/data/' + id
      }).
      success(function(data) {
        window.alert("The Student deleted Successfully!!!");
        getStudents();
      })
      .error(function(error) {
        window.alert('Unable to delete the student: ' + error.message);
      });
  };

  //Function to Populate Edit Form
  $scope.populateForm = function(id) {
    $http({
        method: 'GET',
        url: '/api/data/' + id
      }).
      success(function(data) {
        $scope.newStudent = data;
      });
  };

  //Function to edit a student record
  $scope.updateStudent = function (id) {
    $http({
      method: 'PUT',
      url: '/api/data/' + id,
      data: JSON.stringify($scope.newStudent)
    }).
    success(function(data) {
      window.alert('Student record updated successfully');
        getStudents();
      });

  };

  $scope.checkNull = function(students) {
    if (students.length > 0) {
      return true;
    } else {
      return false;
    }
  };


}]);