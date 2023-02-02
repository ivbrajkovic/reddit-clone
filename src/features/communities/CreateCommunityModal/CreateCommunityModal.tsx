import { showNotificationError } from "@/common/showNotificationError";
import { Modal } from "@/components/Modal";
import { selectIsCreateCommunityModalOpen } from "@/features/communities/communitySlice";
import RadioButtonWithIcon from "@/features/communities/CreateCommunityModal/RadioButtonWithIcon";
import { useCreateCommunity } from "@/features/communities/hooks/useCreateCommunity";
import { useCreateCommunityModal } from "@/features/communities/hooks/useCreateCommunityModal";
import { CreateCommunityFormValues } from "@/features/communities/types";
import { validateCommunityName } from "@/features/communities/utils/validateCommunityName";
import { useAppSelector } from "@/store/hooks";
import {
  Box,
  Button,
  Checkbox,
  createStyles,
  Divider,
  Flex,
  Group,
  Radio,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { ifElse } from "ramda";
import { CgInfo } from "react-icons/cg";
import { HiUser } from "react-icons/hi";
import { ImEye } from "react-icons/im";
import { IoLockClosed } from "react-icons/io5";

const NAME_MAX_LENGTH = 21;

const useStyles = createStyles((theme) => ({
  nsfw: {
    padding: "0 4px",
    color: theme.white,
    backgroundColor: theme.colors.red[6],
    borderRadius: 2,
    lineHeight: "1rem",
    fontSize: theme.fontSizes.xs,
    fontWeight: 500,
  },
  footer: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[2],
  },
}));

const CreateCommunityModal = () => {
  const { classes } = useStyles();
  const { closeCreateCommunityModal } = useCreateCommunityModal();

  const form = useForm<CreateCommunityFormValues>({
    initialValues: {
      communityName: "",
      communityType: "public",
      adultContent: false,
    },
    validate: {
      communityName: validateCommunityName,
    },
  });

  const { isLoading, handleCreateCommunity } = useCreateCommunity();

  const createCommunity = (values: CreateCommunityFormValues) => {
    const setFormFieldError =
      (field: keyof CreateCommunityFormValues, message: string) => () =>
        form.setFieldError(field, message);

    const isCommunityNameTaken = (error: Error) =>
      error.message === "Document already exists.";

    handleCreateCommunity(values)
      .then(closeCreateCommunityModal)
      .catch(
        ifElse(
          isCommunityNameTaken,
          setFormFieldError("communityName", "Community name already taken."),
          showNotificationError("Error creating community"),
        ),
      );
  };

  return (
    <form onSubmit={form.onSubmit(createCommunity)}>
      <Box p="md" mb="xs">
        <Text fw={500}>Create Community</Text>
        <Divider my="sm" />
        <Text fw={500}>Name</Text>
        <Text mb="lg" fz="xs" c="dimmed">
          <Group spacing="xs">
            Community names including capitalization cannot be changed.
            <CgInfo />
          </Group>
        </Text>

        <TextInput
          mb="md"
          inputWrapperOrder={["label", "input", "description", "error"]}
          icon={<p>r/</p>}
          maxLength={NAME_MAX_LENGTH}
          description={`${
            NAME_MAX_LENGTH - form.values.communityName.length
          } Characters remaining`}
          {...form.getInputProps("communityName")}
          styles={{
            input: {
              marginBottom: 10,
            },
          }}
        />

        <Text fw={500}>Community type</Text>
        <Radio.Group
          orientation="vertical"
          spacing="xs"
          withAsterisk
          {...form.getInputProps("communityType")}
        >
          <RadioButtonWithIcon
            value="public"
            label="Public"
            description="Anyone can view, post, and comment to this community"
            Icon={HiUser}
          />
          <RadioButtonWithIcon
            value="restricted"
            label="Restricted"
            description="Anyone can view this community, but only approved users can post"
            Icon={ImEye}
          />
          <RadioButtonWithIcon
            value="private"
            label="Private"
            description="Anyone can view, post, and comment to this community"
            Icon={IoLockClosed}
          />
        </Radio.Group>

        <br />
        <br />

        <Text>Adult content</Text>
        <Checkbox
          {...form.getInputProps("adultContent", { type: "checkbox" })}
          label={
            <Group spacing="xs">
              <Text className={classes.nsfw}>NSFW</Text>
              <Text fw={500}>18+ year old community</Text>
            </Group>
          }
        />
      </Box>
      <Flex
        p="md"
        gap="xs"
        align="center"
        justify="flex-end"
        className={classes.footer}
      >
        <Button variant="outline" h={32} onClick={closeCreateCommunityModal}>
          Cancel
        </Button>
        <Button type="submit" h={32} loading={isLoading}>
          Create Community
        </Button>
      </Flex>
    </form>
  );
};

const CreateCommunityModalWrapper = () => {
  const isOpen = useAppSelector(selectIsCreateCommunityModalOpen);
  const { closeCreateCommunityModal: closeModal } = useCreateCommunityModal();
  return (
    <Modal padding={0} size="auto" isOpen={isOpen} onClose={closeModal}>
      <CreateCommunityModal />
    </Modal>
  );
};

export default CreateCommunityModalWrapper;
