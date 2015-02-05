angular.module('options', [])
    .config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.when('/options', {
                templateUrl: 'options/options.tpl.html',
                controller: 'OptionsController'
            });
        }
    ])
    .controller('OptionsController', [
        '$timeout',
        'Console',
        '$translate',
        '$scope',
        '$http',
        '$filter',
        '$cookieStore',
        '$rootScope',
        function(
            $timeout,
            Console,
            $translate,
            $scope,
            $http,
            $filter,
            $cookieStore,
            $rootScope
        ) {
            Console.group("OptionsController entered.");
            //init the status text
            $scope.sendOptionsToServerStatus = $filter('translate')('_send.option.to.server.input.help');
            $scope.presentationIntervalStatus = $filter('translate')('_presentation.interval.input.help');
            $scope.oldPasswordStatus = $filter('translate')('_admin.password.old');
            $scope.newPasswordOneStatus = $filter('translate')('_admin.password.new');
            $scope.newPasswordTwoStatus = $filter('translate')('_admin.password.repeat');
            //init the password data object
            $scope.data = {
                oldPassword: "",
                newPasswordOne: "",
                newPasswordTwo: ""
            };

            //index numbers of the operatingNumbersOptions Array
            $rootScope.operatingNumbersOptionsIndexes = {
                remainingPoints: 0,
                workingstepMistakes: 1,
                upstreanProcessMistakes: 2,
                portfolio: 3,
                labourProductivity: 4,
                scrappedMaterial: 5,
                deliveryReliabilityLogistics: 6,
                processingTime: 7,
                capacity: 8,
                ideasProcessImprovements: 9,
                customerSatisfaction: 10,
                numberProducedCabinets: 11,
                deliveryReliabilityUpstreamConstruction: 12
            };

            // interval change function
            $scope.intervalTimeChange = function() {
                //only if it is a number
                if ($.isNumeric($scope.data.intervalTime)) {
                    //set the interval time in milliseconds
                    $rootScope.intervalTime = $scope.data.intervalTime * 1000;
                    //change the status for 5 seconds
                    $scope.presentationIntervalStatus = $filter('translate')('_succesfully.changed.in') + " " + $scope.data.intervalTime + $filter('translate')('_seconds');
                    $timeout(function() {
                        $scope.presentationIntervalStatus = $filter('translate')('_presentation.interval.input.help');
                    }, 5000);
                }
            };

            //send the options to the server by using the rootScope function
            $scope.sendToServer = function() {
                $rootScope.sendOptionsToServer('PUT');
                //change the status for 5 seconds
                $scope.sendOptionsToServerStatus = $filter('translate')('_succesfully.send');
                $timeout(function() {
                    $scope.sendOptionsToServerStatus = $filter('translate')('_send.option.to.server.input.help');
                }, 5000);
            };

            //checks if both passwords are equal
            $scope.checkNewPassword = function() {
                var p1 = $scope.data.newPasswordOne;
                var p2 = $scope.data.newPasswordTwo;
                if (p1 === p2) {
                    return true;
                } else {
                    return false;
                }
            };

            //checks if  a admin password exists. So the old password input field will be hidden.
            $http({
                url: '/security/newpassword/',
                method: 'GET'
            }).success(function(data, status, headers, config) {}).error(function(data, status, headers, config) {
                Console.debug(status);
                Console.debug(data);
                switch (status) {
                    case 304:
                        Console.debug("ERROR 304: data: ", data, "status: ", status);
                        break;
                    case 305:
                        Console.debug("ERROR 305: data: ", data, "status: ", status);
                        break;
                    case 306:
                        console.debug("Kein altes password vorhanden");
                        $scope.oldPasswordStatus = "no old password require";
                        $scope.inputType = "hidden";
                        break;
                    case 307:
                        // console.debug("altes password vorhanden")
                        $scope.inputType = "password";
                        break;
                    default:
                        Console.debug("ERROR default: data: ", data, "status: ", status);

                }
            });

            // function for makeing new admin password, or set new admin password.
            $scope.sendNewPassword = function() {
                if ($scope.checkNewPassword()) {
                    // console.debug("sending ...")
                    var putObject = {
                        "oldPassword": $scope.data.oldPassword,
                        "newPassword": $scope.data.newPasswordOne
                    };
                    $http({
                        url: '/security/newpassword/',
                        method: 'PUT',
                        data: putObject
                    }).success(function(data, status, headers, config) {
                        $scope.submitStatus = "password  succesfully set";
                        $scope.data = {
                            oldPassword: "",
                            newPasswordOne: "",
                            newPasswordTwo: ""
                        };
                        $scope.inputType = "password";
                    }).error(function(data, status, headers, config) {
                        Console.debug(status);
                        Console.debug(data);
                        switch (status) {
                            case 304:
                                Console.debug("ERROR 304: data: ", data, "status: ", status);
                                $scope.submitStatus = "old password not correct";
                                break;
                            case 305:
                                Console.debug("ERROR 305: data: ", data, "status: ", status);
                                break;
                            default:
                                Console.debug("ERROR default: data: ", data, "status: ", status);
                        }
                    });
                } else {
                    $scope.submitStatus = "Please enter Password";
                }
            };
            Console.groupEnd();
        }
    ]);