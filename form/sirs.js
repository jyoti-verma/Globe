		
// In the first few sections, we do all the coding here.
// Later, you'll see how to organize your code into separate
// files and modules.



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

//var employee = Backbone.Model.extend({
	//urlRoot: "http://dummy.restapiexample.com/api/v1/employee/53557"

//});

//this code for single json

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

//this code for multi-line json
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
        // Check to see that the collection has been populated by models.
        console.log('length of this collection: ' + this.length);
        // Log the collection to the console to see if it gets populated correctly.
        // console.log(this);
        return this.models;
		},
        
    });

var stuff = new MyCollection();

stuff.fetch({
	data: JSON.stringify({
		// Change `*****` and `#####` with your own credentials.
		
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
  var viewHtml = '<table border="2">';
  var ContactView  = Backbone.View.extend( {
	className:'record',
	
	template: _.template('<input type="checkbox" id="chkbox" value="true">'+viewHtml +
	 "<tr><th>customer name</th><th>customer salary</th></tr><tr><td><%= employee_name %></td><td><%= employee_salary %></td><td ><%= id %></td></tr>"),
    
	events: {
		'click #chkbox': 'check'
	},

	check: function(empid) {
		 var items=document.getElementsByClassName("record")
		 for (var i = 0; i < items.length; i++) 
			 if (items[i].type == 'checkbox' && items[i].checked == true)
				 selectedItems += items[i].value + "\n";
		 
	alert(items);
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
			this.$el.append("</table>");
		},
	
		render: function(){
			this.addAll();
		}
	
	});


	contactsView = new ContactsView({ collection: stuff}); //creates list view
	$("#mainPanel").append(contactsView.el);

