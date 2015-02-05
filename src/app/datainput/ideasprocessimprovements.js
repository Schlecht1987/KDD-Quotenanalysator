angular.module('datainput.ideasprocessimprovements', [])
    .config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.when('/datainput-ideasprocessimprovements', {
                templateUrl: 'datainput/ideasprocessimprovements.tpl.html',
                controller: 'DataInputIdeasProcessImprovementsController'
            });
        }
    ])
    .controller('DataInputIdeasProcessImprovementsController', [
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
            Console.group("DataInputIdeasProcessImprovementsController entered.");


            //sets ngDisable to false(submitbutton is enabled!)
            $scope.submitDisabled = false;

            //init the Button color (red )
            $scope.buttonstate = "btn btn-danger";

            //init the input values

            $scope.data = {
                overallIdeas: "",
                implementedIdeas: ""
            };

            //init the dataState with all false.
            //The data can only submitted if all true
            $scope.datastate = {
                'overallIdeas': false,
                'implementedIdeas': false,
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
            //set the smiley values: 2 is default(Yellow Smiley)  and updateKey
            $scope.smiley = {
                value: 2,
                updateKey: 3
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

            //if the overall ideas data changed
            $scope.checkOverallIdeasInput = function() {
                //when someone enters a comma instead of a dot it will be change to a dot
                if ($scope.data.overallIdeas.indexOf(',') > -1) {
                    $scope.data.overallIdeas = $scope.data.overallIdeas.replace(",", "");
                }
                if ($scope.data.overallIdeas.indexOf('.') > -1) {
                    $scope.data.overallIdeas = $scope.data.overallIdeas.replace(".", "");
                }
                //Test for numeric and positive value
                if ($.isNumeric($scope.data.overallIdeas) && $scope.data.overallIdeas >= 0) {
                    $scope.datastate.overallIdeas = true;
                    // Console.debug("overallIdeas IS NUMERIC");
                } else {
                    $scope.datastate.overallIdeas = false;
                    //Console.debug("overallIdeas IS NOT NUMERIC");
                }
                $scope.checkIfAllTrue();
            };

            //if the implemented ideas data changed
            $scope.checkImplementedIdeasInput = function() {
                //when someone enters a comma instead of a dot it will be change to a dot
                if ($scope.data.implementedIdeas.indexOf(',') > -1) {
                    $scope.data.implementedIdeas = $scope.data.implementedIdeas.replace(",", "");
                }
                if ($scope.data.implementedIdeas.indexOf('.') > -1) {
                    $scope.data.implementedIdeas = $scope.data.implementedIdeas.replace(".", "");
                }
                //Test for numeric and positive value
                if ($.isNumeric($scope.data.implementedIdeas) && $scope.data.implementedIdeas >= 0) {
                    $scope.datastate.implementedIdeas = true;
                    Console.debug(" implementedIdeas IS NUMERIC");
                } else {
                    $scope.datastate.implementedIdeas = false;
                    Console.debug("implementedIdeas IS NOT NUMERIC");
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
                Console.debug("overallIdeas: " + $scope.data.overallIdeas);
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
                    url: 'assets/datainputresponse/ideasProcessImprovements.html'
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
                        "overallIdeas": $scope.data.overallIdeas,
                        "implementedIdeas": $scope.data.implementedIdeas,
                        "note": $scope.data.note,
                        "month": $scope.dropdownMonthValue,
                        "year": $scope.dropdownYearValue
                    };
                    $http({
                        url: 'ideasprocessimprovements/',
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