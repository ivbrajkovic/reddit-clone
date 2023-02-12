import { Textarea } from "@/components/FormControls";
import { useNewPostFormContext } from "@/features/posts/formContext";

const Post = () => {
  const form = useNewPostFormContext();
  return (
    <Textarea
      mt="md"
      placeholder="Text (optional)"
      {...form.getInputProps("text")}
    />
  );
};
export default Post;
