const url = "https://vrad-api.herokuapp.com";

export const getAreas = () => {
	return fetch("https://vrad-api.herokuapp.com/api/v1/areas")
		.then((response) => response.json())
		.then((data) => fetchAreaDetails(data.areas))
		.catch((err) => console.log(err));
};

const fetchAreaDetails = (areaList) => {
	const promises = areaList.map((area) => {
		return fetch(url + area.details)
			.then((response) => response.json())
			.then((details) => {
				return {
					area: area.area,
					details: area.details,
					id: details.id,
					name: details.name,
					location: details.location,
					about: details.about,
					listings: details.listings,
				};
			});
	});
	return Promise.all(promises);
};

export const fetchListingDetails = (listings) => {
	const promises = listings.map((listing) => {
		return fetch(url + listing)
			.then((response) => response.json())
			.then((info) => {
				return {
					listing_id: info.listing_id,
					name: info.name,
					address: `${info.address.street}, ${info.address.zip}`,
					superhost: info.details.superhost,
					beds: info.details.beds,
					baths: info.details.baths,
					cost_per_night: info.details.cost_per_night,
					features: info.details.features,
				};
			});
	});
	return Promise.all(promises);
};
