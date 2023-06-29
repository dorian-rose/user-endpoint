//const pactum = require("pactum")
const { Given, When, Then } = require('@cucumber/cucumber');
const { spec, expect } = require("pactum")

//Before(() => { spec = pactum.spec })


Given('I have the following signup payload:', function (dataTable) {
  signupPayload = dataTable.rowsHash();
});

When('I send a POST request to the signup endpoint with the payload', async function () {
  this.response = await spec()
    .post('http://localhost:3000/auth/signup')
    .withBody(signupPayload)
    .expectStatus(201)
    //.stores('responseStatus', 'statusCode')
    .stores('userAt', 'access_token')
    .stores('id', 'userId')
    .stores('responseStatus')
    .inspect()
    .end()
});

Then('the response status code should be 201', function () {
  expect(this.response).should.have.status(201);
});

Given('a user with the following details:', function (dataTable) {
  //collects data from table in features
  const user = dataTable;
  userPreferences = userPreferences = {
    userId: `$S{id}`,
    tac_accepted: user.tac_accepted || true,
    language: user.language || "English",
    show_profile: user.show_profile || true,
    show_language: user.show_language || true,
  };
});

When('the user sets their preferences', async function () {

  this.response = await spec()
    .post('http://localhost:3000/user/preferences')
    .withHeaders({
      Authorization: 'Bearer $S{userAt}',
    })
    .withBody(userPreferences)
    .inspect()
    .end()
});

Then('the preferences should be saved successfully', function () {
  expect(this.response).should.have.status(201);
});
