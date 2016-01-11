nearby = {
	setKey: function (key) {
		this.API = key;
	},
	search: function (options) {
		var url = 'https://maps.googleapis.com/maps/api/place/autocomplete/' + (options.output || 'json'),
				msg = 'Please send autocomplete input. Example: nearby.search("New York")',
				searchResults;
				
		if (!options.input) {
			return { error: msg };
		}

		if (!this.API) {
			console.log('Please set API key by using nearby.setKey("API_KEY").');
			return;
		}

		url += '?input=' + options.input;
		url += '&key=' + this.API;
		url += '&radius=' + (options.radius || '');
		url += '&location=' + (options.location || '');
		url += '&offset=' + (options.offset || '');
		url += '&language=' + (options.language || '');
		url += '&types=' + (options.types || '');
		url += '&components=' + (options.components || '');

		try {
			var results = HTTP.get(url);
			if (results.content) {
				searchResults = JSON.parse(results.content).predictions;
			}
		} catch(e) {
			console.log('Could not fetch Google search results');
			console.log(e);
		}

		return searchResults;
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