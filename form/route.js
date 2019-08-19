var blogview=Backbone.View.extend({
    render:function(){
        this.$el.html("blog view");
        return this;
    }
});
var tableView=Backbone.View.extend({
    render:function(){
        this.$el.html("TableView");
        return this;
    }
});

var Router=Backbone.Router.extend({
routes:{
  "view":"viewBlog",
  "view/:viewId":"viewpageById",
  "tableview":"viewTable",
  "*other":"DefaultRoute"
},

viewTable:function(){
    var view= new tableView({el:"#container"});
    view.render();
},
viewBlog:function(){
var view= new blogview({el:"#container"});
view.render();
},
});
var router=new Router();
Backbone.history.start();

var navView=Backbone.View.extend({

    events:{
        "click":"onClick"
    },
    onClick:function(e){
        var $span=$(e.target);
        router.navigate($span.attr("data-url"),{trigger:true});
    }
});

var navview=new navView({el:"#nav"});