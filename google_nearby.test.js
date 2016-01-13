Tinytest.add('Setting API key works (BAD)', function (test) {
  nearby.setKey('TestKey');
  test.equal('TestKey', nearby.API);
});

Tinytest.add('Autocomplete search with BAD API key should throw error', function (test) {
  var data = nearby.search({
    input: 'New York',
    output: 'json',
    radius: 1000
  });
  test.equal('REQUEST_DENIED', data.status);
});

Tinytest.add('Nearby places search with BAD API key should throw error', function (test) {
  var data = nearby.getPlaces({
    location: '11,12',
    output: 'json',
    radius: 1000
  });
  test.equal('REQUEST_DENIED', data.status);
});

Tinytest.add('Setting API key works (WORKING)', function (test) {
  nearby.setKey('AIzaSyCNI3V4xImkA1Kzi89qNvHWJ7qUW6aHVn0');
  test.equal('AIzaSyCNI3V4xImkA1Kzi89qNvHWJ7qUW6aHVn0', nearby.API);
});

Tinytest.add('Autocomplete search with WORKING API key should work', function (test) {
  var data = nearby.search({
    input: 'New York',
    output: 'json',
    radius: 1000
  });
  test.notEqual('REQUEST_DENIED', data.status);
});

Tinytest.add('Nearby places search with WORKING API key should work', function (test) {
  var data = nearby.getPlaces({
    location: '11,12',
    output: 'json',
    radius: 1000
  });
  console.log(data);
  test.notEqual('REQUEST_DENIED', data.status);
});

Tinytest.add('Autocomplete search without any input should not work', function (test) {
  var data = nearby.search({
    output: 'json',
    radius: 1000
  });
  test.notEqual(undefined, data.error);
});

Tinytest.add('Place details should throw error for bad place id', function (test) {
  var data = nearby.getPlaceDetails({
    placeid: '0',
    output: 'json'
  });
  test.equal('INVALID_REQUEST', data.status);
});

Tinytest.add('Place details should work with correct place id', function (test) {
  var data = nearby.getPlaceDetails({
    placeid: 'ChIJySeMLBToJg4RSWm2vVxsRQ0',
    output: 'json'
  });
  console.log(data);
  test.notEqual('INVALID_REQUEST', data.status);
});