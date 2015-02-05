describe("DataInput Capacityctrl", function() {
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
        ctrl = $controller('DataInputCapacityController', {
            $scope: $scope
        });
        $httpBackend.whenGET("/capacity/inputdata/").respond(200, {
            calendarWeeks: [1, 2, 3]
        });
        $httpBackend.flush();
    }));

    describe("default values", function() {
        it("should set to", function() {
            expect($scope.datastate.percent).toBe(false);
            expect($scope.datastate.calendarWeek).toBe(false);
            expect($scope.submitDisabled).toBe(false);
            expect($scope.buttonstate).toEqual("btn btn-danger");
            expect($scope.smiley.value).toBe(2);
            expect($scope.smiley.updateKey).toBe(4);
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

    describe("checkPercentInput Funktion", function() {
        it("test,123 should be false", function() {
            $scope.data = {
                percent: "test,123"
            };
            $scope.checkPercentInput();
            expect($scope.datastate.percent).toBe(false);
        });
        it("49,0 should be false", function() {
            $scope.data = {
                percent: "49,0"
            };
            $scope.checkPercentInput();
            expect($scope.datastate.percent).toBe(false);
        });
        it("151,0 should be false", function() {
            $scope.data = {
                percent: "151,0"
            };
            $scope.checkPercentInput();
            expect($scope.datastate.percent).toBe(false);
        });
        it("55,0 should be true", function() {
            $scope.data.percent = "55,0";
            $scope.checkPercentInput();
            expect($scope.datastate.percent).toBe(true);
        });
        it("50,1 should be true and 50.1", function() {
            $scope.data.percent = "50,1";
            $scope.checkPercentInput();
            expect($scope.datastate.percent).toBe(true);
            expect($scope.data.percent).toBe("50.1");
        });
    });

    describe("checkIfAllTrue Funktion", function() {
        it("should be true", function() {
            $scope.datastate = {
                percent: true,
                calendarWeek: true
            };
            expect($scope.checkIfAllTrue()).toBe(true);
        });
        it("should be false", function() {
            $scope.datastate = {
                percent: false,
                calendarWeek: true
            };
            expect($scope.checkIfAllTrue()).toBe(false);
        });
        it("should be false", function() {
            $scope.datastate = {
                percent: true,
                calendarWeek: false
            };
            expect($scope.checkIfAllTrue()).toBe(false);
        });
        it("should be false", function() {
            $scope.datastate = {
                percent: false,
                calendarWeek: false
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
            $httpBackend.whenPOST("capacity/").respond(200, 'test');
            $httpBackend.whenPOST("smiley/").respond(200, ' ');
            $scope.datastate = {
                percent: true,
                calendarWeek: true
            };
            $scope.submit("POST");
            $httpBackend.flush();
            expect($scope.responsedata).toEqual('test');
        });
        it("updateTemplate should be set to", function() {
            $httpBackend.whenPOST("capacity/").respond(304, 'test');
            $httpBackend.whenPOST("smiley/").respond(200, ' ');
            $scope.datastate = {
                percent: true,
                calendarWeek: true
            };
            $scope.submit("POST");
            $httpBackend.flush();
            expect($scope.updateTemplate.name).toEqual('update.html');
            expect($scope.updateTemplate.url).toEqual('assets/update/update.html');
        });
    });
});

