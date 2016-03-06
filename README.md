# About
Nearby uses [Google Places API](https://developers.google.com/maps/documentation/javascript/places) to retreive nearby locations.

# Installation
```
meteor add gorgekara:google-nearby
```

# Usage (on server only)

You'll have to set your Google API key first. Also make sure you have the correct API enabled (Google Places API Web Service) in the Google Developers Console

```
nearby.setKey('API_KEY');
```

To get the nearby places you can use ```getPlaces```. For more information on the options that can be sent check out the [Google Docs](https://developers.google.com/places/web-service/search?hl=en).

```
options = {
  keyword: 'cafe'
  location: 'lat,lng',
  types: 'food|cafe',
  rankBy: 'distance',
  language: 'fr',
  minprice: 0,
  maxprice: 100,
  radius: 100,
  sensor: false,
  output: 'json' // or xml
};

places = nearby.getPlaces(options);
```

Get details for single place

```
// Make sure you have set api key first
options = {
  placeid: '123',
  output: 'json' // or xml
};

placeDetails = nearby.getPlaceDetails(options);
```

Search for places (autocomplete) - Check [Google Docs](https://developers.google.com/places/web-service/autocomplete?hl=en) for more info.

```
// Make sure you have set api key first
options = {
  input: 'New York',
  radius: 10000,
  location: 'lat,lng', // location coordinates
  offset: 3,
  language: 'fr',
  types: 'food',
  components: 'country:fr',
  output: 'json' // or xml
};

searchData = nearby.search(options);
```
