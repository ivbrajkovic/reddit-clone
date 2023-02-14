import { TextInput } from "@/components/FormControls";
import { useNewPostFormContext } from "@/features/posts/context/formContext";

const TitleInput = () => {
  const form = useNewPostFormContext();
  return (
    <TextInput mt="md" placeholder="Title" {...form.getInputProps("title")} />
  );
};
export default TitleInput;
