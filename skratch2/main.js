require.config({
    paths:{
        app: "app",
        backbone: "lib/backbone",
        jquery: "lib/jquery",
        underscore: "lib/underscore",
        CountryView:"views/country",
        Countries: "collection/countries",
        Model: "model/model"
    }
});
define(["app"],function(App){
    App.initialize();
})