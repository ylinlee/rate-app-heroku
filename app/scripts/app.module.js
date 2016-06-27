(function() {
    'use strict';

    angular.module('rateApp', [
        'ui.router',
        'rateApp.rate-services',
        'rateApp.rate-people',
        'rateApp.rate-dashboard',
        'rateApp.rate-authentication'
    ]);
})();
