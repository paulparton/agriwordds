(function() {
    'use strict';

    angular
        .module('agriwords')
        .component('solution', {
            templateUrl:'components/solution/solution.html',
            controller:Controller,
            bindings: {
                resultList:'='
            }
        });

    /* @ngInject */
    Controller.$inject = [];

    function Controller() {
        
    }
})();