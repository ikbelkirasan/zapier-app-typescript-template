import { describe, appTester, App, mock } from "./helpers";

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

    const response = await appTester(
      App.authentication.sessionConfig.perform,
      bundle,
    );
    expect(response).toEqual({
      access_token: "a_token",
    });
  });
});
