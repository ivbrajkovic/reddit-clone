import { useAuthModalActor } from "@/hooks/useAuthModalActor";
import { useRenderCount } from "@/hooks/useRenderCount";
import { AuthModalInputUpdateObject } from "@/machines/authModalMachine";
import { Input } from "@mantine/core";

const inputType: AuthModalInputUpdateObject = {
  email: "UPDATE_EMAIL",
  password: "UPDATE_PASSWORD",
};

const createDispatchParam = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { id, value } = e.currentTarget;
  return {
    type: inputType[id as keyof AuthModalInputUpdateObject],
    data: value,
  };
};

const Login = () => {
  useRenderCount("Login");

  const [{ context }, dispatch] = useAuthModalActor();
  const { email, password } = context;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(createDispatchParam(e));

  return (
    <form>
      <Input id="email" value={email} onChange={handleChange} />
      <Input id="password" value={password} onChange={handleChange} />
    </form>
  );
};
export default Login;
