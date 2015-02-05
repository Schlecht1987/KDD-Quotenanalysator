describe("DataInput processingtime", function() {
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
            ctrl = $controller('DataInputProcessingTimeController', {
                $scope: $scope
            });
            $httpBackend.whenGET("/processingtime/inputdata/").respond(200, {
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
                expect($scope.smiley.updateKey).toBe(7);
            });
            it("datastate should set all to false", function() {
                expect($scope.datastate.readyForInspection).toBe(false);
                expect($scope.datastate.remainingPointsFinished).toBe(false);
                expect($scope.datastate.delivered).toBe(false);
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


        describe("checkReadyForInspectioninput Funktion", function() {
            it("test should be false", function() {
                $scope.data.readyForInspection = "test";
                $scope.checkReadyForInspectioninput();
                expect($scope.datastate.readyForInspection).toBe(false);
            });
            it("55 should be true", function() {
                $scope.data.readyForInspection = "55";
                $scope.checkReadyForInspectioninput();
                expect($scope.datastate.readyForInspection).toBe(true);
            });
            it("43, should be true and changed to 43.", function() {
                $scope.data.readyForInspection = "43,";
                $scope.checkReadyForInspectioninput();
                expect($scope.datastate.readyForInspection).toBe(true);
                expect($scope.data.readyForInspection ).toBe("43.");
            });
            it("43.5, should be true ", function() {
                $scope.data.readyForInspection = "43.5";
                $scope.checkReadyForInspectioninput();
                expect($scope.datastate.readyForInspection).toBe(true);
                expect($scope.data.readyForInspection ).toBe("43.5");
            });
            it("-1 should be false", function() {
                $scope.data.readyForInspection = "-1";
                $scope.checkReadyForInspectioninput();
                expect($scope.datastate.readyForInspection).toBe(false);
            });
        });

        describe("checkRemainingPointsFinishedInput Funktion", function() {
            it("test should be false", function() {
                $scope.data.remainingPointsFinished = "test";
                $scope.checkRemainingPointsFinishedInput();
                expect($scope.datastate.remainingPointsFinished).toBe(false);
            });
            it("55 should be true", function() {
                $scope.data.remainingPointsFinished = "55";
                $scope.checkRemainingPointsFinishedInput();
                expect($scope.datastate.remainingPointsFinished).toBe(true);
            });
            it("43, should be true and changed to 43.", function() {
                $scope.data.remainingPointsFinished = "43,";
                $scope.checkRemainingPointsFinishedInput();
                expect($scope.datastate.remainingPointsFinished).toBe(true);
                expect($scope.data.remainingPointsFinished ).toBe("43.");
            });
            it("43.5, should be true ", function() {
                $scope.data.remainingPointsFinished = "43.5";
                $scope.checkRemainingPointsFinishedInput();
                expect($scope.datastate.remainingPointsFinished).toBe(true);
                expect($scope.data.remainingPointsFinished ).toBe("43.5");
            });
            it("-1 should be false", function() {
                $scope.data.remainingPointsFinished = "-1";
                $scope.checkRemainingPointsFinishedInput();
                expect($scope.datastate.remainingPointsFinished).toBe(false);
            });
        });

        describe("checkDeliveredInput Funktion", function() {
            it("test should be false", function() {
                $scope.data.delivered = "test";
                $scope.checkDeliveredInput();
                expect($scope.datastate.delivered).toBe(false);
            });
            it("55 should be true", function() {
                $scope.data.delivered = "55";
                $scope.checkDeliveredInput();
                expect($scope.datastate.delivered).toBe(true);
            });
            it("43, should be true and changed to 43.", function() {
                $scope.data.delivered = "43,";
                $scope.checkDeliveredInput();
                expect($scope.datastate.delivered).toBe(true);
                expect($scope.data.delivered ).toBe("43.");
            });
            it("43.5, should be true ", function() {
                $scope.data.delivered = "43.5";
                $scope.checkDeliveredInput();
                expect($scope.datastate.delivered).toBe(true);
                expect($scope.data.delivered ).toBe("43.5");
            });
            it("-1 should be false", function() {
                $scope.data.delivered = "-1";
                $scope.checkDeliveredInput();
                expect($scope.datastate.delivered).toBe(false);
            });
        });

        describe("checkIfAllTrue Funktion", function() {
            it("should be true", function() {
                $scope.datastate = {
                    'readyForInspection': true,
                    'remainingPointsFinished': true,
                    'delivered': true,
                    'month': true,
                    'year': true
                };
                expect($scope.checkIfAllTrue()).toBe(true);
            });
            it("should be false", function() {
                $scope.datastate = {
                    'readyForInspection': true,
                    'remainingPointsFinished': false,
                    'delivered': true,
                    'month': true,
                    'year': true
                };
                expect($scope.checkIfAllTrue()).toBe(false);
            });
            it("should be false", function() {
                $scope.datastate = {
                    'readyForInspection': true,
                    'remainingPointsFinished': true,
                    'delivered': false,
                    'month': true,
                    'year': true
                };
                expect($scope.checkIfAllTrue()).toBe(false);
            });
            it("should be false", function() {
                $scope.datastate = {
                    'readyForInspection': true,
                    'remainingPointsFinished': true,
                    'delivered': true,
                    'month': false,
                    'year': true
                };
                expect($scope.checkIfAllTrue()).toBe(false);
            });
            it("should be false", function() {
                $scope.datastate = {
                    'readyForInspection': true,
                    'remainingPointsFinished': true,
                    'delivered': true,
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
                $httpBackend.whenPOST("processingtime/").respond(200, 'test');
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
                $httpBackend.whenPOST("processingtime/").respond(304, 'test');
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