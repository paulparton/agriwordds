(function() {
    'use strict';

    angular
        .module('agriwords')
        .component('wordSearchInput', {
            templateUrl:'components/word-search-input/word-search-input.html',
            controller:Controller,
            bindings: {
                searchList: '='
            }
        });
        
    Controller.$inject = ['SweetAlert'];

    function Controller(SweetAlert) {
        
        var $ctrl = this;
        
        $ctrl.add = add;
        $ctrl.searchList = $ctrl.searchList || [];
        $ctrl.searchText = $ctrl.searchText || "";
        
        function add(){
            
            if($ctrl.searchList.indexOf($ctrl.searchText)!=-1){
                SweetAlert.swal("Error!", "You cannot enter duplicate words into the search list", "error");
                return false
            }
            
            if(!/^[a-zA-Z]+$/.test($ctrl.searchText)){
                SweetAlert.swal("Error!", "Search words must contain only letters with no spaces", "error");
                return false
                  
            }
            
            $ctrl.searchList.push($ctrl.searchText);
            $ctrl.searchText = "";  
                  
                  
        }

            
    }
    
})();