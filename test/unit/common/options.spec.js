describe("OptionsCtrl", function() {
    beforeEach(module('app'));
    var ctrl, scope, $httpBackend;
    // inject the $controller and $rootScope services
    // in the beforeEach block
    beforeEach(inject(function($controller, $rootScope, _$httpBackend_) {
        // Create a new scope that's a child of the $rootScope
        $scope = $rootScope.$new();
        $httpBackend = _$httpBackend_;
        // Create the controller
        ctrl = $controller('OptionsController', {
            $scope: $scope
        });
    }));

    describe("Adminpassword", function() {
        it("should exist", function() {
            $httpBackend.whenGET("/security/newpassword/").respond(306,'');
            $httpBackend.flush();
            expect($scope.oldPasswordStatus).toEqual("no old password require");
            expect($scope.inputType).toEqual("hidden");
        });
        it("should not exist", function() {
            $httpBackend.whenGET("/security/newpassword/").respond(307,'');
            $httpBackend.flush();
            expect($scope.inputType).toEqual("password");
        });
    });

    describe("sendPassword Funktion", function() {
        it("should set the password", function() {
            $httpBackend.whenPUT("/security/newpassword/").respond(200,'ok');
            $httpBackend.whenGET("/security/newpassword/").respond(306,'');
            $scope.sendNewPassword();
            $httpBackend.flush();
            expect($scope.submitStatus).toEqual("password  succesfully set");
        });
        it("should not set the password", function() {
            $httpBackend.whenPUT("/security/newpassword/").respond(304,'ok');
            $httpBackend.whenGET("/security/newpassword/").respond(306,'');
            $scope.sendNewPassword();
            $httpBackend.flush();
            expect($scope.submitStatus).toEqual("old password not correct");
        });
    });

});