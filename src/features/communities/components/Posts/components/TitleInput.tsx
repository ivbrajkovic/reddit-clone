import { TextInput } from "@/components/FormControls";
import { useNewPostFormContext } from "@/features/communities/components/Posts/formContext";
import { useRenderCount } from "@/hooks/useRenderCount";

const TitleInput = () => {
  useRenderCount("TitleInput");
  const form = useNewPostFormContext();
  return (
    <TextInput mt="md" placeholder="Title" {...form.getInputProps("title")} />
  );
};
export default TitleInput;
