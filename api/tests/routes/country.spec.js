/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Recipe, conn } = require('../../src/db.js');

const agent = session(app);
const recipe = {
  title: 'Milanea a la napolitana',
  image: 'https://i.ytimg.com/vi/Vh-KvR5jhlU/maxresdefault.jpg',
  healthScore: 50,
  summary: 'Milanesa con salsa',
  instructions: 'put the milanesa on the horno',
  created: true
};

describe('Recipe routes', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  beforeEach(() => Recipe.sync({ force: true })
    .then(() => Recipe.create(recipe)));
  describe('GET /recipes', () => {
    it('should get 200', () =>
      agent.get('/recipes').expect(200)
    );
  });
});

describe('GET /recipes/:id', () => {
  it('should has the property title', () => {
    agent.get('recipes/644357')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(function (res) {
        expect(res.body).to.haveOwnProperty('title')
      })
  })
})
