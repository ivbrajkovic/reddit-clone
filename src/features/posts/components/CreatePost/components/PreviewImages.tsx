import { useCreatePostFormContext } from "@/features/posts/components/CreatePost/createPostFormContext";
import { createStyles, Image, SimpleGrid } from "@mantine/core";
import { IoMdCloseCircle } from "react-icons/io";

const useStyles = createStyles((theme) => ({
  imageContainer: {
    position: "relative",
    display: "flex",
    overflow: "hidden",
    borderRadius: 4,
    alignItems: "center",
  },
  overlay: {
    position: "absolute",
    inset: 0,
    opacity: 0,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    transition: "opacity 0.2s ease-in-out",

    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-start",

    ":hover": {
      opacity: 1,
    },
  },
  icon: {
    cursor: "pointer",
    margin: 4,
    fontSize: 24,
    color: theme.white,
  },
}));

const filterByName = (name: string) => (file: File) => file.name !== name;

const PreviewImages = () => {
  const { classes } = useStyles();
  const form = useCreatePostFormContext();

  const { files } = form.values;
  if (!files.length) return null;

  return (
    <SimpleGrid cols={4} breakpoints={[{ maxWidth: "sm", cols: 1 }]} mt="xl">
      {files.map((file) => {
        const imageUrl = URL.createObjectURL(file);
        const onRemove = () => {
          const filteredFiles = files.filter(filterByName(file.name));
          form.setFieldValue("files", filteredFiles);
        };
        return (
          <div key={file.name} className={classes.imageContainer}>
            <Image
              src={imageUrl}
              imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }}
              alt={file.name}
            />
            <div className={classes.overlay}>
              <IoMdCloseCircle className={classes.icon} onClick={onRemove} />
            </div>
          </div>
        );
      })}
    </SimpleGrid>
  );
};

export default PreviewImages;
