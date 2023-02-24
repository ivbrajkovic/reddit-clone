import { PostComment } from "@/features/posts/types";
import {
  Box,
  createStyles,
  Flex,
  Group,
  LoadingOverlay,
  Text,
} from "@mantine/core";
import dayjs from "dayjs";
import { FC } from "react";
import { FaReddit } from "react-icons/fa";
import {
  IoArrowDownCircleOutline,
  IoArrowUpCircleOutline,
} from "react-icons/io5";

const useStyles = createStyles((theme) => ({
  actionIcon: { cursor: "pointer" },
  actionText: {
    cursor: "pointer",
    "&:hover": {
      color: theme.colors.blue[5],
    },
  },
}));

type PostCommentItemProps = {
  isLoading: boolean;
  isCreator: boolean;
  comment: PostComment;
  onDelete: (comment: PostComment) => void;
};

const PostCommentItem: FC<PostCommentItemProps> = (props) => {
  const { classes } = useStyles();

  const creatorDisplayName = props.comment.creatorDisplayName;
  const createdAt = dayjs(props.comment.createdAt.seconds * 1000).fromNow();
  const commentText = props.comment.text;

  const onDelete = () => props.onDelete(props.comment);

  return (
    <Box pos="relative">
      <Flex gap="md">
        <FaReddit fontSize={30} color="lightgray" />
        <Box sx={{ flex: 1 }}>
          <Group mb={4} fz="8pt" spacing="sm">
            <Text fw={700}>{creatorDisplayName}</Text>
            <Text color="dimmed">{createdAt}</Text>
          </Group>
          <Text mb="xs" fz="10pt">
            {commentText}
          </Text>
          <Group>
            <Group spacing="sm">
              <IoArrowUpCircleOutline className={classes.actionIcon} />
              <IoArrowDownCircleOutline className={classes.actionIcon} />
            </Group>
            {props.isCreator ? (
              <Group spacing="sm" fz="9pt">
                <Text className={classes.actionText}>Edit</Text>
                <Text className={classes.actionText} onClick={onDelete}>
                  Delete
                </Text>
              </Group>
            ) : null}
          </Group>
        </Box>
      </Flex>
      <LoadingOverlay
        visible={props.isLoading}
        overlayBlur={2}
        transitionDuration={500}
      />
    </Box>
  );
};
export default PostCommentItem;
