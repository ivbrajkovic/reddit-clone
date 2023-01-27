import { assign, createMachine } from "xstate";

type View = "login" | "signup" | "resetPassword";

type Context = { view: View };

type FromInput = {
  email: string;
  password: string;
};

export type AuthModalContext = Context & FromInput;

export type AuthModalEvents =
  | { type: "CLOSE_MODAL" }
  | { type: "OPEN_LOGIN_MODAL" }
  | { type: "OPEN_SIGNUP_MODAL" }
  | { type: "OPEN_RESET_PASSWORD_MODAL" }
  | AuthModalUpdateEvents;

type FromInputKeys = keyof FromInput;
type FormInputUpdateTypes = `UPDATE_${Uppercase<FromInputKeys>}`;
type AuthModalUpdateEvents = { type: FormInputUpdateTypes; data: string };
export type AuthModalInputUpdateObject = {
  [key in FromInputKeys]: FormInputUpdateTypes;
};

export type AuthModalMachine = typeof authModalMachine;

export const authModalMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QEMCuAXAFgWQPYWQBttkBjTASwDswA6XABzBogGIBhAGQHkBlAUQD62bgBEAgpwDaABgC6iUA1ywK6CriqKQAD0QBaAIwB2GbWMBOYwFYAbBYBMxgCwWZDgMzOANCACeBg4mtIYODjKGHjKOMs6G7gC+Cb5oWHgExGSUNPRMLKwAqgAKEgAqQvzY4gCS0vLayqrqmtp6CCYWtBaGtsYO1obWABz2hj7+BoO2tLb2tg5DYx4e8dbWSSkYOPhEJOTUdIzMkIUl4uWCReK8vADq3ABKorIKSCCNahpab209ZsvLIaOIZhBy2Oy+AIIILGGYWWzOBHWDxDawuMIbECpbYZPbZOikQgqE7cIr8ABygh4AHFqpSRBI6q8lCpPi0fpNTOYrHZHC43J5xlD9FZaB4LMNwrYTL00UNMdj0rssgdaITiWxSRTBLxqtTycVhGJJC8Gqzmt9QG0jG5uTZ7E5XO4vJDEGN-jJrNE7H1bDJ0QqtkrMvscurYCSyZSHvwBKVLtc7o9REbGaa3h8La1JkMzJZ7XynYLXQhnM4Qp5kUDTBZnL7bElkiAqPg4NpFTsQ-izU0vtmEPoPPNaM4FtYnEMPOEVv0S4PYjMIoZFjIok4vM5A2lO3jVUcWD22ZbdG6FiOvGjLHEgc5kXPjEMR0Nc8YxnFwauLFuccrQ4c8pAtBElA1CHlmHLtMY0zOBexhXsutZ3hMCCPhY3TRAi8KSquhjfsGu45PugGqFAVCoAwYF9hBMrnrecG1ght4eCWoTWF0azitEUQmHKeE7iqhEARAtAAE5wGA6BFMgsCwAA7rgIkQJR7JWm6UG0ZeDE3khUK9COxhTjBr7LA+X5Nh2uICQSRIRkpGbmlRqkDis5ajqiE5Tjhs7IfoUq0NYjj9DIMjSquAybo2QA */
  createMachine(
    {
      tsTypes: {} as import("./authModalMachine.typegen").Typegen0,
      id: "authModalMachine",
      initial: "closed",
      states: {
        opened: {
          on: {
            CLOSE_MODAL: { target: "closed" },
            UPDATE_EMAIL: { actions: "assignEmail" },
            UPDATE_PASSWORD: { actions: "assignPassword" },
          },
          states: {
            login: {},
            signup: {},
            resetPassword: {},
          },
        },
        closed: {
          on: {
            OPEN_LOGIN_MODAL: {
              target: "opened.login",
              actions: "assignLogin",
            },
            OPEN_SIGNUP_MODAL: {
              target: "opened.signup",
              actions: "assignSignup",
            },
            OPEN_RESET_PASSWORD_MODAL: {
              target: "opened.resetPassword",
              actions: "assignResetPassword",
            },
          },
        },
      },
      schema: {
        context: {} as AuthModalContext,
        events: {} as AuthModalEvents,
      },
      context: { view: "login", email: "", password: "" },
      predictableActionArguments: true,
      preserveActionOrder: true,
    },
    {
      actions: {
        assignLogin: assign({ view: (_) => "login" as const }),
        assignSignup: assign({ view: (_) => "signup" as const }),
        assignResetPassword: assign({ view: (_) => "resetPassword" as const }),
        assignEmail: assign({ email: (_, event) => event.data }),
        assignPassword: assign({ password: (_, event) => event.data }),
      },
    },
  );
