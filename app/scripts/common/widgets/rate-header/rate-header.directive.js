(function() {
    "use strict";

  angular.module("rateApp")
    .directive("rateHeader", RateHeader);

  RateHeader.$inject = ["$window", "APP_PATH"];

  /**
   * @ngInject
   */
  function RateHeader($window, APP_PATH){
    return {
      restrict: "A",
      templateUrl: APP_PATH.COMMON_WIDGETS + "/rate-header/rate-header.template.html",
      scope: {
        navText: "@"
      },
      controller: RateHeaderController,
      controllerAs: "RateHeaderCtrl",
      bindToController: true,
      link: function(scope, element, attributes) {
        element.addClass("navbar");
        angular.element($window).bind("scroll", function() {
            if (this.pageYOffset >= 100) {
                element.addClass("top-nav-collapse");
            } else {
                element.removeClass("top-nav-collapse");
            }
        });
      }
    };
  }

  RateHeaderController.$inject = ["$scope", "APP_PATH", "RateAuthService", "RateSession"];

  /**
   * @ngInject
   */
  function RateHeaderController($scope, APP_PATH, RateAuthService, RateSession) {
    var vm = this;
    vm.navText = vm.navText || "Valora tus personajes";
    vm.navTitle = {
      href: "#/",
      img: APP_PATH.ASSETS_IMG + "/Star_Wars_Yellow_Logo.svg"
    };
    vm.userName = 'Invitado';
    vm.isAuthenticated = isAuthenticated;
    vm.logout = logout;

    $scope.$watch( "RateHeaderCtrl.isAuthenticated()", function(newValue, oldValue) {
      if (newValue === oldValue) {
        return;
      }
      if(newValue) {
        vm.userName = RateSession.userId;
      }
    });

    function isAuthenticated() {
      return RateAuthService.isAuthenticated();
    }

    function logout() {
      RateAuthService.logout();
    }
  }
})();
