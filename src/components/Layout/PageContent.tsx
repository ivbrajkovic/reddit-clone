import { Container, Flex, Grid } from "@mantine/core";
import { FC } from "react";

type PageContentProps = {
  children: React.ReactNode;
};

const PageContent: FC<PageContentProps> = ({ children }) => {
  if (!children) return null;
  return (
    <Container>
      <Grid p="xl">
        <Grid.Col md={8} xs={12}>
          <Flex direction="column" gap="md">
            {children[0 as keyof typeof children]}
          </Flex>
        </Grid.Col>
        <Grid.Col md={4} xs={0} display={{ base: "none", md: "unset" }}>
          {children[1 as keyof typeof children]}
        </Grid.Col>
      </Grid>
    </Container>
  );
};
export default PageContent;
