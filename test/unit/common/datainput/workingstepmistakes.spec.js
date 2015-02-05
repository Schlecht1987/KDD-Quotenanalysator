describe("DataInput workingstep mistakes", function() {
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
        ctrl = $controller('DataInputWorkingstepMistakesController', {
            $scope: $scope
        });
        $httpBackend.whenGET("/workingstepmistakes/inputdata/").respond(200, {
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
            expect($scope.smiley.updateKey).toBe(11);
        });
        it("datastate should set all to false", function() {
            expect($scope.datastate.logistics).toBe(false);
            expect($scope.datastate.mechanicalconstruction).toBe(false);
            expect($scope.datastate.assembly).toBe(false);
            expect($scope.datastate.finalassembly).toBe(false);
            expect($scope.datastate.check).toBe(false);
            expect($scope.datastate.rework).toBe(false);
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


    describe("checkLogisticsInput Funktion", function() {
        it("test should be false", function() {
            $scope.data.logistics = "test";
            $scope.checkLogisticsInput();
            expect($scope.datastate.logistics).toBe(false);
        });
        it("55 should be true", function() {
            $scope.data.logistics = "55";
            $scope.checkLogisticsInput();
            expect($scope.datastate.logistics).toBe(true);
        });
        it("43, should be true and changed to 43", function() {
            $scope.data.logistics = "43,";
            $scope.checkLogisticsInput();
            expect($scope.datastate.logistics).toBe(true);
            expect($scope.data.logistics).toBe("43");
        });
        it("43. should be true ", function() {
            $scope.data.logistics = "43.";
            $scope.checkLogisticsInput();
            expect($scope.datastate.logistics).toBe(true);
             expect($scope.data.logistics).toBe("43");
        });
        it("-1 should be false", function() {
            $scope.data.logistics = "-1";
            $scope.checkLogisticsInput();
            expect($scope.datastate.logistics).toBe(false);
        });
    });

    describe("checkMechanicalconstructionInput Funktion", function() {
        it("test should be false", function() {
            $scope.data.mechanicalconstruction = "test";
            $scope.checkMechanicalconstructionInput();
            expect($scope.datastate.mechanicalconstruction).toBe(false);
        });
        it("55 should be true", function() {
            $scope.data.mechanicalconstruction = "55";
            $scope.checkMechanicalconstructionInput();
            expect($scope.datastate.mechanicalconstruction).toBe(true);
        });
        it("43, should be true and changed to 43", function() {
            $scope.data.mechanicalconstruction = "43,";
            $scope.checkMechanicalconstructionInput();
            expect($scope.datastate.mechanicalconstruction).toBe(true);
            expect($scope.data.mechanicalconstruction).toBe("43");
        });
        it("43. should be true ", function() {
            $scope.data.mechanicalconstruction = "43.";
            $scope.checkMechanicalconstructionInput();
            expect($scope.datastate.mechanicalconstruction).toBe(true);
             expect($scope.data.mechanicalconstruction).toBe("43");
        });
        it("-1 should be false", function() {
            $scope.data.mechanicalconstruction = "-1";
            $scope.checkMechanicalconstructionInput();
            expect($scope.datastate.mechanicalconstruction).toBe(false);
        });
    });

describe("checkAssemblyInput Funktion", function() {
        it("test should be false", function() {
            $scope.data.assembly = "test";
            $scope.checkAssemblyInput();
            expect($scope.datastate.assembly).toBe(false);
        });
        it("55 should be true", function() {
            $scope.data.assembly = "55";
            $scope.checkAssemblyInput();
            expect($scope.datastate.assembly).toBe(true);
        });
        it("43, should be true and changed to 43", function() {
            $scope.data.assembly = "43,";
            $scope.checkAssemblyInput();
            expect($scope.datastate.assembly).toBe(true);
            expect($scope.data.assembly).toBe("43");
        });
        it("43. should be true ", function() {
            $scope.data.assembly = "43.";
            $scope.checkAssemblyInput();
            expect($scope.datastate.assembly).toBe(true);
             expect($scope.data.assembly).toBe("43");
        });
        it("-1 should be false", function() {
            $scope.data.assembly = "-1";
            $scope.checkAssemblyInput();
            expect($scope.datastate.assembly).toBe(false);
        });
    });

describe("checkFinalassemblyInput Funktion", function() {
        it("test should be false", function() {
            $scope.data.finalassembly = "test";
            $scope.checkFinalassemblyInput();
            expect($scope.datastate.finalassembly).toBe(false);
        });
        it("55 should be true", function() {
            $scope.data.finalassembly = "55";
            $scope.checkFinalassemblyInput();
            expect($scope.datastate.finalassembly).toBe(true);
        });
        it("43, should be true and changed to 43", function() {
            $scope.data.finalassembly = "43,";
            $scope.checkFinalassemblyInput();
            expect($scope.datastate.finalassembly).toBe(true);
            expect($scope.data.finalassembly).toBe("43");
        });
        it("43. should be true ", function() {
            $scope.data.finalassembly = "43.";
            $scope.checkFinalassemblyInput();
            expect($scope.datastate.finalassembly).toBe(true);
             expect($scope.data.finalassembly).toBe("43");
        });
        it("-1 should be false", function() {
            $scope.data.finalassembly = "-1";
            $scope.checkFinalassemblyInput();
            expect($scope.datastate.finalassembly).toBe(false);
        });
    });

describe("checkCheckInput Funktion", function() {
        it("test should be false", function() {
            $scope.data.check = "test";
            $scope.checkCheckInput();
            expect($scope.datastate.check).toBe(false);
        });
        it("55 should be true", function() {
            $scope.data.check = "55";
            $scope.checkCheckInput();
            expect($scope.datastate.check).toBe(true);
        });
        it("43, should be true and changed to 43", function() {
            $scope.data.check = "43,";
            $scope.checkCheckInput();
            expect($scope.datastate.check).toBe(true);
            expect($scope.data.check).toBe("43");
        });
        it("43. should be true ", function() {
            $scope.data.check = "43.";
            $scope.checkCheckInput();
            expect($scope.datastate.check).toBe(true);
             expect($scope.data.check).toBe("43");
        });
        it("-1 should be false", function() {
            $scope.data.check = "-1";
            $scope.checkCheckInput();
            expect($scope.datastate.check).toBe(false);
        });
    });

describe("checkReworkInput Funktion", function() {
        it("test should be false", function() {
            $scope.data.rework = "test";
            $scope.checkReworkInput();
            expect($scope.datastate.rework).toBe(false);
        });
        it("55 should be true", function() {
            $scope.data.rework = "55";
            $scope.checkReworkInput();
            expect($scope.datastate.rework).toBe(true);
        });
        it("43, should be true and changed to 43", function() {
            $scope.data.rework = "43,";
            $scope.checkReworkInput();
            expect($scope.datastate.rework).toBe(true);
            expect($scope.data.rework).toBe("43");
        });
        it("43. should be true ", function() {
            $scope.data.rework = "43.";
            $scope.checkReworkInput();
            expect($scope.datastate.rework).toBe(true);
             expect($scope.data.rework).toBe("43");
        });
        it("-1 should be false", function() {
            $scope.data.rework = "-1";
            $scope.checkReworkInput();
            expect($scope.datastate.rework).toBe(false);
        });
    });


    describe("checkIfAllTrue Funktion", function() {
        it("should be true", function() {
            $scope.datastate = {
                'logistics': true,
                'mechanicalconstruction': true,
                'assembly': true,
                'finalassembly': true,
                'check': true,
                'rework': true,
                'calendarWeek': true
            };
            expect($scope.checkIfAllTrue()).toBe(true);
        });
        it("should be false", function() {
            $scope.datastate = {
                'logistics': true,
                'mechanicalconstruction': false,
                'assembly': true,
                'finalassembly': true,
                'check': true,
                'rework': true,
                'calendarWeek': true
            };
            expect($scope.checkIfAllTrue()).toBe(false);
        });
        it("should be false", function() {
            $scope.datastate = {
                'logistics': true,
                'mechanicalconstruction': true,
                'assembly': false,
                'finalassembly': true,
                'check': true,
                'rework': true,
                'calendarWeek': true
            };
            expect($scope.checkIfAllTrue()).toBe(false);
        });
        it("should be false", function() {
            $scope.datastate = {
                'logistics': true,
                'mechanicalconstruction': true,
                'assembly': true,
                'finalassembly': false,
                'check': true,
                'rework': true,
                'calendarWeek': true
            };
            expect($scope.checkIfAllTrue()).toBe(false);
        });
        it("should be false", function() {
            $scope.datastate = {
                'logistics': true,
                'mechanicalconstruction': true,
                'assembly': true,
                'finalassembly': true,
                'check': false,
                'rework': true,
                'calendarWeek': true
            };
            expect($scope.checkIfAllTrue()).toBe(false);
        });
        it("should be false", function() {
            $scope.datastate = {
                'logistics': true,
                'mechanicalconstruction': true,
                'assembly': true,
                'finalassembly': true,
                'check': true,
                'rework': false,
                'calendarWeek': true
            };
            expect($scope.checkIfAllTrue()).toBe(false);
        });
        it("should be false", function() {
            $scope.datastate = {
                'logistics': true,
                'mechanicalconstruction': true,
                'assembly': true,
                'finalassembly': true,
                'check': true,
                'rework': true,
                'calendarWeek': false
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
            $httpBackend.whenPOST("workingstepmistakes/").respond(200, 'test');
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
            $httpBackend.whenPOST("workingstepmistakes/").respond(304, 'test');
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