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
  height?: number;
  width?: number;
  fontSize?: number;
};

const CommunityLogo: FC<CommunityLogo> = ({
  imageUrl,
  icon = "Home",
  iconColor = "black",
  height = 20,
  width = 20,
  fontSize = 24,
}) => {
  if (imageUrl)
    return (
      <FadeInImage
        src={imageUrl}
        alt="Community logo"
        radius="xl"
        height={height}
        width={width}
      />
    );

  const Icon = CommunityIconEnum[icon];
  return <Icon fontSize={fontSize} color={iconColor} />;
};

export default CommunityLogo;
