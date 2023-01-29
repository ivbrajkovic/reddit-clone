import { useStyles } from "@/features/auth/AuthModal/components/styles";
import {
  ResetPasswordFormProps,
  ResetPasswordFormValues,
} from "@/features/auth/AuthModal/components/types";
import { useAuthErrorEffect } from "@/features/auth/hooks/useAuthErrorEffect";
import { useAuthModal } from "@/features/auth/hooks/useAuthModal";
import { auth } from "@/firebase/clientApp";
import { Anchor, Box, Button, Flex, Text, TextInput } from "@mantine/core";
import { isEmail, useForm } from "@mantine/form";
import { useMemo } from "react";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import { BsReddit } from "react-icons/bs";

const createFormProps = (): ResetPasswordFormProps => ({
  initialValues: { email: "" },
  validate: { email: isEmail("Invalid email") },
});

export const ResetPassword = () => {
  const { classes } = useStyles();

  const { openLoginModal, openSignupModal } = useAuthModal();

  const formProps = useMemo(createFormProps, []);
  const form = useForm<ResetPasswordFormValues>(formProps);

  const [sendPasswordResetEmail, loading, error] =
    useSendPasswordResetEmail(auth);
  useAuthErrorEffect(error);

  const resetPassword = ({ email }: ResetPasswordFormValues) =>
    sendPasswordResetEmail(email);

  return (
    <>
      <Box mb={16} pt={8} ta="center">
        <BsReddit size={40} color="red" />
        <Text mb={8} fz="md" fw="bold">
          Reset your password
        </Text>
        <Text mb={8} fz="sm" c="gray.7">
          Enter the email associated with your account and we'll send you a
          reset link
        </Text>
      </Box>
      <form onSubmit={form.onSubmit(resetPassword)}>
        <TextInput
          mb={16}
          type="email"
          placeholder="email"
          styles={{ input: classes.input as any }}
          {...form.getInputProps("email")}
        />
        <Button type="submit" w="100%" h="36px" mb={12} loading={loading}>
          Reset password
        </Button>
      </form>
      <Flex fz="sm" c="gray.7" justify="center">
        <Anchor c="blue.5" fw="700" underline={false} onClick={openLoginModal}>
          LOGIN
        </Anchor>
        &nbsp;-&nbsp;
        <Anchor c="blue.5" fw="700" underline={false} onClick={openSignupModal}>
          SIGN UP
        </Anchor>
      </Flex>
    </>
  );
};
