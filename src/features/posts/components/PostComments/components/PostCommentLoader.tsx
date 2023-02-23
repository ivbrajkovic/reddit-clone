import { Box, Flex, Skeleton } from "@mantine/core";

const PostCommentLoader = () => {
  return (
    <>
      {[1, 2, 3].map((item) => (
        <Flex gap="md" key={item}>
          <Skeleton circle height={30} />
          <Box sx={{ flex: 1 }}>
            <Skeleton mb={10} height="6pt" radius="sm" width="40%" />
            <Skeleton mb={8} height="8pt" radius="sm" />
            <Skeleton mb={10} height="8pt" radius="sm" />
            <Skeleton height="6pt" radius="sm" width="25%" />
          </Box>
        </Flex>
      ))}
    </>
  );
};
export default PostCommentLoader;
