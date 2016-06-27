(function() {
    "use strict";

	angular.module("rateApp")
		.directive("rateCarousel", RateCarousel);

	//RateCarousel.$inject = ["APP_PATH"];

	/**
   * @ngInject
   */
	function RateCarousel(APP_PATH){
		return {
			restrict: "A",
			templateUrl: APP_PATH.COMMON_WIDGETS + "/rate-carousel/rate-carousel.template.html",
			controller: RateCarouselController,
			controllerAs: "rateCarouselCtrl"
		};
	}

	//RateCarouselController.$inject = ["DataService", "APP_PATH"];

	/**
   * @ngInject
   */
	function RateCarouselController(DataService, APP_PATH) {
		var vm = this;
		vm.carousel = [];
		vm.getImgPath = getImgPath;

		(function() {
			DataService.getData(APP_PATH.ASSETS_DATA + "/carousel.json").then(function(response){
				vm.carousel = response.carousel;
			});
		})();

		function getImgPath(index) {
			return APP_PATH.ASSETS_IMG + "/carousel/carousel-" + index + ".jpg";
		}
	}
})();
