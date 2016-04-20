(function() {
    
    'use strict';

    angular
        .module('agriwords')
        .component('wordSearchList', {
            templateUrl:'components/word-search-list/word-search-list.html',
            controller:Controller,
            bindings: {
                searchList: '='
            }
        });

    /* @ngInject */
    Controller.$inject = [];

    function Controller() {
        
        var $ctrl = this;
        
        $ctrl.remove = remove;
        
        function remove(item){
            
            $ctrl.searchList.splice($ctrl.searchList.indexOf(item),1);
            
        }
        
    }
    
})();