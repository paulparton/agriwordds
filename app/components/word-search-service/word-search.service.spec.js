describe('The wordSearch service', function(){
    
    var wordSearchService;

        beforeEach(module('agriwords'));

    beforeEach(inject(function($injector) {
        
        wordSearchService = $injector.get('wordSearchService');

    }));
    
    it('Should reject a grid that contains a number', function(){
        
        var invalidNumberGrid = [['a','b','c'],['d','3','f'],['g','h','i']];
        
        expect(wordSearchService.utils.validGrid(invalidNumberGrid)).toBe(false);
        
    });

    it('Should reject a grid that contains special characters', function(){
        
        var invalidNumberGrid = [['a','b','c'],['d','$','f'],['g','h','i']];
        
        expect(wordSearchService.utils.validGrid(invalidNumberGrid)).toBe(false);
                
    });

    it('Should reject a grid that contains an unequal amount of rows and columns', function(){
        
        var invalidNumberGrid = [['a','b','c'],['d','3','f']];
        
        expect(wordSearchService.utils.validGrid(invalidNumberGrid)).toBe(false);
        
    });

    it('Should identify a valid grid', function(){
        
        var validGrid = [['a','b','c'],['d','o','f'],['g','h','i']];
        
        expect(wordSearchService.utils.validGrid(validGrid)).toBe(true);
                
    });
        
    it('Should final all instances of a character in a grid', function(){
        
        var validGrid = [['a','b'],['d','o']];
        var result = wordSearchService.utils.searchGrid(validGrid, 'a');
        
        expect(result[0].row).toBe(0);
        expect(result[0].row).toBe(0);
        
    });
    
    it('Should locate one location of a horizontal word in a grid', function(){
        
        var validGrid = [['c','o','w'],['d','o','f'],['g','t','i']];
        
        var result = wordSearchService.findWord(validGrid, 'cow');
        
        expect(result.direction).toBe(1);
        expect(result.startRow).toBe(0);
        expect(result.startCol).toBe(0);
        expect(result.endRow).toBe(0);
        expect(result.endCol).toBe(2);        
         
    });   
        
    it('Locate a backwards horizontal word within the data grid', function(){
        
        var validGrid = [['w','o','c'],['d','o','f'],['g','t','i']];
        
        var result = wordSearchService.findWord(validGrid, 'cow');
        
        expect(result.direction).toBe(2);
        expect(result.startRow).toBe(0);
        expect(result.startCol).toBe(2);
        expect(result.endRow).toBe(0);
        expect(result.endCol).toBe(0);  
                
    });
    
    it('Locate a forwards vertical word within the data grid', function(){
        
        var validGrid = [['c','o','c'],['o','o','f'],['w','t','i']];
        
        var result = wordSearchService.findWord(validGrid, 'cow');
        
        expect(result.direction).toBe(3);
        expect(result.startRow).toBe(0);
        expect(result.startCol).toBe(0);
        expect(result.endRow).toBe(2);
        expect(result.endCol).toBe(0);  
                
    });
    
    it('Locate a backwards vertical word within the data grid', function(){
        
        var validGrid = [['w','o','p'],['o','o','f'],['c','t','i']];
        
        var result = wordSearchService.findWord(validGrid, 'cow');
        
        expect(result.direction).toBe(4);
        expect(result.startRow).toBe(2);
        expect(result.startCol).toBe(0);
        expect(result.endRow).toBe(0);
        expect(result.endCol).toBe(0);          
        
    });
     
});