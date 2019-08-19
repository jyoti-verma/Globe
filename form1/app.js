var NavView = Backbone.View.extend({
    el: ".container-fluid",
    template: _.template($("#nav-view").html()),
    render: function () {
        this.$el.html(this.template());
    },
});

var navView = new NavView();
navView.render();

var FormView = Backbone.View.extend({
    el: ".form",
    template: _.template($("#form-view").html()),
    render: function (){
        this.$el.html(this.template());
    },
});
var formView = new FormView();
formView.render();

$(".submit").click(function(event){
    event.preventDefault();
    var email = $("#Email").val();
    var password = $("#Password").val();
    var address = $("#inputAddress").val();
    var address2 = $("#inputAddress2").val();
    var city = $("#inputCity").val();
    var zip = $("#inputZip").val();
    var check =$("#Check").val();

  var data={email,password,address,address2,city,zip,check}
  var convertJson=JSON.stringify(data);
  alert(convertJson);
  console.log(convertJson);
  var formModel = new FormModel({collection:convertJson})
  formModel.render();
});

var FormModel = Backbone.Model.extend({});

