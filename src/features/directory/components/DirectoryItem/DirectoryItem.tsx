import { CommunityLogo } from "@/components/CommunityLogo";
import { DirectoryItemProps } from "@/features/directory/directorySlice";
import { Menu } from "@mantine/core";
import Link from "next/link";
import { FC } from "react";

type OnClickProp = {
  onClick: (item: DirectoryItemProps) => void;
};

const DirectoryItem: FC<DirectoryItemProps & OnClickProp> = ({
  url,
  onClick,
  ...rest
}) => {
  const handleClick = () => onClick({ url, ...rest });
  return (
    <Menu.Item
      component={Link}
      icon={<CommunityLogo {...rest} />}
      href={url ?? "/"}
      onClick={handleClick}
    >
      {url}
    </Menu.Item>
  );
};

export default DirectoryItem;
