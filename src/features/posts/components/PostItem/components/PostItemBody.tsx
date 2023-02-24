import { FadeInImage } from "@/components/FadeInImage";
import { Post } from "@/features/posts/types";
import { Stack, Text } from "@mantine/core";
import { FC } from "react";

type PostItemBodyProps = { post: Post };

const PostItemBody: FC<PostItemBodyProps> = (props) => {
  return (
    <Stack spacing="sm">
      <Text>{props.post.body}</Text>
      {props.post.imageUrl ? (
        <FadeInImage
          mih={400}
          src={props.post.imageUrl}
          alt="post"
          fit="contain"
          styles={{ image: { maxHeight: 460 } }}
        />
      ) : null}
    </Stack>
  );
};

export default PostItemBody;
