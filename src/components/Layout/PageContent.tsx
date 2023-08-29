import { Container, Grid, Stack } from "@mantine/core";
import { FC } from "react";

type PageContentProps = {
  children: React.ReactNode;
};

const PageContent: FC<PageContentProps> = ({ children }) => {
  if (!children) return null;
  return (
    <Container>
      <Grid py="xl">
        <Grid.Col md={8} xs={12}>
          <Stack>{children[0 as keyof typeof children]}</Stack>
        </Grid.Col>
        <Grid.Col md={4} xs={0} display={{ base: "none", md: "unset" }}>
          <Stack>{children[1 as keyof typeof children]}</Stack>
        </Grid.Col>
      </Grid>
    </Container>
  );
};
export default PageContent;
