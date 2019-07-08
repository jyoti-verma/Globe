define(["backbone"], function(Backbone) {
    var Countries= Backbone.Collection.extend({
        url:"https://restcountries.eu/rest/v2/all",
    });
    return Countries;
});