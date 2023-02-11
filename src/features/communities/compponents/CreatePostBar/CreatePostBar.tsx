import { Input } from "@/components/Input";
import { Flex, Paper } from "@mantine/core";
import { FC } from "react";

type CreatePostBarProps = {};

const CreatePostBar: FC<CreatePostBarProps> = () => {
  return (
    <Paper p="md">
      <Flex>
        <Input placeholder="Search Reddit" />
      </Flex>
    </Paper>
  );
};
export default CreatePostBar;
