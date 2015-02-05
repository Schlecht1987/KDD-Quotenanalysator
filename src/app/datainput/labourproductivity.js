angular.module('datainput.labourproductivity', [])
    .config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.when('/datainput-labourproductivity', {
                templateUrl: 'datainput/labourproductivity.tpl.html',
                controller: 'DataInputLabourProductivityController'
            });
        }
    ])
    .controller('DataInputLabourProductivityController', [
        'Console',
        '$translate',
        '$scope',
        '$http',
        '$filter',
        '$cookieStore',
        '$compile',
        '$location',
        function(
            Console,
            $translate,
            $scope,
            $http,
            $filter,
            $cookieStore,
            $compile,
            $location

        ) {
            Console.group("DataInputLabourProductivityController entered.");


            //sets ngDisable to false(submitbutton is enabled!)
            $scope.submitDisabled = false;

            //init the Button color (red )
            $scope.buttonstate = "btn btn-danger";

            //init the input values
            $scope.data = {
                completedCabinets: "",
                avgEmployee: ""
            };

            //init the dataState with all false.
            //The data can only submitted if all true
            $scope.datastate = {
                'avgEmployee': false,
                'completedCabinets': false,
                'calendarWeek': false
            };

            //init the text for the dropdown menus
            $scope.dropdownCalendarWeekText = $filter('translate')('_calendar.week');

            // get the values from the server for the dropdowns
            $http({
                method: "GET",
                url: '/labourproductivity/inputdata/'
            }).
            success(function(data) {
                if (!data.error) {
                    Console.debug("data", data);
                    $scope.inputData = data;
                    $scope.inputData.calendarWeeks = $scope.inputData.calendarWeeks.reverse();
                }
            }).error(function(data, status, headers, config) {
                Console.debug("data", data);
                Console.debug("status", status);
                Console.debug("headers", headers);
                Console.debug("config", config);
            });

            /*
        updateKey: 1 Customersatisfaction
        updateKey: 2 Deliveryreliabilitylogistics
        updateKey: 3 ideasprocessimprovements
        updateKey: 4 Capacity
        updateKey: 5 Labourproductivity
        updateKey: 6 Portfolio
        updateKey: 7 ProcessingTime
        updateKey: 8 Remainingpoints
        updateKey: 9 scrappedmaterial
        updateKey: 10 Upstreamprrocessmistakes
        updateKey: 11 workingsstepmistakes
        updateKey: 12 NumberPrdoducedCabinets
        updateKey: 13 DeliveryReliabilityUpstreamConstruction
        */
            //set the smiley values: 2 is default(Yellow Smiley) and updateKey
            $scope.smiley = {
                value: 2,
                updateKey: 5
            };

            //change the smiley value
            $scope.changeSmileyValue = function(value) {
                if (value >= 1 && value <= 3) {
                    $scope.smiley.value = value;
                } else {
                    $scope.smiley.value = 2;
                }
            };

            //sends the smileyvalue to server
            $scope.submitSmileyValue = function() {
                var postObject = {
                    "updateValue": $scope.smiley.value,
                    "updateKey": $scope.smiley.updateKey
                };
                $http({
                    url: 'smiley/',
                    method: 'POST',
                    data: postObject
                }).success(function(data, status, headers, config) {}).error(function(data, status, headers, config) {
                    Console.debug("ErroR:status:", status);
                    Console.debug(data);
                });
            };

            // The calendarweek drop down menu change function
            $scope.setDropdownCalendarWeekValue = function(value) {
                $scope.dropdownCalendarWeekText = value;
                $scope.dropDownCalendarWeekValue = value;
                $scope.datastate.calendarWeek = true;
                $scope.checkIfAllTrue();
            };


            //if the average number of employee data changed
            $scope.checkAvgEmployeeInput = function() {
                //when someone enters a comma instead of a dot it will be change to a dot
                if ($scope.data.avgEmployee.indexOf(',') > -1) {
                    $scope.data.avgEmployee = $scope.data.avgEmployee.replace(",", ".");
                }
                //Test for numeric and positive value
                if ($.isNumeric($scope.data.avgEmployee) && $scope.data.avgEmployee > 0) {
                    $scope.datastate.avgEmployee = true;
                    //Console.debug("avgEmployee IS NUMERIC AND POSITIVE");
                } else {
                    $scope.datastate.avgEmployee = false;
                    //Console.debug("avgEmployee IS NOT NUMERIC or not between 0 100");
                }
                $scope.checkIfAllTrue();
            };

            //if the completed cabinets data changed
            $scope.checkCompletedCabinetsInput = function() {
                //when someone enters a comma instead of a dot it will be change to a dot
                if ($scope.data.completedCabinets.indexOf(',') > -1) {
                    $scope.data.completedCabinets = $scope.data.completedCabinets.replace(",", ".");
                }
                //Test for numeric and positive value
                if ($.isNumeric($scope.data.completedCabinets) && $scope.data.completedCabinets >= 0) {
                    $scope.datastate.completedCabinets = true;
                    //Console.debug("completedCabinets IS NUMERIC positive");
                } else {
                    $scope.datastate.completedCabinets = false;
                    //Console.debug("completedCabinets IS NOT NUMERIC or negative");
                }
                $scope.checkIfAllTrue();
            };

            //returns false if one field are empty
            $scope.checkIfAllTrue = function() {
                var temp = true;
                _.each($scope.datastate, function(value) {
                    if (!value) {
                        temp = false;
                    }
                });
                if (temp) {
                    $scope.makeButtonSuccess();
                    return true;
                } else {
                    $scope.makeButtonWarning();
                    return false;
                }
            };

            //only for debug
            $scope.printData = function() {
                Console.debug("completed cabinets: " + $scope.data.completedCabinets);
                Console.debug("month value: " + $scope.dropdownMonthValue);
                Console.debug("year value: " + $scope.dropdownYearValue);
                Console.debug("average employee" + $scope.data.avgEmployee);
            };

            //Delete the form for response
            $scope.clearForm = function() {
                $("#datainputform").remove();
            };

            //Creates the view if the Data successfully submitted and shows the values
            $scope.createResponseView = function() {
                //creates a date from the milliseconds
                $scope.responsedata.date = new Date($scope.responsedata.date);
                $scope.noUpdateData();
                $scope.dataResponseTemplate = {
                    name: 'remainingPointsResponse.html',
                    url: 'assets/datainputresponse/labourProductivity.html'
                };
            };

            // change the route to the main datainput page
            $scope.backToDataInput = function() {
                $location.path("/datainput");
            };

            // function if the submitbutton is klicked
            // calls data check functions
            // sends the data to the server if erverything is ok
            $scope.submit = function(method) {
                if ($scope.checkIfAllTrue()) {
                    //Preventing Double  Submission
                    $scope.submitDisabled = true;
                    var postObject = {
                        "avgEmployee": $scope.data.avgEmployee,
                        "completedCabinetsOfYear": $scope.data.completedCabinets,
                        "note": $scope.data.note,
                        "calendarWeek": $scope.dropDownCalendarWeekValue
                    };
                    $http({
                        url: 'labourproductivity/',
                        method: method,
                        data: postObject
                    }).success(function(data, status, headers, config) {
                        $scope.submitSmileyValue();
                        $scope.clearForm();
                        $scope.responsedata = data;
                        $scope.responsedata.month = $filter('translate')('_' + data.month);
                        $scope.createResponseView();
                    }).error(function(data, status, headers, config) {
                        Console.debug(status);
                        Console.debug(data);
                        switch (status) {
                            //Data not modifed -> create update view
                            case 304:
                                $scope.status = $filter('translate')('_data.already.existing.month');
                                $scope.updateTemplate = {
                                    name: 'update.html',
                                    url: 'assets/update/update.html'
                                };
                                break;
                                //updating data failöed
                            case 305:
                                Console.debug("data: ", data, "status: ", status);
                                Console.debug("updating data failed: No Document found, or more than one found");
                                $scope.noUpdateData();
                                $scope.status = "Data updating failed";
                                break;
                            default:
                                $scope.status = "Fehlermeldung nicht vorhanden";
                        }
                    });
                } else {
                    alert("please enter correct values");
                }
            };

            //if the user doesen't update the data
            $scope.noUpdateData = function() {
                $scope.status = null;
                $scope.updateTemplate = null;
            };

            //button turns green
            $scope.makeButtonSuccess = function() {
                $scope.buttonstate = "btn btn-success";
            };

            //button turns red
            $scope.makeButtonWarning = function() {
                $scope.buttonstate = "btn btn-danger";
            };
            Console.groupEnd();
        }
    ]);