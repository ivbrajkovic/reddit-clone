import { HEADER_HEIGHT } from "@/constants";
import { Paper, SimpleGrid, Skeleton } from "@mantine/core";

const PADDING_TOP = HEADER_HEIGHT + 16;

const CommunityAboutLoader = () => {
  return (
    <Paper
      withBorder
      shadow="lg"
      px="xs"
      sx={{ top: PADDING_TOP, position: "sticky", overflow: "hidden" }}
    >
      <Skeleton height={8} mt="md" mb="xl" radius="xl" width="60%" />
      <SimpleGrid cols={2} mb="xs">
        <Skeleton height={8} radius="xl" width="40%" />
        <Skeleton height={8} radius="xl" width="40%" />
      </SimpleGrid>
      <SimpleGrid cols={2} mb="xl">
        <Skeleton height={8} radius="xl" width="80%" />
        <Skeleton height={8} radius="xl" width="80%" />
      </SimpleGrid>
      <Skeleton height={8} mt="md" radius="xl" width="60%" />
      <Skeleton height={30} mt="md" mb="md" radius="xl" />
    </Paper>
  );
};
export default CommunityAboutLoader;
