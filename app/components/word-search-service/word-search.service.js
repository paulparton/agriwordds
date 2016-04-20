(function() {
'use strict';

    angular
        .module('agriwords')
        .service('wordSearchService', wordSearchService);

    wordSearchService.$inject = [];
    
    function wordSearchService() {
        
        var service = {
            findWord:findWord,
            utils: {
                getNeighbourPosition:getNeighbourPosition,
                searchGrid:searchGrid,
                validGrid:validGrid
            }
        }
        
        return service;
        
         /**
         * takes two sets of co-ordates, finds if they are neighbours and returns the direction
         */
        function getNeighbourPosition(previous, current){
            
            var direction = false;
            
            // console.log('get neighbour: ', previous, current);
            
            if(current.row == previous.row && current.col == (previous.col + 1)){
                
                direction = 1;
                
            //Horizontal Backwards
            }else if(current.row == previous.row && current.col == (previous.col - 1)){
            
                direction = 2;
            
            //Vertical down
            }else if(current.row == (previous.row + 1) && current.col == previous.col){
                
                direction = 3;
                
            //Vertical up
            }else if(current.row == (previous.row - 1) && current.col == previous.col){
                
                direction = 4;
                
            }
            
            return direction;
                                                    
        }
        
       /**
        * Search the grid for all instances of a single character
        */
        function searchGrid(gridData, character){
            
            //console.log('Searching for ', character);
            var results = [];
            
            var rowsLength, rowCounter, colsLength, colCounter, currentCarachter;
            
            //Loop through each row 
            for(rowsLength = gridData.length, rowCounter = 0; rowCounter < rowsLength; rowCounter +=1){
                
                //Loop through each column in each row
                
                gridData[rowCounter].forEach(function(column, i){
                    
                     if(column.toLowerCase() == character.toLowerCase()){
                        results.push({
                            row: rowCounter,
                            col: i,
                            character: character
                        });
                    }
                                       
                });
                
                for(colsLength = gridData.length, colCounter = 0; colCounter < colsLength; colCounter +=1){
                    
                    //console.log('currentRowCol: ', gridData[rowCounter][colCounter]);
                    

                    
                }                   
                    
            }                
            
            //console.log('well? ', results);
            return results;
            
        }
       
       //Check that a text grid is valid
       function validGrid(wordGrid){
           
           if(!wordGrid || !wordGrid.length){
               return false
           }
           
           var validCols = true;
           
           wordGrid.forEach(function(row){
               
               if(row.length != wordGrid.length){
                   validCols = false;
               }
               
               row.forEach(function(col){
                  
                  if(!/^[a-zA-Z]+$/.test(col)){
                    
                      validCols = false;
                    
                  }
                   
               });
               
           });
           
           return validCols;
           
       }
       
       function findWord(grid, word){
           
           //var firstCharacter = word.substr(0,1);
           var characters = word.split("");
           
           var partials = [];
           
           //Loop through every character in the target word
           for(var i=0, o=characters.length; i < o; i+=1){
               
               //Create a reference to the current character
               var currentCharacter = characters[i];
               
               //Find all occurances of the current character in the grid
               var currentCharacterPositions = searchGrid(grid, currentCharacter);
               
               //Track when the search has failed
               var searchFailed;
               
               //if results were found
               if(currentCharacterPositions.length > 0){
                   
                   //If there are already partial matches from a pervious character / characters
                   if(partials.length > 0){
                       
                       //Create new partials to replace the existing ones
                       var newPartials = [];
                      
                      //Loop through each of the occurances of the current character 
                       currentCharacterPositions.forEach(function(characterPosition){
                        
                            //Loop through each of the existing partials
                            partials.forEach(function(partial){
                                
                                //Check if the current character is a neighbour of the current partial
                                var direction = getNeighbourPosition({row: partial.lastRowMatch, col:partial.lastColMatch}, characterPosition);
                                
                                //If the existing partials don't already have a direction (they are only the first character), assign a direction
                                if(direction && !partial.direction){
                                    
                                    var newPartial = {
                                        direction: direction,
                                        lastRowMatch: characterPosition.row,
                                        lastColMatch: characterPosition.col,
                                        endRow: characterPosition.row,
                                        endCol: characterPosition.col,                                        
                                        startRow:partial.startRow,
                                        startCol:partial.startCol,
                                        word: word
                                    }
                                    
                                    newPartials.push(newPartial);
                                
                                  
                                }
                                
                                //If the current partial does have a diretion 
                                if(direction && partial.direction){
                                    
                                    //If i matches the direction of the new match
                                    if(partial.direction == direction){
                                        
                                        //Build a new updated partial to replace the old one
                                        var newPartial = {
                                            direction: direction,
                                            lastRowMatch: characterPosition.row,
                                            lastColMatch: characterPosition.col,
                                            endRow: characterPosition.row,
                                            endCol: characterPosition.col,                                        
                                            startRow:partial.startRow,
                                            startCol:partial.startCol,
                                            word: word
                                        }
                                        
                                        newPartials.push(newPartial);
                                     
                                    }
                                    
                                }
                                
                            });  
                           
                       });
                       
                       //If this iteration failed to generate a list of partials
                       if(newPartials.length < 1){

                            //There are no results
                            searchFailed = true;
                            break;
                           
                       }else{

                           partials = newPartials;
                           
                       }
                       
                   //If there are no partials yet
                   }else{
                       
                       var newPartials = [];
                       
                       //This is the first character, and its results should be turned into partials.
                       currentCharacterPositions.forEach(function(characterMatch){
                           
                            newPartials.push({
                                lastRowMatch:characterMatch.row,
                                lastColMatch:characterMatch.col,
                                startRow: characterMatch.row,
                                startCol: characterMatch.col
                           });
                           
                       });
                       
                       partials = newPartials;

                   }
               
               }else{
                   
                   //If the current character doesn't appear in the grid at all, the search has failed
                   searchFailed = true;
               }               
               
           }
           
           if(searchFailed == true){
               
               return null;
           
           //If the search hasn't failed    
           }else{
               
               //There should be at least 1 succesfull search result sitting in partials
               if(partials.length > 0){
                   
                   partials[0].endRow = partials[0].lastRowMatch;
                   partials[0].endCol = partials[0].lastColMatch;
                   
                   delete partials[0].lastRowMatch;
                   delete partials[0].lastColMatch;
                   
                   return partials[0];
                   
               }
               
           }
           

       }
       
    }
})();