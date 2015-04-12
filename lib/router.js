Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound'
});

var requireLogin = function(){
  if(! Meteor.user()) {
    if(Meteor.loggingIn())
      this.render(this.loadingTemplate);
    else{
      GAnalytics.pageview("/accessDenied");
      this.render('accessDenied');
    }
  }
  else{
    this.next();
  }
}

var emptyChatCollection = function(){
  if(Meteor.isClient)
    chatCollection.remove({});
}

Router.route('/', {
  name: 'home',
  data: function(){
    GAnalytics.pageview("/home");
  }
});
Router.route('/faq', {
  name: 'faq',
  data: function(){
    GAnalytics.pageview("/faq");
  }
});

Router.route('/rooms', {
  name: 'roomList',
  data: function(){
    GAnalytics.pageview("/rooms");
    return Rooms.find();
  }
});

Router.route('/events', {
  name: 'events',
  data: function(){
    GAnalytics.pageview("/events");
    return Events.find();
  }
});

Router.route('/rooms/:_id', {
  name: 'room',
  data: function(){
    emptyChatCollection();
    GAnalytics.pageview(Rooms.findOne({_id: this.params._id}.name));
    return Rooms.findOne({_id: this.params._id});
  }
});


Router.onBeforeAction(requireLogin, {only: 'room'})
