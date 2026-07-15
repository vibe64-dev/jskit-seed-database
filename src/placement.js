import { createPlacementRegistry } from "@jskit-ai/shell-web/client/placement";

const registry = createPlacementRegistry();
const { addPlacement } = registry;

export { addPlacement };

// Keep the default export near the top so module installers can append addPlacement(...)
// blocks at the bottom of this file without changing the export section.
export default function getPlacements() {
  return registry.build();
}

addPlacement({
  id: "shell-web.home.menu.home",
  target: "shell.primary-nav",
  kind: "link",
  surfaces: ["home"],
  order: 50,
  props: {
    label: "Home",
    surface: "home",
    scopedSuffix: "/",
    unscopedSuffix: "/",
    exact: true
  }
});

addPlacement({
  id: "shell-web.home.menu.settings",
  target: "shell.primary-nav",
  kind: "link",
  surfaces: ["home"],
  order: 100,
  props: {
    label: "Settings",
    surface: "home",
    scopedSuffix: "/settings",
    unscopedSuffix: "/settings"
  }
});

addPlacement({
  id: "shell-web.home.settings.general",
  target: "page.section-nav",
  owner: "home-settings",
  kind: "link",
  surfaces: ["home"],
  order: 100,
  props: {
    label: "General",
    surface: "home",
    scopedSuffix: "/settings/general",
    unscopedSuffix: "/settings/general"
  }
});


addPlacement({
  id: "auth.profile.widget",
  target: "shell.status",
  kind: "component",
  surfaces: ["*"],
  order: 1000,
  componentToken: "auth.web.profile.widget"
});

addPlacement({
  id: "auth.profile.menu.sign-in",
  target: "auth.profile-menu",
  kind: "link",
  surfaces: ["*"],
  order: 200,
  props: {
    label: "Sign in",
    to: "/auth/login"
  },
  when: ({ auth }) => auth?.authenticated !== true
});

addPlacement({
  id: "auth.profile.menu.sign-out",
  target: "auth.profile-menu",
  kind: "link",
  surfaces: ["*"],
  order: 1000,
  props: {
    label: "Sign out",
    to: "/auth/signout"
  },
  when: ({ auth }) => auth?.authenticated === true
});


addPlacement({
  id: "users.profile.menu.settings",
  target: "auth.profile-menu",
  kind: "link",
  surfaces: ["*"],
  order: 500,
  props: {
    label: "Settings",
    to: "/account"
  },
  when: ({ auth }) => auth?.authenticated === true
});


addPlacement({
  id: "users.home.tools.widget",
  target: "shell.status",
  kind: "component",
  surfaces: ["home"],
  order: 900,
  componentToken: "users.web.home.tools.widget",
  when: ({ auth }) => auth?.authenticated === true
});

addPlacement({
  id: "users.home.menu.settings",
  target: "home.tools-menu",
  kind: "link",
  surfaces: ["home"],
  order: 100,
  props: {
    label: "Settings",
    surface: "home",
    scopedSuffix: "/settings",
    unscopedSuffix: "/settings"
  },
  when: ({ auth }) => auth?.authenticated === true
});


addPlacement({
  id: "users.account.settings.profile",
  target: "settings.sections",
  owner: "account-settings",
  kind: "component",
  surfaces: ["account"],
  order: 100,
  componentToken: "local.main.account-settings.section.profile",
  props: {
    title: "Profile",
    value: "profile",
    usesSharedRuntime: true
  }
});

addPlacement({
  id: "users.account.settings.preferences",
  target: "settings.sections",
  owner: "account-settings",
  kind: "component",
  surfaces: ["account"],
  order: 200,
  componentToken: "local.main.account-settings.section.preferences",
  props: {
    title: "Preferences",
    value: "preferences",
    usesSharedRuntime: true
  }
});

addPlacement({
  id: "users.account.settings.notifications",
  target: "settings.sections",
  owner: "account-settings",
  kind: "component",
  surfaces: ["account"],
  order: 300,
  componentToken: "local.main.account-settings.section.notifications",
  props: {
    title: "Notifications",
    value: "notifications",
    usesSharedRuntime: true
  }
});
