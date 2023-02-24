import { FadeInImage } from "@/components/FadeInImage";
import {
  DirectoryItemIconEnum,
  DirectoryItemProps,
} from "@/features/directory/directorySlice";
import { FC } from "react";

export type DirectoryItemIconProps = Omit<DirectoryItemProps, "url">;

const DirectoryItemIcon: FC<DirectoryItemIconProps> = ({
  imageUrl,
  icon = "Home",
  iconColor = "black",
}) => {
  if (imageUrl)
    return (
      <FadeInImage
        src={imageUrl}
        alt="Community logo"
        radius="xl"
        height={20}
        width={20}
      />
    );

  const Icon = DirectoryItemIconEnum[icon];
  return <Icon fontSize={24} color={iconColor} />;
};

export default DirectoryItemIcon;
