var sensationApp = angular.module('sensationApp');

// Home Data: Home page configuration
sensationApp.factory('Data', function(){
    var data = {};
        
    return data;
});

sensationApp.factory('Dataoption', function($http){
    var data = {};
    data.items = function(arg){
            //console.log(arg);
           
      
        return   [
        { 
            title: arg,
            icon: 'calendar',
            page: 'response.html'
        }

    ]; 
    
    }
    return data;
});

