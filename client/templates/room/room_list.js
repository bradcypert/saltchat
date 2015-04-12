Template.roomList.helpers({
  rooms: function() {
    return Rooms.find();
  }
});
