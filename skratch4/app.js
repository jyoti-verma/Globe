var Country=Backbone.Model.extend({});

var Countries=Backbone.Collection.extend({
    url:"https://restcountries.eu/rest/v2/all",
});
var countries=new Countries();
countries.fetch().then(
    function dothis(response){
      var listView = new ListView({ collection: response});
       // var cardview = new CardView({model:response[1]});
    
     

});
var CardView=Backbone.View.extend({
    //el:".container",
   template:_.template($("#card-view").html()),
   initialize:function(){
    this.render();
   },
   render:function(){
       console.log("render car view");
       this.$el.html(this.template(this.model));
        // for(i = 0; i< 10; i++){
        //     $(".container").append(this.template(this.model));
        // }
     return this;
    },
    events:{
        "click #detailview" : "detailHistory"
    },
  detailHistory:function(events){
     console.log("event cllcik");
     var deatilview=new DetailView({model:this.model});
  }

});

var ListView = Backbone.View.extend({
    el: ".container",
    template: _.template($("#list-view-template").html()),
    initialize: function(){
        this.render();
    },
    render: function(){
        console.log("render list view");
          var self=this;
        _.each(this.collection, function(country){
            var cardview=new CardView({model:country})
            self.$el.append(cardview.$el);
            
        });
    }
});

var DetailView=Backbone.View.extend({
el:".detail",
template:_.template($("#deatil-view").html()),
initialize:function(){
    this.render();
},
render:function(){
console.log("detailrender");
this.$el.html(this.template(this.model));
}
});







