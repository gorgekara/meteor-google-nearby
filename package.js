Package.describe({
  name: 'gorgekara:google-nearby',
  version: '0.0.3',
  summary: 'Calls Google Nearby API',
  git: 'https://github.com/gorgekara/meteor-google-nearby',
  documentation: 'README.md'
});

Package.onUse(function (api) {
  api.versionsFrom('1.0.4.1');
  api.use('http', 'server');
  api.addFiles('google_nearby.js', 'server');
  api.export('nearby', 'server');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('gorgekara:google-nearby');
  api.addFiles('google_nearby.test.js');
});
