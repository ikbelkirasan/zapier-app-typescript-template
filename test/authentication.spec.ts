import { should, describe, appTester, App, mock } from "./helpers";

describe("Authentication", () => {
  it("should fetch an access token", async () => {
    const bundle = {
      inputData: {
        email: "john@example.com",
        password: "secret",
      },
    };

    mock(bundle, false)
      .post("/login", bundle.inputData)
      .reply(200, {
        access_token: "a_token",
      });

    const promise = appTester(App.authentication.sessionConfig.perform, bundle);

    const response = await should(promise).be.resolved();
    should(response).match({
      access_token: "a_token",
    });
  });
});
