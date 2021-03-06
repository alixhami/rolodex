import Backbone from 'backbone';
import _ from 'underscore';
import $ from 'jquery';
import ContactView from './contact_view.js';
import ContactDetailsView from './contact_details_view.js';
import Contact from '../models/contact.js';

var RolodexView = Backbone.View.extend({
  initialize: function (params) {
    this.template = params.template;
    this.listenTo(this.model, "update", this.render);
  },
  render: function() {
    this.$('#contact-cards').empty();
    var that = this;
    this.model.each(function (contact) {
      var contactView = new ContactView({
        model: contact,
        template: that.template,
        tagName: 'li'
      });
      that.$("#contact-cards").append(contactView.render().el);
      that.listenTo(contactView, "showCard", that.showCard);
    });
    return this;
  },
  events: {
    "click .btn-save" : "addContact",
    "click .btn-cancel" : "clearForm",
    "click" : "hideDetails"
  },
  clearForm: function () {
    this.$("input[name=name]").val('');
    this.$("input[name=email]").val('');
    this.$("input[name=phone]").val('');
  },
  getFormData: function () {
    var name = this.$("input[name=name]").val();
    var email = this.$("input[name=email]").val();
    var phoneNumber = this.$("input[name=phone]").val();
    this.clearForm();

    return {
      name: name,
      email: email,
      phoneNumber: phoneNumber
    };
  },
  addContact: function() {
    var contact = new Contact(this.getFormData());
    this.model.add(contact);
  },
  showCard: function (event) {
    var contactDetailsView = new ContactDetailsView({
      model: event.model,
      el: '#contact-details'
    });
    contactDetailsView.render();
    return this;
  },
  hideDetails: function () {
    $('#contact-details').hide();
  }
});

export default RolodexView;
