angular.module('datainput.processingtime', [])
    .config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.when('/datainput-processingtime', {
                templateUrl: 'datainput/processingtime.tpl.html',
                controller: 'DataInputProcessingTimeController'
            });
        }
    ])
    .controller('DataInputProcessingTimeController', [
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
            Console.group("DataInputProcessingTimeController entered.");

            //sets ngDisable to false(submitbutton is enabled!)
            $scope.submitDisabled = false;

            //init the Button color (red )
            $scope.buttonstate = "btn btn-danger";

            //init datainput values
            $scope.data = {
                readyForInspection: "",
                remainingPointsFinished: "",
                delivered: ""
            };

            //init the dataState with all false.
            //The data can only submitted if all true
            $scope.datastate = {
                'readyForInspection': false,
                'remainingPointsFinished': false,
                'delivered': false,
                'month': false,
                'year': false
            };

            //init the text for the dropdown menus
            $scope.dropdownMonthText = $filter('translate')('_month');
            $scope.dropdownYearText = $filter('translate')('_year');

            // get the values from the server for the dropdowns
            $http({
                method: "GET",
                url: '/processingtime/inputdata/'
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
            //set the smiley values: 2 is default(Yellow Smiley) and updateKey
            $scope.smiley = {
                value: 2,
                updateKey: 7
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

            //if the ready for inspection data changed
            $scope.checkReadyForInspectioninput = function() {
                //when someone enters a comma instead of a dot it will be change to a dot
                if ($scope.data.readyForInspection.indexOf(',') > -1) {
                    $scope.data.readyForInspection = $scope.data.readyForInspection.replace(",", ".");
                }
                //Test for numeric and positive value
                if ($.isNumeric($scope.data.readyForInspection) && $scope.data.readyForInspection >= 0) {
                    $scope.datastate.readyForInspection = true;
                    //Console.debug("readyForInspection IS NUMERIC");
                } else {
                    $scope.datastate.readyForInspection = false;
                    //Console.debug("readyForInspection IS NOT NUMERIC");
                }
                $scope.checkIfAllTrue();
            };

            //if the Remaininpoints data changed
            $scope.checkRemainingPointsFinishedInput = function() {
                //when someone enters a comma instead of a dot it will be change to a dot
                if ($scope.data.remainingPointsFinished.indexOf(',') > -1) {
                    $scope.data.remainingPointsFinished = $scope.data.remainingPointsFinished.replace(",", ".");
                }
                //Test for numeric and positive value
                if ($.isNumeric($scope.data.remainingPointsFinished) && $scope.data.remainingPointsFinished >= 0) {
                    $scope.datastate.remainingPointsFinished = true;
                    //Console.debug(" remainingPointsFinished IS NUMERIC");
                } else {
                    $scope.datastate.remainingPointsFinished = false;
                    //Console.debug("remainingPointsFinished IS NOT NUMERIC");
                }
                $scope.checkIfAllTrue();
            };

            //if the delivered data changed
            $scope.checkDeliveredInput = function() {
                if ($scope.data.delivered.indexOf(',') > -1) {
                    $scope.data.delivered = $scope.data.delivered.replace(",", ".");
                }
                //Test for numeric and positive value
                if ($.isNumeric($scope.data.delivered) && $scope.data.delivered >= 0) {
                    $scope.datastate.delivered = true;
                    // Console.debug(" delivered IS NUMERIC");
                } else {
                    $scope.datastate.delivered = false;
                    //Console.debug("delivered IS NOT NUMERIC");
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

            //only for debuggin
            $scope.printData = function() {
                Console.debug("readyForInspection: " + $scope.data.readyForInspection);
                Console.debug("remainingPointsFinished: " + $scope.data.remainingPointsFinished);
                Console.debug("delivered: " + $scope.data.delivered);
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
                    url: 'assets/templates/datainputresponse/processingTimeResponse.html'
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
                        "readyForInspection": $scope.data.readyForInspection,
                        "remainingPointsFinished": $scope.data.remainingPointsFinished,
                        "delivered": $scope.data.delivered,
                        "note": $scope.data.note,
                        "month": $scope.dropdownMonthValue,
                        "year": $scope.dropdownYearValue
                    };
                    $http({
                        url: 'processingtime/',
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
                            //Data not modified -> create update value
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