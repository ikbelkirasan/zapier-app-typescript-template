import { ZObject, Bundle } from "zapier-platform-core";

const perform = async (z: ZObject, bundle: Bundle) => {
  const response = await z.request({
    method: "POST",
    url: "/login",
    body: {
      email: bundle.inputData.email,
      password: bundle.inputData.password,
    },
  });

  return response.json;
};

const test = async (z: ZObject, bundle: Bundle) => {
  const response = await z.request({
    method: "GET",
    url: "/me",
  });

  const { username } = response.json as any;

  return {
    name: username,
  };
};

const Authentication = {
  type: "session",
  fields: [],
  sessionConfig: {
    perform,
  },
  test,
  connectionLabel: "{{name}}",
};

export default Authentication;
