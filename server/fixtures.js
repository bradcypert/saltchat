if(Rooms.find().count() === 0) {
  Rooms.insert({
    name: 'Music',
    private: false,
    faicon: 'music'
  });

  Rooms.insert({
    name: 'Celebrities',
    private: false,
    faicon: 'star'
  });

  Rooms.insert({
    name: 'Politics',
    private: false,
    faicon: 'flag'
  });

  Rooms.insert({
    name: 'Shopping',
    private: false,
    faicon: 'tags'
  });

  Rooms.insert({
    name: 'Space',
    private: false,
    faicon: 'rocket'
  });

  Rooms.insert({
    name: 'Health',
    private: false,
    faicon: 'plus-square'
  });
}
