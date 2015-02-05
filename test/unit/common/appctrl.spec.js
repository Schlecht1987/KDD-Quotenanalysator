describe("AppCtrl", function() {
    beforeEach(module('app'));
    var ctrl, scope, $httpBackend;
    // inject the $controller and $rootScope services
    // in the beforeEach block
    beforeEach(inject(function($controller, $rootScope, _$httpBackend_) {
        // Create a new scope that's a child of the $rootScope
        $scope = $rootScope.$new();
        $httpBackend = _$httpBackend_;
        // Create the controller
        ctrl = $controller('AppCtrl', {
            $scope: $scope
        });

        $httpBackend.whenPOST("/options/").respond();
    }));

    describe("StartButton", function() {

        it("start button should be active", function() {
            $scope.startRouteChange();
            expect($scope.startButton).toEqual('active');
        });
        it("start button should be not active", function() {
            $scope.endRouteChange();
            expect($scope.startButton).toEqual('');
        });
    });

    describe("Loginstate", function() {
        it("Loginstate should be true", function() {
            $httpBackend.whenGET("/security/").respond({
                pwcheck: true
            });
            $httpBackend.whenGET("/options/").respond({
                options: [{}]
            });
            $httpBackend.flush();
            expect($scope.loginText).toEqual("admin");
            expect($scope.loginButtonValue).toEqual("Logout");
            expect($scope.loginstate).toBe(true);
        });
        it("Loginstate should be false", function() {
            $httpBackend.whenGET("/security/").respond({
                pwcheck: false
            });
            $httpBackend.whenGET("/options/").respond({
                options: [{}]
            });
            $httpBackend.flush();
            expect($scope.loginText).toEqual("login");
            expect($scope.loginButtonValue).toEqual("Login");
            expect($scope.loginstate).toBe(false);
        });
    });

    describe("checkIfOneTrue Funktion", function() {
        it("checkIfOneTrue should return false", function() {
            for (var i = 0; i < $scope.operatingNumbersOptions.length; i++) {
                $scope.operatingNumbersOptions[i].active = false;
            }
            expect($scope.checkIfOneTrue()).toBe(false);
        });
        it("checkIfOneTrue should return true", function() {
            expect($scope.checkIfOneTrue()).toBe(true);
        });
    });

    describe("setOperatingNumberOptionIndex Funktion", function() {
        it("setOperatingNumberOptionIndex should set the Index", function() {
            $scope.setOperatingNumberOptionIndex(5);
            expect($scope.index).toEqual(5);
        });
    });

    describe("getOptionsFromServer Funktion", function() {

        it("should be everything true", function() {
            $httpBackend.whenGET("/security/").respond({
                pwcheck: true
            });
            $httpBackend.whenGET("/options/").respond({
                options: [{
                    remainingpoints: true,
                    workingstepmistakes: true,
                    upstreamprocessmistakes: true,
                    portfolio: true,
                    labourproductivity: true,
                    scrappedmaterial: true,
                    deliveryreliabilitylogistics: true,
                    processingtime: true,
                    capacity: true,
                    ideasprocessimprovements: true,
                    customersatisfaction: true,
                    numberproducedcabinets: true,
                    deliveryreliabilityupstreamconstruction: true,
                    presentationinterval: 20000
                }]
            });
            $httpBackend.flush();
            expect($scope.operatingNumbersOptions[0].active).toBe(true);
            expect($scope.operatingNumbersOptions[1].active).toBe(true);
            expect($scope.operatingNumbersOptions[2].active).toBe(true);
            expect($scope.operatingNumbersOptions[3].active).toBe(true);
            expect($scope.operatingNumbersOptions[4].active).toBe(true);
            expect($scope.operatingNumbersOptions[5].active).toBe(true);
            expect($scope.operatingNumbersOptions[6].active).toBe(true);
            expect($scope.operatingNumbersOptions[7].active).toBe(true);
            expect($scope.operatingNumbersOptions[8].active).toBe(true);
            expect($scope.operatingNumbersOptions[9].active).toBe(true);
            expect($scope.operatingNumbersOptions[10].active).toBe(true);
            expect($scope.operatingNumbersOptions[11].active).toBe(true);
            expect($scope.operatingNumbersOptions[12].active).toBe(true);
            expect($scope.intervalTime).toEqual(20000);
        });

        it("should be everything false", function() {
            $httpBackend.whenGET("/security/").respond({
                pwcheck: true
            });
            $httpBackend.whenGET("/options/").respond({
                options: [{
                    remainingpoints: false,
                    workingstepmistakes: false,
                    upstreamprocessmistakes: false,
                    portfolio: false,
                    labourproductivity: false,
                    scrappedmaterial: false,
                    deliveryreliabilitylogistics: false,
                    processingtime: false,
                    capacity: false,
                    ideasprocessimprovements: false,
                    customersatisfaction: false,
                    numberproducedcabinets: false,
                    deliveryreliabilityupstreamconstruction: false,
                    presentationinterval: 10000
                }]
            });
            $httpBackend.flush();
            expect($scope.operatingNumbersOptions[0].active).toBe(false);
            expect($scope.operatingNumbersOptions[1].active).toBe(false);
            expect($scope.operatingNumbersOptions[2].active).toBe(false);
            expect($scope.operatingNumbersOptions[3].active).toBe(false);
            expect($scope.operatingNumbersOptions[4].active).toBe(false);
            expect($scope.operatingNumbersOptions[5].active).toBe(false);
            expect($scope.operatingNumbersOptions[6].active).toBe(false);
            expect($scope.operatingNumbersOptions[7].active).toBe(false);
            expect($scope.operatingNumbersOptions[8].active).toBe(false);
            expect($scope.operatingNumbersOptions[9].active).toBe(false);
            expect($scope.operatingNumbersOptions[10].active).toBe(false);
            expect($scope.operatingNumbersOptions[11].active).toBe(false);
            expect($scope.operatingNumbersOptions[12].active).toBe(false);
            expect($scope.intervalTime).toEqual(10000);
        });
    });

});