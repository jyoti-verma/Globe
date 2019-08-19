var HomeView = Backbone.View.extend({
    render: function () {
        console.log("home rneder");
        //console.log(this.$el);
        this.$el.html("This is home view");
    }
});
var AboutView = Backbone.View.extend({
    render: function () {
        console.log("about rneder");
        this.$el.html("This is about view");
    }
});
var ContactView = Backbone.View.extend({
    render: function () {
        console.log("contact rneder");
        this.$el.html("This is contact view");
    }
});
var NavView = Backbone.View.extend({
    el: ".nav",
    render: function () {
        console.log("nav render");
    },
    events: {
        "click": "onClick",
    },
    onClick: function (event) {
        console.log("click event render");
        var navs = $(event.target);
        var routeUrl = navs.attr("data-url")
        appRouter.navigate(routeUrl, { trigger: true });
    }
});

var AppRouter = Backbone.Router.extend({
    routes: {
        "path*" : "defaultRoute ",
        "Home": "Home",
        "About": "About",
        "Contact": "Contact"
    },
    defaultRoute:function(){
        this.Contact();
    },
    Home: function () {
        var homeView = new HomeView({ el: ".view-container" });
        homeView.render();
    },
    About: function () {
        var aboutView = new AboutView({ el: ".view-container" });
        aboutView.render();
    },
    Contact: function () {
        var contactView = new ContactView({ el: ".view-container" });
        contactView.render();
    }
});
var appRouter = new AppRouter();
Backbone.history.start();

var navView = new NavView();
navView.render();