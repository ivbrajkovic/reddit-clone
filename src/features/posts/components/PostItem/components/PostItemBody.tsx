import { FadeInImage } from "@/components/FadeInImage";
import { usePostItemContext } from "@/features/posts/components/PostItem/components/postItemContext";
import { Stack, Text } from "@mantine/core";

const PostItemBody = () => {
  const { body, imageUrl } = usePostItemContext();
  return (
    <Stack spacing="sm">
      <Text>{body}</Text>
      {imageUrl ? (
        <FadeInImage
          src={imageUrl}
          alt="post"
          fit="contain"
          styles={{ image: { maxHeight: 460 } }}
        />
      ) : null}
    </Stack>
  );
};

export default PostItemBody;
