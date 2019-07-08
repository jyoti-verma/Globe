define(["backbone"], function(Backbone) {
    var CountryView=Backbone.View.extend({
      el: "#container",
        initialize: function(){
       this.render();
        },
        render: function(){
        this.$el.html(this.collection[0].name);
        console.log(this.collection[0]);
        }
        });
  return CountryView;
});
