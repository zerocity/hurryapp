App = Ember.Application.create();

App.CurrentPosition = Ember.Object.create({
  latitude :'',
  longitude : '',
  setPosition: function(){
    navigator.geolocation.getCurrentPosition(function(pos) {
      App.CurrentPosition.set('latitude',pos.coords.latitude);
      App.CurrentPosition.set('longitude',pos.coords.longitude);
    }); 
  }
});

App.Router.map(function() {
  // put your routes here
});

App.IndexRoute = Ember.Route.extend({
  beforeModel: function(transition) {
    App.CurrentPosition.setPosition()
  },
  getNearbyStations: function() {
    var that = this;
    if (App.CurrentPosition.get('latitude') && App.CurrentPosition.get('longitude')) {
      url = "http://10.20.30.235:3000/nearbystation/"+App.CurrentPosition.get('latitude')+"/"+App.CurrentPosition.get('longitude')+"/"
      console.log(url);
      Ember.$.getJSON(url).then(function(result){that.set('model', result); console.log(Date.now(),result); });
    }

    console.log(that.get('model'));

  }.observes('App.CurrentPosition.latitude', 'App.CurrentPosition.longitude')
});

    /*
  model: function() {      
    console.log('2 ',App.CurrentPosition)
    url = "http://10.20.30.235:3000/nearbystation/48.20935/16.35576/"
    url2 = "http://10.20.30.235:3000/nearbystation/"+App.CurrentPosition.get('latitude')+"/"+App.CurrentPosition.get('longitude')+"/"
    console.log(url2);
    //Ember.$.getJSON('http://10.20.30.235/nearbystation/'+parseFloat(position.coords.latitude).toFixed(5)+'/'+parseFloat(position.coords.longitude).toFixed(5)+'/').then(function(result) {
    return Ember.$.getJSON(url).then(function(result) {
      return result;
    });
  },*/