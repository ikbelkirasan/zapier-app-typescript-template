import should from "should";
import nock from "nock";
import zapier from "zapier-platform-core";
import App from "../src";

export const appTester = zapier.createAppTester(App);

export function mock(bundle: object, enableAuth = true) {
  const API_URL = process.env.API_URL || "https://api.example.com/";
  const scope = nock(API_URL);

  if (enableAuth) {
    const accessToken =
      (bundle as zapier.Bundle).authData.accessToken || "a_token";
    scope.matchHeader("Authorization", accessToken);
  }

  return scope;
}

export function describe(title: string, cb: () => void) {
  return (global as any).describe(title, () => {
    beforeEach(async () => {
      nock.cleanAll();
      nock.disableNetConnect();
    });

    afterEach(async () => {
      nock.cleanAll();
      nock.disableNetConnect();
    });

    try {
      cb();
    } catch (error) {
      const errorMessage = error.message
        .trim()
        .replace(/\\n/g, "\n")
        .replace(/\\"/g, '"');
      throw new Error(errorMessage);
    }
  });
}

export { App, should, zapier };
