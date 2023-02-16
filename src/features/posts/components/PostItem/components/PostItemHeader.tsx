import { usePostItemContext } from "@/features/posts/components/PostItem/components/postItemContext";
import { Box, Group, Text } from "@mantine/core";
import dayjs from "dayjs";

const PostItemHeader = () => {
  const { post } = usePostItemContext();

  const { title, creatorDisplayName, createdAt } = post;
  const formatCreatedAt = dayjs(createdAt.seconds * 1000).fromNow();

  return (
    <Box>
      <Group mb={4} spacing="sm" fz="9pt">
        <div>pic</div>
        <Text>Posted by u/{creatorDisplayName}</Text>
        <Text>{formatCreatedAt}</Text>
      </Group>
      <Text mb={4} fz="12pt" fw={600}>
        {title}
      </Text>
    </Box>
  );
};

export default PostItemHeader;
