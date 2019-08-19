var Student=Backbone.Model.extend({});
var student=new Student({name:"jyoti"});

var Home = Backbone.View.extend({
    el: ".container",

    template: _.template($("#myTemplate").html()),

render: function(){
    var html = this.template({model:student});
    this.$el.html(html);
    return this;
},
initialize:function(){
    this.render();
}
});
var home=new Home({ model: student });



