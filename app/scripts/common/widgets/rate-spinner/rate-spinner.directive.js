(function() {
    "use strict";

  angular.module("rateApp")
    .directive("rateSpinner", RateSpinner);

  //RateSpinner.$inject = ["$rootScope", "$timeout", "APP_PATH"];

  /**
   * @ngInject
   */
  function RateSpinner($rootScope, $timeout, APP_PATH){
    return {
      restrict: "E",
      templateUrl: APP_PATH.COMMON_WIDGETS + "/rate-spinner/rate-spinner.template.html",
      link: function($scope, element) {

        $scope.$on("startLoading", function(event, data) {
          element.removeClass("ng-hide");
        });

        $scope.$on("endLoading", function(event, data) {
          element.addClass("ng-hide");
        });
      }
    };
  }
})();
