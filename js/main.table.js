var app = angular.module('main', ['ngTable', 'ngResource', 'DemoMock'])
    .controller('TableCtrl', function($scope, $timeout, $resource, ngTableParams) {
        var Api = $resource('/data');

        $scope.data;

        $scope.tableParams = new ngTableParams({
            page: 1,            // show first page
            count: 10,          // count per page
            sorting: {
                name: 'asc'     // initial sorting
            }
        }, {
            total: 0,           // length of data
            getData: function($defer, params) {
                // ajax request to api
                Api.get(params.url(), function(data) {
                    $timeout(function() {
                        // update table params
                        params.total(data.total);
                        // set new data
                        $defer.resolve(data.result);

                        $scope.data = data;
                    }, 500);
                });
            }
        });

        $scope.newDialog =  function() {
            $scope.data.result[$scope.data.result.length] = {"age":"43", name:"Dror"}
        };
        $scope.removeMe =  function() {
            $scope.data.result.splice(0, 1);
        };
    });