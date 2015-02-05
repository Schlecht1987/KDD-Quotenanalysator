angular.module('datainput.customersatisfaction', [])
    .config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.when('/datainput-customersatisfaction', {
                templateUrl: 'datainput/customersatisfaction.tpl.html',
                controller: 'DataInputCustomerSatisfactionController'
            });
        }
    ])
    .controller('DataInputCustomerSatisfactionController', [
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
            Console.group("DataInputCustomerSatisfactionController entered.");


            //sets ngDisable to false(submitbutton is enabled!)
            $scope.submitDisabled = false;

            //init the Button color (red )
            $scope.buttonstate = "btn btn-danger";

            //init the input values
            $scope.data = {
                customersatisfaction: "",
                customername: "",
                projectnumber: ""
            };


            //init the dataState with all false.
            //The data can only submitted if all true
            $scope.dataState = {
                'customername': false,
                'customersatisfaction': false,
                'projectnumber': false,
                'year': false,
                'month': false
            };
            //init the dropdown texts
            $scope.dropdownYearText = $filter('translate')('_year');
            $scope.dropdownMonthText = $filter('translate')('_month');

            // get the values from the server for the dropdowns
            $http({
                method: "GET",
                url: '/customerSatisfaction/inputdata/'
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
                updateKey: 1
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
                }).success(function(data, status, headers, config) {

                }).error(function(data, status, headers, config) {
                    Console.debug("ErroR:status:", status);
                    Console.debug(data);
                });
            };
            //check the Customersatisfaction input (must be between 1 and 5)
            $scope.checkCustomerSatisfactionInput = function() {
                if ($scope.data.customersatisfaction.indexOf(',') > -1) {
                    $scope.data.customersatisfaction = $scope.data.customersatisfaction.replace(",", "");
                }

                if ($scope.data.customersatisfaction.indexOf('.') > -1) {
                    $scope.data.customersatisfaction = $scope.data.customersatisfaction.replace(".", "");
                }


                if ($.isNumeric($scope.data.customersatisfaction) &&
                    $scope.data.customersatisfaction >= 1 &&
                    $scope.data.customersatisfaction <= 5) {
                    $scope.dataState.customersatisfaction = true;
                } else {
                    $scope.dataState.customersatisfaction = false;
                }
                $scope.checkIfAllTrue();
            };

            // check if the customername data is vailid
            $scope.checkCustomernameInput = function() {
                if ($scope.data.customername.length > 0) {
                    $scope.dataState.customername = true;
                } else {
                    $scope.dataState.customername = false;
                }
                $scope.checkIfAllTrue();
            };

            // check if the projectnumber data is vailid
            $scope.checkProjectnumberInput = function() {
                if ($scope.data.projectnumber.length > 0) {
                    $scope.dataState.projectnumber = true;
                } else {
                    $scope.dataState.projectnumber = false;
                }
                $scope.checkIfAllTrue();
            };
            // function if the Year Dropdown is clicked
            $scope.setDropdownYearValue = function(value) {
                $scope.dropdownYearValue = value;
                $scope.dataState.year = true;
                $scope.dropdownYearText = value;
                $scope.checkIfAllTrue();
            };
            // function if the Month Dropdown is clicked
            $scope.setDropdownMonthValue = function(value) {
                $scope.dropdownMonthValue = value;
                $scope.dataState.month = true;
                $scope.dropdownMonthText = $filter('translate')('_' + value);
                $scope.checkIfAllTrue();
            };

            //returns false if one field are empty
            $scope.checkIfAllTrue = function() {
                var temp = true;
                _.each($scope.dataState, function(value) {
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

            //deletes the data input form after the data is send to the server
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
                    url: 'assets/datainputresponse/customerSatisfactionResponse.html'
                };
            };

            $scope.printData = function(){
            
            console.debug("Kundenzufriedenheit: ", $scope.data.customersatisfaction );
            console.debug("Kundenname: ", $scope.data.customername );
            console.debug("Projektnummer: ", $scope.data.projectnumber );
            console.debug("Jahr: ",  $scope.dropdownYearValue );
            console.debug("Monat: ", $scope.dropdownMonthValue );
            console.debug("Datastate-customername: ",  $scope.dataState.customername );
            console.debug("Datastate-customersatisfaction: ",  $scope.dataState.customersatisfaction );
            console.debug("Datastate-projectnumber: ",  $scope.dataState.projectnumber );
            console.debug("Datastate-year: ",  $scope.dataState.year );
            console.debug("Datastate-month: ",  $scope.dataState.month );
            };

            // change the route to the main datainput page
            $scope.backToDataInput = function() {
                $location.path("/datainput");
            };

            // function if the submitbutton is clicked
            // calls data check functions
            // sends the data to the server if erverything is ok
            $scope.submit = function(method) {
                //$scope.printData();
                if ($scope.checkIfAllTrue()) {
                    //Preventing Double  Submission
                    $scope.submitDisabled = true;
                    var postObject = {
                        "customername": $scope.data.customername,
                        "satisfaction": String($scope.data.customersatisfaction),
                        "projectnumber": $scope.data.projectnumber,
                        "year": $scope.dropdownYearValue,
                        "month": $scope.dropdownMonthValue,
                        "note": $scope.data.note
                    };
                    $http({
                        url: 'customerSatisfaction/',
                        method: method,
                        data: postObject
                    }).success(function(data, status, headers, config) {
                        $scope.submitSmileyValue();
                        $scope.clearForm();
                        $scope.responsedata = data;
                        $scope.createResponseView();
                    }).error(function(data, status, headers, config) {
                        switch (status) {
                            // DATA NOT MODIFIED
                            case 304:
                                $scope.status = $filter('translate')('_data.already.existing.projectnumber');
                                $scope.updateTemplate = {
                                    name: 'update.html',
                                    url: 'assets/update/update.html'
                                };
                                break;
                                //Updating data failed
                            case 305:
                                Console.debug("data: ", data, "status: ", status);
                                Console.debug("updating data failed: No Document found, or more than one found");
                                $scope.noUpdateData();
                                $scope.status = "Data updating failed";
                                break;
                                // no acces please login
                            case 333:
                                alert("please login");
                                break;
                            default:
                                $scope.status = "Fehlermeldung nicht vorhanden";
                        }
                    });
                  //  $scope.dataState.customersatisfaction = false;
                  //  $scope.makeButtonWarning();
                } else {
                    alert("Bitte Daten korrekt eingeben");
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