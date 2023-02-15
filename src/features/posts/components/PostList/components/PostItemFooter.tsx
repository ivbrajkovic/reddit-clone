import FooterButton from "@/features/posts/components/PostList/components/FooterButton";
import { Group } from "@mantine/core";
import { FC } from "react";
import { BsThreeDots } from "react-icons/bs";
import { HiOutlineGift } from "react-icons/hi";
import { IoBookmarkOutline } from "react-icons/io5";

import { RiShareForwardLine } from "react-icons/ri";
import { VscComment } from "react-icons/vsc";

type PostItemFooterProps = {};

const PostItemFooter: FC<PostItemFooterProps> = () => {
  return (
    <Group spacing={4} pb={2}>
      <FooterButton
        title="Comments"
        icon={<VscComment fontSize={24} />}
        onClick={() => {
          console.log("clicked");
        }}
      />
      <FooterButton title="Awards" icon={<HiOutlineGift fontSize={24} />} />
      <FooterButton title="Share" icon={<RiShareForwardLine fontSize={24} />} />
      <FooterButton title="Save" icon={<IoBookmarkOutline fontSize={24} />} />
      <FooterButton icon={<BsThreeDots fontSize={24} />} py={0} />
    </Group>
  );
};
export default PostItemFooter;
