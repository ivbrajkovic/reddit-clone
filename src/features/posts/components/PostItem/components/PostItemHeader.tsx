import { usePostItemContext } from "@/features/posts/components/PostItem/hooks/usePostItemContext";
import { Box, Group, Text } from "@mantine/core";
import dayjs from "dayjs";

const PostItemHeader = () => {
  const { title, creatorDisplayName, createdAt } = usePostItemContext();
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
