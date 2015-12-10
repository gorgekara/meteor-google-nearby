nearby = {
	setKey: function (key) {
		this.API = key;
	},
	getPlaces: function (options, callback) {
		var url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/' + (options.output || 'json'),
				places = undefined;

		url += '?location=' + options.lat + ',' + options.lng;
		url += '&radius=' + (options.radius || 500);
		url += '&types=' + (options.types || '');
		url += '&sensor=' + (options.sensor || false);
		url += '&rankBy=' + (options.rankBy || 'prominence');
		url += '&key=' + this.API;

		try {
			var results = HTTP.get(url);
			places = results.data;
		} catch(e) {
			console.log('Could not fetch Google nearby search');
			console.log(e);
		}

		return places;
	}
};