describe("DataInput remaining points", function() {
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
        ctrl = $controller('DataInputRemainingPointsController', {
            $scope: $scope
        });
        $httpBackend.whenGET("/remainingpoints/inputdata/").respond(200, {
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
            expect($scope.smiley.updateKey).toBe(8);
        });
        it("datastate should set all to false", function() {
            expect($scope.datastate.construction).toBe(false);
            expect($scope.datastate.production).toBe(false);
            expect($scope.datastate.byDelivery).toBe(false);
            expect($scope.datastate.month).toBe(false);
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

    describe("setDropdownMonthValue Funktion", function() {
        it("should set to", function() {
            $scope.setDropdownMonthValue("test");
            expect($scope.dropdownMonthValue).toBe("test");
            expect($scope.datastate.month).toBe(true);
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


    describe("checkProductionInput Funktion", function() {
        it("test should be false", function() {
            $scope.data.production = "test";
            $scope.checkProductionInput();
            expect($scope.datastate.production).toBe(false);
        });
        it("55 should be true", function() {
            $scope.data.production = "55";
            $scope.checkProductionInput();
            expect($scope.datastate.production).toBe(true);
        });
        it("43, should be true and changed to 43", function() {
            $scope.data.production = "43,";
            $scope.checkProductionInput();
            expect($scope.datastate.production).toBe(true);
            expect($scope.data.production ).toBe("43.");
        });
        it("43.5, should be true ", function() {
            $scope.data.production = "43.5";
            $scope.checkProductionInput();
            expect($scope.datastate.production).toBe(true);
              expect($scope.data.production ).toBe("43.5");
        });
        it("-1 should be false", function() {
            $scope.data.production = "-1";
            $scope.checkProductionInput();
            expect($scope.datastate.production).toBe(false);
        });
    });

    describe("checkConstructionInput Funktion", function() {
        it("test should be false", function() {
            $scope.data.construction = "test";
            $scope.checkConstructionInput();
            expect($scope.datastate.construction).toBe(false);
        });
        it("55 should be true", function() {
            $scope.data.construction = "55";
            $scope.checkConstructionInput();
            expect($scope.datastate.construction).toBe(true);
        });
        it("43, should be true and changed to 43", function() {
            $scope.data.construction = "43,";
            $scope.checkConstructionInput();
            expect($scope.datastate.construction).toBe(true);
           expect($scope.data.construction ).toBe("43.");
        });
        it("43.5, should be true ", function() {
            $scope.data.construction = "43.5";
            $scope.checkConstructionInput();
            expect($scope.datastate.construction).toBe(true);
            expect($scope.data.construction ).toBe("43.5");
        });
        it("-1 should be false", function() {
            $scope.data.construction = "-1";
            $scope.checkConstructionInput();
            expect($scope.datastate.construction).toBe(false);
        });
    });

    describe("checkByDeliveryInput Funktion", function() {
        it("test should be false", function() {
            $scope.data.byDelivery = "test";
            $scope.checkByDeliveryInput();
            expect($scope.datastate.byDelivery).toBe(false);
        });
        it("55 should be true", function() {
            $scope.data.byDelivery = "55";
            $scope.checkByDeliveryInput();
            expect($scope.datastate.byDelivery).toBe(true);
        });
        it("43, should be true and changed to 43", function() {
            $scope.data.byDelivery = "43,";
            $scope.checkByDeliveryInput();
            expect($scope.datastate.byDelivery).toBe(true);
            expect($scope.data.byDelivery ).toBe("43.");
        });
        it("43.5, should be true ", function() {
            $scope.data.byDelivery = "43.5";
            $scope.checkByDeliveryInput();
            expect($scope.datastate.byDelivery).toBe(true);
            expect($scope.data.byDelivery ).toBe("43.5");
        });
        it("-1 should be false", function() {
            $scope.data.byDelivery = "-1";
            $scope.checkByDeliveryInput();
            expect($scope.datastate.byDelivery).toBe(false);
        });
    });

    describe("checkIfAllTrue Funktion", function() {
        it("should be true", function() {
            $scope.datastate = {
                'construction': true,
                'production': true,
                'byDelivery': true,
                'month': true,
                'year': true
            };
            expect($scope.checkIfAllTrue()).toBe(true);
        });
        it("should be false", function() {
            $scope.datastate = {
                'construction': false,
                'production': true,
                'byDelivery': true,
                'month': true,
                'year': true
            };
            expect($scope.checkIfAllTrue()).toBe(false);
        });
        it("should be false", function() {
            $scope.datastate = {
                'construction': true,
                'production': false,
                'byDelivery': true,
                'month': true,
                'year': true
            };
            expect($scope.checkIfAllTrue()).toBe(false);
        });
        it("should be false", function() {
            $scope.datastate = {
                'construction': true,
                'production': true,
                'byDelivery': false,
                'month': true,
                'year': true
            };
            expect($scope.checkIfAllTrue()).toBe(false);
        });
        it("should be false", function() {
            $scope.datastate = {
                'construction': true,
                'production': true,
                'byDelivery': true,
                'month': false,
                'year': true
            };
            expect($scope.checkIfAllTrue()).toBe(false);
        });
        it("should be false", function() {
            $scope.datastate = {
                'construction': true,
                'production': true,
                'byDelivery': true,
                'month': true,
                'year': false
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
            $httpBackend.whenPOST("remainingpoints/").respond(200, 'test');
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
            $httpBackend.whenPOST("remainingpoints/").respond(304, 'test');
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