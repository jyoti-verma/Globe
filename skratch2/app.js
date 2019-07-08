define(["CountryView","Countries"], function(CountryView,Countries) {
 var initialize = function(){
      console.log("app is now initialized");
       
       var countries = new Countries();
       countries.fetch().then(function(response){
       var collection=response;
        console.log(collection);
        var countryView = new CountryView({collection:response});
     
    });
   }
   return {initialize:initialize}
});