(function() {
    'use strict';

    angular
        .module('agriwords')
        .component('letterGrid', {
            templateUrl: 'components/letter-grid/letter-grid.html',
            controller: Controller,
            bindings: {
                gridData:'='
            }
        });

    /* @ngInject */
    Controller.$inject = ['wordSearchService'];

    function Controller(wordSearchService) {
        
        var $ctrl = this;
        
        $ctrl.parseGrid = parseGrid;
        
        function parseGrid(){
            
            if($ctrl.gridText == ""){
                
                $ctrl.gridData = [];
                
            }else{
            
                $ctrl.gridData = $ctrl.gridText.split('\n');
                
                $ctrl.gridData.forEach(function(gridRow, i){
                    $ctrl.gridData[i] = gridRow.split("");
                });
                            
            }
            
        }
        
    }
    
    
})();
