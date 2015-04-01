Template['room'].helpers({
});

Template['room'].events({
  'keypress #sendMessageForm #messageText': function (event) {
    if (event.which !== 13)
      return true;

    var text = event.target.value;

    Messages.insert({
      message: text,
      room: Router.current().params._id
    });

    // Clear form
    event.target.value = '';

    // Prevent default form submit
    return false;
  }
});
