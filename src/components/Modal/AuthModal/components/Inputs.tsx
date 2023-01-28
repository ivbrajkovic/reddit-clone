import Login from "@/components/Modal/AuthModal/components/Login";
import SignUp from "@/components/Modal/AuthModal/components/SignUp";
// import { useRenderCount } from "@/hooks/useRenderCount";
import { AuthModalContext } from "@/machines/authModalMachine";
import { FC } from "react";

type InputsProps = { view: AuthModalContext["view"] };

const Inputs: FC<InputsProps> = ({ view }) => {
  // useRenderCount("AuthInputs");
  if (view === "login") return <Login />;
  if (view === "signup") return <SignUp />;
  return null;
};
export default Inputs;
