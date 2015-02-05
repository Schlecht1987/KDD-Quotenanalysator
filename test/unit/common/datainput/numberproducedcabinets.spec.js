describe("DataInput number produced cabinets", function() {
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
        ctrl = $controller('DataInputNumberProducedCabinetsController', {
            $scope: $scope
        });
        $httpBackend.whenGET("/numberproducedcabinets/inputdata/").respond(200, {
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
            expect($scope.smiley.updateKey).toBe(12);
        });
        it("datastate should set all to false", function() {
            expect($scope.datastate.actual).toBe(false);
            expect($scope.datastate.year).toBe(false);
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
   describe("setDropdownYearValue Funktion", function() {
        it("should set to", function() {
            $scope.setDropdownYearValue("test");
            expect($scope.dropdownYearText).toBe("test");
            expect($scope.dropdownYearValue).toBe("test");
            expect($scope.datastate.year).toBe(true);
        });
    });


    describe("checkActualInput Funktion", function() {
        it("test should be false", function() {
            $scope.data.actual = "test";
            $scope.checkActualInput();
            expect($scope.datastate.actual).toBe(false);
        });
        it("55 should be true", function() {
            $scope.data.actual = "55";
            $scope.checkActualInput();
            expect($scope.datastate.actual).toBe(true);
        });
        it("43, should be true and changed to 43.", function() {
            $scope.data.actual = "43,";
            $scope.checkActualInput();
            expect($scope.datastate.actual).toBe(true);
            expect($scope.data.actual ).toBe("43.");
        });
        it("-1 should be false", function() {
            $scope.data.implementedIdeas = "-1";
            $scope.checkActualInput();
            expect($scope.datastate.actual).toBe(false);
        });

    });


    describe("checkTargetInput Funktion", function() {
        it("test should be false", function() {
            $scope.data.target = "test";
            $scope.checkTargetInput();
            expect($scope.datastate.target).toBe(false);
        });
        it("55 should be true", function() {
            $scope.data.target = "55";
            $scope.checkTargetInput();
            expect($scope.datastate.target).toBe(true);
        });
        it("43, should be true and changed to 43.", function() {
            $scope.data.target = "43,";
            $scope.checkTargetInput();
            expect($scope.datastate.target).toBe(true);
            expect($scope.data.target).toBe("43.");
        });
        it("-1 should be false", function() {
            $scope.data.implementedIdeas = "-1";
            $scope.checkTargetInput();
            expect($scope.datastate.target).toBe(false);
        });

    });


    describe("checkIfAllTrue Funktion", function() {
        it("should be true", function() {
            $scope.datastate = {
                actual: true,
                target: true,
                year: true
            };
            expect($scope.checkIfAllTrue()).toBe(true);
        });
        it("should be false", function() {
            $scope.datastate = {
                actual: false,
                target: true,
                year: true
            };
            expect($scope.checkIfAllTrue()).toBe(false);
        });
        it("should be false", function() {
            $scope.datastate = {
                actual: true,
                target: false,
                year: true
            };
            expect($scope.checkIfAllTrue()).toBe(false);
        });
        it("should be false", function() {
            $scope.datastate = {
                actual: true,
                target: true,
                year: false
            };
            expect($scope.checkIfAllTrue()).toBe(false);
        });
        it("should be false", function() {
            $scope.datastate = {
                actual: false,
                target: true,
                year: false
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
            $httpBackend.whenPOST("numberproducedcabinets/").respond(200, 'test');
            $httpBackend.whenPOST("smiley/").respond(200, ' ');
             $scope.datastate = {
                target: true,
                year: true,
                actual: true
            };
            $scope.submit("POST");
            $httpBackend.flush();
            expect($scope.responsedata).toEqual('test');
        });
        it("updateTemplate should be set to", function() {
            $httpBackend.whenPOST("numberproducedcabinets/").respond(304, 'test');
            $httpBackend.whenPOST("smiley/").respond(200, ' ');
             $scope.datastate = {
                target: true,
                year: true,
                actual: true
            };
            $scope.submit("POST");
            $httpBackend.flush();
            expect($scope.updateTemplate.name).toEqual('update.html');
            expect($scope.updateTemplate.url).toEqual('assets/update/update.html');
        });
    });

});