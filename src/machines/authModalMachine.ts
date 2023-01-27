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
  /** @xstate-layout N4IgpgJg5mDOIC5QEMCuAXAFgWQPYWQBttkBjTASwDswA6XABzBogGIBhAGQHkBlAUQD62bgBEAgpwDaABgC6iUA1ywK6CriqKQAD0QBaAMwAmY7QAsANnMBGGYcsBOABwB2QzPOuANCACeBjaGNrSOQZaursY2AKwxrpY2rgC+yb5oWHgExGSUNPRMLLSEuFDUrACqAAoSACpC-NjiAJLS8trKquqa2noIMTLOtDaWnmGO5oaGMRO+AQj6xjKWtDIyNuZhMVaWHs6WqekYOPhEJOTUdIzMkMWl5dV1QlXivLwA6twASqKyCkggTpqDRaAF9JKGWimGSmYxeYLmcwxQxzAxLFZrDZbHZ7A5pEAZE7Zc55OikEqwSCsbhVfgAOUEPAA4s0GSIJG1-koVMCemC0YYhs5HMZHMsbM5hdZnOZUQtYlDzMZkVZDK4kTYksZDgTjlkzrlLrRySoqTT6YJeM0mXTqsIxJI-h0ed1QaA+osprRIoL4prLE4RcY5dEZLQIq57JZjM5tmtzDrCfqchd8ibKWxzQyvvwBLVBC83p8fvaOU6AUDXb0BY5VprHHFjIljB4vHKRbRnBtBh5HI4HDEW6l8VR8HBtEnTinSc6uiDqwslWHB4LrOrRv3XDE5UZnGGGy5jOqWzIGyl8ZPiYb8tcWLPeW7dIgbMqoUtYfCNkiUf40f2LHulgzOYMr7FMiZ6lOJJGretwlGUj6VvO-IIA4ZhBoKLbbO4uxykMrgbME7jRJE7iIhBmRQdeVyFLcqhQFQqAMPeVYoWhoSmJh0zwrhv4IC2kKDhEtgwq4zgmPYFFEgaqY0TcEC0AATnAYDoFUyCwLAADuuCKRALHIe6iAOJCoxOFMMxqtufGajE4a7GJYm2K4jiWJKUnJtBaYUpABl8kZCxqmYK77F4VinlZ7ZDIiMgxC+gybBuNjDskQA */
  createMachine(
    {
      tsTypes: {} as import("./authModalMachine.typegen").Typegen0,
      id: "authModalMachine",
      initial: "closed",
      states: {
        opened: {
          on: { CLOSE_MODAL: { target: "closed" } },
          states: {
            login: {
              on: {
                UPDATE_EMAIL: { actions: "assignEmail" },
                UPDATE_PASSWORD: { actions: "assignPassword" },
              },
            },
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
