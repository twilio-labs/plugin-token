const chai = require('chai');
const sinon = require('sinon');
const Twilio = require('twilio');

const createToken = require('../../src/helpers/accessToken.js');

const expect = chai.expect;

describe('createToken', () => {
	let sandbox;
	let tokenGeneratorStub;
	let exitStub;
	let envStub;

	beforeEach(() => {
		sandbox = sinon.createSandbox();
		envStub = sandbox.stub(process, 'env').value({});
		exitStub = sandbox.stub(process, 'exit');
		tokenGeneratorStub = {
			twilioClient: {
				accountSid: 'ACxxxx',
				username: 'test',
				password: '12345',
			},
			logger: {
				error: () => '',
			},
			flags: {},
		};
	});

	afterEach(() => {
		sandbox.restore();
	});

	context(
		'when account sid and username on the twilio client are equal',
		() => {
			it('exits with an error', () => {
				tokenGeneratorStub.twilioClient.username =
					tokenGeneratorStub.twilioClient.accountSid;
				createToken.call(tokenGeneratorStub);
				sinon.assert.calledWith(exitStub, 1);
			});
		},
	);

	context(
		'when account sid and username on the twilio client are not equal',
		() => {
			it('returns a valid token', () => {
				token = createToken.call(tokenGeneratorStub);
				sinon.assert.notCalled(exitStub);
				expect(token).to.be.an.instanceOf(Twilio.jwt.AccessToken);
			});
		},
	);

	context('when --ttl flag is set', () => {
		context('and its more than 24 hours', () => {
			it('exits with an error', () => {
				tokenGeneratorStub.flags.ttl = 172800; // 48h in seconds
				createToken.call(tokenGeneratorStub);
				sinon.assert.calledWith(exitStub, 1);
			});
		});
		context('and its less than 24 hours', () => {
			it('exits with an error', () => {
				tokenGeneratorStub.flags.ttl = 3600; // 1h in seconds
				createToken.call(tokenGeneratorStub);
				sinon.assert.notCalled(exitStub);
				expect(token).to.be.an.instanceOf(Twilio.jwt.AccessToken);
			});
		});
	});
});
