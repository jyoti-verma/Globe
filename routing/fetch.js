var blog = Backbone.Model.extend({
    defaults: {
        author: '',
       title: '',
       url: ''
	}

});

var blogs=Backbone.Collection.extend({});

/*var blog1=new blog({
    author:'jyoti',
    title:'jyoti blog',
    url:'//http:dummyurl.com'
});

var blog2=new blog({
    author:'shikha',
    title:'shikha blog',
    url:'//http:dummyurl2.com'
});*/ 

var blogs1=new blogs(); 

//for one blog
var blogview=Backbone.View.extend({
model:new blog(),
tagName:'tr',
initialize:function(){
    this.template=_.template($('.blog-list-tamplate').html());
},
events:{
    'click .edit-blog':'edit',
    'click .update-blog':'update',
    'click .delete-blog':'delete',
    'click .cancel-blog':'cancel',
},
edit:function(){
    $('.edit-blog').hide();
    $('.delete-blog').hide();
   this.$('.update-blog').show();
   this.$('.cancel-blog').show();
 
    var author =this.$('.author').html();
    var title =this.$('.title').html();
    var url =this.$('.url').html();

    this.$('.author').html('<input type="text" class="form-control author-update" value="'+author+'">');
    this.$('.title').html('<input type="text" class="form-control title-update" value="'+title+'">');
    this.$('.url').html('<input type="text" class="form-control url-update" value="'+url+'">');
},
update:function(){
this.model.set('author', $('.author-update').val());
this.model.set('title', $('.title-update').val());
this.model.set('url', $('.url-update').val());
},
cancel:function(){
    Blogsview.render(); 
},
delete:function(){
this.model.destroy();
},
render:function(){
this.$el.html(this.template(this.model.toJSON()));
return this;
},

});
 //for all blog
var blogsview=Backbone.View.extend({
model:blogs1,
el:$('.blog-list'),
initialize:function(){
    var self=this;
    this.model.on('add',this.render,this);
    this.model.on('change',function(){
        setTimeout(function(){
        self.render();
        },30);
    },this);
    this.model.on('remove', this.render,this);
},
render:function(){
    var self=this;
    this.$el.html('');
    _.each(this.model.toArray(), function(blogg){
     self.$el.append((new blogview({model:blogg})).render().$el);
    });

}
});
var Blogsview= new blogsview();

$(document).ready(function(){
    $('.add-blog').on('click',function(){
        var Blog=new blog({
            author:$('.author-input').val(),
            title:$('.title-input').val(),
            url:$('.url-input').val(),
        });
        $('.author-input').val('');
        $('.title-input').val('');
        $('.url-input').val('');
        console.log(Blog.toJSON());
        blogs1.add(Blog)
    });
});

