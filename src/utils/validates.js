function validateBase64String(base64) {
	const regExp = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;

	return regExp.test(base64);
}

function validateHex(hex) {
	const regExp = /^[-+]?[0-9A-Fa-f]+\.?[0-9A-Fa-f]*?$/;

	return regExp.test(hex);
}

function validateJson(json) {
	try {
		JSON.parse(json);
	}
	catch (err) {
		return false;
	}

	return true;
}

module.exports = {
	validateBase64String,
	validateHex,
	validateJson
};

