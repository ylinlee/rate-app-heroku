(function() {
    "use strict";
  angular.module("rateApp")
    .controller("MainController", MainController);

  //MainController.$inject = ["$location"];

  /**
   * @ngInject
   */
  function MainController($location) {
    var vm = this;
    vm.carouselHidden = carouselHidden;

    function carouselHidden() {
      var url = $location.url();
      var reg = new RegExp("\/dashboard\/|dashboard$|\/login$");
      return !reg.test(url);
    }
  }
})();
