/**
 * Represents Google Places Nearby
 * @constructor
 */
function Nearby() {
  this.searchUrl = 'https://maps.googleapis.com/maps/api/place/autocomplete/';
  this.placeDetailsUrl = 'https://maps.googleapis.com/maps/api/place/details/';
  this.nearbySearchUrl = 'https://maps.googleapis.com/maps/api/place/nearbysearch/';

  this.messages = {
    noAPI: 'Please set API key by using nearby.setKey("API_KEY").',
    noInput: 'Please send autocomplete input. Example: nearby.search("New York")',
    googleError: 'Could not fetch Google nearby search',
    noOptions: 'Please return all required options'
  };
}

/**
 * Sets Google API key - make sure you've enabled Google Places API from the developer console
 * @param {string} key - Valid Google API key
 */
Nearby.prototype.setKey = function (key) {
  this.API = key;
};

/**
 * Uses Google Places Autocomplete to fetch results
 * @param {object} options - All search options
 * @param {string} options.input - The search keyword
 * @param {string} options.output - The output in which results are returned (might be 'xml' or 'json')
 * @param {number} options.radius - The distance (in meters) within which to return place results.
 * @param {string} options.location - The point around which you wish to retrieve place information. Must be specified as latitude,longitude.
 * @param {string} options.offset - is matched against the first word in the input term only.
 * @param {string} options.language - The language in which to return results.
 * @param {string} options.types - The types of place results to return. If no type is specified, all types will be returned.
 * @param {string} options.components - A grouping of places to which you would like to restrict your results.
 */
Nearby.prototype.search = function (options) {
  var url = this.searchUrl + options.output,
      results,
      searchResults,
      content;

  if (!options) {
    return console.log(this.messages.noOptions);
  }

  if (!this.API) {
    return console.log(this.messages.noAPI);
  }

  if (!options.input) {
    return { error: this.messages.noInput };
  }

  delete options.output;
  options.key = this.API;

  try {
    results = HTTP.call('GET', url, { params: options });
    content = JSON.parse(results.content);
    searchResults = content.predictions;

    if (results.data.status === 'REQUEST_DENIED') {
      searchResults = results.data;
    }
  } catch(e) {
    throw new Meteor.Error(500, e);
  }

  return searchResults;
};

/**
 * Gets nearby places
 * @param {object} options - All places options
 * @param {string} options.output - The output in which results are returned (might be 'xml' or 'json')
 * @param {string} options.keyword - The search keyword
 * @param {string} options.location - The coordinaties of the locaiton in this format 'lat,lng'
 * @param {number} options.radius - The distance (in meters) within which to return place results.
 * @param {string} options.types - The types of place results to return. If no type is specified, all types will be returned.
 * @param {string} options.language - The language in which to return results.
 * @param {string} options.minprice - Restricts results to only those places within the specified range.
 * @param {string} options.maxprice - Restricts results to only those places within the specified range.
 */
Nearby.prototype.getPlaces = function (options) {
  var url = this.nearbySearchUrl + options.output,
      results,
      places;

  if (!options) {
    return console.log(this.messages.noOptions);
  }

  if (!this.API) {
    return console.log(this.messages.noAPI);
  }

  delete options.output;
  options.key = this.API;

  try {
    results = HTTP.call('GET', url, { params: options });
    places = results.data;
  } catch(e) {
    throw new Meteor.Error(500, e);
  }

  return places;
};

/**
 * Gets specific place details
 * @param {object} options - All place options
 * @param {string} options.placeid - Specific place id
 * @param {string} options.output - The output in which results are returned (might be 'xml' or 'json')
 */
Nearby.prototype.getPlaceDetails = function (options) {
  var url = this.placeDetailsUrl + (options.output || 'json'),
      results,
      placeDetails;

  if (!options) {
    return console.log(this.messages.noOptions);
  }

  if (!this.API) {
    return console.log(this.messages.noAPI);
  }

  delete options.output;
  options.key = this.API;

  try {
    results = HTTP.call('GET', url, { params: options });
    placeDetails = results.data;
  } catch(e) {
    throw new Meteor.Error(500, e);
  }

  return placeDetails;
 };

nearby = new Nearby();