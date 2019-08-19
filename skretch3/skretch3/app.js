define([ "backbone","jquery","underscore", "Countries", "CardView","ListView"], function ( Backbone, $,_, Countries, CardView,ListView) {

    console.log("app is now initialized");
    var countries = new Countries();
    countries.fetch().then(function data(response) {
        console.log(response);
        var listview = new ListView({ model: response[0] });
        // var cardview = new CardView({ model: response[0] });
        // cardview.render();
        var self=this;
        _.each(this.collection, function(country){
            var cardview=new CardView({model:country})
            self.$el.append(cardview.$el);
            
        });
        // console.log(cardview.$el);
        // var ht= cardview.$el.html();
        // $(".container").html(ht);

    });
});