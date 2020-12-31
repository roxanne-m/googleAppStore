const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../app');

describe('GooglePlaystore testing', () => {
  it('should return a message from GET /', () => {
    return supertest(app)
      .get('/')
      .expect(200, 'Google Playstore Apps Assignment');
  });

  it('should return an array of at least 1, a json response, and all keys', () => {
    return supertest(app)
      .get('/apps')
      .expect(200)
      .expect('Content-type', /json/)
      .then((res) => {
        expect(res.body).to.be.an('array');
        expect(res.body).to.have.lengthOf.at.least(1);
        const googleApps = res.body[0];
        expect(googleApps).to.include.all.keys(
          'App',
          'Category',
          'Rating',
          'Reviews',
          'Size',
          'Installs',
          'Type',
          'Price',
          'Content Rating',
          'Genres',
          'Last Updated',
          'Current Ver',
          'Android Ver'
        );

      });
  });

  
});
