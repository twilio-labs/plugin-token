const chai = require('chai')
const sinon = require('sinon');
const Twilio = require('twilio');

const createToken = require('../../src/helpers/accessToken.js');

const expect = chai.expect;

describe('createToken', function() {
  let sandbox, tokenGeneratorStub, exitStub, envStub;

  beforeEach(function () {
    sandbox = sinon.createSandbox();
    envStub = sandbox.stub(process, 'env').value({});
    exitStub = sandbox.stub(process, "exit");
    tokenGeneratorStub = {
      twilioClient: {
        accountSid: 'ACxxxx',
        username: 'test',
        password: '12345'
      },
      logger: {
        error: () => '',
      },
      flags: {}
    };
  });

  afterEach(function () {
    sandbox.restore();
  });

  context('when TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN env vars are set', function() {
    env = {
      TWILIO_ACCOUNT_SID: 'ACxxxx',
      TWILIO_AUTH_TOKEN: '123asd'
    };
    context('and TWILIO_API_KEY and TWILIO_API_SECRET env vars are not set', function() {
      context('and --profile flag was not provided', function() {
        it('exits with an error', function() {
          envStub.value(env);
          createToken.call(tokenGeneratorStub);
          sinon.assert.calledWith(exitStub, 1);
        });
      });

      context('and --profile flag was provided', function() {
        it('returns a valid token', function() {
          envStub.value(env);
          tokenGeneratorStub.flags.profile = true;
          token = createToken.call(tokenGeneratorStub);
          sinon.assert.notCalled(exitStub);
          expect(token).to.be.an.instanceOf(Twilio.jwt.AccessToken);
        });
      });
    });

    context('and TWILIO_API_KEY and TWILIO_API_SECRET env vars are set', function() {
      it('returns a valid token', function() {
        envStub.value({
          ...env,
          TWILIO_API_KEY: 'SKxxxx',
          TWILIO_API_SECRET: 'asd123'
        });
        token = createToken.call(tokenGeneratorStub);
        sinon.assert.notCalled(exitStub);
        expect(token).to.be.an.instanceOf(Twilio.jwt.AccessToken);
      });
    });

    context('and TWILIO_API_KEY or TWILIO_API_SECRET env vars are not set', function() {
      it('exits with an error', function() {
        envStub.value({
          ...env,
          TWILIO_API_KEY: 'SKxxxx',
        });
        createToken.call(tokenGeneratorStub);
        sinon.assert.calledWith(exitStub, 1);
        envStub.value({
          ...env,
          TWILIO_API_SECRET: 'asd123',
        });
        createToken.call(tokenGeneratorStub);
        sinon.assert.calledWith(exitStub, 1);
      });
    });
  });

  context('when TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN env vars are not set', function() {
    it('returns a valid token', function() {
      token = createToken.call(tokenGeneratorStub);
        sinon.assert.notCalled(exitStub);
        expect(token).to.be.an.instanceOf(Twilio.jwt.AccessToken);
    });
  });

  context('when --ttl flag is set', function() {
    context('and its more than 24 hours', function() {
      it('exits with an error', function() {
        tokenGeneratorStub.flags.ttl = 172800; // 48h in seconds
        createToken.call(tokenGeneratorStub);
        sinon.assert.calledWith(exitStub, 1);
      });
    });
    context('and its less than 24 hours', function() {
      it('exits with an error', function() {
        tokenGeneratorStub.flags.ttl = 3600; // 1h in seconds
        createToken.call(tokenGeneratorStub);
        sinon.assert.notCalled(exitStub);
        expect(token).to.be.an.instanceOf(Twilio.jwt.AccessToken);
      });
    });
  });
});
