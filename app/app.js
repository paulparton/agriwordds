(function() {
    
    'use strict';

    angular.module('agriwords', [
        'oitozero.ngSweetAlert'
    ]);
        
    angular
        .module('agriwords')
        .component('app', {
                template:'<word-search></word-search>'
        });


})();