_.extend(Backbone.Validation.callbacks, {
    valid: function (view, attr, selector) {
        var $el = view.$('[name=' + attr + ']'), 
            $group = $el.closest('.form-group');
        
        $group.removeClass('has-error');
        $group.find('.help-block').html('').addClass('hidden');
    },
    invalid: function (view, attr, error, selector) {
        var $el = view.$('[name=' + attr + ']'), 
            $group = $el.closest('.form-group');
        
        $group.addClass('has-error');
        $group.find('.help-block').html(error).removeClass('hidden');
    }
});
var SignUpModel = Backbone.Model.extend({
    defaults: {
        terms: false,
        gender: ''
    },
    validation: {
        username: {
            required: true
        },
        email: {
            required: true,
            pattern: 'email'
        },
        password: {
            minLength: 8
        },
        repeatPassword: {
            equalTo: 'password',
            msg: 'The passwords does not match'
        },
        country: {
          oneOf: ['Norway', 'Sweeden']
        },
        gender: {
            required: true
        },
        age: {
            required: false,
            range: [18, 100]
        },
        terms: {
            acceptance: true
        }
    }

    
});

var SignUpForm = Backbone.View.extend({
    events: {
        'click #signUpButton': function (e) {
            e.preventDefault();
            this.signUp();
        }
    },

    initialize: function () {
        Backbone.Validation.bind(this);
    },

    signUp: function () {
        var data = this.$el.serializeObject();
        this.model.set(data);
        if(this.model.isValid(true)){
            // this.model.save();
            alert('Great Success!');
        }
    },
    remove: function() {
        Backbone.Validation.unbind(this);
        return Backbone.View.prototype.remove.apply(this, arguments);
    }
});
$(function () {
    var view = new SignUpForm({
        el: 'form',
        model: new SignUpModel()
    });
});
$.fn.serializeObject = function () {
    "use strict";
    var a = {}, b = function (b, c) {
        var d = a[c.name];
        "undefined" != typeof d && d !== null ? $.isArray(d) ? d.push(c.value) : a[c.name] = [d, c.value] : a[c.name] = c.value
    };
    return $.each(this.serializeArray(), b), a
};