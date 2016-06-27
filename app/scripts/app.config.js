(function() {
    "use strict";

  angular.module("rateApp").config(config);

  config.$inject = ["$stateProvider", "$urlRouterProvider", "RateAssetsProvider", "RateEndPointProvider", "APP_PATH", "API_END_POINT"];

  var linksWrapper = [{
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
      icon: "fa-pinterest"
    },{
      fade: "fadeInLeft",
      wowDelay: "4400ms",
      href: "#",
      icon: "fa-dribbble"
    }];

  function config($stateProvider, $urlRouterProvider, RateAssetsProvider, RateEndPointProvider, APP_PATH, API_END_POINT){
    //configuración y definición de las rutas

    $urlRouterProvider.otherwise("/error");
    
    //your main application routes
    $stateProvider
      .state("/", {
        url: "/",
        template: "<rate-people></rate-people>",
        authenticate: false
      })
      .state( "people", {
        url: "/people",
        template: "<rate-people></rate-people>",
        authenticate: false
       })
      .state("person", {
        url: "/person/:userid",
        template: "<rate-detail></rate-detail>",
        authenticate: false
      })
      .state("login", {
        url: "/login",
        template: "<rate-login></rate-login>",
        authenticate: false,
        params: {
          lastState: '/'
        }
      })
      .state("dashboard", {
        abstract: true,
        url: "/dashboard",
        template: "<rate-dashboard></rate-dashboard>",
        authenticate: true
      })
      .state("dashboard.people", {
        url: "/people",
        template: '<div class="row animate-if" rate-table-people people="rateDashboardCtrl.people" title="Personajes">',
        authenticate: true
      })
      .state("dashboard.reviews", {
        url: "/reviews",
        template: '<div class="row animate-if" rate-table-review reviews="rateDashboardCtrl.reviews" title="Valoraciones" people-options="rateDashboardCtrl.peopleOptions">',
        authenticate: true
      })
      .state("dashboard.resume", {
        url: "/resume",
        template: '<div class="row">' +
              '<div class="col-lg-8">' +
                  '<div class="panel panel-default" rate-bar-chart data="rateDashboardCtrl.reviewsByPerson"></div>' +
              '</div>' +
              '<div class="col-lg-4">' +
                  '<div class="panel panel-default" rate-donut-chart data="rateDashboardCtrl.stars">' +
                  '</div>' +
              '</div>' +
          '</div>',
        authenticate: true
      })
      .state( "error", {
        url: "/error",
        template: "<rate-404 links-wrapper=" + JSON.stringify(linksWrapper) + "></rate-404>",
        authenticate: false
      });

      var endpoint = {
        HOST: API_END_POINT.HOST,
        PORT: API_END_POINT.PORT,
        PEOPLE_API: API_END_POINT.PEOPLE_API,
        REVIEWS_API: API_END_POINT.REVIEWS_API
      };

      var assets = {
        COMMON_WIDGETS: APP_PATH.COMMON_WIDGETS,
        ASSETS_DATA: APP_PATH.ASSETS_DATA,
        ASSETS_IMG: APP_PATH.ASSETS_IMG
      };

      RateAssetsProvider.setAssets(assets);
      RateEndPointProvider.setEndPoint(endpoint);
  }

  angular.module("rateApp").run(runRateApp);

  runRateApp.$inject = ["$rootScope", "$state", "RateAuthService"];

  function runRateApp ($rootScope, $state, RateAuthService) {
    $rootScope.$on("$stateChangeStart", stateChangeStart);

    function stateChangeStart(event, toState, toParams, fromState, fromParams){
      if (toState.authenticate && !RateAuthService.isAuthenticated()){
        // User isn’t authenticated
        $state.go("login", {lastState: toState.name});
        event.preventDefault();
      }
    }
  }
})();
