const validateSid = function (prefix, sid) {
  return (sid.startsWith(prefix) &&
    sid.length === 34
  );
};

module.exports = { validateSid };
