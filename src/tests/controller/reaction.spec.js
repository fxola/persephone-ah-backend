import chai from 'chai';
import chaiHttp from 'chai-http';
import sinonChai from 'sinon-chai';
import { getArticleData, getUser } from '../utils/db.utils';
import app from '../../index';

chai.use(chaiHttp);
chai.use(sinonChai);
const { expect } = chai;

let userToken;
let secondUserToken;
let firstArticle;
let secondArticle;

describe('Articles Reactions API endpoints', () => {
  before(done => {
    const randomUser = getUser();
    chai
      .request(app)
      .post(`${process.env.API_VERSION}/users/signup`)
      .send(randomUser)
      .end((error, response) => {
        userToken = response.body.data.token;
        done();
      });
  });

  before(done => {
    const secondRandomUser = getUser();
    chai
      .request(app)
      .post(`${process.env.API_VERSION}/users/signup`)
      .send(secondRandomUser)
      .end((error, response) => {
        secondUserToken = response.body.data.token;
        done();
      });
  });
  before(done => {
    chai
      .request(app)
      .post(`${process.env.API_VERSION}/articles`)
      .send(getArticleData())
      .set({ Authorization: `Bearer ${userToken}` })
      .end((error, response) => {
        firstArticle = response.body.data;
        done();
      });
  });

  before(done => {
    chai
      .request(app)
      .post(`${process.env.API_VERSION}/articles`)
      .send(getArticleData())
      .set({ Authorization: `Bearer ${secondUserToken}` })
      .end((error, response) => {
        secondArticle = response.body.data;
        done();
      });
  });

  it('Should allow a user like an article successfully ', done => {
    chai
      .request(app)
      .get(`${process.env.API_VERSION}/articles/${firstArticle.id}/reactions`)
      .set({ Authorization: `Bearer ${userToken}` })
      .end((error, response) => {
        expect(response.status).to.equal(200);
        expect(response).to.be.an('Object');
        expect(response.body).to.have.property('status');
        expect(response.body).to.have.property('data');
        expect(response.body.status).to.equal('success');
        expect(response.body.data.message).to.equal(
          'You have liked this article successfully'
        );
        done();
      });
  });

  it('Should allow a user like another article successfully ', done => {
    chai
      .request(app)
      .get(`${process.env.API_VERSION}/articles/${secondArticle.id}/reactions`)
      .set({ Authorization: `Bearer ${userToken}` })
      .end((error, response) => {
        expect(response.status).to.equal(200);
        expect(response).to.be.an('Object');
        expect(response.body).to.have.property('status');
        expect(response.body).to.have.property('data');
        expect(response.body.status).to.equal('success');
        expect(response.body.data.message).to.equal(
          'You have liked this article successfully'
        );
        done();
      });
  });

  it('Should allow another user like an article successfully ', done => {
    chai
      .request(app)
      .get(`${process.env.API_VERSION}/articles/${firstArticle.id}/reactions`)
      .set({ Authorization: `Bearer ${secondUserToken}` })
      .end((error, response) => {
        expect(response.status).to.equal(200);
        expect(response).to.be.an('Object');
        expect(response.body).to.have.property('status');
        expect(response.body).to.have.property('data');
        expect(response.body.status).to.equal('success');
        expect(response.body.data.message).to.equal(
          'You have liked this article successfully'
        );
        done();
      });
  });

  it('Should allow user dislike an article successfully ', done => {
    chai
      .request(app)
      .get(`${process.env.API_VERSION}/articles/${firstArticle.id}/reactions`)
      .set({ Authorization: `Bearer ${userToken}` })
      .end((error, response) => {
        expect(response.status).to.equal(200);
        expect(response).to.be.an('Object');
        expect(response.body).to.have.property('status');
        expect(response.body).to.have.property('data');
        expect(response.body.status).to.equal('success');
        expect(response.body.data.message).to.equal(
          'You have disliked this article successfully'
        );
        done();
      });
  });
});
