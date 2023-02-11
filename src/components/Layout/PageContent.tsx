import { Container, Grid } from "@mantine/core";
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
          <div style={{ backgroundColor: "#00FF0050" }}>
            {children[0 as keyof typeof children]}
          </div>
        </Grid.Col>
        <Grid.Col md={4} xs={0} display={{ base: "none", md: "unset" }}>
          <div style={{ backgroundColor: "#ff009d50" }}>
            {children[1 as keyof typeof children]}
          </div>
        </Grid.Col>
      </Grid>
    </Container>
  );
};
export default PageContent;
