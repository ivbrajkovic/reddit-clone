import { Box, Flex, Skeleton, Stack } from "@mantine/core";

const PostCommentLoader = () => {
  return (
    <Stack spacing="lg">
      {[1, 2, 3].map((item) => (
        <Flex key={item} gap="md">
          <Skeleton circle height={30} />
          <Box sx={{ flex: 1 }}>
            <Skeleton mb={10} height="6pt" radius="sm" width="40%" />
            <Skeleton mb={8} height="8pt" radius="sm" />
            <Skeleton mb={10} height="8pt" radius="sm" />
            <Skeleton height="6pt" radius="sm" width="25%" />
          </Box>
        </Flex>
      ))}
    </Stack>
  );
};
export default PostCommentLoader;
