(function() {
    "use strict";

  angular.module("rateApp")
    .directive("rate404", Rate404);

  //Rate404.$inject = ["APP_PATH"];

  /**
   * @ngInject
   */
  function Rate404(APP_PATH){
    return {
      restrict: "E",
      templateUrl: APP_PATH.COMMON_WIDGETS + "/rate-404/rate-404.template.html",
      link: Rate404Link,
      controller: Rate404Controller,
      controllerAs: 'Rate404Ctrl',
      scope: {
        linksWrapper: '='
      },
      bindToController: true
    };
  }

  function Rate404Controller() {
    var vm = this;
    vm.linksWrapper = vm.linksWrapper || mockLinkWrapper();
  }

  //Rate404Link.$inject = ["$scope", "$element", "$attrs"];

  /**
   * @ngInject
   */
  function Rate404Link(scope, element, attrs) {
    //Initiating the Wow Script
    var wow = new WOW({
        animateClass: "animated",
        offset: 100
    });
    wow.init();
  }

  function mockLinkWrapper() {
    return [{
      fade: "fadeInRight",
      wowDelay: "4400ms",
      href: "#",
      icon: "fa-home"
    },{
      fade: "fadeInRight",
      wowDelay: "4300ms",
      href: "#",
      icon: "fa-facebook"
    },{
      fade: "fadeInRight",
      wowDelay: "4200ms",
      href: "#",
      icon: "fa-twitter"
    },{
      fade: "fadeInLeft",
      wowDelay: "4200ms",
      href: "#",
      icon: "fa-google-plus"
    },{
      fade: "fadeInLeft",
      wowDelay: "4300ms",
      href: "#",
      icon: "fa-linkedin"
    },{
      fade: "fadeInLeft",
      wowDelay: "4400ms",
      href: "#",
      icon: "fa-github"
    }];
  }
})();
