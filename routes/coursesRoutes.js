Router.route('/courses/:_id', {
    'name': 'courses',
    'action': function() {
      var room = Rooms.find({course: this.params._id}, {limit: 1}).fetch();
      SEO.set({title: 'Room ' + room.name + ' | ' + Meteor.App.NAME});
      this.render('room', {
        waitOn: function() {
          return [Meteor.subscribe('messages', room._id),
                  Meteor.subscribe('questions', room._id)];
        },
        data: function() {
          return {
            messages: Messages.find({room: room._id}),
            questions: Questions.find({room: room._id})
          }
        }
      });
    }
  }
);

Router.route('/rooms/:_id', {
    'name': 'rooms',
    'action': function() {
      var room = Rooms.findOne(this.params._id);
      SEO.set({title: 'Room ' + room.name + ' | ' + Meteor.App.NAME});
      this.render('room', {
        waitOn: function() {
          return [Meteor.subscribe('messages', this.params._id),
                  Meteor.subscribe('questions', this.params._id)];
        },
        data: function() {
          return {
            messages: Messages.find({room: this.params._id}),
            questions: Questions.find({room: this.params._id})
          }
        }
      });
    }
  }
);
