define(["backbone","jquery","underscore"], function (Backbone, $,_) {

    var ListView = Backbone.View.extend({
        el: ".container",
        template: _.template($("#list-view-template").html()),
        initialize: function () {
          
        },
        render: function () {
            console.log("render list view");

        }
    });
    return ListView;
});