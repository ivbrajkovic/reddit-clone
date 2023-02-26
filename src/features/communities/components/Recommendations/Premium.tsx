import { Box, Button, Group, Paper, Stack, Text } from "@mantine/core";
import { FC } from "react";
import { GiCheckedShield } from "react-icons/gi";

type PremiumProps = {};

const Premium: FC<PremiumProps> = () => {
  return (
    <Paper withBorder shadow="lg" p={12}>
      <Group noWrap mb="xs" align="flex-start" spacing="xs">
        <Box mt={8} fz={26} c="red">
          <GiCheckedShield />
        </Box>
        <Stack spacing={1} align="flex-start" fz="9pt">
          <Text fw={600}>Reddit Premium</Text>
          <Text>The best Reddit experience, with monthly Coins</Text>
        </Stack>
      </Group>
      <Group grow>
        <Button h={30} bg="red">
          Try Now
        </Button>
      </Group>
    </Paper>
  );
};
export default Premium;
