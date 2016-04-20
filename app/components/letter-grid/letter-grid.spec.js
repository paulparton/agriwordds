describe('The letter grid component', function(){
    
    var component, scope, hero, $componentController;

        beforeEach(module('agriwords'));

    beforeEach(inject(function($rootScope, _$componentController_) {
        
        scope = $rootScope.$new();
        $componentController = _$componentController_;
        component = $componentController('letterGrid', {$scope: scope});

    }));
 
    
    it('Should convert the space and new line arranged text into nested arrays', function(){

        component.gridText = "abcd\nefgh";
        
        component.parseGrid();

        expect(component.gridData[0][0]).toBe('a');
        
        expect(component.gridData[1][0]).toBe('e');
        
    })
    
});