import { version as platformVersion } from "zapier-platform-core";
import { version as appVersion } from "../package.json";
import Authentication from "./authentication";
import {
  ensureJson,
  setApiEndpoint,
  setAuthorizationHeaders,
} from "./middleware/before";

export default {
  version: appVersion,
  platformVersion,
  authentication: Authentication,
  beforeRequest: [ensureJson, setApiEndpoint, setAuthorizationHeaders],
  afterResponse: [],
  triggers: {},
  searches: {},
  creates: {},
};
