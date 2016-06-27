(function() {
    "use strict";

    angular
        .module("rateApp")
        .constant("APP_PATH", {
          "COMMON_WIDGETS": "scripts/common/widgets",
          "ASSETS_DATA": "/assets/data",
          "ASSETS_IMG": "/assets/img"
        })
        .constant("API_END_POINT", {
          "HOST": 'http://localhost',
          "PORT": '3001',
          "PEOPLE_API": '/apiPeople/',
          "REVIEWS_API": '/apiReviews/'
        });
})();
