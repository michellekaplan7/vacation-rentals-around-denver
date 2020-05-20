const url = "https://vrad-api.herokuapp.com";

export const getAreas = async () => {
	const response = await fetch("https://vrad-api.herokuapp.com/api/v1/areas");
	const areaData = await response.json();
	return await fetchAreaDetails(areaData);
};

const fetchAreaDetails = (areaList) => {
	const promises = areaList.areas.map(async (area) => {
		const fetchedAreaData = await fetch(url + area.details);
		const response = await fetchedAreaData.json();
		return {
			area: area.area,
			details: area.details,
			id: response.id,
			name: response.name,
			location: response.location,
			about: response.about,
			listings: response.listings,
		};
	});
	return Promise.all(promises);
};

export const fetchListingDetails = (listings) => {
	const promises = listings.map(async (listing) => {
		const fetchedListingData = await fetch(url + listing);
		const response = await fetchedListingData.json();
		return {
			listing_id: response.listing_id,
			name: response.name,
			address: `${response.address.street}, ${response.address.zip}`,
			superhost: response.details.superhost,
			beds: response.details.beds,
			baths: response.details.baths,
			cost_per_night: response.details.cost_per_night,
			features: response.details.features,
		};
	});
	return Promise.all(promises);
};
