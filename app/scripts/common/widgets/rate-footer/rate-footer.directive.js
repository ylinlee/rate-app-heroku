(function() {
    "use strict";

  angular.module("rateApp")
    .directive("rateFooter", RateFooter);

  //RateFooter.$inject = ["APP_PATH"];

  /**
   * @ngInject
   */
  function RateFooter(APP_PATH){
    return {
      restrict: "E",
      templateUrl: APP_PATH.COMMON_WIDGETS + "/rate-footer/rate-footer.template.html",
      controller: RateFooterController,
      controllerAs: 'RateFooterCtrl',
      scope: {
        author: "@"
      },
      bindController: true
    };
  }

  //RateFooterController.$inject = ["APP_PATH"];

  /**
   * @ngInject
   */
  function RateFooterController(APP_PATH) {
    var vm = this;
    vm.author = vm.author || 'YCLIN';
    vm.getImgUrl = getImgUrl;

    function getImgUrl(){
      return APP_PATH.ASSETS_IMG + '/AngularJS-small.png';
    }
  }
})();
