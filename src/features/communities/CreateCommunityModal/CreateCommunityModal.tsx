import { Modal } from "@/components/Modal";
import { selectIsCreateCommunityModalOpen } from "@/features/communities/communitySlice";
import { useCreateCommunityModal } from "@/features/communities/hooks/useCreateCommunityModal";
import { validateCommunityName } from "@/features/communities/utils/validateCommunityName";
import { docRef, runTransactionAsync } from "@/firebase/utility";
import { useSignedInUser } from "@/hooks/useSignedInUser";
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
  TextInput
} from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  DocumentData,
  DocumentSnapshot,
  serverTimestamp,
  Transaction
} from "firebase/firestore";
import { ComponentProps, FC, useReducer } from "react";
import { CgInfo } from "react-icons/cg";
import { HiUser } from "react-icons/hi";
import { ImEye } from "react-icons/im";
import { IoLockClosed } from "react-icons/io5";
import { IconType } from "react-icons/lib";

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
}));

type RadioWithIconProps = ComponentProps<typeof Radio> & { Icon: IconType };
const RadioWithIcon: FC<RadioWithIconProps> = ({ label, Icon, ...props }) => (
  <Radio
    size="sm"
    label={
      <Group spacing="xs">
        <Icon fontSize={18} color="#868e96" />
        <Text fw={500}>{label}</Text>
      </Group>
    }
    styles={{
      inner: {
        alignSelf: "center",
      },
      labelWrapper: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      },
      description: {
        marginTop: 0,
        paddingLeft: 4,
      },
    }}
    {...props}
  />
);

const CreateCommunityModal = () => {
  const { classes } = useStyles();
  const user = useSignedInUser();
  const [isLoading, toggleLoading] = useReducer((s) => !s, false);
  const { closeCreateCommunityModal } = useCreateCommunityModal();

  const form = useForm({
    initialValues: {
      communityName: "",
      communityType: "public",
      adultContent: false,
    },
    validate: {
      communityName: validateCommunityName,
    },
  });

  const setFieldError = (field: string, error: string) => () =>
    form.setFieldError(field, error);

  const handleCreateCommunity = () => {
    const userId = user?.uid;
    if (!userId) return;

    const { communityName, communityType, adultContent } = form.values;
    const communitySnippetsPath = `users/${userId}/communitySnippets`;

    const communityDocRef = docRef("communities", communityName);

    const throwIfCommunityNameIsTaken =
      (transaction: Transaction) => (doc: DocumentSnapshot<DocumentData>) =>
        doc.exists() ? Promise.reject("name is unavailable") : Promise.resolve(transaction);

    const getCommunityDocumentByRef = (transaction: Transaction) =>
      transaction.get(communityDocRef);

    const createCommunityDocument = (transaction: Transaction) =>
      transaction.set(communityDocRef, {
        creatorId: userId,
        createdAt: serverTimestamp(),
        numberOfMembers: 1,
        privacyType: communityType,
        adultContent,
      });

    const createCommunitySnippetDocument = (transaction: Transaction) =>
      transaction.set(docRef(communitySnippetsPath, communityName), {
        communityId: name,
        isModerator: true,
      });

    const handleCommunityNameTaken = setFieldError(
      "communityName",
      "Community name is taken.",
    );

    const transactionCallback = (transaction: Transaction) =>
      getCommunityDocumentByRef(transaction)
        .then(throwIfCommunityNameIsTaken(transaction))
        .then(createCommunityDocument)
        .then(createCommunitySnippetDocument)
        // .catch(setFieldError("communityName", "Community name is taken."));
        .catch(e => {
          e === 
        })

    toggleLoading();
    runTransactionAsync(transactionCallback)
      // .then(closeCreateCommunityModal)
      .catch(console.error);
  };

  return (
    <form onSubmit={form.onSubmit(console.log)}>
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
          <RadioWithIcon
            value="public"
            label="Public"
            description="Anyone can view, post, and comment to this community"
            Icon={HiUser}
          />
          <RadioWithIcon
            value="restricted"
            label="Restricted"
            description="Anyone can view this community, but only approved users can post"
            Icon={ImEye}
          />
          <RadioWithIcon
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
      <Flex p="md" gap="xs" bg="gray.2" align="center" justify="flex-end">
        <Button variant="outline" h={32} onClick={closeCreateCommunityModal}>
          Cancel
        </Button>
        <Button type="submit" h={32}>
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
