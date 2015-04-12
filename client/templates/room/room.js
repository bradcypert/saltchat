chatCollection = new Meteor.Collection(null);

Template.room.helpers({
  rooms: function() {
    return Rooms.find();
  },
  messages: function(){
    return chatCollection.find();
  },
  isMe: function(){
    return Meteor.user().username == this.userId;
  },
  randomColor: function() {
        var int = parseInt(Math.random().toString(16).slice(2, 8));
        return ('000000' + Math.min(int, 11184810)).slice(-6);
  },
  user: function() {
    if(this.userId == Meteor.user().username) {
      return this.userId;
    } else if(this.userId) {
      getUsername(this.userId);
      return Session.get('user-' + this.userId);
    }
  },
  shouldReport: function(){
    return Session.get("shouldReport");
  },
  reportUserName: function(){
    return Session.get("reportUserName");
  }
});

Template.room.events({
  'keydown .chat-input': function(event, template){
    if(event.which === 13){
      var message = template.find(".chat-input").value;
      chatCollection.insert({
        userId: Meteor.user().username,
        message: message
      });

      //Clean the input
      template.find(".chat-input").value = '';

      if(message.substring(0,1) == "/"){
        processHelpCommand(message);
        return;
      }

      GAnalytics.event("message","send");

      //Bundle what gets sent. The Else is just a fallback for server side
      //Support if that's actually needed.
      var bundle;
      if(Meteor.isClient)
        bundle = {message: message, room: window.location.pathname};
      else
        bundle = message;

      chatStream.emit('chat', bundle);
    }
  },

  'click .username': function(event, template){
    var username = event.currentTarget.innerHTML.replace(':','');
    Session.set("reportUserName", username);
    Session.set("shouldReport", true);
  },

  'click .report-user-backdrop': function(){
    Session.set("shouldReport", false);
  },

  'click .close-report-text': function(){
    Session.set("shouldReport", false);
  },

  'click .close': function(){
    Session.set("shouldReport", false);
  },

  'click .fire-off-report': function(){
    var log = $('.chat-window').html();
    Meteor.call('reportUser', Session.get("reportUserName"),log);
    Session.set("shouldReport", false);
  }
});

chatStream.on('chat', function(message) {
  if(message.room === window.location.pathname){
    chatCollection.insert({
      userId: this.userId,
      subscriptionId: this.subscriptionId,
      message: message.message
    });
  }
});
