const validateSid = (prefix, sid) =>
	sid.startsWith(prefix) && sid.length === 34;

module.exports = { validateSid };
