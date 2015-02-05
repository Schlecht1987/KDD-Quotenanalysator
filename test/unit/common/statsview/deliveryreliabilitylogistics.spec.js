describe("Statsview DeliveryReliabilityLogisticsController", function() {
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
        ctrl = $controller('DeliveryReliabilityLogisticsController', {
            $scope: $scope
        });
      //  $httpBackend.whenGET("/deliveryreliabilitylogistics/").respond(200, {
     //       calendarWeeks: [1, 2, 3]
      //  });
      //  $httpBackend.flush();
    }));

    describe("calculatedAVG Funktion", function() {
        it("should set to", function() {
            var vals = [1,2,3,4,5,6,7,8,9,10];
            expect($scope.calculatedAVG(vals)).toEqual(5.5);
        });
    });


});

