import { HttpResponse, ZObject, Bundle } from "zapier-platform-core";

class UnexpectedResponseError extends Error {
  constructor(response: HttpResponse, message?: string) {
    super(message);
    const content = JSON.stringify(response.json, null, 2);
    const code = response.status;
    this.message =
      message || `Unexpected status code ${code}\nResponse: ${content}`;
  }
}

export const handleErrors = (
  response: HttpResponse,
  z: ZObject,
  bundle: Bundle,
) => {
  if (bundle.authData.sessionKey) {
    if (response.status === 401) {
      throw new z.errors.RefreshAuthError("Refresh Auth token");
    }
  }

  if (response.status !== 200) {
    throw new UnexpectedResponseError(response);
  }

  return response;
};
