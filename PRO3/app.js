var Book = Backbone.Model.extend({});

var Library = Backbone.Collection.extend({});
var library = new Library();
var book1 = new Book({
    "bookName": "JAVA",
    "bookAuthor": "James Gosling",
    "bookType": "ProgrammingLanguage",
    "image": "java.jpg"
});
var book2 = new Book({
    "bookName": "C++",
    "bookAuthor": "Bjarne Stroustrup",
    "bookType": "ProgrammingLanguage",
    "image": "C++.jpg"
});
var book3 = new Book({
    "bookName": "PHP",
    "bookAuthor": "Rasmus Lerdorf",
    "bookType": "ProgrammingLanguage",
    "image": "PHP.jpg"
});
var book4 = new Book({
    "bookName": "BACKBONEJS",
    "bookAuthor": "Jeremy Ashkenas",
    "bookType": "ProgrammingLanguage",
    "image": "backbone.jpg"
});
var books = [book1, book2, book3, book4];

library.add(books);
console.log(library);

var CardView = Backbone.View.extend({
    template: _.template($("#card-view").html()),
    render: function () {
        console.log("render book view");
        this.$el.html(this.template({
            book: this.model.attributes
        }));
    },
    events: {
        "click #remove-book": "removeBook",
        "click #edit-book": "editBook",
        "click #imgClick": "imgClick"

    },
    imgClick: function () {
        var imgView = new ImgView({
            model: this.model.attributes
        });
        imgView.render();
    },
    removeBook: function () {
        console.log("remove event fire");
        console.log(this.model);
        library.remove(this.model);
        console.log(library);
        listView.render();
    },
    editBook: function () {
        var addBookView = new AddBookView();
        addBookView.render();
        var Name = this.$(".name").html();
        var Author = this.$(".author").html();
        var Type = this.$(".type").html();
        $("#BookName").val(Name);
        $("#BookAuthor").val(Author);
        $("#BookType").val(Type);
        $("#add-book").hide();
        $("#update-book").show();
        $("#msg").hide();
    }
});
//var cardview=new CardView({model:library})

var ListView = Backbone.View.extend({
    el: "#books-container",
    template: _.template($("#book-list").html()),
    render: function () {
        // console.log("render list view");
        // console.log(this.library);
        // console.log(this.collection);
        this.$el.html(this.template());
        var self = this;
        _.each(this.collection.models, function (bookModel) {
            //    console.log(bookModel);

            var cardview = new CardView({
                model: bookModel
            });
        
            cardview.render()
            self.$el.append(cardview.$el);
          
        });

    }
});
var listView = new ListView({
    collection: library
});
listView.render();

var AddBookView = Backbone.View.extend({
    model:books,
    el: "#books-container",
    template: _.template($("#add-book").html()),
    render: function () {
        this.$el.html(this.template());
    },
    events: {
        "click #add-book": "addBook",
        "click #update-book": "updateBook",
    },

    addBook: function (event) {
        event.preventDefault();
        $("#msg").show("slow");
        $("#msg").hide("slow");
        var bookName = $("#BookName").val();
        var bookAuthor = $("#BookAuthor").val();
        var bookType = $("#BookType").val();
        var image = $("#myFile").val();
        var newModel = new Book({
            "bookName": bookName,
            "bookAuthor": bookAuthor,
            "bookType": bookType,
            "image": image,
        });
        console.log(newModel);
        library.add(newModel);
       //library.update(newModel);
        console.log("succesfull add");
        listView.render();
        $(".fade").hide();
    },
    updateBook: function (event) {
       
        event.preventDefault();
        var bookName = this.$("#BookName").val();
        var bookAuthor = this.$("#BookAuthor").val();
        var bookType = this.$("#BookType").val();
        console.log(this.model[0]);
        this.model[0].set({
            "bookName": bookName,
            "bookAuthor": bookAuthor,
            "bookType": bookType
        });
        console.log("book updated");
        console.log(this.model[0].previousAttributes());
        console.log(this.model[0].changedAttributes());
        listView.render();
        $(".fade").hide();
    }
});

var ImgView = Backbone.View.extend({
    el: ".imgBox",
    template: _.template($("#img-click").html()),
    render: function () {
        this.$el.html(this.template({
            book: this.model
        }));
    },
});

var NavView = Backbone.View.extend({
    el: "#navView",
    template: _.template($("#nav-view").html()),
    render: function () {
        this.$el.html(this.template());
    },
    events: {
        "click #add-new-book": "addNewBook",
        "click #category1": "dropDown",
        "click #category2": "graph"
    },
    graph: function () {
        var graphView = new Graph();
        graphView.render();
    },
    dropDown: function () {
        var listView = new ListView({
            collection: library
        });
        listView.render();

    },
    addNewBook: function (event) {
        event.preventDefault();
        var addBookView = new AddBookView();
        addBookView.render();
        $("#add-book").show();
        $("#update-book").hide();
        $("#msg").hide();
     
    },

});
var navView = new NavView();
navView.render()

var Graph = Backbone.View.extend({
    el: "#books-container",
    template: _.template($("#graph-view").html()),
    render: function () {
        this.$el.html(this.template());
        var chart = new CanvasJS.Chart("chartContainer",{
            animationEnabled: true,
            title: {
                text: "Library Popularity chart"
            },
            data: [{
                type: "column", //change it to line, area, bar, pie, etc
                legendText: "Library Popularity chart varying according year",
                showInLegend: true,
                dataPoints: [
                    {x:2011, y: 10},
                    {x:2012, y: 6 },
                    {x:2013, y: 14 },
                    {x:2014, y: 12 },
                    {x:2015, y: 19 },
                    {x:2016, y: 14 },
                    {x:2017, y: 26 },
                    {x:2018, y: 10 },
                    {x:2019, y: 22 }
                ]
            }]
        });
        chart.render();
    }
});


