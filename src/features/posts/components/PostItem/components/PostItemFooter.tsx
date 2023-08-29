import FooterButton from "@/features/posts/components/PostItem/components/PostItemFooterButton";
import { useIsCreator } from "@/features/posts/hooks/useIsModerator";
import { Post } from "@/features/posts/types";
import { stopPropagation } from "@/utility";
import { Box, Group, Menu } from "@mantine/core";
import { FC } from "react";
import { BsThreeDots } from "react-icons/bs";
import { HiOutlineGift } from "react-icons/hi";
import { IoBookmarkOutline } from "react-icons/io5";

import { RiShareForwardLine } from "react-icons/ri";
import { VscComment, VscTrash } from "react-icons/vsc";

type PostItemFooterProps = {
  post: Post;
  onDeletePost: (post: Post) => void;
};

const PostItemFooter: FC<PostItemFooterProps> = (props) => {
  const isModerator = useIsCreator(props.post.creatorId);
  const handleDeletePost = () => props.onDeletePost(props.post);

  return (
    <Group spacing={4} pb={2} onClick={stopPropagation}>
      <FooterButton
        title={`${props.post.commentCount} Comments`}
        icon={<VscComment fontSize={24} />}
      />
      <FooterButton title="Awards" icon={<HiOutlineGift fontSize={24} />} />
      <FooterButton title="Share" icon={<RiShareForwardLine fontSize={24} />} />
      <FooterButton title="Save" icon={<IoBookmarkOutline fontSize={24} />} />

      <Menu shadow="md" width={140} position="bottom-start">
        <Menu.Target>
          <Box>
            <FooterButton icon={<BsThreeDots fontSize={24} />} py={0} />
          </Box>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item
            color="red"
            icon={<VscTrash fontSize={20} />}
            disabled={!isModerator}
            onClick={handleDeletePost}
          >
            Delete post
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
};
export default PostItemFooter;
