import { useAuthModalContext } from "@/context/authModalContext";
import { AuthModalMachineState } from "@/machines/authModalMachine";
import { useSelector } from "@xstate/react";

const selectForm = (state: AuthModalMachineState) => state.context.form;

export const useAuthModalForm = () => {
  const service = useAuthModalContext();
  const form = useSelector(service, selectForm);

  const openLogin = () => service.send({ type: "OPEN_LOGIN_MODAL" });
  const openSignUp = () => service.send({ type: "OPEN_SIGNUP_MODAL" });

  const updateForm = (e: React.ChangeEvent<HTMLInputElement>) =>
    service.send({
      type: "UPDATE_FORM_INPUT",
      data: { [e.currentTarget.name]: e.currentTarget.value },
    });

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submit");
  };

  return { form, updateForm, submitForm, openLogin, openSignUp };
};
