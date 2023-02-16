import { Paper, Skeleton, Stack } from "@mantine/core";
import { FC } from "react";

type PostLoaderProps = {};

const PostLoader: FC<PostLoaderProps> = () => {
  return (
    <Stack>
      <Paper withBorder shadow="lg" p="sm">
        <Skeleton height={8} mt="xs" width="40%" radius="xl" />
        <Skeleton height={8} mt="md" radius="xl" />
        <Skeleton height={8} mt="xs" radius="xl" />
        <Skeleton height={8} mt="xs" radius="xl" />
        <Skeleton height={8} mt="xs" width="80%" radius="xl" />
        <Skeleton height={200} mt="md" radius="sm" />
      </Paper>
      <Paper withBorder shadow="lg" p="sm">
        <Skeleton height={8} mt="xs" width="40%" radius="xl" />
        <Skeleton height={8} mt="md" radius="xl" />
        <Skeleton height={8} mt="xs" radius="xl" />
        <Skeleton height={8} mt="xs" radius="xl" />
        <Skeleton height={8} mt="xs" width="80%" radius="xl" />
        <Skeleton height={200} mt="md" radius="sm" />
      </Paper>
    </Stack>
  );
};
export default PostLoader;
