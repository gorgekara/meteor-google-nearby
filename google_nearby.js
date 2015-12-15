nearby = {
	setKey: function (key) {
		this.API = key;
	},
	getPlaceDetails: function (options, callback) {
		var url = 'https://maps.googleapis.com/maps/api/place/details/' + (options.output || 'json'),
				placeDetails;

		if (!this.API) {
			console.log('Please set API key by using nearby.setKey("API_KEY").');
			return;
		}

		url += '?placeid=' + (options.placeId || '');
		url += '&key=' + this.API;

		try {
			var results = HTTP.get(url);
			placeDetails = results.data;
		} catch(e) {
			console.log('Could not fetch Google nearby search');
			console.log(e);
		}

		return placeDetails;
	},
	getPlaces: function (options, callback) {
		var url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/' + (options.output || 'json'),
				places;

		if (!this.API) {
			console.log('Please set API key by using nearby.setKey("API_KEY").');
			return;
		}

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