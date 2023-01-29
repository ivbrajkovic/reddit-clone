import { auth } from "@/firebase/clientApp";
import { Button } from "@mantine/core";
import { signOut } from "firebase/auth";

const SignOutButton = () => {
  return <Button onClick={() => signOut(auth)}>Logout</Button>;
};
export default SignOutButton;
