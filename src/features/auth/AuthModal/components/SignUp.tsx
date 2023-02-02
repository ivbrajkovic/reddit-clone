import { showNotificationError } from "@/common/showNotificationError";
import { useStyles } from "@/features/auth/AuthModal/components/styles";
import {
  SignUpFormProps,
  SignUpFormValues,
} from "@/features/auth/AuthModal/components/types";
import { useAuthErrorEffect } from "@/features/auth/hooks/useAuthErrorEffect";
import { useAuthModalHandlers } from "@/features/auth/hooks/useAuthModalHandlers";
import { createUserInFirestore } from "@/features/auth/utility";
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
  const { classes } = useStyles();
  const { openLogin } = useAuthModalHandlers();

  const formProps = useMemo(createFormProps, []);
  const form = useForm<SignUpFormValues>(formProps);

  const [createUserWithEmailAndPassword, _user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  useAuthErrorEffect(error);

  const signIn = ({ email, password }: SignUpFormValues) =>
    createUserWithEmailAndPassword(email, password)
      .then(createUserInFirestore)
      .catch(showNotificationError("Error creating user"));

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
        <Anchor c="blue.5" fw="700" underline={false} onClick={openLogin}>
          LOG IN
        </Anchor>
      </Flex>
    </form>
  );
};

export default SignUp;
