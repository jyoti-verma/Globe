
 var Country = Backbone.Model.extend({ 
     defaults:{
         "name":'',
         "capital":'',
         "region":'',
         "flags":''
     },
     url: "https://restcountries.eu/rest/v2/all",
     parse: function(data){
        return data[0];
  }
});

 var country=new Country();
 
 var Countries = Backbone.Collection.extend({
    url: "https://restcountries.eu/rest/v2/all"
 });
 
 var countries = new Countries();
 
 countries.fetch().then(function(){
 countries.add(country);
  console.log(country);
  console.log(countries);
 });

var CardView=Backbone.View.extend({

    el:"#mainPanel",
    template: _.template($('#card-view').html()),
    initialize: function(){
        this.render();
    },
    render: function(){
    this.$el.html(this.template());
    }
});
var cardView= new CardView();

var ListView = Backbone.View.extend({
    initialize: function(){
       countries.on('add', this.render, this);
    },

    render: function(){
        var self = this;
        _.each(this.collection, function(country){
            var cardView = new CardView({model: country});
            self.$el.append(cardView.render().$el);
        });
        return this;
    }
 });
 var listview= new ListView({countries});
 $("#mainPanel").append(listview.el);



 
 
 