// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {};
  missingImplementations: {
    actions: never;
    delays: never;
    guards: never;
    services: never;
  };
  eventsCausingActions: {
    assignEmail: "UPDATE_EMAIL";
    assignLogin: "OPEN_LOGIN_MODAL";
    assignPassword: "UPDATE_PASSWORD";
    assignResetPassword: "OPEN_RESET_PASSWORD_MODAL";
    assignSignup: "OPEN_SIGNUP_MODAL";
  };
  eventsCausingDelays: {};
  eventsCausingGuards: {};
  eventsCausingServices: {};
  matchesStates:
    | "closed"
    | "opened"
    | "opened.login"
    | "opened.resetPassword"
    | "opened.signup"
    | { opened?: "login" | "resetPassword" | "signup" };
  tags: never;
}
