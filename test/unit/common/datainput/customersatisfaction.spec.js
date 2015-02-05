describe("DataInput Customersatiscationctrl", function() {
    beforeEach(module('app'));
    var ctrl, $scope, $httpBackend, $location;
    // inject the $controller and $rootScope services
    // in the beforeEach block
    beforeEach(inject(function($controller, $rootScope, _$httpBackend_, _$location_) {
        // Create a new scope that's a child of the $rootScope
        $scope = $rootScope.$new();
        $httpBackend = _$httpBackend_;
        $location = _$location_;
        // Create the controller
        ctrl = $controller('DataInputCustomerSatisfactionController', {
            $scope: $scope
        });
        $httpBackend.whenGET("/customerSatisfaction/inputdata/").respond(200, {
            calendarWeeks: [1, 2, 3]
        });
        $httpBackend.flush();
    }));

    describe("default values", function() {
        it("submitDisabled should set to false", function() {
            expect($scope.submitDisabled).toBe(false);
        });
        it("buttonstate should set to btn btn-danger", function() {
            expect($scope.buttonstate).toEqual("btn btn-danger");
        });
        it("smiley should set to 2, 1", function() {
            expect($scope.smiley.value).toBe(2);
            expect($scope.smiley.updateKey).toBe(1);
        });
        it("datastate should set all to false", function() {
            expect($scope.dataState.customername).toBe(false);
            expect($scope.dataState.customersatisfaction).toBe(false);
            expect($scope.dataState.projectnumber).toBe(false);
            expect($scope.dataState.year).toBe(false);
            expect($scope.dataState.month).toBe(false);
        });
    });
    describe("changesmileyvalue Funktion", function() {
        it("should set to", function() {
            $scope.changeSmileyValue(4);
            expect($scope.smiley.value).toBe(2);
        });
        it("should set to", function() {
            $scope.changeSmileyValue(1);
            expect($scope.smiley.value).toBe(1);
        });
        it("should set to", function() {
            $scope.changeSmileyValue(2);
            expect($scope.smiley.value).toBe(2);
        });
        it("should set to", function() {
            $scope.changeSmileyValue(3);
            expect($scope.smiley.value).toBe(3);
        });
    });

    describe("checkIfAllTrue Funktion", function() {
        it("all false should be false", function() {
            $scope.dataState = {
                'customername': false,
                'customersatisfaction': false,
                'projectnumber': false,
                'year': false,
                'month': false
            };
            expect($scope.checkIfAllTrue()).toBe(false);
        });
        it("all true should be true", function() {
            $scope.dataState = {
                'customername': true,
                'customersatisfaction': true,
                'projectnumber': true,
                'year': true,
                'month': true
            };
            expect($scope.checkIfAllTrue()).toBe(true);
        });
        it("one false should be false", function() {
            $scope.dataState = {
                'customername': true,
                'customersatisfaction': false,
                'projectnumber': true,
                'year': true,
                'month': true
            };
            expect($scope.checkIfAllTrue()).toBe(false);
        });


    });
    describe("backToDataInput Funktion", function() {
        it("should be /datainput", function() {
            $scope.backToDataInput();
            expect($location.path()).toEqual("/datainput");
        });
    });

    describe("makeButtonSuccess Funktion", function() {
        it("should be btn btn-success", function() {
            $scope.makeButtonSuccess();
            expect($scope.buttonstate).toEqual("btn btn-success");
        });
    });

    describe("makeButtonWarning Funktion", function() {
        it("should bebtn btn-danger", function() {
            $scope.makeButtonWarning();
            expect($scope.buttonstate).toEqual("btn btn-danger");
        });
    });
    describe("submit Funktion", function() {
        it("response data should be test", function() {
            $httpBackend.whenPOST("customerSatisfaction/").respond(200, 'test');
            $httpBackend.whenPOST("smiley/").respond(200, ' ');
            $scope.dataState = {
                'customername': true,
                'customersatisfaction': true,
                'projectnumber': true,
                'year': true,
                'month': true
            };
            $scope.submit("POST");
            $httpBackend.flush();
            expect($scope.responsedata).toEqual('test');
        });
        it("updateTemplate should be set to", function() {
            $httpBackend.whenPOST("customerSatisfaction/").respond(304, 'test');
            $httpBackend.whenPOST("smiley/").respond(200, ' ');
            $scope.dataState = {
                'customername': true,
                'customersatisfaction': true,
                'projectnumber': true,
                'year': true,
                'month': true
            };
            $scope.submit("POST");
            $httpBackend.flush();
            expect($scope.updateTemplate.name).toEqual('update.html');
            expect($scope.updateTemplate.url).toEqual('assets/update/update.html');
        });
    });

    describe("setDropdownYearValue Funktion", function() {
        it("dropdownYearValue should be test", function() {
            $scope.setDropdownYearValue("test");
            expect($scope.dropdownYearValue).toEqual("test");
        });
        it("dataState.year should be true", function() {
            $scope.setDropdownYearValue("test");
            expect($scope.dataState.year).toBe(true);
        });
        it("dropdownYearText should be test", function() {
            $scope.setDropdownYearValue("test");
            expect($scope.dropdownYearText).toEqual("test");
        });
    });

    describe("setDropdownMonthValue Funktion", function() {
        it("dropdownMonthValue should be test", function() {
            $scope.setDropdownMonthValue("test");
            expect($scope.dropdownMonthValue).toEqual("test");
        });
        it("dataState.month should be true", function() {
            $scope.setDropdownMonthValue("test");
            expect($scope.dataState.month).toBe(true);
        });
    });

    describe("checkProjectnumberInput Funktion", function() {
        it("projectnumber EON should be true", function() {
            $scope.data.projectnumber = 'EON';
            $scope.checkProjectnumberInput();
            expect($scope.dataState.projectnumber).toBe(true);
        });
        it("projectnumber '5' should be true", function() {
            $scope.data.projectnumber = '5';
            $scope.checkProjectnumberInput();
            expect($scope.dataState.projectnumber).toBe(true);
        });
        it("projectnumber '' should be false", function() {
            $scope.data.projectnumber = '';
            $scope.checkProjectnumberInput();
            expect($scope.dataState.projectnumber).toBe(false);
        });
    });

    describe("checkCustomernameInput Funktion", function() {
        it("customername EON should be true", function() {
            $scope.data.customername = 'EON';
            $scope.checkCustomernameInput();
            expect($scope.dataState.customername).toBe(true);
        });
        it("customername '5' should be true", function() {
            $scope.data.customername = '5';
            $scope.checkCustomernameInput();
            expect($scope.dataState.customername).toBe(true);
        });
        it("customername '' should be false", function() {
            $scope.data.customername = '';
            $scope.checkCustomernameInput();
            expect($scope.dataState.customername).toBe(false);
        });
    });

    describe("checkCustomerSatisfactionInput Funktion", function() {
        it("customersatisfaction EON should be false", function() {
            $scope.data.customersatisfaction = 'EON';
            $scope.checkCustomerSatisfactionInput();
            expect($scope.dataState.customersatisfaction).toBe(false);
        });
        it("customersatisfaction '5' should be true", function() {
            $scope.data.customersatisfaction = '5';
            $scope.checkCustomerSatisfactionInput();
            expect($scope.dataState.customersatisfaction).toBe(true);
        });
        it("customersatisfaction '' should be false", function() {
            $scope.data.customersatisfaction = '';
            $scope.checkCustomerSatisfactionInput();
            expect($scope.dataState.customersatisfaction).toBe(false);
        });

        it("customersatisfaction '0' should be false", function() {
            $scope.data.customersatisfaction = '0';
            $scope.checkCustomerSatisfactionInput();
            expect($scope.dataState.customersatisfaction).toBe(false);
        });
        it("customersatisfaction '6' should be false", function() {
            $scope.data.customersatisfaction = '6';
            $scope.checkCustomerSatisfactionInput();
            expect($scope.dataState.customersatisfaction).toBe(false);
        });
         it("customersatisfaction '1.' should be true", function() {
            $scope.data.customersatisfaction = '1';
            $scope.checkCustomerSatisfactionInput();
            expect($scope.dataState.customersatisfaction).toBe(true);
        });
          it("customersatisfaction '1,' should be true", function() {
            $scope.data.customersatisfaction = '1';
            $scope.checkCustomerSatisfactionInput();
            expect($scope.dataState.customersatisfaction).toBe(true);
        });
    });

});

