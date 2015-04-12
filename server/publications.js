Meteor.publish('rooms', function() {
  return Rooms.find();
});

Meteor.publish("user-info", function(id) {
  return Meteor.users.find({_id: id}, {fields: {username: 1}});
});
