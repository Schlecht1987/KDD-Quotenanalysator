describe("DataInput labour productivity ", function() {
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
        ctrl = $controller('DataInputLabourProductivityController', {
            $scope: $scope
        });
        $httpBackend.whenGET("/labourproductivity/inputdata/").respond(200, {
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
            expect($scope.smiley.updateKey).toBe(5);
        });
        it("datastate should set all to false", function() {
            expect($scope.datastate.avgEmployee).toBe(false);
            expect($scope.datastate.completedCabinets).toBe(false);
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


    describe("checkAvgEmployeeInput Funktion", function() {
        it("test should be false", function() {
            $scope.data.avgEmployee = "test";
            $scope.checkAvgEmployeeInput();
            expect($scope.datastate.avgEmployee).toBe(false);
        });
        it("55 should be true", function() {
            $scope.data.avgEmployee = "55";
            $scope.checkAvgEmployeeInput();
            expect($scope.datastate.avgEmployee).toBe(true);
        });
        it("43, should be true and changed to 43", function() {
            $scope.data.avgEmployee = "43,";
            $scope.checkAvgEmployeeInput();
            expect($scope.datastate.avgEmployee).toBe(true);
            expect($scope.data.avgEmployee).toBe("43.");
        });
        it("-1 should be false", function() {
            $scope.data.implementedIdeas = "-1";
            $scope.checkAvgEmployeeInput();
            expect($scope.datastate.avgEmployee).toBe(false);
        });

    });


    describe("checkCompletedCabinetsInput Funktion", function() {
        it("test should be false", function() {
            $scope.data.completedCabinets = "test";
            $scope.checkCompletedCabinetsInput();
            expect($scope.datastate.completedCabinets).toBe(false);
        });
        it("55 should be true", function() {
            $scope.data.completedCabinets = "55";
            $scope.checkCompletedCabinetsInput();
            expect($scope.datastate.completedCabinets).toBe(true);
        });
        it("43, should be true and changed to 43", function() {
            $scope.data.completedCabinets = "43,";
            $scope.checkCompletedCabinetsInput();
            expect($scope.datastate.completedCabinets).toBe(true);
            expect($scope.data.completedCabinets).toBe("43.");
        });
        it("-1 should be false", function() {
            $scope.data.implementedIdeas = "-1";
            $scope.checkCompletedCabinetsInput();
            expect($scope.datastate.completedCabinets).toBe(false);
        });

    });


    describe("checkIfAllTrue Funktion", function() {
        it("should be true", function() {
            $scope.datastate = {
                avgEmployee: true,
                completedCabinets: true,
                calendarWeek: true
            };
            expect($scope.checkIfAllTrue()).toBe(true);
        });
        it("should be false", function() {
            $scope.datastate = {
                avgEmployee: false,
                completedCabinets: true,
                calendarWeek: true
            };
            expect($scope.checkIfAllTrue()).toBe(false);
        });
        it("should be false", function() {
            $scope.datastate = {
                avgEmployee: true,
                completedCabinets: false,
                calendarWeek: true
            };
            expect($scope.checkIfAllTrue()).toBe(false);
        });
        it("should be false", function() {
            $scope.datastate = {
                avgEmployee: true,
                completedCabinets: true,
                calendarWeek: false
            };
            expect($scope.checkIfAllTrue()).toBe(false);
        });
        it("should be false", function() {
            $scope.datastate = {
                avgEmployee: false,
                completedCabinets: true,
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
            $httpBackend.whenPOST("labourproductivity/").respond(200, 'test');
            $httpBackend.whenPOST("smiley/").respond(200, ' ');
             $scope.datastate = {
                avgEmployee: true,
                completedCabinets: true,
                calendarWeek: true
            };
            $scope.submit("POST");
            $httpBackend.flush();
            expect($scope.responsedata).toEqual('test');
        });
        it("updateTemplate should be set to", function() {
            $httpBackend.whenPOST("labourproductivity/").respond(304, 'test');
            $httpBackend.whenPOST("smiley/").respond(200, ' ');
             $scope.datastate = {
                avgEmployee: true,
                completedCabinets: true,
                calendarWeek: true
            };
            $scope.submit("POST");
            $httpBackend.flush();
            expect($scope.updateTemplate.name).toEqual('update.html');
            expect($scope.updateTemplate.url).toEqual('assets/update/update.html');
        });
    });

});