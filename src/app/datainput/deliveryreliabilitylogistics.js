angular.module('datainput.deliveryreliabilitylogistics', [])
    .config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.when('/datainput-deliveryreliabilitylogistics', {
                templateUrl: 'datainput/deliveryreliabilitylogistics.tpl.html',
                controller: 'DataInputDeliveryReliabilityLogisticsController'
            });
        }
    ])
    .controller('DataInputDeliveryReliabilityLogisticsController', [
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
            Console.group("DataInputDeliveryReliabilityLogisticsController entered.");


            //sets ngDisable to false(submitbutton is enabled!)
            $scope.submitDisabled = false;

            //init the Button color (red )
            $scope.buttonstate = "btn btn-danger";

            //init the input values

            $scope.data = {
                numberCommissioningTrolleys: "",
                numberIncompleteCommissioningTrolleys: ""
            };

            //init the dataState with all false.
            //The data can only submitted if all true
            $scope.datastate = {
                'numberCommissioningTrolleys': false,
                'numberIncompleteCommissioningTrolleys': false,
                'calendarWeek': false
            };
            //init the text for the dropdown menus
            $scope.dropdownCalendarWeekText = $filter('translate')('_calendar.week');
            // get the values from the server for the dropdowns
            $http({
                method: "GET",
                url: '/deliveryreliabilitylogistics/inputdata/'
            }).
            success(function(data) {
                if (!data.error) {
                    Console.debug("data", data);
                    $scope.inputData = data;
                    $scope.inputData.calendarWeeks = $scope.inputData.calendarWeeks.reverse();

                }
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
                updateKey: 2
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



            //if the  data changed
            $scope.checkNumberCommissioningTrolleysInput = function() {
               if ($scope.data.numberCommissioningTrolleys.indexOf(',') > -1) {
                $scope.data.numberCommissioningTrolleys = $scope.data.numberCommissioningTrolleys.replace(",", ".");
              }
                //Test for numeric and positive value
                if ($.isNumeric($scope.data.numberCommissioningTrolleys) &&
                    $scope.data.numberCommissioningTrolleys >= 0) {
                    $scope.datastate.numberCommissioningTrolleys = true;
                    //Console.debug("numberCommissioningTrolleys IS NUMERIC");
                } else {
                    $scope.datastate.deviationInDays = false;
                    //Console.debug("numberCommissioningTrolleys IS NOT NUMERIC");
                }
                $scope.checkIfAllTrue();
            };

            //if the  data changed
            $scope.checkNumberIncompleteCommissioningTrolleysInput = function() {
               if ($scope.data.numberIncompleteCommissioningTrolleys.indexOf(',') > -1) {
                $scope.data.numberIncompleteCommissioningTrolleys = $scope.data.numberIncompleteCommissioningTrolleys.replace(",", ".");
              }
                //Test for numeric and positive value
                if ($.isNumeric($scope.data.numberIncompleteCommissioningTrolleys) &&
                    $scope.data.numberIncompleteCommissioningTrolleys >= 0) {
                    $scope.datastate.numberIncompleteCommissioningTrolleys = true;
                    Console.debug("numberIncompleteCommissioningTrolleys IS NUMERIC");
                } else {
                    $scope.datastate.numberIncompleteCommissioningTrolleys = false;
                    Console.debug("numberIncompleteCommissioningTrolleys IS NOT NUMERIC");
                }
                $scope.checkIfAllTrue();
            };

            //returns false if one field are empty or false
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
                Console.debug("numberCommissioningTrolleys: " + $scope.data.numberCommissioningTrolleys);
                Console.debug("numberIncompleteCommissioningTrolleys: " + $scope.data.numberIncompleteCommissioningTrolleys);
                Console.debug("calendarweek value: " + $scope.dropDownCalendarWeekValue);
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
                    url: 'assets/datainputresponse/deliveryReliabilityLogisticsResponse.html'
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
                        "numberCommissioningTrolleys": $scope.data.numberCommissioningTrolleys,
                        "numberIncompleteCommissioningTrolleys": $scope.data.numberIncompleteCommissioningTrolleys,
                        "note": $scope.data.note,
                        "calendarWeek": $scope.dropDownCalendarWeekValue
                    };
                    $http({
                        url: 'deliveryreliabilitylogistics/',
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
                                //updating data failed
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
                    alert("please enter values correct!");
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