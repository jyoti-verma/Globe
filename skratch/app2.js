var Table=Backbone.Model.extend({
    default:{
        employee_name: '',
        employee_salary: '',
        employee_age: '',
        profile_image: ''
    }
});
var Tablecoll=Backbone.Collection.extend({
    url: "http://dummy.restapiexample.com/api/v1/employees",
});
var tablecoll=new Tablecoll();
tablecoll.fetch().then(getdata).catch(dataError);
    function getdata(){
        console.log("data received");
        console.log(tablecoll);
        console.log(tablecoll.at(10).get("employee_name"));
    }
    function dataError(){
        console.log("error data not found");
    }
var TableView  = Backbone.View.extend( {
    template: _.template($('#table-view').html()),
     render: function(){
    this.$el.html(this.template(this.model.toJSON()));
       return this;
        }
        });
        var Tablesview = Backbone.View.extend({
            initialize: function(){
                this.collection.on('add', this.addOne, this);
            },
            events: {
             'click #chkbox': 'check'
            },
        check:function(){
        console.log("success");
        
        },
       addOne: function(data){
       var tableView = new TableView({model:data});
       this.$el.append(tableView.render().el);
            },
        });
        var tablesview = new Tablesview({collection:tablecoll}); //creates list view
        $("#mainPanel").append(tablesview.el);
        $(document).ready(function(){
            $("#myInput").on("keyup", function() {
              var value = $(this).val().toLowerCase();
              $("#myTable .divRow").filter(function() {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
              });
            });
          });