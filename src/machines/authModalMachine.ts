import { assign, createMachine, StateFrom, StateValueFrom } from "xstate";

type View = "login" | "signup" | "resetPassword" | null;
type Form = { email: string; password: string };
type Context = { view: View | null; form: Form };

export type AuthModalEvents =
  | { type: "CLOSE_MODAL" }
  | { type: "OPEN_LOGIN_MODAL" }
  | { type: "OPEN_SIGNUP_MODAL" }
  | { type: "OPEN_RESET_PASSWORD_MODAL" }
  | { type: "UPDATE_FORM_INPUT"; data: Partial<Form> };

export type AuthModalContext = Context;
export type AuthModalMachine = typeof authModalMachine;
export type AuthModalMachineState = StateFrom<AuthModalMachine>;
export type AuthModalMachineValue = StateValueFrom<AuthModalMachine>;

const initialContext = { view: null, form: { email: "", password: "" } };

export const authModalMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QEMCuAXAFgWQPYWQBttkBjTASwDswBiAeQAUBRAOQH0AZegcQEkO2egBEAgpwDaABgC6iUAAdcsCugq4q8kAA9EAWgAsATgB0ADiNGDUswHYAzLYCMUx2YA0IAJ6JHtk8YG9gYh9gBsAKz2UrYRAL5xnmhYeATEZJQ0DCwcAMp8PKwAqozsQmKSslpKKmoaWroIBgBMnj4I0f5OEWHNEba9RvZWUQlJGDj4RCTk1HRMbOwASsy5zAAq7IyiubkA6vRLwmUi4tJySCA1quqal41GTia2DrbN4bZBzVI2bYh9BhMRjC3ScjjCQTCYTM9jGIGSkzSM0yYBMuAUYCotAAwtw1icKudqsobvV7ogjM0TBEgpSwkYIjYbM4-ggzM1Ac1ms5GUYzJC+XCEalphk5miMViSmJ1sx2AAxQ7YdgCRhFdZEy7XOp3UCNelhcyUiIRboGJyxJytbyIF6c+xOboRKyPGwJRIgKj4OBaYVTdKzGjE2q3Br6Iz+CxWZmOFxuVlOML+Azs4IRdkg4IGIUTEUBlESzHB0m6nSIAxvExSJMuWwWF5SCLW9rc-z2aLGOwO2zAsI5lL+5Hi9GYkyEXBQajFnVhhBNqRVmsxeu2RvNxDpqkMk1SAEQoZmfuI0WB1EjqgmFRQKioBTT0PkuffRfOZcR1dN1kVhc01xc4JSE4DJHnmQ40IWF4AE5wGA6CMMgsCwAA7rgkEQPeZJ6huz7Vq+dbvmurLhICZhSL2UKrruRggYOYrgaQ46wGAGGlo09iMiYYSOHyNhDG4Bisi89jUo83JmIMLzNE47pxEAA */
  createMachine(
    {
      tsTypes: {} as import("./authModalMachine.typegen").Typegen0,
      id: "authModalMachine",
      on: {
        OPEN_LOGIN_MODAL: { target: "open.login" },
        OPEN_SIGNUP_MODAL: { target: "open.signup" },
        OPEN_RESET_PASSWORD_MODAL: { target: "open.resetPassword" },
      },
      initial: "close",
      states: {
        open: {
          on: {
            CLOSE_MODAL: { target: "close" },
            UPDATE_FORM_INPUT: { actions: "updateInputForm" },
          },
          states: {
            login: { entry: "assignLoginView" },
            signup: { entry: "assignSignupView" },
            resetPassword: { entry: "assignResetPasswordView" },
          },
        },

        close: {
          entry: "clearInputForm",
        },
      },
      schema: {
        context: {} as AuthModalContext,
        events: {} as AuthModalEvents,
      },
      context: { ...initialContext },
      predictableActionArguments: true,
      preserveActionOrder: true,
    },
    {
      actions: {
        assignLoginView: assign({ view: (_) => "login" as const }),
        assignSignupView: assign({ view: (_) => "signup" as const }),
        assignResetPasswordView: assign({
          view: (_) => "resetPassword" as const,
        }),
        clearInputForm: assign((_) => ({ ...initialContext })),
        updateInputForm: assign({
          form: (ctx, event) => ({ ...ctx.form, ...event.data }),
        }),
      },
    },
  );
