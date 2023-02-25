import { CommunityLogo } from "@/components/CommunityLogo";
import { DirectoryItemProps } from "@/features/directory/directorySlice";
import { Menu } from "@mantine/core";
import Link from "next/link";
import { FC } from "react";

const DirectoryItem: FC<DirectoryItemProps> = ({ url, ...rest }) => {
  return (
    <Menu.Item
      component={Link}
      icon={<CommunityLogo {...rest} />}
      href={url ?? "/"}
    >
      {url}
    </Menu.Item>
  );
};

export default DirectoryItem;
