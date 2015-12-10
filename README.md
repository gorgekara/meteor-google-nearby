# About
Nearby users [Google Places API](https://developers.google.com/maps/documentation/javascript/places) to retreive nearby locations.

# Installation
```
meteor add gorgekara:google-nearby
```

# Usage (on server only)

```
// Have to set your Google API key first
// Also make sure you have the correct API enabled (Google Places API Web Service) in the Google Developers Console
nearby.setKey('AIzaSyCNI3V4xImkA1Kzi89qNvHWJ7qUW6aHVn0');

options = {
  lat: '123',
  lng: '321',
  types: 'food|cafe',
  rankBy: 'distance',
  radius: 100,
  sensor: false,
  output: 'json' // or xml
};

places = nearby.getPlaces(options);
```