nearby = {
	setKey: function (key) {
		this.API = key;
	},
	getPlaces: function (options, callback) {
		var url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/' + (options.output || 'json');
		url += '?location=' + options.lat + ',' + options.lng;
		url += '&radius=' + (options.radius || 500);
		url += '&types=' + (options.types || '');
		url += '&key=' + this.API
		url += '&sensor=' + (options.sensor || false)

		HTTP.call('GET', url, { timeout: 5000 }, callback);
	}
};