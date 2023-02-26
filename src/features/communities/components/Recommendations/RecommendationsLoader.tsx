import { Box, createStyles, Group, Skeleton } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  grid: {
    padding: "10px 12px",
    display: "grid",
    gridTemplateColumns: "30px 1fr 50px",
    alignItems: "center",
    borderBottom: `1px solid ${theme.colors.gray[2]}`,
  },
}));

const RecommendationsLoader = () => {
  const { classes } = useStyles();
  return (
    <>
      {Array.from({ length: 3 }, (_, i) => (
        <Box key={i} className={classes.grid}>
          <Skeleton height={10} circle />
          <Group>
            <Skeleton height={24} circle />
            <Skeleton height={10} width="50%" />
          </Group>
          <Skeleton height={10} />
        </Box>
      ))}
    </>
  );
};
export default RecommendationsLoader;
