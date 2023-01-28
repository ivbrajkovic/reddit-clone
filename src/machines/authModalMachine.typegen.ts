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
    assignLoginView: "OPEN_LOGIN_MODAL";
    assignResetPasswordView: "OPEN_RESET_PASSWORD_MODAL";
    assignSignupView: "OPEN_SIGNUP_MODAL";
    updateInputForm: "UPDATE_FORM_INPUT";
  };
  eventsCausingDelays: {};
  eventsCausingGuards: {};
  eventsCausingServices: {};
  matchesStates:
    | "close"
    | "open"
    | "open.login"
    | "open.resetPassword"
    | "open.signup"
    | { open?: "login" | "resetPassword" | "signup" };
  tags: never;
}
