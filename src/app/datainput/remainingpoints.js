angular.module('datainput.remainingpoints', [])
    .config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.when('/datainput-remainingpoints', {
                templateUrl: 'datainput/remainingpoints.tpl.html',
                controller: 'DataInputRemainingPointsController'
            });
        }
    ])
    .controller('DataInputRemainingPointsController', [
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
            Console.group("DataInputRemainingPointsController entered.");


            //sets ngDisable to false(submitbutton is enabled!)
            $scope.submitDisabled = false;

            //init the Button color (red )
            $scope.buttonstate = "btn btn-danger";

            //init the datainput values
            $scope.data = {
                construction: "",
                production: "",
                byDelivery: ""
            };

            //init the dataState with all false.
            //The data can only submitted if all true
            $scope.datastate = {
                'construction': false,
                'production': false,
                'byDelivery': false,
                'month': false,
                'year': false
            };

            //init the text for the dropdown menus
            $scope.dropdownMonthText = $filter('translate')('_month');
            $scope.dropdownYearText = $filter('translate')('_year');

            // get the values from the server for the dropdowns
            $http({
                method: "GET",
                url: '/remainingpoints/inputdata/'
            }).
            success(function(data) {
                if (!data.error) {
                    Console.debug("data", data);
                    $scope.inputData = data;
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
            //set the smiley values: 2 is default, templateurl and updateKey
            $scope.smiley = {
                value: 2,
                updateKey: 8
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

            //sets the value and the text for the dropdown menu
            $scope.setDropdownMonthValue = function(text) {
                $scope.datastate.month = true;
                $scope.dropdownMonthText = $filter('translate')('_' + text);
                $scope.dropdownMonthValue = text;
                $scope.checkIfAllTrue();

            };
            //sets the value and the text for the dropdown menu
            $scope.setDropdownYearValue = function(year) {
                $scope.datastate.year = true;
                $scope.dropdownYearText = year;
                $scope.dropdownYearValue = year;
                $scope.checkIfAllTrue();
            };

            //if the construction data changed
            $scope.checkConstructionInput = function() {
                //when someone enters a comma instead of a dot it will be change to a dot
                if ($scope.data.construction.indexOf(',') > -1) {
                    $scope.data.construction = $scope.data.construction.replace(",", ".");
                }
                //Test for numeric and positive value
                if ($.isNumeric($scope.data.construction) && $scope.data.construction >= 0) {
                    $scope.datastate.construction = true;
                    // Console.debug("construction IS NUMERIC");
                } else {
                    $scope.datastate.construction = false;
                    // Console.debug("construction IS NOT NUMERIC");
                }
                $scope.checkIfAllTrue();

            };

            //if the Production data changed
            $scope.checkProductionInput = function() {
                //when someone enters a comma instead of a dot it will be change to a dot
                if ($scope.data.production.indexOf(',') > -1) {
                    $scope.data.production = $scope.data.production.replace(",", ".");
                }
                //Test for numeric and positive value
                if ($.isNumeric($scope.data.production) && $scope.data.production >= 0) {
                    $scope.datastate.production = true;
                    //  Console.debug(" production IS NUMERIC");
                } else {
                    $scope.datastate.production = false;
                    // Console.debug("production IS NOT NUMERIC");
                }
                $scope.checkIfAllTrue();
            };

            //if the byDelivery data changed
            $scope.checkByDeliveryInput = function() {
                if ($scope.data.byDelivery.indexOf(',') > -1) {
                    $scope.data.byDelivery = $scope.data.byDelivery.replace(",", ".");
                }
                //Test for numeric and positive value
                if ($.isNumeric($scope.data.byDelivery) && $scope.data.byDelivery >= 0) {
                    $scope.datastate.byDelivery = true;
                    // Console.debug(" byDelivery IS NUMERIC");
                } else {
                    $scope.datastate.byDelivery = false;
                    // Console.debug("byDelivery IS NOT NUMERIC");
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
                Console.debug("construction: " + $scope.data.construction);
                Console.debug("production: " + $scope.data.production);
                Console.debug("byDelivery: " + $scope.data.byDelivery);
                Console.debug("month value: " + $scope.dropdownMonthValue);
                Console.debug("year value: " + $scope.dropdownYearValue);
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
                    url: 'assets/datainputresponse/remainingPointsResponse.html'
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
                        "construction": $scope.data.construction,
                        "production": $scope.data.production,
                        "byDelivery": $scope.data.byDelivery,
                        "note": $scope.data.note,
                        "month": $scope.dropdownMonthValue,
                        "year": $scope.dropdownYearValue
                    };
                    $http({
                        url: 'remainingpoints/',
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
                                //data updating failed
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