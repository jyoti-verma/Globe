var Book = Backbone.Model.extend({});

var Library = Backbone.Collection.extend({});
var library = new Library();
for (i = 0; i <= 10; i++) {
    var books = new Book({ "bookName": "java", "bookAuthor": "James Gosling", "bookType": "ProgrammingLanguage" });
    library.add(books);
}
//console.log(bookCollection);
var CardView = Backbone.View.extend({
    template: _.template($("#card-view").html()),
    className: "col-2 book-brick",
    render: function () {
        console.log("render book view");
        this.$el.html(this.template({ book: this.model.attributes }));
        return this;
    },
    events: {
        "click #remove-book": "removeBook",
        "click #edit-book" : "editBook"
        
    },
    removeBook: function () {
        console.log("remove event fire");
       console.log(this.model);
        library.remove(this.model);
        console.log(library);
        listView.render();
    },
    editBook:function(){
        var addBookView = new AddBookView();
        addBookView.render();
        var Name =this.$(".name").html();
        var Author =this.$(".author").html();
        var Type =this.$(".type").html();
       $("#BookName").val(Name);
       $("#BookAuthor").val(Author);
      $("#BookType").val(Type);
      $("#add-book").hide();
      $("#update-book").show();
        
    }
});
//var cardview=new CardView({model:bookCollection})

var ListView = Backbone.View.extend({
    el: "#books-container",
    className: "",
    template: _.template($("#book-list").html()),
    render: function () {
        // console.log("render list view");
        // console.log(this.bookCollection);
        // console.log(this.collection);

        this.$el.html(this.template());
        var self = this;
        _.each(this.collection.models, function (bookModel) {
            //    console.log(bookModel);
            var cardview = new CardView({ model: bookModel });
            cardview.render();
            self.$el.append(cardview.$el);
        });
    }
});
var listView = new ListView({ collection: library });
listView.render();

var AddBookView = Backbone.View.extend({
    el: ".container",
    template: _.template($("#add-book").html()),
    render: function () {
        this.$el.html(this.template());
    },
    events: {
        "click #add-book": "addBook",
        "click #update-book": "updateBook"
    },
    addBook: function (event) {
        event.preventDefault();
        var bookName = $("#BookName").val();
        var bookAuthor = $("#BookAuthor").val();
        var bookType = $("#BookType").val();
        var newModel = {
            "bookName":bookName,
            "bookAuthor":bookAuthor,
            "bookType":bookType
        };
        console.log(newModel);
        library.add(newModel);
        console.log("succesfull add");
        console.log(library);
        var listView = new ListView({ collection: library });
        listView.render();
    },
    updateBook:function(event){
        event.preventDefault();
        var bookName = $("#BookName").val();
        var bookAuthor = $("#BookAuthor").val();
        var bookType = $("#BookType").val();
      books.set({"bookName": bookName,"bookAuthor":bookAuthor,"bookType":bookType});
        console.log("book updated");
        console.log(books.previousAttributes());
        console.log(books.changedAttributes());
      
    }
});

var NavView = Backbone.View.extend({
    el: "#navView",
    template: _.template($("#nav-view").html()),
    render: function () {
        this.$el.html(this.template());
    },
    events: {
        "click #add-new-book": "addNewBook"
        
    },
    addNewBook: function () {
        var addBookView = new AddBookView({collection: library});
        addBookView.render();
    },
   
});
var navView = new NavView();
navView.render()

