describe("DataInput delivery reliability logistics", function() {
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
        ctrl = $controller('DataInputDeliveryReliabilityLogisticsController', {
            $scope: $scope
        });
        $httpBackend.whenGET("/deliveryreliabilitylogistics/inputdata/").respond(200, {
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
        it("smiley should set to 2, 2", function() {
            expect($scope.smiley.value).toBe(2);
            expect($scope.smiley.updateKey).toBe(2);
        });
        it("datastate should set all to false", function() {
            expect($scope.datastate.numberCommissioningTrolleys).toBe(false);
            expect($scope.datastate.numberIncompleteCommissioningTrolleys).toBe(false);
            expect($scope.datastate.calendarWeek).toBe(false);
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

    describe("setDropdownCalendarWeekValue Funktion", function() {
        it("should set to", function() {
            $scope.setDropdownCalendarWeekValue("test");
            expect($scope.dropdownCalendarWeekText).toBe("test");
            expect($scope.dropDownCalendarWeekValue).toBe("test");
            expect($scope.datastate.calendarWeek).toBe(true);
        });
    });



    describe("checkNumberCommissioningTrolleysInput Funktion", function() {
        it("test should be false", function() {
            $scope.data.numberCommissioningTrolleys = "test";
            $scope.checkNumberCommissioningTrolleysInput();
            expect($scope.datastate.numberCommissioningTrolleys).toBe(false);
        });
        it("55 should be true", function() {
            $scope.data.numberCommissioningTrolleys = "55";
            $scope.checkNumberCommissioningTrolleysInput();
            expect($scope.datastate.numberCommissioningTrolleys).toBe(true);
        });
        it("43,3 should be true and changed to 43.3", function() {
            $scope.data.numberCommissioningTrolleys = "43,3";
            $scope.checkNumberCommissioningTrolleysInput();
            expect($scope.datastate.numberCommissioningTrolleys).toBe(true);
            expect($scope.data.numberCommissioningTrolleys).toEqual("43.3");
        });
        it("-1 should be false", function() {
            $scope.data.numberCommissioningTrolleys = "-1";
            $scope.checkNumberCommissioningTrolleysInput();
            expect($scope.datastate.numberCommissioningTrolleys).toBe(false);
        });
    });
    describe("checkNumberIncompleteCommissioningTrolleysInput Funktion", function() {
        it("test should be false", function() {
            $scope.data.numberIncompleteCommissioningTrolleys = "test";
            $scope.checkNumberIncompleteCommissioningTrolleysInput();
            expect($scope.datastate.numberIncompleteCommissioningTrolleys).toBe(false);
        });
        it("55 should be true", function() {
            $scope.data.numberIncompleteCommissioningTrolleys = "55";
            $scope.checkNumberIncompleteCommissioningTrolleysInput();
            expect($scope.datastate.numberIncompleteCommissioningTrolleys).toBe(true);
        });
        it("43,3 should be true and changed to 43.3", function() {
            $scope.data.numberIncompleteCommissioningTrolleys = "43,3";
            $scope.checkNumberIncompleteCommissioningTrolleysInput();
            expect($scope.datastate.numberIncompleteCommissioningTrolleys).toBe(true);
            expect($scope.data.numberIncompleteCommissioningTrolleys).toEqual("43.3");
        });
        it("-1 should be false", function() {
            $scope.data.numberIncompleteCommissioningTrolleys = "-1";
            $scope.checkNumberIncompleteCommissioningTrolleysInput();
            expect($scope.datastate.numberIncompleteCommissioningTrolleys).toBe(false);
        });
    });

    describe("checkIfAllTrue Funktion", function() {
        it("should be true", function() {
            $scope.datastate = {
                numberCommissioningTrolleys: true,
                numberIncompleteCommissioningTrolleys: true,
                calendarWeek: true
            };
            expect($scope.checkIfAllTrue()).toBe(true);
        });
        it("should be false", function() {
            $scope.datastate = {
                numberCommissioningTrolleys: false,
                numberIncompleteCommissioningTrolleys: true,
                calendarWeek: true
            };
            expect($scope.checkIfAllTrue()).toBe(false);
        });
        it("should be false", function() {
            $scope.datastate = {
                numberCommissioningTrolleys: true,
                numberIncompleteCommissioningTrolleys: true,
                calendarWeek: false
            };
            expect($scope.checkIfAllTrue()).toBe(false);
        });
        it("should be false", function() {
            $scope.datastate = {
                numberCommissioningTrolleys: true,
                numberIncompleteCommissioningTrolleys: false,
                calendarWeek: true
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
            $httpBackend.whenPOST("deliveryreliabilitylogistics/").respond(200, 'test');
            $httpBackend.whenPOST("smiley/").respond(200, ' ');
            $scope.datastate = {
                numberCommissioningTrolleys: true,
                numberIncompleteCommissioningTrolleys: true,
                calendarWeek: true
            };
            $scope.submit("POST");
            $httpBackend.flush();
            expect($scope.responsedata).toEqual('test');
        });
        it("updateTemplate should be set to", function() {
            $httpBackend.whenPOST("deliveryreliabilitylogistics/").respond(304, 'test');
            $httpBackend.whenPOST("smiley/").respond(200, ' ');
            $scope.datastate = {
                numberCommissioningTrolleys: true,
                numberIncompleteCommissioningTrolleys: true,
                calendarWeek: true
            };
            $scope.submit("POST");
            $httpBackend.flush();
            expect($scope.updateTemplate.name).toEqual('update.html');
            expect($scope.updateTemplate.url).toEqual('assets/update/update.html');
        });
    });

});