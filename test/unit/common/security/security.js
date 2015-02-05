describe('security', function() {

  var $rootScope, $http, $httpBackend, status, userInfo;

  beforeEach(module(
    'security.authorization'
  ));
  beforeEach(inject(function(_$rootScope_, _$httpBackend_, _$http_) {
    $rootScope = _$rootScope_;
    $httpBackend = _$httpBackend_;
    $http = _$http_;

    userInfo = {
      "roles": [{
        "description": "Administrator",
        "id": "5280af2f412704b525a1d5cd",
        "name": "admin",
        "permissions": [
          "a",
          "b:b",
          "c:c:c",
          "d:*:*",
          "e:e:*",
          "f:*:f"
        ],
        "tenantId": {
          "identifier": "greylogix"
        }
      }]
    };
    $httpBackend.when('GET', '/user/current').respond(200, {
      user: userInfo
    });
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  var service, queue;
  beforeEach(inject(function($injector) {
    service = $injector.get('security');
    queue = $injector.get('securityRetryQueue');
    service.currentUser = userInfo;
  }));


  // it('sends a http request to login the specified user', function() {
  //   $httpBackend.when('POST', '/login').respond(200, {
  //     user: userInfo
  //   });
  //   $httpBackend.expect('POST', '/login');
  //   service.login('email', 'password');
  //   $httpBackend.flush();
  //   expect(service.currentUser).toBe(userInfo);
  // });

  describe("isPermitted", function() {
    it("permission a", function() {
      expect(service.isPermitted("a")).toBe(true);
      expect(service.isPermitted("a:b")).toBe(true);
      expect(service.isPermitted("a:*")).toBe(true);
      expect(service.isPermitted("a:*:*")).toBe(true);
      expect(service.isPermitted("a:b:*")).toBe(true);
      expect(service.isPermitted("a:a:*")).toBe(true);
    });
    it("permission b:b", function() {
      expect(service.isPermitted("b:b")).toBe(true);
      expect(service.isPermitted("b:b:b")).toBe(true);
      expect(service.isPermitted("b:b:*")).toBe(true);
      expect(service.isPermitted("b:*:*")).toBe(false);
      expect(service.isPermitted("b")).toBe(false);
    });
    it("permission c:c:c", function() {
      expect(service.isPermitted("c:c:c")).toBe(true);
      expect(service.isPermitted("c")).toBe(false);
      expect(service.isPermitted("c:*")).toBe(false);
      expect(service.isPermitted("c:*:*")).toBe(false);
    });
    it("permission d:*:*", function() {
      expect(service.isPermitted("d:*:*")).toBe(true);
      expect(service.isPermitted("d")).toBe(true);
      expect(service.isPermitted("d:b:a")).toBe(true);
      expect(service.isPermitted("d:*:a")).toBe(true);
    });
    it("permission e:e:*", function() {
      expect(service.isPermitted("e:e:*")).toBe(true);
      expect(service.isPermitted("e:e:e")).toBe(true);
      expect(service.isPermitted("e")).toBe(false);
      expect(service.isPermitted("e:*")).toBe(false);
    });
    it("permission f:*:f", function() {
      expect(service.isPermitted("f:*:f")).toBe(true);
      expect(service.isPermitted("f:a:f")).toBe(true);
      expect(service.isPermitted("f:a:b")).toBe(false);
      expect(service.isPermitted("f:*:*")).toBe(false);
    });
  });
});