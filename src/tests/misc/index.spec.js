import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';

const { expect } = chai;

chai.use(chaiHttp);

describe('GET /', () => {
  it('Should return `Welcome to Authors Haven`', done => {
    chai
      .request(app)
      .get('/')
      .end((error, response) => {
        expect(response.status).to.equal(200);
        expect(response).to.be.an('Object');
        expect(response.body).to.have.property('status');
        expect(response.body.message).to.equal(`Welcome to Author's Haven`);
        done();
      });
  });
});
