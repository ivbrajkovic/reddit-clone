import { useAuthModalForm } from "@/components/Modal/AuthModal/hooks/useAuthModalForm";
import { useStyles } from "@/components/Modal/AuthModal/styles";
import { useRenderCount } from "@/hooks/useRenderCount";
import { Anchor, Button, Flex, Input, Text } from "@mantine/core";
import { FC } from "react";

type SignUpProps = {};

const SignUp: FC<SignUpProps> = () => {
  useRenderCount("SignUp");

  const { classes } = useStyles();
  const { form, updateForm, submitForm, openLogin } = useAuthModalForm();
  const { email, password } = form;

  return (
    <form onSubmit={submitForm}>
      <Input
        required
        name="email"
        placeholder="email"
        value={email}
        mb={8}
        styles={{ input: classes.input as any }}
        onChange={updateForm}
      />
      <Input
        required
        name="password"
        type="password"
        placeholder="password"
        value={password}
        mb={8}
        styles={{ input: classes.input as any }}
        onChange={updateForm}
      />
      <Input
        required
        name="password"
        type="password"
        placeholder="confirm password"
        value={password}
        mb={16}
        styles={{ input: classes.input as any }}
        onChange={updateForm}
      />
      <Button type="submit" w="100%" h="36px" mb={12}>
        Log in
      </Button>
      <Flex fz="sm" justify="center">
        <Text mr={4}>New here?</Text>
        <Anchor c="blue.5" fw="700" underline={false} onClick={openLogin}>
          LOG IN
        </Anchor>
      </Flex>
    </form>
  );
};

export default SignUp;
