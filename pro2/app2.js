
var Country = Backbone.Model.extend({
    defaults: {
        name: '',
        capital: '',
        flags: ''
	}
});
var country= new Country();

var Countries = Backbone.Collection.extend({
    model: Country,
		url: 'https://restcountries.eu/rest/v2/all',
    });
var countries = new Countries();
countries.fetch().then(function(data){

      var listview=new ListView({collection:data})
});
	
  var ListView  = Backbone.View.extend({
	el: "#mainPanel",
	template: _.template($("#list-template").html()),
	initialize: function(){
        this.render();
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
var CardView = Backbone.View.extend({
		template: _.template($("#card-view").html()),
		initialize: function(){
			this.render();
		},
		render: function(){
			this.$el.html(this.template({country: this.model}));
			return this;
		}
	});
	
	var DetailsView = Backbone.View.extend({
		el: "#mainPanel",
		template: _.template($("#detail-view").html()),
		initialize: function(){
			this.render()
		},
		render: function(){
			this.$el.html(
			   this.template({
				   country: this.model
			   })
			);
		}
	
	});
	$(document).ready(function(){
		$("#myInput").on("keyup", function() {
		  var value = $(this).val().toLowerCase();
		  $("#myTable .divRow").filter(function() {
			$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
		  });
		});
	  });


	
