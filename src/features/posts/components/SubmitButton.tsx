import { Button, Group } from "@mantine/core";

const SubmitButton = () => {
  return (
    <Group position="right" p="md">
      <Button type="submit" h={30}>
        Post
      </Button>
    </Group>
  );
};
export default SubmitButton;
