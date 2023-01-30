import { createStyles } from "@mantine/core";
import { FC } from "react";

const useStyles = createStyles((theme) => ({}));

type UserMenuItemProps = { children: React.ReactNode };
const UserMenuItem: FC<UserMenuItemProps> = ({ children }) => {
  return <div>{children}</div>;
};
export default UserMenuItem;
