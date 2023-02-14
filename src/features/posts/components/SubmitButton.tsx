import { Button, Group } from "@mantine/core";
import { FC } from "react";

type SubmitButtonProps = { isLoading: boolean };
const SubmitButton: FC<SubmitButtonProps> = ({ isLoading }) => {
  return (
    <Group position="right" p="md">
      <Button loading={isLoading} type="submit" h={30}>
        Post
      </Button>
    </Group>
  );
};
export default SubmitButton;
