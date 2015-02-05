angular.module('datainput.workingstepmistakes', [])
    .config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.when('/datainput-workingstepmistakes', {
                templateUrl: 'datainput/workingstepmistakes.tpl.html',
                controller: 'DataInputWorkingstepMistakesController'
            });
        }
    ])
    .controller('DataInputWorkingstepMistakesController', [
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
            Console.group("DataInputWorkingstepMistakesController entered.");


            //sets ngDisable to false(submitbutton is enabled!)
            $scope.submitDisabled = false;

            //init the Button color (red )
            $scope.buttonstate = "btn btn-danger";

            //init datainput values
            $scope.data = {
                logistics : "",
                mechanicalconstruction : "",
                assembly : "",
                finalassembly : "",
                check : "",
                rework : ""
            };

            //init the text for the dropdown menus
            $scope.dropdownCalendarWeekText = $filter('translate')('_calendar.week');

            //init datastate for the checkIfAllTrue function
            $scope.datastate = {
                'logistics': false,
                'mechanicalconstruction': false,
                'assembly': false,
                'finalassembly': false,
                'check': false,
                'rework': false,
                'calendarWeek': false
            };

            //get the inputdata from the server
            $http({
                method: "GET",
                url: '/workingstepmistakes/inputdata/'
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
            //set the smiley values: 2 is default, templateurl and updateKey
            $scope.smiley = {
                value: 2,
                updateKey: 11
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

            //if the data change of the field
            $scope.checkLogisticsInput = function() {
                //allow no float number
                if ($scope.data.logistics.indexOf(',') > -1) {
                    $scope.data.logistics = $scope.data.logistics.replace(",", "");
                }
                if ($scope.data.logistics.indexOf('.') > -1) {
                    $scope.data.logistics = $scope.data.logistics.replace(".", "");
                }
                if ($.isNumeric($scope.data.logistics) && $scope.data.logistics >= 0) {
                    $scope.datastate.logistics = true;
                } else {
                    $scope.datastate.logistics = false;
                }
                $scope.checkIfAllTrue();
            };

            //if the data change of the field
            $scope.checkMechanicalconstructionInput = function() {
                //allow no float number
                if ($scope.data.mechanicalconstruction.indexOf(',') > -1) {
                    $scope.data.mechanicalconstruction = $scope.data.mechanicalconstruction.replace(",", "");
                }
                if ($scope.data.mechanicalconstruction.indexOf('.') > -1) {
                    $scope.data.mechanicalconstruction = $scope.data.mechanicalconstruction.replace(".", "");
                }
                if ($.isNumeric($scope.data.mechanicalconstruction) && $scope.data.mechanicalconstruction >= 0) {
                    $scope.datastate.mechanicalconstruction = true;
                } else {
                    $scope.datastate.mechanicalconstruction = false;
                }
                $scope.checkIfAllTrue();
            };

            //if the data change of the field
            $scope.checkAssemblyInput = function() {
                //allow no float number
                if ($scope.data.assembly.indexOf(',') > -1) {
                    $scope.data.assembly = $scope.data.assembly.replace(",", "");
                }
                if ($scope.data.assembly.indexOf('.') > -1) {
                    $scope.data.assembly = $scope.data.assembly.replace(".", "");
                }
                if ($.isNumeric($scope.data.assembly) && $scope.data.assembly >= 0) {
                    $scope.datastate.assembly = true;
                } else {
                    $scope.datastate.assembly = false;
                }
                $scope.checkIfAllTrue();
            };

            //if the data change of the field
            $scope.checkFinalassemblyInput = function() {
                if ($scope.data.finalassembly.indexOf(',') > -1) {
                    $scope.data.finalassembly = $scope.data.finalassembly.replace(",", "");
                }
                if ($scope.data.finalassembly.indexOf('.') > -1) {
                    $scope.data.finalassembly = $scope.data.finalassembly.replace(".", "");
                }
                if ($.isNumeric($scope.data.finalassembly) && $scope.data.finalassembly >= 0) {
                    $scope.datastate.finalassembly = true;
                } else {
                    $scope.datastate.finalassembly = false;
                }
                $scope.checkIfAllTrue();
            };

            //if the data change of the field
            $scope.checkCheckInput = function() {
                if ($scope.data.check.indexOf(',') > -1) {
                    $scope.data.check = $scope.data.check.replace(",", "");
                }
                if ($scope.data.check.indexOf('.') > -1) {
                    $scope.data.check = $scope.data.check.replace(".", "");
                }
                if ($.isNumeric($scope.data.check) && $scope.data.check >= 0) {
                    $scope.datastate.check = true;
                } else {
                    $scope.datastate.check = false;
                }
                $scope.checkIfAllTrue();
            };
            //if the data change of the field
            $scope.checkReworkInput = function() {
                if ($scope.data.rework.indexOf(',') > -1) {
                    $scope.data.rework = $scope.data.rework.replace(",", "");
                }
                if ($scope.data.rework.indexOf('.') > -1) {
                    $scope.data.rework = $scope.data.rework.replace(".", "");
                }
                if ($.isNumeric($scope.data.rework) && $scope.data.rework >= 0) {
                    $scope.datastate.rework = true;
                } else {
                    $scope.datastate.rework = false;
                }
                $scope.checkIfAllTrue();
            };

            //returns false if one field are empty
            $scope.checkIfAllTrue = function() {
                var temp = true;
                _.each($scope.datastate, function(value, key) {
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

            //sets the value and the text for the dropdown menu
            $scope.setDropdownCalendarWeekValue = function(value) {
                $scope.dropdownCalendarWeekText = value;
                $scope.dropDownCalendarWeekValue = value;
                $scope.datastate.calendarWeek = true;
                $scope.checkIfAllTrue();
            };

            //only for debug
            $scope.printdata = function() {
                console.log("logistics: " + $scope.data.logistics);
                console.log("Mechnicalconstruction: " + $scope.data.mechanicalconstruction);
                console.log("assembly: " + $scope.data.assembly);
                console.log("finalassembly: " + $scope.data.finalassembly);
                console.log("check: " + $scope.data.check);
                console.log("rework: " + $scope.data.rework);
            };

            $scope.clearForm = function() {
                $("#datainputform").remove();
            };

            //Creates the view if the Data successfully submitted and shows the values
            $scope.createResponseView = function() {
                //creates a date from the milliseconds
                $scope.responsedata.date = new Date($scope.responsedata.date);
                $scope.noUpdateData();
                $scope.dataResponseTemplate = {
                    name: 'customerSatisfactionResponse.html',
                    url: 'assets/datainputresponse/workingstepmistakesResponse.html'
                };
            };

            // change the route to the main datainput page
            $scope.backToDataInput = function() {
                $location.path("/datainput");
            };

            // sets the data to zero if a field is null or undiefiend. So theres always a correct record
            $scope.setData = function() {
                if (!$scope.data.logistics) {
                    $scope.data.logistics = 0;
                }
                if (!$scope.data.mechanicalconstruction) {
                    $scope.data.mechanicalconstruction = 0;
                }
                if (!$scope.data.assembly) {
                    $scope.data.assembly = 0;
                }
                if (!$scope.data.finalassembly) {
                    $scope.data.finalassembly = 0;
                }
                if (!$scope.data.check) {
                    $scope.data.check = 0;
                }
                if (!$scope.data.rework) {
                    $scope.data.rework = 0;
                }
                if (!$scope.data.note) {
                    $scope.data.note = "-";
                }
            };

            // function if the submitbutton is klicked
            // calls data check functions
            // sends the data to the server if erverything is ok
            $scope.submit = function(method) {
                if ($scope.checkIfAllTrue()) {
                    //Preventing Double Form Submission
                    $scope.submitDisabled = true;
                    var postObject = {
                        "logistics": String($scope.data.logistics),
                        "mechanicalconstruction": String($scope.data.mechanicalconstruction),
                        "assembly": String($scope.data.assembly),
                        "finalassembly": String($scope.data.finalassembly),
                        "check": String($scope.data.check),
                        "rework": String($scope.data.rework),
                        "note": $scope.data.note,
                        "calendarWeek": $scope.dropDownCalendarWeekValue
                    };
                    $http({
                        url: 'workingstepmistakes/',
                        method: method,
                        data: postObject
                    }).success(function(data, status, headers, config) {
                        $scope.submitSmileyValue();
                        $scope.clearForm();
                        $scope.responsedata = data;
                        $scope.createResponseView();
                    }).error(function(data, status, headers, config) {
                        $scope.status = status;
                        switch (status) {
                            //data not modified -> create update view
                            case 304:
                                $scope.status = $filter('translate')('_data.already.existing.calendar.week');
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