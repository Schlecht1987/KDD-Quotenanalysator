angular.module('datainput.portfolio', [])
    .config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.when('/datainput-portfolio', {
                templateUrl: 'datainput/portfolio.tpl.html',
                controller: 'DataInputPortfolioController'
            });
        }
    ])
    .controller('DataInputPortfolioController', [
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
            Console.group("DataInputPortfolioController entered.");


            //sets ngDisable to false(submitbutton is enabled!)
            $scope.submitDisabled = false;
            //init the Button color (red )
            $scope.buttonstate = "btn btn-danger";

            //init inputdata values

            $scope.data = {
                portfolio: ""
            };

            //init the dataState with all false.
            //The data can only submitted if all true
            $scope.datastate = {
                'portfolio': false,
                'calendarWeek': false
            };

            //init the text for the dropdown menus
            $scope.dropdownCalendarWeekText = $filter('translate')('_calendar.week');

            // get the values from the server for the dropdowns
            $http({
                method: "GET",
                url: '/portfolio/inputdata/'
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
                updateKey: 6
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

            //if the Portfolio data changed
            $scope.checkPortfolioInput = function() {
                if ($scope.data.portfolio.indexOf(',') > -1) {
                    $scope.data.portfolio = $scope.data.portfolio.replace(",", ".");
                }
                //Test for numeric and positive value
                if ($.isNumeric($scope.data.portfolio) && $scope.data.portfolio >= 0) {
                    $scope.datastate.portfolio = true;
                    //Console.debug("portfolio IS NUMERIC");
                } else {
                    $scope.datastate.portfolio = false;
                    //Console.debug("portfolio IS NOT NUMERIC");
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
                Console.debug("Portfolio: " + $scope.data.portfolio);
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
                    url: 'assets/datainputresponse/portfolioResponse.html'
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
                        "portfolio": $scope.data.portfolio,
                        "note": $scope.data.note,
                        "calendarWeek": $scope.dropDownCalendarWeekValue
                    };
                    $http({
                        url: 'portfolio/',
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
                            //Data not modified -> create update view
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