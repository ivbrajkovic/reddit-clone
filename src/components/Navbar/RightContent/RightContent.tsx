import { closeModal } from "@/components/Modal/modalSlice";
import AuthButtons from "@/components/Navbar/RightContent/AuthButton";
import SignOutButton from "@/components/Navbar/RightContent/SignOutButton";
import { AuthModal } from "@/features/auth/AuthModal";
import { auth } from "@/firebase/clientApp";
import { useAppDispatch } from "@/store/hooks";
import { Flex } from "@mantine/core";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const RightContent = () => {
  const dispatch = useAppDispatch();
  const [user] = useAuthState(auth);

  useEffect(() => {
    user && dispatch(closeModal());
  }, [user, dispatch]);

  return (
    <>
      <AuthModal />
      <Flex justify="center" align="center">
        {user ? <SignOutButton /> : <AuthButtons />}
      </Flex>
    </>
  );
};
export default RightContent;
