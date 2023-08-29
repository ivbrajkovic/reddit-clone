import { Paper, Skeleton, Stack } from "@mantine/core";
import { FC } from "react";

type PostLoaderProps = { postCount?: number };

const PostLoader: FC<PostLoaderProps> = ({ postCount = 2 }) => {
  return (
    <Stack>
      {Array.from({ length: postCount }).map((_, i) => (
        <Paper key={i} withBorder shadow="lg" p="sm">
          <Skeleton height={8} mt="xs" width="40%" radius="xl" />
          <Skeleton height={8} mt="md" radius="xl" />
          <Skeleton height={8} mt="xs" radius="xl" />
          <Skeleton height={8} mt="xs" radius="xl" />
          <Skeleton height={8} mt="xs" width="80%" radius="xl" />
          <Skeleton height={200} mt="md" radius="sm" />
        </Paper>
      ))}
    </Stack>
  );
};
export default PostLoader;
