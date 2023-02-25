import { FadeInImage } from "@/components/FadeInImage";
import { FC } from "react";
import { FaReddit } from "react-icons/fa";
import { TiHome } from "react-icons/ti";

type IconColor = "black" | "lightcoral" | "lightblue";

export const CommunityIconEnum = {
  Home: TiHome,
  FaReddit: FaReddit,
};

export type CommunityLogo = {
  imageUrl: string | null;
  icon?: keyof typeof CommunityIconEnum;
  iconColor?: IconColor;
};

const CommunityLogo: FC<CommunityLogo> = ({
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

  const Icon = CommunityIconEnum[icon];
  return <Icon fontSize={24} color={iconColor} />;
};

export default CommunityLogo;
