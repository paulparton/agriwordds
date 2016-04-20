(function() {
    'use strict';

    angular
        .module('agriwords')
        .component('wordSearch', {
            templateUrl:'word-search/word-search.html',
            controller:Controller
        });

    /* @ngInject */
    Controller.$inject = ['wordSearchService', 'SweetAlert', '$window', '$location', '$anchorScroll'];

    function Controller(wordSearchService, SweetAlert, $window, $location, $anchorScroll) {
        
        var $ctrl = this;
        
        $ctrl.solve = solve;
        $ctrl.resultList = [];

        function solve(grid, words){
            
            console.log($ctrl.gridData);
            
            $ctrl.resultList = [];
            
            if(words.length < 1){
                SweetAlert.swal("Error!", "You must enter words to search for", "error");
                return false;
            }
            
            if(!$ctrl.gridData || $ctrl.gridData.length<1){
                SweetAlert.swal("Error!", "You must enter characters into the letter grid", "error");
                return false;                
            }
            
            if(!wordSearchService.utils.validGrid($ctrl.gridData)){
                SweetAlert.swal("Error!", "Check the letter grid only contains letters and has an equal number of columns and rows.", "error");
                return false;                
            }
                        
            words.forEach(function(word){
                
                $ctrl.resultList.push(wordSearchService.findWord(grid, word) || {word:word});  
                  
            });
            
            //If this is a small screensize, autoscroll to the results
            if($window.innerWidth<768){
                
                $location.hash('results');
                $anchorScroll();  
                
            }
            
        }
        
    }
    
})();