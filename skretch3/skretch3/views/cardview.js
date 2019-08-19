define(["backbone","jquery","underscore", "Countries"], function (Backbone, $,_, Countries) {
    var CardView = Backbone.View.extend({
        //el:".container",
     template: _.template($("#card-view").html()),
         render: function () {
            this.$el.html(this.template(this.model));
            console.log(this.model);
        }
    });
    return CardView;
});