const chai = require('chai');
const validateSid =
	require('../../src/helpers/validation-helpers.js').validateSid;

describe('validateSid', () => {
	context('when a chat service SID is valid', () => {
		it('returns true', () => {
			const result = validateSid('IS', 'IS12345678901234567890123456789012');
			chai.expect(result).to.be.true;
		});
	});

	context('when a service SID is invalid', () => {
		context('does not start with the correct prefix', () => {
			it('returns false', () => {
				const result = validateSid('IS', 'ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
				chai.expect(result).to.be.false;
			});
		});
		context('is not 34 characters long', () => {
			it('returns false', () => {
				const result = validateSid('IS', 'IS1234567890');
				chai.expect(result).to.be.false;
			});
		});
	});
});
