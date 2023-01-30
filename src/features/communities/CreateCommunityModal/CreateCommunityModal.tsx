import { Modal } from "@/components/Modal";
import { selectIsCreateCommunityModalOpen } from "@/features/communities/communitySlice";
import { useCreateCommunityModal } from "@/features/communities/hooks/useCreateCommunityModal";
import { useAppSelector } from "@/store/hooks";
import {
  Button,
  Checkbox,
  createStyles,
  Flex,
  Group,
  Radio,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { ComponentProps, FC } from "react";
import { IconType } from "react-icons/lib";
import { VscAdd } from "react-icons/vsc";

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
}));

type RadioWithIconProps = ComponentProps<typeof Radio> & { Icon: IconType };
const RadioWithIcon: FC<RadioWithIconProps> = ({ label, Icon, ...props }) => (
  <Radio
    label={
      <Group>
        <Icon /> {label}
      </Group>
    }
    {...props}
  />
);

const CreateCommunityModal = () => {
  const { classes } = useStyles();
  const form = useForm({
    initialValues: {
      communityName: "",
      communityType: "ng",
      adultContent: false,
    },
  });
  return (
    <form onSubmit={form.onSubmit(console.log)}>
      <Text>Create Community</Text>
      <Text>Name</Text>
      <Text>Community names including capitalization cannot be changed.</Text>

      <TextInput icon={<p>r/</p>} {...form.getInputProps("communityName")} />
      <Text>21 Characters remaining</Text>
      <br />

      <Text>Community type</Text>
      <Radio.Group
        name="favoriteFramework"
        orientation="vertical"
        label="Select your favorite framework/library"
        description="This is anonymous"
        spacing="xs"
        withAsterisk
        {...form.getInputProps("communityType")}
      >
        <Radio value="react" label="React" />
        <Radio value="svelte" label="Svelte" />
        <RadioWithIcon value="ng" label="with label" Icon={VscAdd} />
      </Radio.Group>

      <br />
      <br />

      <Text>Adult content</Text>
      <Checkbox
        {...form.getInputProps("adultContent", { type: "checkbox" })}
        label={
          <Flex gap="xs" align="center">
            <Text className={classes.nsfw}>NSFW</Text>
            <Text>18+ year old community</Text>
          </Flex>
        }
      />

      <br />

      <Group bg="gray.3">
        <Button type="submit">Create Community</Button>
      </Group>
    </form>
  );
};

const CreateCommunityModalWrapper = () => {
  const isOpen = useAppSelector(selectIsCreateCommunityModalOpen);
  const { closeCreateCommunityModal: closeModal } = useCreateCommunityModal();
  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <CreateCommunityModal />
    </Modal>
  );
};

export default CreateCommunityModalWrapper;
