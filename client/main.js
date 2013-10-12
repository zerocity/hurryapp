App = Ember.Application.create();

App.Router.map(function() {
  // put your routes here
});

window.navigator.geolocation.getCurrentPosition(successCallback);

App.IndexRoute = Ember.Route.extend({
  model: function() {


  		


  		url = "http://10.20.30.235/nearbystation/48.20935/16.35576/"
      //Ember.$.getJSON('http://10.20.30.235/nearbystation/'+parseFloat(position.coords.latitude).toFixed(5)+'/'+parseFloat(position.coords.longitude).toFixed(5)+'/').then(function(result) {
      return Ember.$.getJSON(url).then(function(result) {
        return result;
      });
    getCoordinates: window.navigator.geolocation.getCurrentPosition(function(pos) {
        this.set(latitude, pos.coordinates.latitude);
        this.set(longitude, pos.coordinates.longitude);
    });
    latitude: null,
    longitude: null
  }
});
