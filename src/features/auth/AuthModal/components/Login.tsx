import { useStyles } from "@/features/auth/AuthModal/components/styles";
import {
  LoginFormProps,
  LoginFormValues,
} from "@/features/auth/AuthModal/components/types";
import { useAuthErrorEffect } from "@/features/auth/hooks/useAuthErrorEffect";
import { useAuthModal } from "@/features/auth/hooks/useAuthModal";
import { auth } from "@/firebase/clientApp";
import { Anchor, Button, Flex, Text, TextInput } from "@mantine/core";
import { hasLength, isEmail, useForm } from "@mantine/form";
import { useMemo } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";

const createFormProps = (): LoginFormProps => ({
  initialValues: { email: "", password: "" },
  validate: {
    email: isEmail("Invalid email"),
    password: hasLength(
      { min: 6 },
      "Password must be at least 6 characters long",
    ),
  },
});

const Login = () => {
  // useRenderCount("Login");

  const { classes } = useStyles();
  const { openSignup, openResetPassword } = useAuthModal();

  const formProps = useMemo(createFormProps, []);
  const form = useForm<LoginFormValues>(formProps);

  const [signInWithEmailAndPassword, _user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  useAuthErrorEffect(error);

  const signIn = ({ email, password }: LoginFormValues) =>
    signInWithEmailAndPassword(email, password);

  return (
    <form onSubmit={form.onSubmit(signIn)}>
      <TextInput
        mb={8}
        placeholder="email"
        styles={{ input: classes.input as any }}
        {...form.getInputProps("email")}
      />
      <TextInput
        mb={16}
        type="password"
        placeholder="password"
        styles={{ input: classes.input as any }}
        {...form.getInputProps("password")}
      />
      <Button type="submit" w="100%" h="36px" mb={8} loading={loading}>
        Log in
      </Button>
      <Flex mb={8} fz="sm" c="gray.7" justify="center">
        <Text mr={4}>Forgot password?</Text>
        <Anchor
          c="blue.5"
          fw="700"
          underline={false}
          onClick={openResetPassword}
        >
          Reset
        </Anchor>
      </Flex>
      <Flex fz="sm" c="gray.7" justify="center">
        <Text mr={4}>New here?</Text>
        <Anchor c="blue.5" fw="700" underline={false} onClick={openSignup}>
          SIGN UP
        </Anchor>
      </Flex>
    </form>
  );
};

export default Login;
