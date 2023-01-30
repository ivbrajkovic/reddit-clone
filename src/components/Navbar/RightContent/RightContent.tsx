import AuthButtons from "@/components/Navbar/RightContent/components/AuthButton";
import Icons from "@/components/Navbar/RightContent/components/Icons";
import UserMenu from "@/components/Navbar/RightContent/components/UserMenu";
import { AuthModal } from "@/features/auth/AuthModal";
import { useIsUserSignedIn } from "@/hooks/useIsUserSignedIn";

const UserActions = () => (useIsUserSignedIn() ? <Icons /> : <AuthButtons />);
const RightContent = () => (
  <>
    <AuthModal />
    <UserActions />
    <UserMenu />
  </>
);

export default RightContent;
