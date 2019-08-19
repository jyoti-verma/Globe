var Vehicle = Backbone.Model.extend({
	initialize: function()
	{
		console.log("manish");
	},
	idAttribute: "registrationNumber",
	validate: function(attrs){
		if (!attrs.registrationNumber)
			return "Vehicle is not valid.";
	},
	start: function(){
		console.log("Vehicle started.");
	}
});
var Car = Vehicle.extend({
	start: function(){
		console.log("Car with registration number " + this.get("registrationNumber") + " started.");
	}
});

var car = new Car({
	registrationNumber: "XLI887",
	color: "Blue"
});
car.unset("registrationNumber");

if (!car.isValid())
	console.log(car.validationError);

car.set("registrationNumber", "XLI887");

if (!car.isValid())
	console.log(car.validationError);

car.start();
var Employee = Backbone.Model.extend({
	url: 'http://dummy.restapiexample.com/api/v1/employee',

    idAttribute: 'id',
    defaults: {
        employee_name: '',
        employee_salary: '',
        employee_age: '',
        profile_image: ''
	}

});
var emp1= new Employee();
    var MyCollection = Backbone.Collection.extend({
		model: Employee,
		url: 'http://dummy.restapiexample.com/api/v1/employees',
		initialize: function () {
			this.bind("reset", function (model, options) {
				console.log("Inside event");
				console.log(model);
				
			});
		},

		parse: function(response) {
        var self = this;
        _.each(response, function(item, index) {
            var member = new self.model();
            member.set('id', index);
            // Set the defaul attributes.
            member.set('employee_name', item.employee_name);
            member.set('employee_salary', item.employee_salary);
            member.set('employee_age', item.employee_age);
            member.set('profile_image', item.profile_image);

            self.push(member);
        });
        console.log('length of this collection: ' + this.length);
        // console.log(this);
        return this.models;
		},
        
    });

var stuff = new MyCollection();
stuff.fetch({
	data: JSON.stringify({
		'fields': [
			'employee_name',
			'employee_salary',
			'employee_age',
			'profile_image']
	}),
	success: function(collection,xhr) {
		console.log("Inside success");
		console.log(collection);
   },
   error: function (errorResponse) {
		  console.log(errorResponse);
   }
  });
  
  var ContactView  = Backbone.View.extend( {
	template: _.template($('#table-view').html()),
    
	events: {
		'click #chkbox': 'check'
	},

   render: function(){
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
	});
	var ContactsView = Backbone.View.extend({

		initialize: function(){
			this.collection.on('add', this.addOne, this);
			this.collection.on('reset', this.addAll, this);
		},
	
		addOne: function(contact){
			var contactView = new ContactView({ model: contact });
			this.$el.append(contactView.render().el);
		},
	
		addAll: function(){
			this.collection.forEach(this.addOne, this);
			return this;
		},
	
		render: function(){
			this.addAll();
		}
	
	});
	contactsView = new ContactsView({ collection: stuff}); //creates list view
	$("#mainPanel").append(contactsView.el);
	$(document).ready(function(){
		$("#myInput").on("keyup", function() {
		  var value = $(this).val().toLowerCase();
		  $("#myTable .divRow").filter(function() {
			$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
		  });
		});
	  });

