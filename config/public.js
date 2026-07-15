import { surfaceAccessPolicies } from "./surfaceAccessPolicies.js";

export const config = {};
config.tenancyMode = "none";


config.surfaceModeAll = "all";
config.surfaceDefaultId = "home";
config.webRootAllowed = "no";
config.surfaceAccessPolicies = surfaceAccessPolicies;
config.mobile = {
  enabled: false,
  strategy: "",
  appId: "",
  appName: "",
  assetMode: "bundled",
  devServerUrl: "",
  apiBaseUrl: "",
  auth: {
    callbackPath: "/auth/login",
    customScheme: "",
    appLinkDomains: []
  },
  android: {
    packageName: "",
    minSdk: 26,
    targetSdk: 35,
    versionCode: 1,
    versionName: "1.0.0"
  }
};
config.surfaceDefinitions = {};
config.surfaceDefinitions.home = {
  id: "home",
  label: "Home",
  pagesRoot: "home",
  enabled: true,
  requiresAuth: false,
  requiresWorkspace: false,
  accessPolicyId: "public",
  origin: ""
};


config.surfaceDefinitions.auth = {
  id: "auth",
  label: "Auth",
  pagesRoot: "auth",
  enabled: true,
  requiresAuth: false,
  requiresWorkspace: false,
  origin: ""
};


config.surfaceDefinitions.account = {
  id: "account",
  label: "Account",
  pagesRoot: "account",
  enabled: true,
  requiresAuth: true,
  requiresWorkspace: false,
  origin: ""
};
