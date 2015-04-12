getUsername = function(id) {
  Meteor.subscribe('user-info', id);
  Deps.autorun(function() {
    var user = Meteor.users.findOne(id);
    if(user) {
      Session.set('user-' + id, user.username);
    }
  });
}


processHelpCommand = function(command) {
  //TODO: Let's figure out what they could actually want to do here.
}
