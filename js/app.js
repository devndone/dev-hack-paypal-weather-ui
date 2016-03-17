App = Ember.Application.create();

App.City = Ember.Object.extend({
  name: '',
  state: '',
  weather: '',

  slug: function() {
    return this.get('name').dasherize();
  }.property('name'),
});

App.City.reopenClass({
  createRecord: function(data) {
    var city = App.City.create({ name: data.name, state: data.state, weather: data.weather });
    return city;
  }
});

App.Router.map(function() {
  this.resource('cities', function() {
    this.route('weather', { path: ':slug' });
  });
});

App.CitiesRoute = Ember.Route.extend({
  model: function() {
    var cityObjects = Ember.A();
    Ember.$.getJSON('http://localhost:3000/cities', function(cities) {
      cities.forEach(function(data) {
        cityObjects.pushObject(App.City.createRecord(data));
      });
    });
    return cityObjects;
  }
});


