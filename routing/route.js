var blogview=Backbone.View.extend({
    render:function(){
        this.$el.html('<a href="index.html">form</a>');
        return this;
    }
});
var tableView=Backbone.View.extend({

    render:function(){
        this.$el.html('<a href="sir.html">click</a>');
        return this;
    }
});
 var Router=Backbone.Router.extend({
    routes:{
     
      "Contact":"contact",
      "About":"about",
      "*other":"DefaultRoute"
    },
    about:function(){
        var view= new tableView({el:'#mainPanel'});
        view.render();
    },
    contact:function(){
    var view= new blogview({el:'#secondPanel'});
    view.render();
    },
    });
    var router=new Router();
 
    
    var navView=Backbone.View.extend({
    
        events:{
            "click":"onClick"
        },
        onClick:function(e){
            var $a=$(e.target);
            router.navigate($a.attr("data-url"),{trigger:true});
        }
    });
var navview=new navView({el:"#nav"});  


Backbone.history.start();
