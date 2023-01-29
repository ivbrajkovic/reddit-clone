import { useStyles } from "@/features/auth/AuthModal/components/styles";
import {
  SignUpFormProps,
  SignUpFormValues,
} from "@/features/auth/AuthModal/components/types";
import { useAuthErrorEffect } from "@/features/auth/hooks/useAuthErrorEffect";
import { useAuthModal } from "@/features/auth/hooks/useAuthModal";
import { auth } from "@/firebase/clientApp";
import { Anchor, Button, Flex, Text, TextInput } from "@mantine/core";
import { hasLength, isEmail, useForm } from "@mantine/form";
import { FC, useMemo } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";

const createFormProps = (): SignUpFormProps => ({
  initialValues: {
    email: "",
    password: "",
    passwordConfirmation: "",
  },
  validate: {
    email: isEmail("Invalid email"),
    password: hasLength(
      { min: 6 },
      "Password must be at least 6 characters long",
    ),
    passwordConfirmation: (value, values) =>
      value !== values.password ? "Passwords must match" : undefined,
  },
});

type SignUpProps = {};

const SignUp: FC<SignUpProps> = () => {
  // useRenderCount("SignUp");

  const { classes } = useStyles();
  const { openLoginModal } = useAuthModal();

  const formProps = useMemo(createFormProps, []);
  const form = useForm<SignUpFormValues>(formProps);

  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  useAuthErrorEffect(error);

  const signIn = ({ email, password }: SignUpFormValues) =>
    createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log("userCredential", userCredential);
      })
      .catch((er) => {
        console.log("catch", er);
      });

  return (
    <form onSubmit={form.onSubmit(signIn)}>
      <TextInput
        mb={8}
        placeholder="email"
        styles={{ input: classes.input as any }}
        {...form.getInputProps("email")}
      />
      <TextInput
        mb={8}
        type="password"
        placeholder="password"
        styles={{ input: classes.input as any }}
        {...form.getInputProps("password")}
      />
      <TextInput
        mb={16}
        type="password"
        placeholder="confirm password"
        styles={{ input: classes.input as any }}
        {...form.getInputProps("passwordConfirmation")}
      />
      <Button type="submit" w="100%" h="36px" mb={12} loading={loading}>
        SIGN UP
      </Button>
      <Flex fz="sm" justify="center">
        <Text mr={4}>New here?</Text>
        <Anchor c="blue.5" fw="700" underline={false} onClick={openLoginModal}>
          LOG IN
        </Anchor>
      </Flex>
    </form>
  );
};

export default SignUp;
