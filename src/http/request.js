const request = require("superagent");

async function fetchGet(url) {
	const response = await request.get(url).set({ Accept: "application/json" });
	if (response.status !== 200) {
		throw new UnexpectedResponse(response);
	}
	return response;
}

async function fetchPost(url, body) {
	const response = await request.post(url)
	.set({ Accept: "application/json" })
	.set("Content-Type", "application/json")
	.send(JSON.stringify(body));
	if (response.status !== 200) {
		throw new UnexpectedResponse(response);
	}
	return response;
}

module.exports = {
	fetchGet,
	fetchPost
};
